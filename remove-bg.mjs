import Jimp from "jimp";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputPath = path.join(__dirname, "frontend", "public", "spark-logo-v2.png");
const outputPath = path.join(__dirname, "frontend", "public", "spark-logo-transparent.png");

async function removeWhiteBackground() {
  console.log("Loading image...");
  const image = await Jimp.read(inputPath);

  const width = image.bitmap.width;
  const height = image.bitmap.height;

  console.log(`Image size: ${width}x${height}`);

  // Tolerance for "near-white" pixels (0–255 per channel)
  const TOLERANCE = 40;

  image.scan(0, 0, width, height, function (x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];

    // If pixel is near-white, make it fully transparent
    if (r > 255 - TOLERANCE && g > 255 - TOLERANCE && b > 255 - TOLERANCE) {
      this.bitmap.data[idx + 3] = 0; // alpha = 0
    }
  });

  await image.writeAsync(outputPath);
  console.log("✅ Transparent logo saved to:", outputPath);
}

removeWhiteBackground().catch(console.error);
