const sharp = require('./node_modules/sharp');
const path = require('path');

async function renderMockup() {
  const logoPath = path.resolve(__dirname, 'public/spark-logo-transparent.png');
  const logo = await sharp(logoPath)
    .resize(70, 70)
    .toBuffer();

  const width = 1200;
  const height = 180;

  const bgSvg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Section under navbar -->
      <rect x="0" y="85" width="${width}" height="95" fill="#0A0F1D"/>
      
      <!-- Navbar Bar in Midnight Petrol Navy -->
      <rect x="0" y="0" width="${width}" height="85" fill="#021A26"/>
      <line x1="0" y1="85" x2="${width}" y2="85" stroke="#F3C33D" stroke-width="1" stroke-opacity="0.25"/>
      
      <!-- Logo Typography -->
      <text x="130" y="47" font-family="'Georgia', serif" font-size="22" font-weight="bold" fill="#F3C33D" letter-spacing="2">SPARK</text>
      <text x="130" y="63" font-family="'Arial', sans-serif" font-size="10" font-weight="bold" fill="#E2E8F0" letter-spacing="3.5">INTERIORS</text>
      
      <!-- Navigation Links -->
      <g font-family="'Arial', sans-serif" font-size="13.5" font-weight="500" fill="#E2E8F0" letter-spacing="0.6">
        <text x="540" y="48">Home</text>
        <text x="620" y="48">About</text>
        <text x="700" y="48">Projects</text>
        <text x="795" y="48">Services</text>
        <text x="890" y="48">Contact</text>
      </g>
      
      <!-- Gold Quote Button -->
      <defs>
        <linearGradient id="btnG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F3C33D"/>
          <stop offset="100%" stop-color="#D59318"/>
        </linearGradient>
      </defs>
      <rect x="990" y="22" width="150" height="42" rx="21" fill="url(#btnG)"/>
      <text x="1026" y="48" font-family="'Arial', sans-serif" font-size="13" font-weight="bold" fill="#021C28" letter-spacing="0.5">Get a Quote</text>
    </svg>
  `);

  await sharp(bgSvg)
    .composite([
      { input: logo, top: 8, left: 45 }
    ])
    .png()
    .toFile(path.resolve(__dirname, 'public/navbar-preview-new.png'));

  console.log('navbar-preview-new.png rendered successfully!');
}

renderMockup();
