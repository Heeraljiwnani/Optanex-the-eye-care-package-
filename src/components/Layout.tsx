import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Menu, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { SplashScreen } from "@/components/SplashScreen";
import { AuthDialog } from "@/components/AuthDialog";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
interface LayoutProps {
  children: React.ReactNode;
}
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Languages } from "lucide-react";
export function Layout({ children }: LayoutProps) {
  const { i18n } = useTranslation();
  const { user, loading, signOut } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  

  // While loading, show splash screen
  if (loading) {
    return <SplashScreen />;
  }


  return (
    <AnimatePresence mode="wait">
      {user ? (
        <motion.div
          key="logged-in"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen flex w-full bg-background"
        >
          <SidebarProvider>
            <AppSidebar />

            <div className="flex-1 flex flex-col">
              {/* Header */}
              <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
                <div className="flex items-center justify-between h-full px-4">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Menu className="h-5 w-5" />
                    </SidebarTrigger>

                    <div className="flex items-center gap-3">
                      <img src="/fav2-removebg-preview.png" alt="OptaNex Logo" className="w-10 h-8 rounded-lg" />
                      <div>
                        <h1 className="text-lg font-semibold text-foreground">
                          OptaNex
                        </h1>
                        <p className="text-xs text-muted-foreground">
                          Complete Eye Care
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Button
  variant="outline"
  size="sm"
  onClick={() =>
    i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")
  }
  className="flex items-center gap-2"
>
  <Languages className="h-4 w-4" />
  {i18n.language === "en" ? "हिंदी" : "EN"}
</Button>

                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        {user.email}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={signOut}
                      className="ml-2"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </header>

              {/* Main Content */}
         {/* Main Content */}
<main className="flex-1 overflow-auto">
  {children}
</main>

{/* Footer */}
<Footer />

            </div>
          </SidebarProvider>
        </motion.div>
      ) : (
        <motion.div
          key="logged-out"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"
        >
          <div className="text-center space-y-8 max-w-md mx-auto p-8">
            <div className="space-y-4">
              <img src="/fav2-removebg-preview.png" alt="OptaNex Logo" className="w-8 h-8 mx-auto rounded-lg" />
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  OptaNex
                </h1>
                <p className="text-lg text-muted-foreground">
                  Complete Eye Care Companion
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                Track your eye health, monitor screen time, and protect your
                vision with our comprehensive suite of tools.
              </p>

              <Button
                onClick={() => setAuthDialogOpen(true)}
                className="w-full gap-2"
                size="lg"
              >
                <User className="h-5 w-5" />
                Get Started
              </Button>
            </div>
          </div>

          <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
        </motion.div>
      )}
    </AnimatePresence>
    
  );
}
