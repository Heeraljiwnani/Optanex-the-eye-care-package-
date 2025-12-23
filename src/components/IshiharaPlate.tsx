import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, ArrowRight, RefreshCw } from "lucide-react";

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
  const [result, setResult] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const generatePlate = useCallback(() => {
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
    setResult('idle');
    setGuess("");
  }, [size, totalDots]);

  useEffect(() => {
    generatePlate();
  }, [generatePlate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess) return;

    const isCorrect = guess.trim() === number;
    setResult(isCorrect ? 'correct' : 'incorrect');

    if (onTestComplete) {
      onTestComplete({ number, guess, correct: isCorrect });
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-card/50 backdrop-blur-sm border-2">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-between">
          <span>What number do you see?</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={generatePlate}
            title="Regenerate Test"
            className="h-8 w-8"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div
          dangerouslySetInnerHTML={{ __html: svgContent }}
          className="rounded-full overflow-hidden shadow-inner bg-white/10"
        />

        {result === 'idle' ? (
          <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-[250px]">
            <Input
              type="text"
              pattern="[0-9]*"
              maxLength={2}
              placeholder="00"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              className="text-center font-bold text-lg"
              autoFocus
            />
            <Button type="submit">Submit</Button>
          </form>
        ) : (
          <div className="flex flex-col items-center space-y-4 animate-in fade-in slide-in-from-bottom-2 w-full">
            {result === 'correct' ? (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-500 font-bold text-xl p-4 bg-green-50 dark:bg-green-950/30 rounded-lg w-full justify-center">
                <CheckCircle className="w-6 h-6" />
                <span>Correct!</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1 text-destructive font-bold text-xl p-4 bg-destructive/10 rounded-lg w-full">
                <div className="flex items-center gap-2">
                  <XCircle className="w-6 h-6" />
                  <span>Incorrect</span>
                </div>
                <span className="text-base font-normal text-muted-foreground">The number was {number}</span>
              </div>
            )}

            <Button onClick={generatePlate} className="gap-2 w-full max-w-[200px]" variant="default">
              Next Test <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IshiharaPlate;
