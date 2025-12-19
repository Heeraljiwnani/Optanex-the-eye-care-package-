import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceImage = path.join(__dirname, 'public', 'favicon-source.png');

// Sizes to generate
const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'android-chrome-48x48.png', maskable: true },
  { size: 72, name: 'android-chrome-72x72.png', maskable: true },
  { size: 96, name: 'android-chrome-96x96.png', maskable: true },
  { size: 128, name: 'android-chrome-128x128.png', maskable: true },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png', maskable: true },
  { size: 256, name: 'android-chrome-256x256.png', maskable: true },
  { size: 512, name: 'android-chrome-512x512.png', maskable: true }
];

async function generateRoundedFavicon(size, outputPath) {
  const radius = Math.floor(size / 2);

  // Create mask
  const maskSvg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>
  `;

  const maskBuffer = Buffer.from(maskSvg);
  const mask = await sharp(maskBuffer).png().toBuffer();

  // Resize and apply mask
  const rounded = await sharp(sourceImage)
    .resize(size, size)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await fs.promises.writeFile(outputPath, rounded);
  console.log(`Generated ${outputPath}`);
}

async function generateFavicons() {
  for (const { size, name } of sizes) {
    const outputPath = path.join(__dirname, 'public', name);
    await generateRoundedFavicon(size, outputPath);
  }

  // Also generate favicon.ico from 32x32
  const icoBuffer = await sharp(sourceImage)
    .resize(32, 32)
    .png()
    .toBuffer();

  const icoPath = path.join(__dirname, 'public', 'favicon.ico');
  await fs.promises.writeFile(icoPath, icoBuffer);
  console.log(`Generated ${icoPath}`);
}

generateFavicons().catch(console.error);