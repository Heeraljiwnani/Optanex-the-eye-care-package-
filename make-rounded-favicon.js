import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of favicon files to process
const faviconFiles = [
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png'
];

async function makeRoundedFavicon(inputPath, outputPath, size) {
  try {
    // Calculate radius as size / 4 for rounded corners
    const radius = Math.floor(size / 4);

    // Create a rounded rectangle mask as SVG
    const maskSvg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
      </svg>
    `;

    // Convert SVG to buffer
    const maskBuffer = Buffer.from(maskSvg);

    // Load the mask as image
    const mask = await sharp(maskBuffer)
      .png()
      .toBuffer();

    // Apply the mask to the favicon
    const roundedFavicon = await sharp(inputPath)
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();

    // Write to output
    await fs.promises.writeFile(outputPath, roundedFavicon);

    console.log(`Rounded favicon created at ${outputPath}`);
  } catch (error) {
    console.error(`Error creating rounded favicon for ${inputPath}:`, error);
  }
}

async function processAllFavicons() {
  for (const file of faviconFiles) {
    const inputPath = path.join(__dirname, 'public', file);
    const outputPath = path.join(__dirname, 'public', file);

    // Get image size
    const metadata = await sharp(inputPath).metadata();
    const size = metadata.width; // Assuming square

    await makeRoundedFavicon(inputPath, outputPath, size);
  }
}

processAllFavicons();