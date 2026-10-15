const { Jimp } = require('./frontend/node_modules/jimp');
const path = require('path');

const inputPath = path.join(__dirname, 'frontend', 'public', 'spark-logo-v2.png');
const outputPath = path.join(__dirname, 'frontend', 'public', 'spark-logo-transparent.png');

async function removeWhiteBackground() {
  console.log('Loading image from:', inputPath);
  const image = await Jimp.read(inputPath);

  const width = image.bitmap.width;
  const height = image.bitmap.height;
  console.log(`Image size: ${width}x${height}`);

  // Tolerance for "near-white" pixels
  const TOLERANCE = 35;

  image.scan(0, 0, width, height, function (x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];

    // Make near-white pixels transparent
    if (r > 255 - TOLERANCE && g > 255 - TOLERANCE && b > 255 - TOLERANCE) {
      this.bitmap.data[idx + 3] = 0;
    }
  });

  await image.writeAsync(outputPath);
  console.log('Done! Saved to:', outputPath);
}

removeWhiteBackground().catch(e => console.error('Error:', e.message));
