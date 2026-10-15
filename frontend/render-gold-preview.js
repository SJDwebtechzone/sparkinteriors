const fs = require('fs');
const path = require('path');
const sharp = require('./node_modules/sharp');

const svg = `
<svg width="860" height="660" viewBox="0 0 860 660" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#07121B"/>
  
  <text x="50" y="55" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="24" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">
    SPARK INTERIORS — LOGO 'S' COLOR SPECTRUM ANALYSIS
  </text>
  <text x="50" y="85" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13.5" fill="#94A3B8">
    Programmatic pixel extraction from the letter 'S' in your uploaded official 1024x1024 logo
  </text>

  <!-- Color Swatches Row -->
  <g transform="translate(50, 120)">
    <!-- Swatch 1: Highlight -->
    <rect x="0" y="0" width="135" height="105" rx="10" fill="#FEF193" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.3"/>
    <text x="12" y="130" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">1. Shimmer Glint</text>
    <text x="12" y="148" font-family="monospace" font-size="13" font-weight="bold" fill="#FEF193">#FEF193</text>
    <text x="12" y="165" font-family="Arial, sans-serif" font-size="11" fill="#94A3B8">Specular 90% peak</text>

    <!-- Swatch 2: Radiant Gold -->
    <rect x="155" y="0" width="135" height="105" rx="10" fill="#F3C33D" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.2"/>
    <text x="167" y="130" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">2. Core 24K Gold</text>
    <text x="167" y="148" font-family="monospace" font-size="13" font-weight="bold" fill="#F3C33D">#F3C33D</text>
    <text x="167" y="165" font-family="Arial, sans-serif" font-size="11" fill="#94A3B8">Median body (50%)</text>

    <!-- Swatch 3: Rich Body Gold -->
    <rect x="310" y="0" width="135" height="105" rx="10" fill="#E6A820" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.2"/>
    <text x="322" y="130" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">3. Radiant Gold</text>
    <text x="322" y="148" font-family="monospace" font-size="13" font-weight="bold" fill="#E6A820">#E6A820</text>
    <text x="322" y="165" font-family="Arial, sans-serif" font-size="11" fill="#94A3B8">Primary brand tone</text>

    <!-- Swatch 4: Solid Contrast Gold -->
    <rect x="465" y="0" width="135" height="105" rx="10" fill="#D59318" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.2"/>
    <text x="477" y="130" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">4. Solid Rich Gold</text>
    <text x="477" y="148" font-family="monospace" font-size="13" font-weight="bold" fill="#D59318">#D59318</text>
    <text x="477" y="165" font-family="Arial, sans-serif" font-size="11" fill="#94A3B8">Solid buttons &amp; text</text>

    <!-- Swatch 5: Shadow Contour -->
    <rect x="620" y="0" width="135" height="105" rx="10" fill="#C9820E" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.2"/>
    <text x="632" y="130" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">5. Deep Shadow</text>
    <text x="632" y="148" font-family="monospace" font-size="13" font-weight="bold" fill="#C9820E">#C9820E</text>
    <text x="632" y="165" font-family="Arial, sans-serif" font-size="11" fill="#94A3B8">Hover &amp; bevel edges</text>
  </g>

  <!-- Gradient Demonstration -->
  <defs>
    <linearGradient id="metallicGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FEF193"/>
      <stop offset="25%" stop-color="#F3C33D"/>
      <stop offset="60%" stop-color="#E6A820"/>
      <stop offset="85%" stop-color="#D59318"/>
      <stop offset="100%" stop-color="#C9820E"/>
    </linearGradient>
    <linearGradient id="btnGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F3C33D"/>
      <stop offset="100%" stop-color="#C9820E"/>
    </linearGradient>
  </defs>

  <g transform="translate(50, 320)">
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#FFFFFF">
      Continuum of the Monogram "S" (Replicating 3D Bevel &amp; Sheen)
    </text>
    <rect x="0" y="15" width="755" height="42" rx="8" fill="url(#metallicGoldGradient)"/>
  </g>

  <!-- UI Component Demonstrations -->
  <g transform="translate(50, 425)">
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#FFFFFF">
      Real Component Application (Buttons, Badges, Typography)
    </text>

    <!-- Light Theme Card -->
    <rect x="0" y="20" width="365" height="165" rx="14" fill="#FAF7F2" stroke="#E2D8CC" stroke-width="1.5"/>
    <text x="25" y="55" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#1C1C1C">Light Theme Canvas</text>
    <text x="25" y="80" font-family="Arial, sans-serif" font-size="11.5" font-weight="700" fill="#C9820E" letter-spacing="1.5">✦ BESPOKE INTERIORS</text>
    
    <!-- CTA Button on Light -->
    <rect x="25" y="105" width="160" height="44" rx="22" fill="url(#btnGoldGrad)"/>
    <text x="56" y="132" font-family="Arial, sans-serif" font-size="12" font-weight="800" fill="#141414" letter-spacing="0.5">GET A QUOTE →</text>

    <rect x="200" y="105" width="140" height="44" rx="22" fill="#D59318"/>
    <text x="238" y="132" font-family="Arial, sans-serif" font-size="12" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">EXPLORE</text>

    <!-- Logo Navy Theme Card -->
    <rect x="390" y="20" width="365" height="165" rx="14" fill="#012839" stroke="#04415C" stroke-width="1.5"/>
    <text x="415" y="55" font-family="Georgia, serif" font-size="18" font-weight="bold" fill="#FFFFFF">Official Navy Canvas</text>
    <text x="415" y="80" font-family="Arial, sans-serif" font-size="11.5" font-weight="700" fill="#F3C33D" letter-spacing="1.5">✦ LUXURY LIVING RESIDENCES</text>

    <!-- CTA Button on Dark -->
    <rect x="415" y="105" width="160" height="44" rx="22" fill="url(#btnGoldGrad)"/>
    <text x="446" y="132" font-family="Arial, sans-serif" font-size="12" font-weight="800" fill="#141414" letter-spacing="0.5">GET A QUOTE →</text>

    <rect x="590" y="105" width="140" height="44" rx="22" fill="none" stroke="#F3C33D" stroke-width="1.8"/>
    <text x="630" y="132" font-family="Arial, sans-serif" font-size="12" font-weight="800" fill="#F3C33D" letter-spacing="0.5">EXPLORE</text>
  </g>
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.resolve(__dirname, 'public/gold-analysis-preview.png'))
  .then(() => {
    console.log('gold-analysis-preview.png rendered successfully!');
  })
  .catch(err => {
    console.error(err);
  });
