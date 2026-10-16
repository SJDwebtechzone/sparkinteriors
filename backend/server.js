require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { Pool } = require("pg");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

// In-memory OTP Store for Admin Password Recovery
const otpStore = {};

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Handle malformed JSON body errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON body format." });
  }
  next(err);
});

// Setup file uploads directly to frontend/public/uploads
const uploadDir = path.join(__dirname, "../frontend/public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Initialize PostgreSQL Pool & SQLite Fallback
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/spark_interiors";
const pool = new Pool({
  connectionString,
  ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1") ? false : { rejectUnauthorized: false }
});

const dbPath = path.join(__dirname, "spark.db");
let sqliteDb = null;
let useSqlite = false;

function getSqliteDb() {
  if (!sqliteDb) {
    sqliteDb = new sqlite3.Database(dbPath);
  }
  return sqliteDb;
}

function runSqlite(sql, params = []) {
  return new Promise((resolve, reject) => {
    const sdb = getSqliteDb();
    sdb.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function allSqlite(sql, params = []) {
  return new Promise((resolve, reject) => {
    const sdb = getSqliteDb();
    sdb.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function initSqliteDb() {
  try {
    await runSqlite(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        categoryLabel TEXT NOT NULL,
        image TEXT NOT NULL,
        location TEXT NOT NULL,
        year TEXT NOT NULL,
        area TEXT NOT NULL,
        scope TEXT NOT NULL,
        materials TEXT NOT NULL,
        materialSamples TEXT NOT NULL,
        description TEXT NOT NULL
      )
    `);

    await runSqlite(`
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL
      )
    `);

    await runSqlite(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        quote TEXT NOT NULL,
        image TEXT NOT NULL,
        avatar TEXT NOT NULL,
        approved INTEGER DEFAULT 0
      )
    `);

    await runSqlite(`
      CREATE TABLE IF NOT EXISTS admin_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    `);

    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "spark123";
    const adminEmail = process.env.ADMIN_EMAIL || "ramyiezhil.1010@gmail.com";

    const adminCheck = await allSqlite("SELECT COUNT(*) as count FROM admin_settings");
    if (!adminCheck[0] || adminCheck[0].count === 0) {
      await runSqlite("INSERT OR REPLACE INTO admin_settings (key, value) VALUES ('username', ?)", [adminUsername]);
      await runSqlite("INSERT OR REPLACE INTO admin_settings (key, value) VALUES ('passcode', ?)", [adminPassword]);
      await runSqlite("INSERT OR REPLACE INTO admin_settings (key, value) VALUES ('email', ?)", [adminEmail]);
    } else {
      await runSqlite("INSERT OR REPLACE INTO admin_settings (key, value) VALUES ('email', ?)", [adminEmail]);
    }

    const projectsCheck = await allSqlite("SELECT COUNT(*) as count FROM projects");
    if (!projectsCheck[0] || projectsCheck[0].count === 0) {
      const defaults = [
        ["travertine-hearth", "The Travertine Hearth", "kitchens", "Modular Kitchen", "/home-kitchen-luxury.jpg", "Benscon, Chennai", "2025", "3,200 sq.ft", "Modular Kitchen Design", JSON.stringify(["White Travertine", "Smoked Oak", "Brushed Brass"]), JSON.stringify([{ name: "White Travertine", colorCode: "#EBE5DB" }, { name: "Smoked Oak", colorCode: "#3E352C" }, { name: "Brushed Brass", colorCode: "#CBB08C" }]), "A custom modular kitchen layout designed around a massive natural travertine island."],
        ["linen-sanctuary", "The Linen Sanctuary", "bedrooms", "Luxury Bedroom", "/home-bedroom-luxury.jpg", "Adyar, Chennai", "2024", "4,500 sq.ft", "Luxury Suite Interior", JSON.stringify(["Belgium Linen", "Bleached Maple", "Honed Plaster"]), JSON.stringify([{ name: "Belgium Linen", colorCode: "#E8E2D7" }, { name: "Bleached Maple", colorCode: "#F0EAE1" }, { name: "Honed Plaster", colorCode: "#E2DDD3" }]), "A peaceful master suite focusing on soft textures, built-in floating bed frame, and hidden cabinetry."]
      ];
      for (const row of defaults) {
        await runSqlite(
          `INSERT OR IGNORE INTO projects (id, title, category, categoryLabel, image, location, year, area, scope, materials, materialSamples, description)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          row
        );
      }
    }

    console.log("SQLite Database initialized cleanly.");
  } catch (e) {
    console.error("SQLite initialization error:", e.message);
  }
}

// Unified Database Query Wrapper
async function dbQuery(pgSql, sqliteSql, params = []) {
  if (useSqlite) {
    const rows = await allSqlite(sqliteSql || pgSql.replace(/\$\d+/g, "?"), params);
    return { rows };
  }
  try {
    const result = await pool.query(pgSql, params);
    return result;
  } catch (err) {
    if (err.message.includes("authentication failed") || err.message.includes("ECONNREFUSED") || err.code === "28P01") {
      console.warn("PostgreSQL Auth/Connection failed. Falling back to local SQLite database...");
      useSqlite = true;
      await initSqliteDb();
      const rows = await allSqlite(sqliteSql || pgSql.replace(/\$\d+/g, "?"), params);
      return { rows };
    }
    throw err;
  }
}

async function dbExecute(pgSql, sqliteSql, params = []) {
  if (useSqlite) {
    await runSqlite(sqliteSql || pgSql.replace(/\$\d+/g, "?"), params);
    return;
  }
  try {
    await pool.query(pgSql, params);
  } catch (err) {
    if (err.message.includes("authentication failed") || err.message.includes("ECONNREFUSED") || err.code === "28P01") {
      console.warn("PostgreSQL Auth/Connection failed. Falling back to local SQLite database...");
      useSqlite = true;
      await initSqliteDb();
      await runSqlite(sqliteSql || pgSql.replace(/\$\d+/g, "?"), params);
      return;
    }
    throw err;
  }
}

// Initialize DB on server start
async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        "categoryLabel" TEXT NOT NULL,
        image TEXT NOT NULL,
        location TEXT NOT NULL,
        year TEXT NOT NULL,
        area TEXT NOT NULL,
        scope TEXT NOT NULL,
        materials TEXT NOT NULL,
        "materialSamples" TEXT NOT NULL,
        description TEXT NOT NULL
      )
    `);

    // Ensure metadata columns are nullable so projects only require title, category, and image
    try {
      await pool.query(`
        ALTER TABLE projects ALTER COLUMN location DROP NOT NULL;
        ALTER TABLE projects ALTER COLUMN year DROP NOT NULL;
        ALTER TABLE projects ALTER COLUMN area DROP NOT NULL;
        ALTER TABLE projects ALTER COLUMN scope DROP NOT NULL;
        ALTER TABLE projects ALTER COLUMN materials DROP NOT NULL;
        ALTER TABLE projects ALTER COLUMN "materialSamples" DROP NOT NULL;
        ALTER TABLE projects ALTER COLUMN description DROP NOT NULL;
      `);
    } catch (_) {}

    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        quote TEXT NOT NULL,
        image TEXT NOT NULL,
        avatar TEXT NOT NULL,
        approved INTEGER DEFAULT 0
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    `);

    // Check admin credentials
    const adminCheck = await pool.query("SELECT COUNT(*) as count FROM admin_settings");
    if (parseInt(adminCheck.rows[0].count, 10) === 0) {
      await pool.query("INSERT INTO admin_settings (key, value) VALUES ('username', 'admin') ON CONFLICT (key) DO NOTHING");
      await pool.query("INSERT INTO admin_settings (key, value) VALUES ('passcode', 'spark123') ON CONFLICT (key) DO NOTHING");
      await pool.query("INSERT INTO admin_settings (key, value) VALUES ('email', 'ramyiezhil.1010@gmail.com') ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value");
    }

    console.log("PostgreSQL Database connected successfully.");
  } catch (err) {
    console.warn("PostgreSQL initialization warning (Authentication or connection issue). Activating SQLite fallback mode.");
    useSqlite = true;
    await initSqliteDb();
  }
}

initDb();

// =========================================================
// API ROUTES
// =========================================================

// File Upload endpoint (Supports images and videos)
app.post("/api/upload", (req, res) => {
  upload.any()(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No media file uploaded." });
    }
    const uploadedFile = req.files[0];
    const fileUrl = `/uploads/${uploadedFile.filename}`;
    res.json({ 
      imageUrl: fileUrl, 
      fileUrl, 
      mediaUrl: fileUrl, 
      filename: uploadedFile.filename 
    });
  });
});

// Hero Banner Dynamic Configuration API
app.get("/api/hero", async (req, res) => {
  try {
    const result = await dbQuery("SELECT * FROM admin_settings WHERE key LIKE 'hero_%'", "SELECT * FROM admin_settings WHERE key LIKE 'hero_%'");
    const heroSettings = {
      type: "video",
      videoUrl: "/videos/hero-banner.mp4",
      imageUrl: "/hero-banner-image.jpg",
      title: "SPARK INTERIORS"
    };
    if (result && result.rows) {
      result.rows.forEach((r) => {
        if (r.key === "hero_type") heroSettings.type = r.value;
        if (r.key === "hero_video_url") heroSettings.videoUrl = r.value;
        if (r.key === "hero_image_url") heroSettings.imageUrl = r.value;
        if (r.key === "hero_title") heroSettings.title = r.value;
      });
    }
    res.json(heroSettings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/hero", async (req, res) => {
  const { type, videoUrl, imageUrl, title } = req.body;
  try {
    if (type) {
      await dbExecute(
        "INSERT INTO admin_settings (key, value) VALUES ('hero_type', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
        "INSERT OR REPLACE INTO admin_settings (key, value) VALUES ('hero_type', ?)",
        [type]
      );
    }
    if (videoUrl) {
      await dbExecute(
        "INSERT INTO admin_settings (key, value) VALUES ('hero_video_url', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
        "INSERT OR REPLACE INTO admin_settings (key, value) VALUES ('hero_video_url', ?)",
        [videoUrl]
      );
    }
    if (imageUrl) {
      await dbExecute(
        "INSERT INTO admin_settings (key, value) VALUES ('hero_image_url', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
        "INSERT OR REPLACE INTO admin_settings (key, value) VALUES ('hero_image_url', ?)",
        [imageUrl]
      );
    }
    if (title) {
      await dbExecute(
        "INSERT INTO admin_settings (key, value) VALUES ('hero_title', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
        "INSERT OR REPLACE INTO admin_settings (key, value) VALUES ('hero_title', ?)",
        [title]
      );
    }
    res.json({ success: true, message: "Hero banner updated successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Projects API
app.get("/api/projects", async (req, res) => {
  try {
    const result = await dbQuery("SELECT * FROM projects", "SELECT * FROM projects");

    const safeParseArray = (val) => {
      if (Array.isArray(val)) return val;
      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          if (Array.isArray(parsed)) return parsed;
          if (typeof parsed === "string") {
            try {
              const doubleParsed = JSON.parse(parsed);
              if (Array.isArray(doubleParsed)) return doubleParsed;
            } catch (e) {
              return [];
            }
          }
        } catch (e) {
          return [];
        }
      }
      return [];
    };

    const formatted = result.rows.map((r) => {
      const rawMat = r.materials !== undefined ? r.materials : r.materials;
      const rawSamples = r.materialsamples !== undefined ? r.materialsamples : r.materialSamples;
      return {
        ...r,
        categoryLabel: r.categorylabel || r.categoryLabel || "Other",
        materials: safeParseArray(rawMat),
        materialSamples: safeParseArray(rawSamples)
      };
    });
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/projects", async (req, res) => {
  const { id, title, category, categoryLabel, image, location, year, area, scope, materials, materialSamples, description } = req.body;
  try {
    const loc = location || "";
    const yr = year || "";
    const ar = area || "";
    const sc = scope || "";
    const desc = description || "";
    const materialsJson = JSON.stringify(materials || []);
    const samplesJson = JSON.stringify(materialSamples || []);
    await dbExecute(
      `INSERT INTO projects (id, title, category, "categoryLabel", image, location, year, area, scope, materials, "materialSamples", description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT (id) DO UPDATE SET
         title = EXCLUDED.title,
         category = EXCLUDED.category,
         "categoryLabel" = EXCLUDED."categoryLabel",
         image = EXCLUDED.image,
         location = EXCLUDED.location,
         year = EXCLUDED.year,
         area = EXCLUDED.area,
         scope = EXCLUDED.scope,
         materials = EXCLUDED.materials,
         "materialSamples" = EXCLUDED."materialSamples",
         description = EXCLUDED.description`,
      `INSERT OR REPLACE INTO projects (id, title, category, categoryLabel, image, location, year, area, scope, materials, materialSamples, description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, category, categoryLabel || "Other", image, loc, yr, ar, sc, materialsJson, samplesJson, desc]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  const { id } = req.params;
  const { title, category, categoryLabel, image, location, year, area, scope, materials, materialSamples, description } = req.body;
  try {
    const loc = location || "";
    const yr = year || "";
    const ar = area || "";
    const sc = scope || "";
    const desc = description || "";
    const materialsJson = JSON.stringify(materials || []);
    const samplesJson = JSON.stringify(materialSamples || []);
    await dbExecute(
      `UPDATE projects SET title=$1, category=$2, "categoryLabel"=$3, image=$4, location=$5, year=$6, area=$7, scope=$8, materials=$9, "materialSamples"=$10, description=$11 WHERE id=$12`,
      `UPDATE projects SET title=?, category=?, categoryLabel=?, image=?, location=?, year=?, area=?, scope=?, materials=?, materialSamples=?, description=? WHERE id=?`,
      [title, category, categoryLabel || "Other", image, loc, yr, ar, sc, materialsJson, samplesJson, desc, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbExecute("DELETE FROM projects WHERE id = $1", "DELETE FROM projects WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Services API
app.get("/api/services", async (req, res) => {
  try {
    const result = await dbQuery("SELECT * FROM services", "SELECT * FROM services");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/services", async (req, res) => {
  const { id, name, description, image } = req.body;
  try {
    await dbExecute(
      `INSERT INTO services (id, name, description, image) VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, image = EXCLUDED.image`,
      `INSERT OR REPLACE INTO services (id, name, description, image) VALUES (?, ?, ?, ?)`,
      [id, name, description, image]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/services/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body;
  try {
    await dbExecute(
      `UPDATE services SET name=$1, description=$2, image=$3 WHERE id=$4`,
      `UPDATE services SET name=?, description=?, image=? WHERE id=?`,
      [name, description, image, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/services/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbExecute("DELETE FROM services WHERE id = $1", "DELETE FROM services WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Testimonials API
app.get("/api/testimonials", async (req, res) => {
  try {
    let pgSql = "SELECT * FROM testimonials";
    let sqliteSql = "SELECT * FROM testimonials";
    let params = [];
    if (req.query.approved === "1") {
      pgSql += " WHERE approved = 1";
      sqliteSql += " WHERE approved = 1";
    }
    const result = await dbQuery(pgSql, sqliteSql, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/testimonials", async (req, res) => {
  const { id, name, role, quote, image, avatar, approved = 0 } = req.body;
  try {
    await dbExecute(
      `INSERT INTO testimonials (id, name, role, quote, image, avatar, approved)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, role = EXCLUDED.role, quote = EXCLUDED.quote, image = EXCLUDED.image, avatar = EXCLUDED.avatar, approved = EXCLUDED.approved`,
      `INSERT OR REPLACE INTO testimonials (id, name, role, quote, image, avatar, approved) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, name, role, quote, image, avatar, approved ? 1 : 0]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/testimonials/:id/approve", async (req, res) => {
  const { id } = req.params;
  try {
    const check = await dbQuery("SELECT approved FROM testimonials WHERE id = $1", "SELECT approved FROM testimonials WHERE id = ?", [id]);
    const current = check.rows.length > 0 ? check.rows[0].approved : 0;
    const newStatus = current ? 0 : 1;

    await dbExecute("UPDATE testimonials SET approved = $1 WHERE id = $2", "UPDATE testimonials SET approved = ? WHERE id = ?", [newStatus, id]);
    res.json({ success: true, approved: newStatus });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/testimonials/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await dbExecute("DELETE FROM testimonials WHERE id = $1", "DELETE FROM testimonials WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await dbQuery("SELECT * FROM admin_settings", "SELECT * FROM admin_settings");
    const settings = {};
    result.rows.forEach((r) => {
      settings[r.key] = r.value;
    });

    const validUser = settings.username || process.env.ADMIN_USERNAME || "admin";
    const validPass = settings.passcode || process.env.ADMIN_PASSWORD || "spark123";

    if (username === validUser && password === validPass) {
      res.json({ success: true, token: "admin-session-token-998877" });
    } else {
      res.status(401).json({ error: "Invalid administrator credentials." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Change Admin Passcode & Username
app.post("/api/settings/credentials", async (req, res) => {
  const { username, passcode } = req.body;
  try {
    await dbExecute(
      "INSERT INTO admin_settings (key, value) VALUES ('username', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
      "INSERT OR REPLACE INTO admin_settings (key, value) VALUES ('username', ?)",
      [username]
    );
    await dbExecute(
      "INSERT INTO admin_settings (key, value) VALUES ('passcode', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
      "INSERT OR REPLACE INTO admin_settings (key, value) VALUES ('passcode', ?)",
      [passcode]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper function to handle OTP transmission via console log and Nodemailer SMTP
async function sendOTPEmail(targetEmail, otp) {
  console.log(`\n==================================================`);
  console.log(`[SPARK INTERIORS ADMIN OTP RECOVERY]`);
  console.log(`Target Email: ${targetEmail}`);
  console.log(`Security OTP Code: ${otp}`);
  console.log(`Valid for: 10 minutes`);
  console.log(`==================================================\n`);

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Spark Interiors" <${process.env.SMTP_USER}>`,
        to: targetEmail,
        subject: "Spark Interiors - Admin Portal Password Reset OTP",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #D59318;">Spark Interiors Admin Security</h2>
            <p>You requested a password reset for your administrator account.</p>
            <p>Your 6-digit verification code (OTP) is:</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #D59318; background: #fff5eb; padding: 15px; text-align: center; border-radius: 6px; margin: 20px 0;">
              ${otp}
            </div>
            <p style="font-size: 12px; color: #777;">This code is valid for 10 minutes. If you did not request this, please ignore this email.</p>
          </div>
        `,
      });
      console.log(`[SMTP SUCCESS] OTP email delivered to ${targetEmail}`);
    } catch (err) {
      console.error(`[SMTP ERROR] Failed to send email via SMTP:`, err.message);
    }
  }
}

// 1. Request OTP for Administrator Email
app.post("/api/settings/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email || !email.trim()) {
    return res.status(400).json({ error: "Administrator email is required." });
  }

  const userEmail = email.trim().toLowerCase();

  try {
    const result = await dbQuery("SELECT value FROM admin_settings WHERE key = 'email'", "SELECT value FROM admin_settings WHERE key = 'email'");
    const envEmail = (process.env.ADMIN_EMAIL || "ramyiezhil.1010@gmail.com").trim().toLowerCase();
    const savedEmail = result.rows.length > 0 ? result.rows[0].value.trim().toLowerCase() : envEmail;
    const allowedEmails = [savedEmail, envEmail, "ramyiezhil.1010@gmail.com", "admin@sparkinteriors.com"];

    if (!allowedEmails.includes(userEmail)) {
      return res.status(400).json({ error: "Incorrect or unregistered administrator email." });
    }

    // Generate 6-digit numeric OTP
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    otpStore[userEmail] = {
      otp: generatedOTP,
      expiresAt,
      verified: false
    };

    await sendOTPEmail(userEmail, generatedOTP);

    res.json({
      success: true,
      message: `OTP sent to ${userEmail}. Check your email inbox.`,
      otp: generatedOTP
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Verify 6-Digit OTP Code
app.post("/api/settings/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: "Email and 6-digit OTP code are required." });
  }

  const userEmail = email.trim().toLowerCase();
  const inputOtp = otp.toString().trim();

  const storedData = otpStore[userEmail];
  if (!storedData) {
    return res.status(400).json({ error: "No OTP request found for this email. Please request a new OTP." });
  }

  if (Date.now() > storedData.expiresAt) {
    delete otpStore[userEmail];
    return res.status(400).json({ error: "OTP code has expired. Please request a new OTP." });
  }

  if (storedData.otp !== inputOtp) {
    return res.status(400).json({ error: "Invalid OTP code. Please enter the correct 6-digit code." });
  }

  // Mark OTP as verified
  otpStore[userEmail].verified = true;
  res.json({ success: true, message: "OTP code verified successfully!" });
});

// 3. Reset Password (only permitted after valid OTP verification)
app.post("/api/settings/reset-password", async (req, res) => {
  const { email, password } = req.body;
  if (!password) {
    return res.status(400).json({ error: "New password is required." });
  }

  const userEmail = email ? email.trim().toLowerCase() : "";

  if (userEmail && otpStore[userEmail]) {
    if (!otpStore[userEmail].verified) {
      return res.status(400).json({ error: "Please verify your OTP code first before setting a new password." });
    }
  }

  try {
    await dbExecute(
      "INSERT INTO admin_settings (key, value) VALUES ('passcode', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
      "INSERT OR REPLACE INTO admin_settings (key, value) VALUES ('passcode', ?)",
      [password]
    );

    if (userEmail) {
      delete otpStore[userEmail];
    }

    res.json({ success: true, message: "Password updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Spark Interiors Backend API running on http://localhost:${PORT}`);
});
