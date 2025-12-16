import { useState, useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Target, Eye, CheckCircle, AlertCircle, RotateCcw } from "lucide-react";
import { useToast } from "../hooks/use-toast";


interface SnellenTestDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// Snellen chart letters for different line sizes (20/200 to 20/20)
const snellenLines = [
  { size: "20/200", letters: ["E"], fontSize: "text-8xl", distance: "6m" },
  { size: "20/100", letters: ["F", "P"], fontSize: "text-7xl", distance: "6m" },
  { size: "20/70", letters: ["T", "O", "Z"], fontSize: "text-6xl", distance: "6m" },
  { size: "20/50", letters: ["L", "P", "E", "D"], fontSize: "text-5xl", distance: "6m" },
  { size: "20/40", letters: ["F", "E", "D", "F", "C"], fontSize: "text-4xl", distance: "6m" },
  { size: "20/30", letters: ["F", "P", "T", "O", "Z"], fontSize: "text-3xl", distance: "6m" },
  { size: "20/25", letters: ["D", "F", "P", "O", "T", "E", "C"], fontSize: "text-2xl", distance: "6m" },
  { size: "20/20", letters: ["F", "E", "L", "O", "P", "Z", "D"], fontSize: "text-xl", distance: "6m" }
];

export function SnellenTestDialog({ isOpen, onClose }: SnellenTestDialogProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [results, setResults] = useState<{ line: number; correct: number; total: number }[]>([]);
  const [testComplete, setTestComplete] = useState(false);
  const [finalAcuity, setFinalAcuity] = useState("");
  const [testStarted, setTestStarted] = useState(false);
  const { toast } = useToast();

  const currentSnellenLine = snellenLines[currentLine];
  const currentDisplayLetter = currentSnellenLine?.letters[currentLetter];
  const progress = ((currentLine * 5 + currentLetter + 1) / (snellenLines.length * 5)) * 100;

  const resetTest = useCallback(() => {
    setCurrentLine(0);
    setCurrentLetter(0);
    setUserInput("");
    setResults([]);
    setTestComplete(false);
    setFinalAcuity("");
    setTestStarted(false);
  }, []);

  const calculateAcuity = useCallback((results: { line: number; correct: number; total: number }[]) => {
    // Find the smallest line where user got at least 50% correct
    for (let i = results.length - 1; i >= 0; i--) {
      const accuracy = results[i].correct / results[i].total;
      if (accuracy >= 0.5) {
        return snellenLines[results[i].line].size;
      }
    }
    // If no line has 50% accuracy, return the largest size
    return snellenLines[0].size;
  }, []);

  const handleLetterSubmit = useCallback(() => {
    if (!userInput.trim()) return;

    const isCorrect = userInput.toUpperCase() === currentDisplayLetter?.toUpperCase();
    
    // Update results for current line
    const updatedResults = [...results];
    const lineResult = updatedResults.find(r => r.line === currentLine);
    
    if (lineResult) {
      lineResult.total += 1;
      if (isCorrect) lineResult.correct += 1;
    } else {
      updatedResults.push({
        line: currentLine,
        correct: isCorrect ? 1 : 0,
        total: 1
      });
    }
    
    setResults(updatedResults);
    setUserInput("");

    // Move to next letter or line
    if (currentLetter < currentSnellenLine.letters.length - 1) {
      setCurrentLetter(currentLetter + 1);
    } else {
      // Check if user got at least 50% correct on this line
      const lineAccuracy = updatedResults.find(r => r.line === currentLine);
      const accuracy = lineAccuracy ? lineAccuracy.correct / lineAccuracy.total : 0;
      
      if (accuracy < 0.5 || currentLine === snellenLines.length - 1) {
        // Test complete - either failed this line or reached the end
        const acuity = calculateAcuity(updatedResults);
        setFinalAcuity(acuity);
        setTestComplete(true);
        
        toast({
          title: "Snellen Test Complete",
          description: `Your visual acuity is ${acuity}`,
        });
      } else {
        // Move to next line
        setCurrentLine(currentLine + 1);
        setCurrentLetter(0);
      }
    }
  }, [userInput, currentDisplayLetter, currentLine, currentLetter, currentSnellenLine, results, calculateAcuity, toast]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter' && userInput.trim()) {
      handleLetterSubmit();
    }
  }, [handleLetterSubmit, userInput]);

  useEffect(() => {
    if (testStarted && !testComplete) {
      document.addEventListener('keypress', handleKeyPress);
      return () => document.removeEventListener('keypress', handleKeyPress);
    }
  }, [handleKeyPress, testStarted, testComplete]);

  const handleClose = () => {
    resetTest();
    onClose();
  };

  const getAccuracyDescription = (acuity: string) => {
    switch (acuity) {
      case "20/20": return "Excellent - Normal vision";
      case "20/25": return "Very Good - Slight blur at distance";
      case "20/30": return "Good - May need glasses for distance";
      case "20/40": return "Fair - Should consider eye exam";
      case "20/50": 
      case "20/70": return "Poor - Eye examination recommended";
      default: return "Significant vision impairment - See eye doctor";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Snellen Visual Acuity Test
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Instructions */}
          {!testStarted && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-primary mb-4">Test Instructions</h4>
                <div className="space-y-3 text-sm">
                  <p className="flex items-start gap-2">
                    <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Position yourself 6 feet (2 meters) away from your screen
                  </p>
                  <p className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Cover one eye and read the letters shown
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    Type each letter you see and press Enter
                  </p>
                  <p className="text-muted-foreground">
                    The test will start with large letters and progressively get smaller.
                  </p>
                </div>
                <Button 
                  onClick={() => setTestStarted(true)} 
                  className="w-full mt-4"
                  size="lg"
                >
                  Start Snellen Test
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Test in Progress */}
          {testStarted && !testComplete && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Line {currentLine + 1} of {snellenLines.length} - {currentSnellenLine.size}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Letter {currentLetter + 1} of {currentSnellenLine.letters.length}
                  </span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>

              {/* Letter Display */}
              <Card className="bg-background border-2">
                <CardContent className="p-8 sm:p-16 text-center">
                  <div className="min-h-[200px] flex items-center justify-center">
                    <span className={`font-mono font-bold ${currentSnellenLine.fontSize} text-foreground`}>
                      {currentDisplayLetter}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Input */}
              <div className="space-y-4">
                <div className="text-center">
                  <label className="block text-sm font-medium mb-2">
                    What letter do you see? (Type and press Enter)
                  </label>
                  <div className="flex gap-2 max-w-xs mx-auto">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value.slice(0, 1))}
                      className="flex-1 px-4 py-2 text-lg text-center border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Type letter"
                      maxLength={1}
                      autoFocus
                    />
                    <Button 
                      onClick={handleLetterSubmit}
                      disabled={!userInput.trim()}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Test Complete */}
          {testComplete && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Test Complete!</h3>
                <p className="text-muted-foreground">
                  Your Snellen visual acuity has been measured.
                </p>
              </div>

              {/* Results */}
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Visual Acuity Results</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                      <div>
                        <h5 className="font-medium text-lg">Visual Acuity</h5>
                        <p className="text-3xl font-bold text-primary">{finalAcuity}</p>
                      </div>
                      <div className="text-right">
                        <h5 className="font-medium text-sm text-muted-foreground">Assessment</h5>
                        <p className="text-lg font-semibold">{getAccuracyDescription(finalAcuity)}</p>
                      </div>
                    </div>
                    
                    <div className="bg-background p-4 rounded-lg border">
                      <h5 className="font-medium mb-3">Line by Line Results</h5>
                      <div className="space-y-2">
                        {results.map((result, index) => {
                          const accuracy = (result.correct / result.total) * 100;
                          return (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                {snellenLines[result.line].size}:
                              </span>
                              <span className="font-medium">
                                {result.correct}/{result.total} ({accuracy.toFixed(0)}%)
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Eye className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-primary mb-1">Recommendations</h5>
                          <p className="text-sm text-muted-foreground">
                            {finalAcuity === "20/20" || finalAcuity === "20/25" 
                              ? "Excellent vision! Continue regular eye checkups."
                              : "Consider scheduling an eye examination for a comprehensive evaluation and potential corrective measures."
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button onClick={handleClose}>
                  View Dashboard
                </Button>
                <Button variant="outline" onClick={resetTest}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Take Test Again
                </Button>
              </div>
            </div>
          )}

          {/* Warning */}
          <Card className="bg-warning/5 border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-warning mb-1">Medical Disclaimer</h4>
                  <p className="text-sm text-muted-foreground">
                    This is a basic visual acuity screening and does not replace a comprehensive eye examination.
                    Results may vary based on screen size, lighting, and distance. Consult an eye care professional for accurate diagnosis.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}