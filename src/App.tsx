import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import { BlinkingLoader } from "@/components/ui/BlinkingLoader";

// Helper for artificial delay to show loader
const lazyWithDelay = (
  factory: () => Promise<{ default: React.ComponentType<any> }>
) => {
  return lazy(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return factory();
  });
};

// Lazy load pages with delay
const Dashboard = lazyWithDelay(() => import("@/pages/Dashboard"));
const Optiscreen = lazyWithDelay(() => import("@/pages/Optiscreen"));
const Optitrack = lazyWithDelay(() => import("@/pages/Optitrack"));
const PrescriptTracker = lazyWithDelay(() => import("@/pages/PrescriptTracker"));
const EyeChronicle = lazyWithDelay(() => import("@/pages/EyeChronicle"));
const GlareGuard = lazyWithDelay(() => import("@/pages/GlareGuard"));
const Auth = lazyWithDelay(() => import("@/pages/Auth"));
const About = lazyWithDelay(() => import("@/pages/About"));
const FAQ = lazyWithDelay(() => import("@/pages/FAQ"));
const PrivacyPolicy = lazyWithDelay(() => import("@/pages/PrivacyPolicy"));
const NotFound = lazyWithDelay(() => import("@/pages/NotFound"));
const Settings = lazyWithDelay(() => import("@/pages/Settings"));


const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <Layout>
                  <Suspense fallback={
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-md">
                      <BlinkingLoader text="Loading..." />
                    </div>
                  }>
                    <Outlet />
                  </Suspense>
                </Layout>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/optiscreen" element={<Optiscreen />} />
              <Route path="/optitrack" element={<Optitrack />} />
              <Route path="/prescripttracker" element={<PrescriptTracker />} />
              <Route path="/eyechronicle" element={<EyeChronicle />} />
              <Route path="/glareguard" element={<GlareGuard />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/auth" element={
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center bg-background">
                  <BlinkingLoader text="Loading..." />
                </div>
              }>
                <Auth />
              </Suspense>
            } />
          </Routes>
          {/* <PWAInstallPrompt /> */}
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
