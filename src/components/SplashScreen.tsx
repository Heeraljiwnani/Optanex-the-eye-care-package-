import { Eye, Activity, Shield, BarChart3 } from "lucide-react";

export function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        {/* Logo and Branding */}
        <div className="space-y-4">
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center shadow-custom-lg animate-pulse">
              <Eye className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full animate-bounce">
              <Activity className="h-4 w-4 text-white m-1" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              OptaNex
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete Eye Care Companion
            </p>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-3 gap-4 py-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Screen</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-secondary" />
            </div>
            <span className="text-xs text-muted-foreground">Track</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <span className="text-xs text-muted-foreground">Protect</span>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">
            Initializing your eye care journey...
          </p>
        </div>
      </div>
    </div>
  );
}