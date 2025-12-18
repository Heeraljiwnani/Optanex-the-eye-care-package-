import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {ImageUploadDialog} from "@/components/ImageUploadDialog";
import { SnellenTestDialog } from "@/components/SnellenTestDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import {
  Eye,
  Brain,
  Palette,
  Target,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react";

import IshiharaPlate from "@/components/IshiharaPlate";

const screeningTests = [
  {
    id: "diabetic-retinopathy",
    title: "Diabetic Retinopathy",
    description: "AI-powered screening for diabetic eye complications",
    icon: Eye,
    color: "bg-[hsl(var(--optitrack))]",
    symptoms: [
      "Blurred or fluctuating vision",
      "Dark spots or floaters",
      "Difficulty seeing at night",
      "Vision loss",
      "Colors appearing faded"
    ],
    duration: "3-5 minutes",
    accuracy: "95%"
  },
  {
    id: "macular-degeneration",
    title: "Age-Related Macular Degeneration",
    description: "Early detection of macular degeneration",
    icon: Eye,
    color: "bg-[hsl(var(--prescripttracker))]",
    symptoms: [
      "Central vision becomes blurry",
      "Straight lines appear wavy",
      "Difficulty recognizing faces",
      "Need for brighter light when reading",
      "Decreased color intensity"
    ],
    duration: "4-6 minutes",
    accuracy: "92%"
  },
  {
    id: "color-blindness",
    title: "Color Blindness Test",
    description: "Comprehensive color vision assessment",
    icon: Palette,
    color: "bg-[hsl(var(--colorblindness))]",
    symptoms: [
      "Difficulty distinguishing colors",
      "Problems with red and green",
      "Trouble seeing in dim light",
      "Colors appear less vibrant",
      "Confusion with traffic lights"
    ],
    duration: "2-3 minutes",
    accuracy: "98%"
  },
  {
    id: "snellen-test",
    title: "Snellen Visual Acuity",
    description: "Standard visual acuity measurement",
    icon: Target,
    color: "bg-[hsl(var(--snellentest))]",
    symptoms: [
      "Blurry vision at distance",
      "Squinting to see clearly",
      "Eye strain and headaches",
      "Difficulty reading signs",
      "Need to sit closer to TV"
    ],
    duration: "1-2 minutes",
    accuracy: "99%"
  }
];

export default function Optiscreen() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [showSymptoms, setShowSymptoms] = useState<string | null>(null);
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showSnellenDialog, setShowSnellenDialog] = useState(false);
  const [showIshiharaPlate, setShowIshiharaPlate] = useState(false);
  
  const [currentTestType, setCurrentTestType] = useState<string>("");

  const handleTestClick = (testId: string) => {
    setShowSymptoms(testId);
  };

  const handleStartTest = (testId: string) => {
    // For diabetic retinopathy and macular degeneration, show image upload dialog
    if (testId === "diabetic-retinopathy" || testId === "macular-degeneration") {
      setCurrentTestType(testId);
      setShowUploadDialog(true);
    } else if (testId === "snellen-test") {
      setShowSnellenDialog(true);
    } else if (testId === "color-blindness") {
      setShowIshiharaPlate(true);
    } else {
      console.log(`Starting test: ${testId}`);
    }
  };

  const selectedTestData = screeningTests.find(test => test.id === showSymptoms);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
    
  <div className="text-left space-y-1">
    <h1 className="text-4xl font-bold text-foreground flex items-center gap-2">
      <Link to="/" >
        Dashboard
      </Link>

      <span className="text-muted-foreground">›</span>

      <span className="text-gradient-head">
        OptiScreen
      </span>
    </h1>

    <p className="text-lg text-muted-foreground max-w-2xl">
      AI-powered eye screening tests
    </p>
  </div>



      {/* Tests Grid */}
      {!showSymptoms && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {screeningTests.map((test) => (
            <Card 
              key={test.id} 
              className="group hover:shadow-custom-lg transition-all duration-300 cursor-pointer border-0  bg-[hsl(var(--gradient-card))] "
              onClick={() => handleTestClick(test.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 ${test.color} rounded-xl flex items-center justify-center`}>
                    <test.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {test.duration}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      <Zap className="w-3 h-3 mr-1" />
                      {test.accuracy}
                    </Badge>
                  </div>
                </div>
                <CardTitle
  className="
    text-xl
    text-black
    transition-all duration-300 ease-out
    group-hover:text-gray-400 dark:group-hover:text-gray-500

    group-hover:drop-shadow-[0_1px_3px_rgba(0,0,0,0.15)]
  "
>
  {test.title}
</CardTitle>



              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4">{test.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>FDA Approved Algorithm</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-black  group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Symptoms and Test Details */}
      {showSymptoms && selectedTestData && (
        <div className="max-w-4xl mx-auto space-y-6">
          <Button 
            variant="ghost" 
            onClick={() => setShowSymptoms(null)}
            className="mb-4"
          >
            ← Back to Tests
          </Button>
          
          <Card className="bg-gradient-card border-0 shadow-custom-lg">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${selectedTestData.color} rounded-xl flex items-center justify-center`}>
                  <selectedTestData.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{selectedTestData.title}</CardTitle>
                  <p className="text-muted-foreground">{selectedTestData.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-warning" />
                    Common Symptoms
                  </h3>
                  <ul className="space-y-3">
                    {selectedTestData.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Test Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{selectedTestData.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Accuracy:</span>
                        <span className="font-medium">{selectedTestData.accuracy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Method:</span>
                        <span className="font-medium">AI Analysis</span>
                      </div>
                    </div>
                  </div>
                  
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-black dark:text-white mb-2">Before Starting</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Ensure good lighting conditions</li>
                        <li>• Clean your camera lens</li>
                        <li>• Follow on-screen instructions carefully</li>
                        <li>• Keep your device stable</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4 border-t">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleStartTest(selectedTestData.id)}
                >
                  Start Test Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => setShowSymptoms(null)}
                >
                  Choose Different Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Image Upload Dialog */}
      <ImageUploadDialog
        isOpen={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
        testType={currentTestType}
        testTitle={screeningTests.find(test => test.id === currentTestType)?.title || ""}
      />

      {/* Snellen Test Dialog */}
      <SnellenTestDialog
        isOpen={showSnellenDialog}
        onClose={() => setShowSnellenDialog(false)}
      />

      {/* Ishihara Test */}
      {showIshiharaPlate && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <div className="flex justify-end mb-4">
              <Button 
                variant="outline" 
                onClick={() => setShowIshiharaPlate(false)}
                className="mb-4"
              >
                Close Test
              </Button>
            </div>
            <IshiharaPlate onTestComplete={(results) => {
              console.log("Ishihara test results:", results);
              // Here you could save results to database
            }} />
          </div>
        </div>
      )}

      {/* Information Banner */}
      <Card className="bg-warning/5 border-warning/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Important Medical Disclaimer</h3>
              <p className="text-sm text-muted-foreground">
                These screening tools are for preliminary assessment only and do not replace professional medical examination. 
                Please consult with an eye care professional for comprehensive diagnosis and treatment recommendations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}