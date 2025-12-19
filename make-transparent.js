import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const faviconFiles = ['favicon-16x16.png', 'favicon-32x32.png', 'favicon.ico'];

async function makeTransparent(inputPath, outputPath) {
  try {
    // Create a mask where white areas become transparent
    const mask = await sharp(inputPath)
      .negate() // Invert colors: white becomes black
      .threshold(1) // Make near-black white, keep black black
      .toBuffer();

    // Composite the original image with the mask to make white areas transparent
    const outputBuffer = await sharp(inputPath)
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();

    await fs.promises.writeFile(outputPath, outputBuffer);

    console.log(`Processed ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function processFavicons() {
  for (const file of faviconFiles) {
    const inputPath = path.join(publicDir, file);
    const outputPath = path.join(publicDir, file); // Overwrite

    if (fs.existsSync(inputPath)) {
      await makeTransparent(inputPath, outputPath);
    } else {
      console.log(`File not found: ${inputPath}`);
    }
  }
}

processFavicons();