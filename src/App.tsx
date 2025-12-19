import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Optiscreen from "@/pages/Optiscreen";
import Optitrack from "@/pages/Optitrack";
import PrescriptTracker from "@/pages/PrescriptTracker";
import EyeChronicle from "@/pages/EyeChronicle";
import GlareGuard from "@/pages/GlareGuard";
import Auth from "@/pages/Auth";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import NotFound from "@/pages/NotFound";
import { ThemeProvider } from "next-themes";


const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/optiscreen"
            element={
              <Layout>
                <Optiscreen />
              </Layout>
            }
          />
          <Route
            path="/optitrack"
            element={
              <Layout>
                <Optitrack />
              </Layout>
            }
          />
          <Route
            path="/prescripttracker"
            element={
              <Layout>
                <PrescriptTracker />
              </Layout>
            }
          />
          <Route
            path="/eyechronicle"
            element={
              <Layout>
                <EyeChronicle />
              </Layout>
            }
          />
          <Route
            path="/glareguard" // fixed typo: was "galrguard"
            element={
              <Layout>
                <GlareGuard />
              </Layout>
            }
          />
          <Route
            path="/privacy"
            element={
              <Layout>
                <PrivacyPolicy />
              </Layout>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <PWAInstallPrompt /> */}
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
  </ThemeProvider>
);

export default App;
