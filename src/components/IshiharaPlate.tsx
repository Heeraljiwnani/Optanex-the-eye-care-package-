import React, { useState, useEffect } from "react";

type IshiharaPlateProps = {
  size?: number;
  totalDots?: number;
  onTestComplete?: (results: { number: string; guess: string; correct: boolean }) => void;
};

const randomInRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateDots = (
  count: number,
  size: number,
  minR: number,
  maxR: number,
  colors: string[]
) => {
  const dots = [];
  for (let i = 0; i < count; i++) {
    const x = randomInRange(0, size);
    const y = randomInRange(0, size);
    const r = randomInRange(minR, maxR);
    const fill = colors[Math.floor(Math.random() * colors.length)];
    dots.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" />`);
  }
  return dots.join("");
};

const IshiharaPlate: React.FC<IshiharaPlateProps> = ({
  size = 300,
  totalDots = 1200,
  onTestComplete,
}) => {
  const [svgContent, setSvgContent] = useState("");
  const [number, setNumber] = useState("");
  const [guess, setGuess] = useState("");

  useEffect(() => {
    const generatedNumber = randomInt(1, 99).toString();

    const backgroundDots = generateDots(
      totalDots,
      size,
      2,
      8,
      ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#a6cee3", "#b2df8a"]
    );

    const numberDots = generateDots(
      Math.floor(totalDots * 0.7),
      size,
      3,
      9,
      ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]
    );

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <defs>
          <text id="numberText" x="50%" y="50%" text-anchor="middle" dy=".35em"
            font-size="${size / 2}" font-family="sans-serif" font-weight="bold">${generatedNumber}</text>
          <clipPath id="numberClip">
            <use href="#numberText" />
          </clipPath>
        </defs>

        <g>${backgroundDots}</g>

        <g clip-path="url(#numberClip)">${numberDots}</g>
      </svg>
    `;

    setSvgContent(svg);
    setNumber(generatedNumber);
  }, [size, totalDots]);

  const handleSubmit = () => {
    const correct = guess === number;
    if (onTestComplete) {
      onTestComplete({ number, guess, correct });
    }
    alert(correct ? "✅ Correct!" : `❌ Wrong. It was ${number}`);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      <input
        type="text"
        placeholder="Enter the number you see"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default IshiharaPlate;
