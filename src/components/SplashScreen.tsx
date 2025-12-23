import { BlinkingLoader } from "@/components/ui/BlinkingLoader";

export function SplashScreen() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <BlinkingLoader text="Loading OptaNex..." />
    </div>
  );
}