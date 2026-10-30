"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// =========================================================
// DATA SPECIFICATIONS
// =========================================================

interface MaterialSample {
  name: string;
  colorCode: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  location: string;
  year: string;
  area: string;
  scope: string;
  materials: string[];
  materialSamples: MaterialSample[];
  description: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  avatar: string;
  approved?: number;
}

export const CORE_10_CATEGORIES = [
  { value: "false-ceilings", label: "False Ceiling" },
  { value: "kitchens", label: "Modular Kitchen" },
  { value: "wardrobes", label: "Wardrobes" },
  { value: "living-rooms", label: "Living Rooms" },
  { value: "crockery-units", label: "Crockery Units" },
  { value: "pooja-units", label: "Pooja Units" },
  { value: "office-interior", label: "Office Interior" },
  { value: "shop-interior", label: "Shop Interior" },
  { value: "commercial-interior", label: "Commercial Interior" },
  { value: "civil-work", label: "Civil Work" },
] as const;

export function getCleanCategoryLabel(category: string | undefined): string {
  if (!category) return "Other";
  const c = category.toLowerCase().trim();
  if (c.includes("ceiling") || c.includes("false")) return "False Ceiling";
  if (c.includes("kitchen")) return "Modular Kitchen";
  if (c.includes("wardrobe") || c.includes("bedroom")) return "Wardrobes";
  if (c.includes("living")) return "Living Rooms";
  if (c.includes("crockery") || c.includes("crochery")) return "Crockery Units";
  if (c.includes("pooja") || c.includes("mandir")) return "Pooja Units";
  if (c.includes("office")) return "Office Interior";
  if (c.includes("shop") || c.includes("retail") || c.includes("boutique")) return "Shop Interior";
  if (c.includes("commercial")) return "Commercial Interior";
  if (c.includes("civil") || c.includes("construction")) return "Civil Work";
  return categoryLabels[category] || category;
}

const categoryLabels: Record<string, string> = {
  "false-ceilings": "False Ceiling",
  "false-ceiling": "False Ceiling",
  kitchens: "Modular Kitchen",
  "modular-kitchens": "Modular Kitchen",
  "modular-kitchen": "Modular Kitchen",
  wardrobes: "Wardrobes",
  wardrobe: "Wardrobes",
  bedrooms: "Wardrobes",
  "living-rooms": "Living Rooms",
  "living-room": "Living Rooms",
  "living-spaces": "Living Rooms",
  "crockery-units": "Crockery Units",
  "crochery-unit": "Crockery Units",
  "crockery-unit": "Crockery Units",
  "pooja-units": "Pooja Units",
  "pooja-unit": "Pooja Units",
  "office-interior": "Office Interior",
  "office-work": "Office Interior",
  "shop-interior": "Shop Interior",
  "commercial-interior": "Commercial Interior",
  "commercial-space": "Commercial Interior",
  commercial: "Commercial Interior",
  "civil-work": "Civil Work",
  civil: "Civil Work",
};

export default function AdminDashboardPage() {
  // Authorization States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<"email" | "otp" | "reset">("email");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
    const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [recoveryError, setRecoveryError] = useState("");
  const [recoverySuccess, setRecoverySuccess] = useState("");
  
  // Persisted settings states
  const [savedUsername, setSavedUsername] = useState("admin");
  const [savedPasscode, setSavedPasscode] = useState("spark123");
  const [settingsUser, setSettingsUser] = useState("");
  const [settingsPass, setSettingsPass] = useState("");
  const [confirmSettingsPass, setConfirmSettingsPass] = useState("");

  // Tab State: 'overview' | 'hero' | 'projects' | 'services' | 'testimonials' | 'settings'
  const [activeTab, setActiveTab] = useState<"overview" | "hero" | "projects" | "services" | "testimonials" | "settings">("overview");
  const [showPassword, setShowPassword] = useState(false);

  // Hero Banner CMS State
  const [heroType, setHeroType] = useState<"video" | "image">("video");
  const [heroVideoUrl, setHeroVideoUrl] = useState("/videos/hero-banner.mp4");
  const [heroImageUrl, setHeroImageUrl] = useState("/hero-banner-image.jpg");
  const [heroTitle, setHeroTitle] = useState("SPARK INTERIORS");
  const [isHeroSaving, setIsHeroSaving] = useState(false);
  const [isHeroUploading, setIsHeroUploading] = useState(false);

  // Dynamic CMS States
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Editing state trackers
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields - Projects
  const [projTitle, setProjTitle] = useState("");
  const [projCategory, setProjCategory] = useState("");
  const [projLocation, setProjLocation] = useState("");
  const [projYear, setProjYear] = useState("");
  const [projArea, setProjArea] = useState("");
  const [projScope, setProjScope] = useState("");
  const [projMaterialsInput, setProjMaterialsInput] = useState("");
  const [projImage, setProjImage] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [adminProjCategoryFilter, setAdminProjCategoryFilter] = useState("all");
  const [adminProjSearch, setAdminProjSearch] = useState("");

  // Form Fields - Services
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [serviceImage, setServiceImage] = useState("");
  const [adminServiceSearch, setAdminServiceSearch] = useState("");
  const [serviceViewMode, setServiceViewMode] = useState<"grid" | "list">("grid");

  // Form Fields - Testimonials
  const [testName, setTestName] = useState("");
  const [testRole, setTestRole] = useState("");
  const [testQuote, setTestQuote] = useState("");
  const [testImage, setTestImage] = useState("");

  // Validation / Feedback Status
  const [statusMsg, setStatusMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  // Category Edit / Rename States
  const [editingCategoryValue, setEditingCategoryValue] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState<string>("");
  const [isRenamingCategory, setIsRenamingCategory] = useState<boolean>(false);

  // Refs for upload buttons
  const projFileRef = useRef<HTMLInputElement>(null);
  const serviceFileRef = useRef<HTMLInputElement>(null);
  const testFileRef = useRef<HTMLInputElement>(null);
  const heroFileRef = useRef<HTMLInputElement>(null);

  // Dynamic Room Categories: synchronizes with live services, canonical categories, and custom project categories
  const dynamicRoomCategories = React.useMemo(() => {
    const list: { value: string; label: string }[] = [];
    const seenValues = new Set<string>();
    const seenLabels = new Set<string>();

    // 1. Canonical 10 core categories first
    CORE_10_CATEGORIES.forEach((cat) => {
      const matchedService = services.find(
        (s) => s.id.toLowerCase() === cat.value.toLowerCase() || 
               s.name.toLowerCase() === cat.label.toLowerCase() ||
               (cat.value === "kitchens" && s.id.includes("kitchen")) ||
               (cat.value === "false-ceilings" && s.id.includes("ceiling"))
      );
      const displayLabel = matchedService ? matchedService.name : cat.label;
      const normVal = cat.value.toLowerCase().trim();
      const normLabel = displayLabel.toLowerCase().trim();
      list.push({ value: cat.value, label: displayLabel });
      seenValues.add(normVal);
      seenLabels.add(normLabel);
    });

    // 2. Extra services added in services tab
    services.forEach((s) => {
      const val = s.id || s.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
      const normVal = val.toLowerCase().trim();
      const normLabel = s.name.toLowerCase().trim();
      if (!seenValues.has(normVal) && !seenLabels.has(normLabel)) {
        list.push({ value: val, label: s.name });
        seenValues.add(normVal);
        seenLabels.add(normLabel);
      }
    });

    // 3. Extra custom typed categories present in projects
    projects.forEach((p) => {
      if (p.category && p.category !== "all") {
        const normVal = p.category.toLowerCase().trim();
        const rawLabel = p.categoryLabel || p.category;
        const normLabel = rawLabel.toLowerCase().trim();
        if (!seenValues.has(normVal) && !seenLabels.has(normLabel)) {
          list.push({
            value: normVal,
            label: p.categoryLabel || p.category.replace(/-/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase())
          });
          seenValues.add(normVal);
          seenLabels.add(normLabel);
        }
      }
    });

    return list;
  }, [services, projects]);

  const filterProjectMatches = (p: Project) => {
    let matchesCategory = false;
    if (adminProjCategoryFilter === "all") {
      matchesCategory = true;
    } else {
      const pCat = (p.category || "").toLowerCase().trim();
      const fCat = adminProjCategoryFilter.toLowerCase().trim();
      if (fCat === "false-ceilings") {
        matchesCategory = pCat.includes("ceiling") || pCat.includes("false");
      } else if (fCat === "kitchens") {
        matchesCategory = pCat.includes("kitchen");
      } else if (fCat === "wardrobes") {
        matchesCategory = pCat.includes("wardrobe") || pCat.includes("bedroom");
      } else if (fCat === "living-rooms") {
        matchesCategory = pCat.includes("living");
      } else if (fCat === "crockery-units") {
        matchesCategory = pCat.includes("crockery") || pCat.includes("crochery");
      } else if (fCat === "pooja-units") {
        matchesCategory = pCat.includes("pooja") || pCat.includes("mandir");
      } else if (fCat === "office-interior") {
        matchesCategory = pCat.includes("office");
      } else if (fCat === "shop-interior") {
        matchesCategory = pCat.includes("shop") || pCat.includes("retail") || pCat.includes("boutique");
      } else if (fCat === "commercial-interior") {
        matchesCategory = pCat.includes("commercial");
      } else if (fCat === "civil-work") {
        matchesCategory = pCat.includes("civil") || pCat.includes("construction");
      } else {
        matchesCategory = pCat === fCat;
      }
    }

    const matchesSearch =
      !adminProjSearch.trim() ||
      p.title.toLowerCase().includes(adminProjSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  };

  // 1. Sync & Load data from API
  useEffect(() => {
    const authStatus = sessionStorage.getItem("spark_admin_authed");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const projRes = await fetch("http://localhost:5000/api/projects");
      const projData = await projRes.json();
      if (Array.isArray(projData)) setProjects(projData);

      const servRes = await fetch("http://localhost:5000/api/services");
      const servData = await servRes.json();
      if (Array.isArray(servData)) setServices(servData);

      const testRes = await fetch("http://localhost:5000/api/testimonials");
      const testData = await testRes.json();
      if (Array.isArray(testData)) setTestimonials(testData);

      // Load settings
      const settingsRes = await fetch("http://localhost:5000/api/settings");
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        if (settingsData.username) {
          setSavedUsername(settingsData.username);
        }
        if (settingsData.passcode) {
          setSavedPasscode(settingsData.passcode);
        }
      }

      // Load Hero Banner settings
      try {
        const heroRes = await fetch("http://localhost:5000/api/hero");
        if (heroRes.ok) {
          const heroData = await heroRes.json();
          if (heroData.type) setHeroType(heroData.type);
          if (heroData.videoUrl) setHeroVideoUrl(heroData.videoUrl);
          if (heroData.imageUrl) setHeroImageUrl(heroData.imageUrl);
          if (heroData.title) setHeroTitle(heroData.title);
        } else {
          const localHero = localStorage.getItem("spark_hero_config");
          if (localHero) {
            const p = JSON.parse(localHero);
            if (p.type) setHeroType(p.type);
            if (p.videoUrl) setHeroVideoUrl(p.videoUrl);
            if (p.imageUrl) setHeroImageUrl(p.imageUrl);
            if (p.title) setHeroTitle(p.title);
          }
        }
      } catch {
        const localHero = localStorage.getItem("spark_hero_config");
        if (localHero) {
          const p = JSON.parse(localHero);
          if (p.type) setHeroType(p.type);
          if (p.videoUrl) setHeroVideoUrl(p.videoUrl);
          if (p.imageUrl) setHeroImageUrl(p.imageUrl);
          if (p.title) setHeroTitle(p.title);
        }
      }
    } catch (err) {
      console.warn("Backend offline. Make sure node server.js is running.");
      setStatusMsg("Backend Server Offline. Running in Read-Only Fallback.");
      setIsSuccess(false);
    }
  };

  // 2. Handle Login credentials
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password: passcode })
      });
      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem("spark_admin_authed", "true");
        setAuthError("");
        setStatusMsg("");
        return;
      }
    } catch {
      // Offline fallback
    }

    if (username.trim() === savedUsername && passcode === savedPasscode) {
      setIsAuthenticated(true);
      sessionStorage.setItem("spark_admin_authed", "true");
      setAuthError("");
      setStatusMsg("");
    } else {
      setAuthError("Incorrect username or password. Try again.");
    }
  };

  // 2.1 Handle Forgot Password Email Submission (Request OTP)
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail) return;
    setRecoveryError("");
    setRecoverySuccess("");
    setIsOtpLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/settings/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: recoveryEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setRecoveryStep("otp");
        setRecoverySuccess(`OTP verification code sent to ${recoveryEmail}. Please check your email inbox.`);
      } else {
        setRecoveryError(data.error || "Email verification failed.");
      }
    } catch (err) {
      setRecoveryError("Unable to connect to backend server.");
    } finally {
      setIsOtpLoading(false);
    }
  };

  // 2.2 Handle OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.trim().length < 4) {
      setRecoveryError("Please enter the 6-digit OTP code.");
      return;
    }
    setRecoveryError("");
    setRecoverySuccess("");
    setIsOtpLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/settings/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: recoveryEmail, otp: otpCode })
      });
      const data = await res.json();
      if (res.ok) {
        setRecoveryStep("reset");
        setIsEmailVerified(true);
        setRecoverySuccess("OTP verified successfully! Set your new password below.");
      } else {
        setRecoveryError(data.error || "Invalid OTP code.");
      }
    } catch (err) {
      setRecoveryError("Unable to connect to backend server.");
    } finally {
      setIsOtpLoading(false);
    }
  };

  // 2.3 Handle Reset Password Submission
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmNewPassword) return;
    setRecoveryError("");
    setRecoverySuccess("");

    if (newPassword !== confirmNewPassword) {
      setRecoveryError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/settings/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: recoveryEmail, password: newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setRecoverySuccess("Password reset successfully! Redirecting to login...");
        setSavedPasscode(newPassword); // sync local state
        setTimeout(() => {
          setShowForgot(false);
          setRecoveryStep("email");
          setIsEmailVerified(false);
          setRecoveryEmail("");
          setOtpCode("");
                    setNewPassword("");
          setConfirmNewPassword("");
          setRecoverySuccess("");
        }, 2000);
      } else {
        setRecoveryError(data.error || "Password update failed.");
      }
    } catch (err) {
      setRecoveryError("Unable to connect to server.");
    }
  };

  // 3. Direct Multipart file upload to Backend Static uploads folder
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setImageState: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formData
        });
        const data = await res.json();
        if (data.imageUrl) {
          setImageState(data.imageUrl);
          setStatusMsg("Image uploaded successfully!");
          setIsSuccess(true);
        } else {
          setStatusMsg("Image upload failed.");
          setIsSuccess(false);
        }
      } catch (err) {
        setStatusMsg("Failed to upload image. Backend server offline.");
        setIsSuccess(false);
      }
    }
  };

  // Material and Colors parser helper
  const parseMaterialsAndColors = (rawInput: string): { materials: string[]; samples: MaterialSample[] } => {
    if (!rawInput.trim()) return { materials: [], samples: [] };
    
    const parts = rawInput.split(",");
    const materials: string[] = [];
    const samples: MaterialSample[] = [];

    parts.forEach((part) => {
      const trimmed = part.trim();
      const match = trimmed.match(/^([^\(]+)(?:\(#([A-Fa-f0-9]{6})\))?$/);
      if (match) {
        const name = match[1].trim();
        const hex = match[2] ? `#${match[2]}` : null;
        materials.push(name);

        let finalColor = hex || "#D2C5B3";
        if (!hex) {
          const lowerName = name.toLowerCase();
          if (lowerName.includes("teak") || lowerName.includes("wood") || lowerName.includes("oak") || lowerName.includes("maple")) {
            finalColor = "#8B5A2B";
          } else if (lowerName.includes("marble") || lowerName.includes("travertine") || lowerName.includes("stone") || lowerName.includes("quartz")) {
            finalColor = "#EBE5DB";
          } else if (lowerName.includes("linen") || lowerName.includes("plaster") || lowerName.includes("fiber")) {
            finalColor = "#E8E2D7";
          } else if (lowerName.includes("concrete") || lowerName.includes("steel") || lowerName.includes("rock")) {
            finalColor = "#A9A9A9";
          } else if (lowerName.includes("brass") || lowerName.includes("gold")) {
            finalColor = "#CBB08C";
          } else if (lowerName.includes("fern") || lowerName.includes("pebble")) {
            finalColor = "#2A4B2A";
          }
        }
        samples.push({ name, colorCode: finalColor });
      }
    });

    return { materials, samples };
  };

  // =========================================================
  // SAVE / CREATE / UPDATE OPERATIONS
  // =========================================================

  // Hero Banner handlers
  const handleSaveHero = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsHeroSaving(true);
    const payload = {
      type: heroType,
      videoUrl: heroVideoUrl,
      imageUrl: heroImageUrl,
      title: heroTitle
    };

    // Instant local sync
    try {
      localStorage.setItem("spark_hero_config", JSON.stringify(payload));
      window.dispatchEvent(new CustomEvent("spark_hero_update", { detail: payload }));
    } catch (err) {
      console.warn("Could not save to localStorage", err);
    }

    try {
      const res = await fetch("http://localhost:5000/api/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setStatusMsg("Hero banner configuration saved and updated live!");
        setIsSuccess(true);
      } else {
        setStatusMsg("Hero banner saved to browser cache (API returned notice).");
        setIsSuccess(true);
      }
    } catch {
      setStatusMsg("Hero banner saved to browser cache! (Backend server offline)");
      setIsSuccess(true);
    } finally {
      setIsHeroSaving(false);
    }
  };

  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsHeroUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.imageUrl) {
        if (heroType === "video" || file.type.startsWith("video/")) {
          setHeroVideoUrl(data.imageUrl);
          setHeroType("video");
        } else {
          setHeroImageUrl(data.imageUrl);
          setHeroType("image");
        }
        setStatusMsg("Asset uploaded successfully! Click 'Save Banner Settings' to apply.");
        setIsSuccess(true);
      } else {
        setStatusMsg("Upload failed. Try entering a URL directly.");
        setIsSuccess(false);
      }
    } catch {
      setStatusMsg("Upload failed: backend server offline.");
      setIsSuccess(false);
    } finally {
      setIsHeroUploading(false);
    }
  };

  // Rename / Edit Category directly from Project Dashboard
  const handleSaveCategoryRename = async () => {
    if (!editingCategoryValue || !editingCategoryName.trim()) return;
    const newName = editingCategoryName.trim();
    const targetValue = editingCategoryValue;
    const currentCategoryObj = dynamicRoomCategories.find((c) => c.value === targetValue);
    const oldName = currentCategoryObj ? currentCategoryObj.label : targetValue;

    if (newName === oldName) {
      setEditingCategoryValue(null);
      return;
    }

    setIsRenamingCategory(true);
    try {
      // 1. If matching service exists in database, update its name
      const matchedService = services.find(
        (s) => s.id.toLowerCase() === targetValue.toLowerCase() || 
               s.name.toLowerCase() === oldName.toLowerCase() ||
               (targetValue === "false-ceilings" && s.id.includes("ceiling")) ||
               (targetValue === "kitchens" && s.id.includes("kitchen"))
      );

      if (matchedService) {
        await fetch(`http://localhost:5000/api/services/${matchedService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: matchedService.id,
            name: newName,
            description: matchedService.description || "",
            image: matchedService.image || ""
          })
        });
      }

      // 2. Update all projects matching this category
      const matchingProjects = projects.filter((p) => {
        const pCat = (p.category || "").toLowerCase().trim();
        const pLabel = (p.categoryLabel || "").toLowerCase().trim();
        const tVal = targetValue.toLowerCase().trim();
        const oName = oldName.toLowerCase().trim();
        return pCat === tVal || pCat === oName || pLabel === oName || pCat.includes(tVal) || 
               (tVal === "false-ceilings" && (pCat.includes("ceiling") || pCat.includes("false"))) ||
               (tVal === "kitchens" && pCat.includes("kitchen"));
      });

      for (const p of matchingProjects) {
        await fetch(`http://localhost:5000/api/projects/${p.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...p,
            categoryLabel: newName
          })
        });
      }

      // 3. Dispatch real-time events to update across all windows & portfolio page
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("spark_services_updated"));
        window.dispatchEvent(new CustomEvent("spark_projects_updated"));
        localStorage.setItem("spark_services_updated", Date.now().toString());
        localStorage.setItem("spark_projects_updated", Date.now().toString());
      }

      setStatusMsg(`Category renamed to "${newName}" successfully!`);
      setIsSuccess(true);
      await fetchData();
      setEditingCategoryValue(null);
    } catch (err) {
      setStatusMsg("Failed to rename category.");
      setIsSuccess(false);
    } finally {
      setIsRenamingCategory(false);
    }
  };

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projCategory.trim() || !projImage) {
      setStatusMsg("Please provide a title, category, and image.");
      setIsSuccess(false);
      return;
    }

    const { materials, samples } = parseMaterialsAndColors(projMaterialsInput);
    const slug = projTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const finalId = editingId || (projects.some((p) => p.id === slug) ? `${slug}-${Date.now()}` : slug);

    const trimmedCategory = projCategory.trim();
    const matchedService = services.find(
      (s) => s.id.toLowerCase() === trimmedCategory.toLowerCase() || s.name.toLowerCase() === trimmedCategory.toLowerCase()
    );
    const resolvedCategoryValue = matchedService
      ? matchedService.id
      : trimmedCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const resolvedCategoryLabel = matchedService
      ? matchedService.name
      : (getCleanCategoryLabel(trimmedCategory) !== "Other" ? getCleanCategoryLabel(trimmedCategory) : trimmedCategory);

    const projectPayload = {
      id: finalId,
      title: projTitle,
      category: resolvedCategoryValue,
      categoryLabel: resolvedCategoryLabel,
      image: projImage,
      location: projLocation || "",
      year: projYear || "",
      area: projArea || "",
      scope: projScope || "",
      materials: materials || [],
      materialSamples: samples || [],
      description: projDescription || ""
    };

    try {
      const url = editingId 
        ? `http://localhost:5000/api/projects/${editingId}`
        : "http://localhost:5000/api/projects";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectPayload)
      });
      
      if (res.ok) {
        setStatusMsg(editingId ? "Project updated successfully!" : "Project created successfully!");
        setIsSuccess(true);
        clearForms();
        fetchData();
        setActiveTab("projects");
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("spark_projects_updated"));
          window.dispatchEvent(new CustomEvent("spark_services_updated"));
          localStorage.setItem("spark_projects_updated", Date.now().toString());
          localStorage.setItem("spark_services_updated", Date.now().toString());
        }
      } else {
        setStatusMsg("Failed to save project.");
        setIsSuccess(false);
      }
    } catch (err) {
      setStatusMsg("API Error. Make sure backend is running.");
      setIsSuccess(false);
    }
  };

  // Save Service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName || !serviceDesc || !serviceImage) {
      setStatusMsg("Please fill in all fields.");
      setIsSuccess(false);
      return;
    }

    const slug = serviceName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const finalId = editingId || slug;

    const servicePayload = {
      id: finalId,
      name: serviceName,
      description: serviceDesc,
      image: serviceImage
    };

    try {
      const url = editingId 
        ? `http://localhost:5000/api/services/${editingId}`
        : "http://localhost:5000/api/services";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servicePayload)
      });
      
      if (res.ok) {
        setStatusMsg(editingId ? "Service updated successfully!" : "Service created successfully!");
        setIsSuccess(true);
        clearForms();
        fetchData();
        setActiveTab("services");
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("spark_services_updated"));
          localStorage.setItem("spark_services_updated", Date.now().toString());
        }
      } else {
        setStatusMsg("Failed to save service.");
        setIsSuccess(false);
      }
    } catch (err) {
      setStatusMsg("API Error. Make sure backend is running.");
      setIsSuccess(false);
    }
  };

  // Save Testimonial
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName || !testRole || !testQuote || !testImage) {
      setStatusMsg("Please fill in all fields.");
      setIsSuccess(false);
      return;
    }

    const finalId = editingId || `t-${Date.now()}`;

    const testimonialPayload = {
      id: finalId,
      name: testName,
      role: testRole,
      quote: testQuote,
      image: testImage,
      avatar: testImage,
      approved: editingId ? (testimonials.find(t => t.id === editingId)?.approved ?? 1) : 1
    };

    try {
      const url = editingId 
        ? `http://localhost:5000/api/testimonials/${editingId}`
        : "http://localhost:5000/api/testimonials";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialPayload)
      });
      
      if (res.ok) {
        setStatusMsg(editingId ? "Testimonial updated successfully!" : "Testimonial created successfully!");
        setIsSuccess(true);
        clearForms();
        fetchData();
        setActiveTab("testimonials");
      } else {
        setStatusMsg("Failed to save testimonial.");
        setIsSuccess(false);
      }
    } catch (err) {
      setStatusMsg("API Error. Make sure backend is running.");
      setIsSuccess(false);
    }
  };

  // Toggle testimonial approval status
  const handleToggleApprove = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${id}/toggle-approve`, {
        method: "PATCH"
      });
      if (res.ok) {
        const data = await res.json();
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, approved: data.approved } : t))
        );
        setStatusMsg(data.approved === 1 ? "Review status updated: now DISPLAYING on website!" : "Review status updated: now HIDDEN from website.");
        setIsSuccess(true);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("spark_testimonials_updated"));
          localStorage.setItem("spark_testimonials_updated", Date.now().toString());
        }
      } else {
        setStatusMsg("Failed to update review status.");
        setIsSuccess(false);
      }
    } catch (err) {
      console.error("Toggle approval error:", err);
      setStatusMsg("Failed to connect to server.");
      setIsSuccess(false);
    }
  };

  // Save Settings (Username and Password)
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settingsUser.trim() || !settingsPass.trim()) {
      setStatusMsg("Username and password cannot be empty.");
      setIsSuccess(false);
      return;
    }

    if (confirmSettingsPass && settingsPass !== confirmSettingsPass) {
      setStatusMsg("Passwords do not match. Please re-enter.");
      setIsSuccess(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: settingsUser.trim(),
          passcode: settingsPass.trim()
        })
      });

      if (res.ok) {
        setSavedUsername(settingsUser.trim());
        setSavedPasscode(settingsPass.trim());
        setSettingsUser("");
        setSettingsPass("");
        setConfirmSettingsPass("");
        setStatusMsg("Credentials updated successfully! Use your new username and password for future logins.");
        setIsSuccess(true);
      } else {
        setStatusMsg("Failed to update credentials. Please check backend server.");
        setIsSuccess(false);
      }
    } catch (err) {
      setStatusMsg("API Error. Make sure backend is running.");
      setIsSuccess(false);
    }
  };

  // =========================================================
  // ACTIONS / DELETION / RESETS
  // =========================================================

  const handleStartEditProject = (project: Project) => {
    setEditingId(project.id);
    setProjTitle(project.title);
    setProjCategory(project.categoryLabel || getCleanCategoryLabel(project.category) || project.category || "");
    setProjLocation(project.location);
    setProjYear(project.year);
    setProjArea(project.area);
    setProjScope(project.scope);
    setProjImage(project.image);
    setProjDescription(project.description);

    let samples: any[] = [];
    if (Array.isArray(project.materialSamples)) {
      samples = project.materialSamples;
    } else if (typeof project.materialSamples === "string") {
      try {
        const parsed = JSON.parse(project.materialSamples);
        if (Array.isArray(parsed)) samples = parsed;
      } catch (e) {
        samples = [];
      }
    }

    const materialsStr = samples
      .map((s) => (typeof s === "object" && s && s.name ? `${s.name}${s.colorCode ? ` (${s.colorCode})` : ""}` : String(s)))
      .join(", ");

    const fallbackMatStr = Array.isArray(project.materials)
      ? project.materials.join(", ")
      : typeof project.materials === "string"
      ? project.materials
      : "";

    setProjMaterialsInput(materialsStr || fallbackMatStr);
  };

  const handleStartEditService = (service: Service) => {
    setEditingId(service.id);
    setServiceName(service.name);
    setServiceDesc(service.description);
    setServiceImage(service.image);
  };

  const handleStartEditTestimonial = (test: Testimonial) => {
    setEditingId(test.id);
    setTestName(test.name);
    setTestRole(test.role);
    setTestQuote(test.quote);
    setTestImage(test.image);
  };

  const handleDeleteItem = async (id: string, type: "projects" | "services" | "testimonials") => {
    if (window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) {
      try {
        const res = await fetch(`http://localhost:5000/api/${type}/${id}`, {
          method: "DELETE"
        });
        if (res.ok) {
          setStatusMsg("Record deleted successfully.");
          setIsSuccess(true);
          clearForms();
          fetchData();
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("spark_projects_updated"));
            window.dispatchEvent(new CustomEvent("spark_services_updated"));
            localStorage.setItem("spark_projects_updated", Date.now().toString());
            localStorage.setItem("spark_services_updated", Date.now().toString());
            window.dispatchEvent(new CustomEvent("spark_testimonials_updated"));
            localStorage.setItem("spark_testimonials_updated", Date.now().toString());
          }
        } else {
          setStatusMsg("Failed to delete record.");
          setIsSuccess(false);
        }
      } catch (err) {
        setStatusMsg("API Error. Make sure backend is running.");
        setIsSuccess(false);
      }
    }
  };

  const handleResetDatabase = async () => {
    if (window.confirm("Are you sure you want to reset the database to original seed defaults? This deletes all custom updates.")) {
      try {
        const res = await fetch("http://localhost:5000/api/reset", {
          method: "POST"
        });
        if (res.ok) {
          setStatusMsg("Database seed defaults restored successfully.");
          setIsSuccess(true);
          clearForms();
          fetchData();
        } else {
          setStatusMsg("Failed to reset database.");
          setIsSuccess(false);
        }
      } catch (err) {
        setStatusMsg("API Error. Make sure backend is running.");
        setIsSuccess(false);
      }
    }
  };

  const clearForms = () => {
    setEditingId(null);
    
    // Clear project
    setProjTitle("");
    setProjCategory("");
    setProjLocation("");
    setProjYear("");
    setProjArea("");
    setProjScope("");
    setProjMaterialsInput("");
    setProjImage("");
    setProjDescription("");
    if (projFileRef.current) projFileRef.current.value = "";

    // Clear service
    setServiceName("");
    setServiceDesc("");
    setServiceImage("");
    if (serviceFileRef.current) serviceFileRef.current.value = "";

    // Clear testimonial
    setTestName("");
    setTestRole("");
    setTestQuote("");
    setTestImage("");
    if (testFileRef.current) testFileRef.current.value = "";

    // Clear settings inputs
    setSettingsUser("");
    setSettingsPass("");
    setConfirmSettingsPass("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("spark_admin_authed");
    setUsername("");
    setPasscode("");
  };

  // Last 3 projects helper
  const recentProjects = projects.slice(-3).reverse();

  /* =========================================================
      RENDER PASSCODE OVERLAY LOGIN (RE-DESIGNED AS SPLIT VIEW)
  ========================================================= */
  if (!isAuthenticated) {
    return (
      <main className="admin-dashboard-root min-h-screen bg-[#FAF6F0] flex flex-col lg:flex-row selection:bg-[#F3C33D]/20 selection:text-[#F3C33D] overflow-x-hidden font-sans">
        
        {/* LEFT COLUMN: Editorial Cover Page (Visible on Desktop) */}
        <div className="hidden lg:flex lg:w-7/12 bg-neutral-900 relative justify-center items-center p-16 select-none overflow-hidden">
          {/* Clear background image */}
          <div className="absolute inset-0 opacity-80 scale-105 transition-all duration-[2000ms]">
            <Image
              src="/home-residential-luxury-tv.jpg"
              alt="Spark interiors living lounge"
              fill
              unoptimized
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950/80 via-neutral-950/40 to-transparent z-0" />
          
          {/* Typographic Manifesto */}
          <div className="relative z-10 space-y-6 max-w-lg">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#F3C33D] font-bold block">
              ✦ SPARK ARCHITECTS & INTERIORS ✦
            </span>
            <blockquote className="font-serif text-[42px] leading-tight text-white font-light italic">
              “Designing spaces around the people who inhabit them.”
            </blockquote>
            <div className="h-[1px] w-16 bg-[#E1D3C1]/30" />
            <p className="text-neutral-300 text-sm leading-relaxed font-light">
              This unified site-wide admin panel syncs with your local SQLite databases, updating modular kitchens, custom lighting plans, and reviews in real time.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Minimal login cards */}
        <div className="w-full lg:w-5/12 bg-[#FAF6F0] flex flex-col justify-center items-center px-8 sm:px-16 py-20 relative">
          
          <div className="w-full max-w-sm space-y-10">
            <div className="space-y-4">
              <div className="relative w-[220px] h-[60px] mb-4">
                <Image
                  src="/sparklogo.png"
                  alt="Spark Interiors Logo"
                  fill
                  unoptimized
                  className="object-contain object-left"
                />
              </div>
              <span className="text-[9.5px] uppercase tracking-[0.3em] text-[#F3C33D] font-bold block">
                SPARK PORTAL CMS
              </span>
              <h1 className="font-serif text-3xl sm:text-[36px] text-[#252A24] font-normal leading-tight">
                Admin Portal Access
              </h1>
              <p className="text-neutral-600 text-xs sm:text-[13px] font-light leading-relaxed">
                Configure layout specifications, edit services, and upload photographs directly to your server files.
              </p>
            </div>

            {!showForgot ? (
              <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase text-neutral-400 tracking-widest font-semibold">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full px-4 py-3 bg-white border border-[#E1D3C1]/30 rounded-xl text-sm focus:outline-none focus:border-[#F3C33D] transition-all text-neutral-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] uppercase text-neutral-400 tracking-widest font-semibold">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgot(true)}
                      className="text-[10px] text-[#F3C33D]/80 hover:text-[#F3C33D] transition-colors font-semibold cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-4 pr-12 py-3 bg-white border border-[#E1D3C1]/30 rounded-xl text-sm focus:outline-none focus:border-[#F3C33D] transition-all text-neutral-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer select-none focus:outline-none"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {authError && (
                  <p className="text-red-500 text-xs font-semibold animate-pulse pt-1">{authError}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#F3C33D] hover:bg-[#E5B22D] active:scale-98 text-white text-xs font-bold tracking-[0.2em] py-4 rounded-full transition-all duration-300 uppercase cursor-pointer shadow-md shadow-amber-500/10 mt-2"
                >
                  Authenticate Portal
                </button>
              </form>
            ) : (
              <div className="space-y-5 text-left animate-fade-in">
                {recoveryStep === "email" && (
                  // Step 1: Administrator Email
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3C33D] font-bold block mb-1">
                        RESET PASSWORD • STEP 1 OF 3
                      </span>
                      <h2 className="font-serif text-2xl text-[#252A24] font-normal">
                        Forgot Password?
                      </h2>
                      <p className="text-neutral-500 text-xs font-light mt-1 leading-relaxed">
                        Enter your registered administrator email address. We will send a 6-digit OTP code to verify your identity.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] uppercase text-neutral-450 tracking-wider font-semibold">
                        Administrator Email
                      </label>
                      <input
                        type="email"
                        required
                        value={recoveryEmail}
                        onChange={(e) => setRecoveryEmail(e.target.value)}
                        placeholder="Enter your registered email"
                        className="w-full px-4 py-3 bg-white border border-[#E1D3C1]/30 rounded-xl text-sm focus:outline-none focus:border-[#F3C33D] transition-all text-neutral-800"
                      />
                    </div>

                    {recoveryError && (
                      <p className="text-red-500 text-xs font-semibold">{recoveryError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isOtpLoading}
                      className="w-full bg-[#F3C33D] hover:bg-[#E5B22D] active:scale-98 text-white text-xs font-bold tracking-[0.15em] py-3.5 rounded-full transition-all duration-300 uppercase cursor-pointer shadow-md disabled:opacity-50"
                    >
                      {isOtpLoading ? "Sending OTP..." : "Send Verification OTP"}
                    </button>
                  </form>
                )}

                {recoveryStep === "otp" && (
                  // Step 2: Enter & Verify 6-Digit OTP Code
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3C33D] font-bold block mb-1">
                        SECURITY VERIFICATION • STEP 2 OF 3
                      </span>
                      <h2 className="font-serif text-2xl text-[#252A24] font-normal">
                        Verify OTP Code
                      </h2>
                      <p className="text-neutral-500 text-xs font-light mt-1 leading-relaxed">
                        Enter the 6-digit security code sent to <strong className="text-neutral-800 font-semibold">{recoveryEmail}</strong>.
                      </p>
                    </div>

                    {/* Discreet Email Check Instruction (No OTP displayed on screen) */}
                    <div className="p-3.5 bg-[#FAF6F0] border border-[#E1D3C1]/50 rounded-xl text-center">
                      <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                        ✉ A 6-digit security OTP code has been sent directly to your registered email. Check your inbox (or Spam) and enter it below.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] uppercase text-neutral-450 tracking-wider font-semibold">
                        6-Digit OTP Code
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter 6-digit code"
                        className="w-full px-4 py-3 bg-white border border-[#E1D3C1]/30 rounded-xl text-center text-lg font-mono font-bold tracking-[0.3em] focus:outline-none focus:border-[#F3C33D] transition-all text-neutral-800"
                      />
                    </div>

                    {recoveryError && (
                      <p className="text-red-500 text-xs font-semibold">{recoveryError}</p>
                    )}
                    {recoverySuccess && (
                      <p className="text-green-600 text-xs font-semibold">{recoverySuccess}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isOtpLoading}
                      className="w-full bg-[#F3C33D] hover:bg-[#E5B22D] active:scale-98 text-white text-xs font-bold tracking-[0.15em] py-3.5 rounded-full transition-all duration-300 uppercase cursor-pointer shadow-md disabled:opacity-50"
                    >
                      {isOtpLoading ? "Verifying..." : "Verify OTP Code"}
                    </button>

                    <div className="text-center text-xs pt-1">
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-[#F3C33D] hover:underline font-medium cursor-pointer"
                      >
                        Resend OTP
                      </button>
                    </div>
                  </form>
                )}

                {recoveryStep === "reset" && (
                  // Step 3: Create New Password
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3C33D] font-bold block mb-1">
                        RESET PASSWORD • STEP 3 OF 3
                      </span>
                      <h2 className="font-serif text-2xl text-[#252A24] font-normal">
                        Create New Password
                      </h2>
                      <p className="text-neutral-500 text-xs font-light mt-1 leading-relaxed">
                        OTP verified! Set a strong new password to secure your admin portal access.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase text-neutral-450 tracking-wider font-semibold">
                          Create New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="w-full px-4 py-3 bg-white border border-[#E1D3C1]/30 rounded-xl text-sm focus:outline-none focus:border-[#F3C33D] transition-all text-neutral-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase text-neutral-450 tracking-wider font-semibold">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="w-full px-4 py-3 bg-white border border-[#E1D3C1]/30 rounded-xl text-sm focus:outline-none focus:border-[#F3C33D] transition-all text-neutral-800"
                        />
                      </div>
                    </div>

                    {recoveryError && (
                      <p className="text-red-500 text-xs font-semibold">{recoveryError}</p>
                    )}
                    {recoverySuccess && (
                      <p className="text-green-600 text-xs font-semibold">{recoverySuccess}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-[#F3C33D] hover:bg-[#E5B22D] active:scale-98 text-white text-xs font-bold tracking-[0.15em] py-3.5 rounded-full transition-all duration-300 uppercase cursor-pointer shadow-md"
                    >
                      Reset Password
                    </button>
                  </form>
                )}

                {/* Back to Login Button */}
                <div className="pt-2 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgot(false);
                      setRecoveryStep("email");
                      setIsEmailVerified(false);
                      setRecoveryError("");
                      setRecoverySuccess("");
                      setRecoveryEmail("");
                      setOtpCode("");
                                            setNewPassword("");
                      setConfirmNewPassword("");
                    }}
                    className="text-xs text-neutral-500 hover:text-[#F3C33D] transition-colors inline-flex items-center gap-2 cursor-pointer font-semibold bg-transparent border-none p-0 mx-auto"
                  >
                    ← Back to Login
                  </button>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-[#E1D3C1]/20">
              <Link
                href="/portfolio"
                className="text-xs text-neutral-500 hover:text-[#F3C33D] transition-colors inline-flex items-center gap-2"
              >
                ← Return to Spark website
              </Link>
            </div>
          </div>
        </div>

      </main>
    );
  }

  /* =========================================================
      RENDER ADMIN DASHBOARD PANEL (AUTHENTICATED)
  ========================================================= */
  return (
    <main className="admin-dashboard-root min-h-screen bg-[#FAF6F0] text-[#252A24] font-sans selection:bg-[#F3C33D]/20 selection:text-[#F3C33D] flex flex-col justify-between overflow-x-hidden relative">

      <div className="flex-grow py-12 max-w-[1240px] mx-auto w-full px-6 sm:px-12 lg:px-16 space-y-8 animate-fade-in">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-[#E1D3C1]/30 pb-6">
          <div className="flex items-center gap-4">
            {/* Brand Logo */}
            <div className="relative w-[180px] h-[48px] flex-shrink-0">
              <Image
                src="/sparklogo.png"
                alt="Spark Interiors Logo"
                fill
                unoptimized
                className="object-contain object-left"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#F3C33D] font-bold">
                  ADMIN WORKSPACE
                </span>
                <span className="bg-[#F3C33D]/10 text-[#F3C33D] text-[9px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full">
                  Connected to SQLite
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#252A24] font-normal leading-tight mt-1.5">
                Workspace Admin Console
              </h1>
            </div>
          </div>
          
          <div className="flex items-center flex-wrap gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveTab("settings");
                clearForms();
                setStatusMsg("");
              }}
              className="bg-[#FAF6F0] border border-[#E1D3C1]/50 hover:border-[#F3C33D] hover:bg-white text-neutral-700 px-4 py-2.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-[#F3C33D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Change Password</span>
            </button>
            <button
              onClick={handleResetDatabase}
              className="bg-[#FAF6F0] border border-[#E1D3C1]/40 hover:bg-neutral-50 active:scale-95 text-neutral-600 px-5 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-sm w-1/2 sm:w-auto text-center"
            >
              Reset Database
            </button>
            <button
              onClick={handleLogout}
              className="bg-[#252A24] hover:bg-[#343a33] active:scale-95 text-white px-5 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer w-1/2 sm:w-auto text-center"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex border-b border-[#E1D3C1]/20 gap-8 overflow-x-auto scrollbar-none">
          {(["overview", "hero", "projects", "services", "testimonials", "settings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                clearForms();
                setStatusMsg("");
              }}
              className={`pb-3 text-xs font-bold uppercase tracking-widest cursor-pointer transition-all duration-300 relative shrink-0 ${
                activeTab === tab ? "text-[#F3C33D]" : "text-neutral-450 hover:text-[#252A24]"
              }`}
            >
              {tab === "hero" ? "Hero Banner" : tab === "settings" ? "Settings / Password" : tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#F3C33D] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Global Feedback message */}
        {statusMsg && (
          <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-semibold ${
            isSuccess 
              ? "bg-green-50 text-green-700 border-green-200" 
              : "bg-red-50 text-red-700 border-red-200"
          }`}>
            <span>{statusMsg}</span>
            <button onClick={() => setStatusMsg("")} className="font-bold cursor-pointer">✕</button>
          </div>
        )}

        {/* =========================================================
            TAB CONTENT RENDERING
        ========================================================= */}
        <div className="animate-fade-in">
          
          {/* TAB 1: OVERVIEW HOME PAGE */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              
              {/* Welcome Curator Banner */}
              <div className="bg-white border border-[#E1D3C1]/40 rounded-[32px] p-6 sm:p-8 shadow-[0_10px_35px_rgba(70,55,40,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#F3C33D] font-semibold">Active Session</span>
                  <h2 className="font-serif text-2xl sm:text-[28px] text-[#252A24] font-normal">Welcome back, Admin.</h2>
                  <p className="text-neutral-600 text-xs sm:text-sm font-light max-w-xl leading-relaxed">
                    You have full read and write access to the SQLite content layer. All updates will propagate instantly to client interfaces, homepages, sliders, and portfolios.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab("projects")}
                    className="bg-[#F3C33D] hover:bg-[#E5B22D] text-white text-[10px] font-bold tracking-widest uppercase px-5 py-3 rounded-full transition-all cursor-pointer"
                  >
                    Add Portfolio
                  </button>
                  <Link
                    href="/portfolio"
                    className="bg-[#FAF6F0] border border-[#E1D3C1]/40 hover:bg-neutral-50 text-neutral-700 text-[10px] font-bold tracking-widest uppercase px-5 py-3 rounded-full transition-all text-center inline-block"
                  >
                    Inspect Site
                  </Link>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  onClick={() => setActiveTab("hero")}
                  className="bg-white border border-[#E1D3C1]/30 hover:border-[#F3C33D]/50 p-6 rounded-2xl shadow-sm space-y-3 cursor-pointer group transition-all duration-300"
                >
                  <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest group-hover:text-[#F3C33D]">Hero Media</span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-2xl font-serif text-neutral-800 capitalize">{heroType === "video" ? "🎥 Video" : "🖼️ Image"}</span>
                    <span className="text-xs text-neutral-400 group-hover:translate-x-1.5 transition-transform">Edit →</span>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab("projects")}
                  className="bg-white border border-[#E1D3C1]/30 hover:border-[#F3C33D]/50 p-6 rounded-2xl shadow-sm space-y-3 cursor-pointer group transition-all duration-300"
                >
                  <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest group-hover:text-[#F3C33D]">Portfolio Projects</span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-4xl font-serif text-neutral-800">{projects.length}</span>
                    <span className="text-xs text-neutral-400 group-hover:translate-x-1.5 transition-transform">Configure →</span>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab("services")}
                  className="bg-white border border-[#E1D3C1]/30 hover:border-[#F3C33D]/50 p-6 rounded-2xl shadow-sm space-y-3 cursor-pointer group transition-all duration-300"
                >
                  <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest group-hover:text-[#F3C33D]">Design Domains</span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-4xl font-serif text-neutral-800">{services.length}</span>
                    <span className="text-xs text-neutral-400 group-hover:translate-x-1.5 transition-transform">Configure →</span>
                  </div>
                </div>
<div 
                  onClick={() => setActiveTab("testimonials")}
                  className="bg-white border border-[#E1D3C1]/30 hover:border-[#F3C33D]/50 p-6 rounded-2xl shadow-sm space-y-3 cursor-pointer group transition-all duration-300"
                >
                  <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-widest group-hover:text-[#F3C33D]">Testimonial Reviews</span>
                  <div className="flex justify-between items-baseline">
                    <span className="text-4xl font-serif text-neutral-800">{testimonials.length}</span>
                    <span className="text-xs text-neutral-400 group-hover:translate-x-1.5 transition-transform">Configure →</span>
                  </div>
                </div>
              </div>

              {/* Bottom splits: Recent Additions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* RECENT ADDITIONS SUMMARY */}
                <div className="lg:col-span-12 bg-white border border-[#E1D3C1]/40 rounded-3xl p-6 shadow-sm space-y-5">
                  <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                    <h3 className="font-serif text-lg text-neutral-800 font-semibold">Recent Portfolio Additions</h3>
                    <button onClick={() => setActiveTab("projects")} className="text-xs text-[#F3C33D] font-semibold hover:underline">See All</button>
                  </div>

                  <div className="space-y-3">
                    {recentProjects.length === 0 ? (
                      <p className="text-xs text-neutral-400 py-6 text-center">No portfolio items loaded.</p>
                    ) : (
                      recentProjects.map((p) => (
                        <div key={p.id} className="flex items-center justify-between p-3 bg-[#FAF6F0]/40 rounded-xl border border-neutral-100">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border">
                              {p.image ? (
                                <Image src={p.image} alt={p.title} fill unoptimized className="object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-[#F5EDE0]">
                                  <span className="text-[#F3C33D] text-xs font-bold">{p.title?.charAt(0) || "?"}</span>
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-semibold text-neutral-800 truncate">{p.title}</h4>
                              <span className="text-[9px] text-neutral-400 block">{p.location} • {p.year}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setActiveTab("projects");
                              handleStartEditProject(p);
                            }}
                            className="text-[9.5px] uppercase font-bold tracking-wider bg-white border px-3 py-1 rounded hover:bg-neutral-50 cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB: HERO BANNER DYNAMIC MEDIA CMS */}
          {activeTab === "hero" && (
            <div className="space-y-8 animate-fade-in">
              {/* Studio Header */}
              <div className="bg-white border border-[#E1D3C1]/40 rounded-[32px] p-6 sm:p-8 shadow-[0_10px_35px_rgba(70,55,40,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#F3C33D] font-semibold">Homepage Media Control</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF6F0] border border-[#E1D3C1]/60 text-[#252A24]">
                      Active: {heroType === "video" ? "🎥 Ambient Video" : "🖼️ Still Image"}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-[28px] text-[#252A24] font-normal">Hero Banner Media Manager</h2>
                  <p className="text-neutral-600 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
                    Dynamically switch the hero background between an ambient looping Video or an ultra-luxury Interior Image. Visitors also have access to an instant live preview switcher on the hero section dock.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Link
                    href="/"
                    target="_blank"
                    className="bg-[#FAF6F0] border border-[#E1D3C1]/50 hover:bg-neutral-100 text-[#252A24] text-[10px] font-bold tracking-widest uppercase px-5 py-3 rounded-full transition-all inline-flex items-center gap-2"
                  >
                    <span>View Live Site</span>
                    <span>↗</span>
                  </Link>
                  <button
                    onClick={handleSaveHero}
                    disabled={isHeroSaving}
                    className="bg-[#F3C33D] hover:bg-[#E5B22D] text-white text-[10px] font-bold tracking-widest uppercase px-6 py-3 rounded-full transition-all cursor-pointer shadow-sm hover:shadow active:scale-95 disabled:opacity-50"
                  >
                    {isHeroSaving ? "Saving..." : "Save Banner Settings"}
                  </button>
                </div>
              </div>

              {/* Media Mode Selector Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Video Option Card */}
                <div
                  onClick={() => setHeroType("video")}
                  className={`p-6 sm:p-7 rounded-[28px] border-2 cursor-pointer transition-all duration-300 relative group ${
                    heroType === "video"
                      ? "bg-white border-[#F3C33D] shadow-[0_12px_36px_rgba(243, 195, 61,0.12)]"
                      : "bg-white/80 border-[#E1D3C1]/40 hover:border-neutral-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#252A24] to-[#3a4138] text-white flex items-center justify-center text-xl shadow-sm">
                      🎥
                    </div>
                    {heroType === "video" ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#F3C33D] text-white shadow-sm">
                        Active Mode
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200">
                        Click to Activate
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl text-[#252A24] mb-2 font-medium">Ambient Motion Video</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-light mb-4">
                    Full-bleed looping background video with cinematic architectural movements, muted ambient playback, and responsive viewport sizing.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#F3C33D]">
                    <span>Format: MP4 / WebM</span>
                    <span>•</span>
                    <span>Autoplay + Loop</span>
                  </div>
                </div>

                {/* Image Option Card */}
                <div
                  onClick={() => setHeroType("image")}
                  className={`p-6 sm:p-7 rounded-[28px] border-2 cursor-pointer transition-all duration-300 relative group ${
                    heroType === "image"
                      ? "bg-white border-[#F3C33D] shadow-[0_12px_36px_rgba(243, 195, 61,0.12)]"
                      : "bg-white/80 border-[#E1D3C1]/40 hover:border-neutral-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F3C33D] to-[#8C521B] text-white flex items-center justify-center text-xl shadow-sm">
                      🖼️
                    </div>
                    {heroType === "image" ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#F3C33D] text-white shadow-sm">
                        Active Mode
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200">
                        Click to Activate
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl text-[#252A24] mb-2 font-medium">High-Resolution Photography</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-light mb-4">
                    Ultra-crisp luxury interior portrait or architectural still. Loads instantly with next/image priority rendering, high fidelity, and zero buffering.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#F3C33D]">
                    <span>Format: JPG / PNG / WebP</span>
                    <span>•</span>
                    <span>Instant High-DPI</span>
                  </div>
                </div>
              </div>

              {/* Configuration Controls & Live Preview Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Form & Presets */}
                <div className="lg:col-span-6 bg-white border border-[#E1D3C1]/40 rounded-[32px] p-6 sm:p-8 shadow-[0_12px_40px_rgba(70,55,40,0.03)] space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3C33D] font-bold block mb-1">
                      MEDIA ASSET SETTINGS
                    </span>
                    <h3 className="font-serif text-xl text-[#252A24]">
                      {heroType === "video" ? "Video Configuration" : "Image Configuration"}
                    </h3>
                  </div>

                  {/* Hero Title Input */}
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-1.5 font-semibold">
                      Hero Banner Title
                    </label>
                    <input
                      type="text"
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      placeholder="e.g. SPARK INTERIORS"
                      className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#F3C33D] transition-colors"
                    />
                  </div>

                  {/* Video URL & Presets (Visible when heroType is video) */}
                  {heroType === "video" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-1.5 font-semibold">
                          Video File Path or External URL *
                        </label>
                        <input
                          type="text"
                          value={heroVideoUrl}
                          onChange={(e) => setHeroVideoUrl(e.target.value)}
                          placeholder="/videos/hero-banner.mp4 or https://..."
                          className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#F3C33D] transition-colors"
                        />
                      </div>

                      {/* Quick Presets for Video */}
                      <div>
                        <span className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-2 font-semibold">
                          Quick Video Presets
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setHeroVideoUrl("/videos/hero-banner.mp4")}
                            className={`text-xs px-3.5 py-2 rounded-xl border transition-all ${
                              heroVideoUrl === "/videos/hero-banner.mp4"
                                ? "bg-[#252A24] text-white border-[#252A24]"
                                : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200"
                            }`}
                          >
                            🎬 Official Architecture Loop (Default)
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image URL & Presets (Visible when heroType is image) */}
                  {heroType === "image" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-1.5 font-semibold">
                          Image File Path or External URL *
                        </label>
                        <input
                          type="text"
                          value={heroImageUrl}
                          onChange={(e) => setHeroImageUrl(e.target.value)}
                          placeholder="/hero-banner-image.jpg or https://..."
                          className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 outline-none focus:border-[#F3C33D] transition-colors"
                        />
                      </div>

                      {/* Curated Presets for Images */}
                      <div>
                        <span className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-2 font-semibold">
                          Curated Luxury Photo Presets
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { name: "Living Penthouse", url: "/hero-banner-image.jpg" },
                            { name: "Wabi-Sabi Lounge", url: "/wabisabi-lounge.jpg" },
                            { name: "Copperleaf Kitchen", url: "/copperleaf-luxury-kitchen.jpg" },
                            { name: "Luxury Wardrobe", url: "/home-bedroom-luxury-wardrobe.jpg" },
                            { name: "Warm Residence", url: "/home-residential-luxury.jpg" },
                            { name: "Footer Masterpiece", url: "/footer-luxury-interior-bg.jpg" }
                          ].map((preset) => (
                            <button
                              key={preset.url}
                              type="button"
                              onClick={() => setHeroImageUrl(preset.url)}
                              className={`text-left text-xs px-3 py-2 rounded-xl border transition-all flex items-center justify-between ${
                                heroImageUrl === preset.url
                                  ? "bg-[#252A24] text-white border-[#252A24] font-medium"
                                  : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200"
                              }`}
                            >
                              <span className="truncate">{preset.name}</span>
                              {heroImageUrl === preset.url && <span className="text-[10px] text-[#F3C33D]">✓</span>}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* File Upload Box */}
                  <div className="pt-2 border-t border-neutral-100">
                    <label className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-2 font-semibold">
                      Upload Custom Media File ({heroType === "video" ? "MP4, WebM" : "JPG, PNG, WebP"})
                    </label>
                    <input
                      type="file"
                      ref={heroFileRef}
                      accept={heroType === "video" ? "video/*" : "image/*"}
                      onChange={handleHeroFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isHeroUploading}
                      onClick={() => heroFileRef.current?.click()}
                      className="w-full py-3.5 px-4 rounded-xl border border-dashed border-[#F3C33D]/60 hover:border-[#F3C33D] bg-[#FAF6F0]/50 hover:bg-[#FAF6F0] text-xs font-semibold text-[#8C521B] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>📁</span>
                      <span>{isHeroUploading ? "Uploading file..." : `Upload ${heroType === "video" ? "Video" : "Image"} from Device`}</span>
                    </button>
                  </div>

                  {/* Save Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleSaveHero}
                      disabled={isHeroSaving}
                      className="w-full py-4 rounded-full bg-[#252A24] hover:bg-[#343a33] text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-98 disabled:opacity-50"
                    >
                      {isHeroSaving ? "Saving Configuration..." : "Save Banner Settings"}
                    </button>
                  </div>
                </div>

                {/* Right Column: Live Mockup / Preview Screen */}
                <div className="lg:col-span-6 bg-white border border-[#E1D3C1]/40 rounded-[32px] p-6 sm:p-8 shadow-[0_12px_40px_rgba(70,55,40,0.03)] space-y-4 lg:sticky lg:top-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3C33D] font-bold block mb-1">
                        LIVE PREVIEW
                      </span>
                      <h3 className="font-serif text-lg text-[#252A24]">Hero Presentation Preview</h3>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Real-Time Mockup
                    </span>
                  </div>

                  {/* Mockup Canvas */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black shadow-inner border border-neutral-800">
                    {heroType === "video" ? (
                      <video
                        key={heroVideoUrl}
                        src={heroVideoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-500"
                        style={{ backgroundImage: `url(${heroImageUrl})` }}
                      />
                    )}

                    {/* Gradient Overlay Replica */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

                    {/* Live Watermark Tag */}
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] uppercase tracking-wider text-white font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{heroType === "video" ? "Video Ambient" : "Still Photograph"}</span>
                    </div>

                    {/* Simulated Hero Content */}
                    <div className="absolute inset-x-4 bottom-4 z-10 text-white space-y-2 pointer-events-none">
                      <p className="text-[9px] uppercase tracking-[0.25em] text-white/80 font-medium">Bespoke Architectural Spaces</p>
                      <h4 className="font-serif text-xl sm:text-2xl font-light text-white tracking-wide">
                        {heroTitle || "SPARK INTERIORS"}
                      </h4>
                      <div className="flex gap-2 pt-1">
                        <div className="px-3 py-1 rounded-full bg-[#F3C33D] text-white text-[8px] font-bold uppercase tracking-wider">
                          Start Project
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-wider">
                          Explore
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FAF6F0] rounded-xl p-3.5 border border-[#E1D3C1]/50 text-neutral-600 text-[11px] leading-relaxed flex items-start gap-2.5">
                    <span className="text-base leading-none">💡</span>
                    <span>
                      <strong>Tip:</strong> Visitors on the homepage can also click the <code>🎥 Video / 🖼️ Image</code> switcher directly on the hero banner island to test both modes in real-time.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGER */}
          {activeTab === "projects" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form */}
              <div className="lg:col-span-4 bg-white border border-[#E1D3C1]/40 rounded-[28px] p-6 shadow-[0_12px_40px_rgba(70,55,40,0.03)] space-y-5 lg:sticky lg:top-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3C33D] font-bold block mb-1">
                    {editingId ? "UPDATE RECORD" : "CREATE NEW RECORD"}
                  </span>
                  <h2 className="font-serif text-2xl text-[#252A24] font-normal">
                    {editingId ? "Edit Project Details" : "Add Project File"}
                  </h2>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-1.5 font-semibold">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={projTitle}
                      onChange={(e) => setProjTitle(e.target.value)}
                      placeholder="e.g. The Travertine Hearth"
                      className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-[#E1D3C1]/30 rounded-xl text-sm focus:outline-none focus:border-[#F3C33D] transition-colors text-neutral-850"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-1.5 font-semibold">Room Category *</label>
                    <input
                      type="text"
                      required
                      value={projCategory}
                      onChange={(e) => setProjCategory(e.target.value)}
                      placeholder="e.g. Modular Kitchen, False Ceiling, Living Room"
                      className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-[#E1D3C1]/30 rounded-xl text-sm focus:outline-none focus:border-[#F3C33D] transition-colors text-neutral-850"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-1.5 font-semibold">Photograph *</label>
                    <div className="space-y-2">
                      <input
                        type="file"
                        ref={projFileRef}
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, setProjImage)}
                        className="w-full text-xs text-neutral-500 cursor-pointer file:cursor-pointer file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-[#E1D3C1]/40 file:text-[10px] file:uppercase file:font-bold file:bg-[#FAF6F0]"
                      />
                      <input
                        type="text"
                        value={projImage}
                        onChange={(e) => setProjImage(e.target.value)}
                        placeholder="Or type path /uploads/name.jpg"
                        className="w-full px-4 py-2 bg-[#FAF6F0]/40 border border-[#E1D3C1]/30 rounded-xl text-xs focus:outline-none"
                      />
                    </div>
                    {projImage && (
                      <div className="mt-2.5 relative w-full aspect-[2.2] rounded-xl overflow-hidden border border-[#E1D3C1]/20 bg-neutral-50">
                        <Image src={projImage} alt="Preview" fill unoptimized className="object-cover object-center" />
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex gap-2.5">
                    <button type="submit" className="flex-grow bg-[#F3C33D] hover:bg-[#E5B22D] text-white text-xs font-bold tracking-[0.2em] py-3 rounded-full transition-all duration-300 uppercase cursor-pointer">
                      {editingId ? "Save Changes" : "Create Project"}
                    </button>
                    {editingId && (
                      <button type="button" onClick={clearForms} className="bg-[#FAF6F0] border border-[#E1D3C1]/40 hover:bg-neutral-50 text-neutral-600 px-5 py-3 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all cursor-pointer">Cancel</button>
                    )}
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-8 bg-white border border-[#E1D3C1]/40 rounded-[28px] p-6 sm:p-7 shadow-[0_12px_40px_rgba(70,55,40,0.03)] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E1D3C1]/30 pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3C33D] font-bold block mb-0.5">
                      CMS DATABASE
                    </span>
                    <h2 className="font-serif text-2xl text-[#252A24] font-normal uppercase tracking-wider">
                      Existing Projects ({projects.filter((p) => {
                        const matchesCategory = adminProjCategoryFilter === "all" || p.category === adminProjCategoryFilter;
                        const matchesSearch = !adminProjSearch.trim() || p.title.toLowerCase().includes(adminProjSearch.toLowerCase());
                        return matchesCategory && matchesSearch;
                      }).length}{projects.filter((p) => {
                        const matchesCategory = adminProjCategoryFilter === "all" || p.category === adminProjCategoryFilter;
                        const matchesSearch = !adminProjSearch.trim() || p.title.toLowerCase().includes(adminProjSearch.toLowerCase());
                        return matchesCategory && matchesSearch;
                      }).length !== projects.length ? ` / ${projects.length}` : ""})
                    </h2>
                  </div>

                  {/* Search box */}
                  <div className="relative w-full sm:w-60">
                    <input
                      type="text"
                      value={adminProjSearch}
                      onChange={(e) => setAdminProjSearch(e.target.value)}
                      placeholder="Search projects..."
                      className="w-full pl-8 pr-3 py-1.5 bg-[#FAF6F0]/60 border border-[#E1D3C1]/40 rounded-xl text-xs focus:outline-none focus:border-[#F3C33D] transition-colors"
                    />
                    <svg className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Category Filter Pills & Direct Edit Option */}
                <div className="flex flex-wrap items-center gap-1.5 pb-1">
                  {[
                    { value: "all", label: "All" },
                    ...dynamicRoomCategories
                  ].map((filter) => {
                    const isSelected = adminProjCategoryFilter === filter.value;
                    return (
                      <div key={filter.value} className="inline-flex items-center">
                        <button
                          type="button"
                          onClick={() => setAdminProjCategoryFilter(filter.value)}
                          className={`text-[9.5px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-[#F3C33D] text-white shadow-sm"
                              : "bg-[#FAF6F0] text-neutral-600 hover:bg-[#FAF6F0]/80 hover:text-[#252A24]"
                          }`}
                        >
                          <span>{filter.label}</span>
                          {filter.value !== "all" && (
                            <span
                              title={`Edit "${filter.label}" Name`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingCategoryValue(filter.value);
                                setEditingCategoryName(filter.label);
                              }}
                              className={`p-0.5 rounded-full transition-all cursor-pointer ${
                                isSelected 
                                  ? "text-white/85 hover:text-white hover:bg-white/20" 
                                  : "text-neutral-400 hover:text-[#F3C33D] hover:bg-neutral-200/50"
                              }`}
                            >
                              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Direct Category Rename Modal */}
                {editingCategoryValue && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-[#E1D3C1]/50 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#F3C33D] font-bold block mb-1">
                          EDIT CATEGORY NAME
                        </span>
                        <h3 className="font-serif text-lg text-[#252A24]">
                          Rename Category
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1">
                          Renaming will update this category in the dashboard and across the website project gallery.
                        </p>
                      </div>

                      <input
                        type="text"
                        value={editingCategoryName}
                        onChange={(e) => setEditingCategoryName(e.target.value)}
                        placeholder="Enter category name..."
                        className="w-full px-3.5 py-2 bg-[#FAF6F0]/60 border border-[#E1D3C1]/50 rounded-xl text-sm focus:outline-none focus:border-[#F3C33D] text-neutral-850"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSaveCategoryRename();
                          }
                          if (e.key === "Escape") {
                            setEditingCategoryValue(null);
                          }
                        }}
                      />

                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E1D3C1]/30">
                        <button
                          type="button"
                          onClick={() => setEditingCategoryValue(null)}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          disabled={isRenamingCategory || !editingCategoryName.trim()}
                          onClick={handleSaveCategoryRename}
                          className="px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#F3C33D] text-white hover:bg-[#dcae32] transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                        >
                          {isRenamingCategory ? "Saving..." : "Save Name"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2-Column Compact Scrollable Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[560px] overflow-y-auto pr-1">
                  {projects.filter(filterProjectMatches).map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-3 bg-[#FAF6F0]/50 border border-[#E1D3C1]/30 rounded-2xl hover:border-[#F3C33D]/40 hover:bg-white transition-all shadow-[0_2px_8px_rgba(70,55,40,0.02)] gap-3 group"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-grow">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-[#E1D3C1]/30">
                            {p.image ? (
                              <Image src={p.image} alt={p.title} fill unoptimized className="object-cover object-center group-hover:scale-105 transition-transform" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[#F5EDE0]">
                                <span className="text-[#F3C33D] text-xs font-bold">{p.title?.charAt(0) || "?"}</span>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-grow">
                            <span className="text-[8px] uppercase tracking-wider bg-[#F3C33D]/10 text-[#F3C33D] px-2 py-0.5 rounded font-bold inline-block mb-0.5">
                              {getCleanCategoryLabel(p.category)}
                            </span>
                            <h4 className="font-serif text-sm text-[#252A24] font-semibold truncate" title={p.title}>
                              {p.title}
                            </h4>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => handleStartEditProject(p)}
                            className="bg-white border border-[#E1D3C1]/40 hover:bg-[#F3C33D] hover:text-white hover:border-[#F3C33D] text-[#F3C33D] px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteItem(p.id, "projects")}
                            className="bg-red-50 hover:bg-red-500 hover:text-white text-red-600 border border-red-100 px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider uppercase transition-all cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}

                  {projects.filter(filterProjectMatches).length === 0 && (
                    <div className="col-span-full py-12 text-center text-neutral-400 text-xs">
                      No projects found matching current filter.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES MANAGER */}
          {activeTab === "services" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form - Left Column */}
              <div className="lg:col-span-5 bg-white border border-[#E1D3C1]/40 rounded-[28px] p-6 sm:p-7 shadow-[0_12px_40px_rgba(70,55,40,0.03)] space-y-5 lg:sticky lg:top-8">
                <div className="border-b border-[#E1D3C1]/30 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3C33D] font-bold flex items-center gap-1.5">
                      <span className="text-[#F3C33D] text-xs font-bold">✦</span>
                      <span>{editingId ? "EDITING SERVICE" : "ADD NEW SERVICE"}</span>
                    </span>
                    {editingId && (
                      <button
                        type="button"
                        onClick={clearForms}
                        className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        ✕ Cancel
                      </button>
                    )}
                  </div>
                  <h2 className="font-serif text-2xl text-[#252A24] font-normal mt-1">
                    {editingId ? "Update Service Details" : "Create Service Item"}
                  </h2>
                  {editingId && (
                    <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-amber-900 text-xs flex items-center justify-between">
                      <span className="font-mono text-[11px]">ID: <strong>#{editingId}</strong></span>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-amber-700">Active Edit</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSaveService} className="space-y-4">
                  {/* Service Name */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[10px] uppercase text-neutral-400 tracking-wider font-semibold">Service Name *</label>
                      <span className="text-[9.5px] text-neutral-400 font-mono">
                        {serviceName ? `#${serviceName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}` : "slug auto-created"}
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      placeholder="e.g. Modular Kitchens"
                      className="w-full px-4 py-3 bg-[#FAF6F0]/40 border border-[#E1D3C1]/40 rounded-xl text-sm focus:outline-none focus:border-[#F3C33D] focus:bg-white transition-all text-neutral-850"
                    />
                  </div>

                  {/* Service Image */}
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-1.5 font-semibold">Service Image *</label>
                    <div className="space-y-2">
                      <input
                        type="file"
                        ref={serviceFileRef}
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, setServiceImage)}
                        className="w-full text-xs text-neutral-500 cursor-pointer file:cursor-pointer file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border file:border-[#E1D3C1]/50 file:text-[10px] file:uppercase file:font-bold file:bg-[#FAF6F0] file:text-neutral-700 hover:file:bg-[#F3EADF] transition-all"
                      />
                      <input
                        type="text"
                        value={serviceImage}
                        onChange={(e) => setServiceImage(e.target.value)}
                        placeholder="Or type path /uploads/name.jpg"
                        className="w-full px-4 py-2.5 bg-[#FAF6F0]/40 border border-[#E1D3C1]/40 rounded-xl text-xs focus:outline-none focus:border-[#F3C33D] focus:bg-white transition-all"
                      />
                    </div>
                    {serviceImage && (
                      <div className="mt-3 relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#E1D3C1]/30 bg-neutral-50 group">
                        <Image src={serviceImage} alt="Preview" fill unoptimized className="object-cover object-center" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setServiceImage("")}
                            className="bg-red-600/90 hover:bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm cursor-pointer transition-all"
                          >
                            ✕ Remove Image
                          </button>
                        </div>
                        <span className="absolute bottom-2 left-2 text-[9px] bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-md font-mono truncate max-w-[85%]">
                          {serviceImage}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Service Description */}
                  <div>
                    <label className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-1.5 font-semibold">Service Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={serviceDesc}
                      onChange={(e) => setServiceDesc(e.target.value)}
                      placeholder="Describe what we design (e.g. ergonomic layouts, custom cabinetry, warm finishes...)"
                      className="w-full px-4 py-3 bg-[#FAF6F0]/40 border border-[#E1D3C1]/40 rounded-xl text-sm focus:outline-none focus:border-[#F3C33D] focus:bg-white transition-all text-neutral-850"
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="pt-2 flex gap-3">
                    <button
                      type="submit"
                      className="flex-grow bg-gradient-to-r from-[#F3C33D] to-[#F3C33D] hover:from-[#E5B22D] hover:to-[#D4A528] text-white text-xs font-bold tracking-[0.2em] py-3.5 rounded-full transition-all duration-300 uppercase cursor-pointer shadow-sm shadow-[#F3C33D]/25 active:scale-[0.98]"
                    >
                      {editingId ? "✓ Save Changes" : "+ Create Service"}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={clearForms}
                        className="bg-[#FAF6F0] border border-[#E1D3C1]/50 hover:bg-neutral-100 text-neutral-600 px-6 py-3.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* List - Right Column */}
              <div className="lg:col-span-7 bg-white border border-[#E1D3C1]/40 rounded-[28px] p-6 sm:p-7 shadow-[0_12px_40px_rgba(70,55,40,0.03)] space-y-4">
                {/* Header with Title, Search, and Grid/List View Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E1D3C1]/30 pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3C33D] font-bold block mb-0.5 flex items-center gap-1.5">
                      <span className="text-[#F3C33D] text-xs font-bold">✦</span>
                      <span>CMS DATABASE</span>
                    </span>
                    <h2 className="font-serif text-2xl text-[#252A24] font-normal uppercase tracking-wider">
                      Existing Services ({services.filter((s) => !adminServiceSearch.trim() || s.name.toLowerCase().includes(adminServiceSearch.toLowerCase()) || s.description.toLowerCase().includes(adminServiceSearch.toLowerCase())).length}{services.filter((s) => !adminServiceSearch.trim() || s.name.toLowerCase().includes(adminServiceSearch.toLowerCase()) || s.description.toLowerCase().includes(adminServiceSearch.toLowerCase())).length !== services.length ? ` / ${services.length}` : ""})
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="relative w-full sm:w-56">
                      <input
                        type="text"
                        value={adminServiceSearch}
                        onChange={(e) => setAdminServiceSearch(e.target.value)}
                        placeholder="Search services..."
                        className="w-full pl-8 pr-7 py-1.5 bg-[#FAF6F0]/60 border border-[#E1D3C1]/40 rounded-xl text-xs focus:outline-none focus:border-[#F3C33D] transition-colors"
                      />
                      <svg className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {adminServiceSearch && (
                        <button
                          type="button"
                          onClick={() => setAdminServiceSearch("")}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs font-bold cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center bg-[#FAF6F0] p-0.5 rounded-xl border border-[#E1D3C1]/40">
                      <button
                        type="button"
                        title="Grid View"
                        onClick={() => setServiceViewMode("grid")}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                          serviceViewMode === "grid"
                            ? "bg-white text-[#F3C33D] shadow-sm font-bold"
                            : "text-neutral-450 hover:text-neutral-700"
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        title="List View"
                        onClick={() => setServiceViewMode("list")}
                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                          serviceViewMode === "list"
                            ? "bg-white text-[#F3C33D] shadow-sm font-bold"
                            : "text-neutral-450 hover:text-neutral-700"
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bounded Scrollable Container */}
                <div className="max-h-[580px] overflow-y-auto scrollbar-thin pr-1">
                  {serviceViewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services
                        .filter((s) => !adminServiceSearch.trim() || s.name.toLowerCase().includes(adminServiceSearch.toLowerCase()) || s.description.toLowerCase().includes(adminServiceSearch.toLowerCase()))
                        .map((s) => (
                          <div
                            key={s.id}
                            className={`group relative flex flex-col justify-between p-3 rounded-2xl border transition-all duration-300 ${
                              editingId === s.id
                                ? "bg-amber-50/70 border-[#F3C33D] shadow-md ring-2 ring-[#F3C33D]/20"
                                : "bg-[#FAF6F0]/40 border-[#E1D3C1]/30 hover:bg-white hover:border-[#F3C33D]/50 hover:shadow-[0_8px_20px_rgba(70,55,40,0.05)]"
                            }`}
                          >
                            <div>
                              {/* Top Image & Badge */}
                              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100 border border-[#E1D3C1]/30 mb-2">
                                {s.image ? (
                                  <Image
                                    src={s.image}
                                    alt={s.name}
                                    fill
                                    unoptimized
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-[#F5EDE0]">
                                    <span className="text-[#F3C33D] text-sm font-bold">{s.name?.charAt(0) || "?"}</span>
                                  </div>
                                )}
                                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                                  <span className="px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-sm text-white text-[9px] font-mono tracking-wider">
                                    #{s.id}
                                  </span>
                                  {editingId === s.id && (
                                    <span className="px-2 py-0.5 rounded-md bg-[#F3C33D] text-white text-[9px] font-bold tracking-wider uppercase animate-pulse">
                                      Editing
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Title & Description */}
                              <h4 className="font-serif text-[15px] text-[#252A24] font-semibold truncate group-hover:text-[#F3C33D] transition-colors" title={s.name}>
                                {s.name}
                              </h4>
                              <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed mt-1 font-light" title={s.description}>
                                {s.description}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1.5 pt-2.5 mt-2 border-t border-[#E1D3C1]/20 justify-end">
                              <button
                                type="button"
                                onClick={() => handleStartEditService(s)}
                                className="bg-white border border-[#E1D3C1]/50 hover:bg-[#F3C33D] hover:text-white hover:border-[#F3C33D] text-[#F3C33D] px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteItem(s.id, "services")}
                                className="bg-red-50 hover:bg-red-500 hover:text-white text-red-600 border border-red-100 px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider uppercase transition-all cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    /* List View */
                    <div className="space-y-2.5">
                      {services
                        .filter((s) => !adminServiceSearch.trim() || s.name.toLowerCase().includes(adminServiceSearch.toLowerCase()) || s.description.toLowerCase().includes(adminServiceSearch.toLowerCase()))
                        .map((s) => (
                          <div
                            key={s.id}
                            className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-300 gap-3 group ${
                              editingId === s.id
                                ? "bg-amber-50/70 border-[#F3C33D] shadow-md ring-2 ring-[#F3C33D]/20"
                                : "bg-[#FAF6F0]/40 border-[#E1D3C1]/30 hover:bg-white hover:border-[#F3C33D]/50 hover:shadow-sm"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-grow">
                              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-[#E1D3C1]/30">
                                {s.image ? (
                                  <Image
                                    src={s.image}
                                    alt={s.name}
                                    fill
                                    unoptimized
                                    className="object-cover object-center group-hover:scale-105 transition-transform"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-[#F5EDE0]">
                                    <span className="text-[#F3C33D] text-xs font-bold">{s.name?.charAt(0) || "?"}</span>
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 flex-grow">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="text-[8.5px] font-mono bg-[#F3C33D]/10 text-[#F3C33D] px-1.5 py-0.5 rounded font-semibold">
                                    #{s.id}
                                  </span>
                                  {editingId === s.id && (
                                    <span className="text-[8.5px] uppercase font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                                      Editing
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-serif text-sm text-[#252A24] font-semibold truncate group-hover:text-[#F3C33D] transition-colors">
                                  {s.name}
                                </h4>
                                <span className="text-[10.5px] text-neutral-450 block truncate max-w-sm font-light">
                                  {s.description}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <button
                                type="button"
                                onClick={() => handleStartEditService(s)}
                                className="bg-white border border-[#E1D3C1]/50 hover:bg-[#F3C33D] hover:text-white hover:border-[#F3C33D] text-[#F3C33D] px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteItem(s.id, "services")}
                                className="bg-red-50 hover:bg-red-500 hover:text-white text-red-600 border border-red-100 px-2.5 py-1 rounded-lg text-[9.5px] font-bold tracking-wider uppercase transition-all cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {services.filter((s) => !adminServiceSearch.trim() || s.name.toLowerCase().includes(adminServiceSearch.toLowerCase()) || s.description.toLowerCase().includes(adminServiceSearch.toLowerCase())).length === 0 && (
                    <div className="py-14 text-center text-neutral-400 text-xs">
                      No services found matching &quot;{adminServiceSearch}&quot;.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TESTIMONIALS MANAGER */}
          {activeTab === "testimonials" && (
            <div className="max-w-4xl mx-auto w-full bg-white border border-[#E1D3C1]/40 rounded-[32px] p-6 sm:p-8 shadow-[0_12px_40px_rgba(70,55,40,0.03)] space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3C33D] font-bold block mb-1">
                  CMS DATABASE
                </span>
                <h2 className="font-serif text-2xl text-[#252A24] font-normal uppercase tracking-wider">
                  Existing Testimonials ({testimonials.length})
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Control which client reviews are displayed on the live website. Click status to toggle between Displaying and Hidden.
                </p>
              </div>

              <div className="space-y-4">
                {testimonials.map((t) => {
                  const isDisplaying = t.approved === 1 || t.approved === true || t.approved === "1";
                  return (
                    <div key={t.id} className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-4 bg-[#FAF6F0]/40 border border-[#E1D3C1]/20 rounded-2xl gap-4">
                      <div className="flex items-center gap-4 min-w-0 flex-grow">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-50 flex-shrink-0 border border-[#E1D3C1]/30">
                          {t.image ? (
                            <Image src={t.image} alt={t.name} fill unoptimized className="object-cover object-center" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#F5EDE0]">
                              <span className="text-[#F3C33D] text-xs font-bold">{t.name?.charAt(0) || "?"}</span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-grow">
                          <h4 className="font-serif text-base text-[#252A24] font-semibold truncate">{t.name}</h4>
                          <span className="text-[10px] text-neutral-400 block truncate">{t.role}</span>
                          {t.quote && (
                            <p className="text-xs text-neutral-600 line-clamp-1 italic mt-1">&quot;{t.quote}&quot;</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pt-3 sm:pt-0 justify-end border-t sm:border-t-0 border-[#E1D3C1]/20">
                        <button
                          onClick={() => handleToggleApprove(t.id)}
                          title={isDisplaying ? "Click to Hide review from public website" : "Click to Display review on public website"}
                          className={`px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all border cursor-pointer shadow-sm ${
                            isDisplaying
                              ? "bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                              : "bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200"
                          }`}
                        >
                          {isDisplaying ? "✓ DISPLAYING" : "⌛ HIDDEN"}
                        </button>
                        <button
                          onClick={() => handleDeleteItem(t.id, "testimonials")}
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-3.5 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS MANAGER */}
          {activeTab === "settings" && (
            <div className="max-w-md mx-auto bg-white border border-[#E1D3C1]/40 rounded-[32px] p-6 sm:p-8 shadow-[0_12px_40px_rgba(70,55,40,0.03)] space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3C33D] font-bold block mb-1">
                  SECURITY & CREDENTIALS
                </span>
                <h2 className="font-serif text-2xl text-[#252A24] font-normal">
                  Configure Credentials
                </h2>
                <p className="text-neutral-500 text-xs font-light mt-1">
                  Update the login username and password used to authenticate your administrator portal.
                </p>
              </div>

              <div className="bg-[#FAF6F0]/70 border border-[#E1D3C1]/50 rounded-2xl p-3.5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[9.5px] uppercase font-bold tracking-wider text-neutral-400 block">Current Active Username</span>
                  <span className="font-semibold text-neutral-800 font-mono text-sm">{savedUsername}</span>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#F3C33D]/20 text-[#D59318]">Active</span>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4" autoComplete="off">
                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-1.5 font-semibold">
                    Portal Username
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsUser}
                    onChange={(e) => setSettingsUser(e.target.value)}
                    placeholder="Enter new username"
                    className="w-full px-4 py-3 bg-[#FAF6F0]/40 border border-[#E1D3C1]/30 rounded-xl text-sm focus:outline-none focus:border-[#F3C33D] transition-colors text-neutral-850"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-1.5 font-semibold">
                    New Portal Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={settingsPass}
                      onChange={(e) => setSettingsPass(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full pl-4 pr-12 py-3 bg-[#FAF6F0]/40 border border-[#E1D3C1]/30 rounded-xl text-sm focus:outline-none focus:border-[#F3C33D] transition-colors text-neutral-850"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer select-none focus:outline-none"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-neutral-400 tracking-wider mb-1.5 font-semibold">
                    Confirm New Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    value={confirmSettingsPass}
                    onChange={(e) => setConfirmSettingsPass(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-4 py-3 bg-[#FAF6F0]/40 border border-[#E1D3C1]/30 rounded-xl text-sm focus:outline-none focus:border-[#F3C33D] transition-colors text-neutral-850"
                  />
                  {confirmSettingsPass && settingsPass !== confirmSettingsPass && (
                    <p className="text-[11px] text-red-500 mt-1">Passwords do not match.</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#F3C33D] hover:bg-[#E5B22D] text-white text-xs font-bold tracking-[0.2em] py-3.5 rounded-full transition-all duration-300 uppercase cursor-pointer shadow-md"
                  >
                    Save Credentials
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>

    </main>
  );
}
