import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Menu, LogOut, User, Settings, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { SplashScreen } from "@/components/SplashScreen";
import { AuthDialog } from "@/components/AuthDialog";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { ChatbotButton } from "@/components/ChatbotButton";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t, i18n } = useTranslation();
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
          className="min-h-screen flex w-full bg-background relative"
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

                    <div className="flex items-center gap-2 sm:gap-3">
                      <img src="/optanex-logo.png" alt="OptaNex Logo" className="w-8 h-6 sm:w-10 sm:h-8 rounded-lg" />
                      <div className="hidden xs:block">
                        <h1 className="text-base sm:text-lg font-semibold text-foreground leading-tight">
                          OptaNex
                        </h1>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">
                          Complete Eye Care
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <ThemeToggle />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")
                      }
                      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 text-white dark:text-white"
                    >
                      <Languages className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                      <span className="text-xs sm:text-sm">{i18n.language === "en" ? "हिंदी" : "EN"}</span>
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground border border-gray-500/50 rounded-full px-2 sm:px-4 py-1 sm:py-1.5 bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                          <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="max-w-[100px] sm:max-w-[150px] truncate hidden xs:inline-block">{user.email}</span>
                          <ChevronDown className="h-3 w-3 opacity-50" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={() => window.location.href = '/settings'}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>{t("settings")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400" onClick={signOut}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
          <ChatbotButton />
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
          <div className="text-center space-y-6 sm:space-y-8 max-w-md mx-auto p-4 sm:p-8">
            <div className="space-y-3 sm:space-y-4">
              <img src="/optanex-logo.png" alt="OptaNex Logo" className="w-8 h-8 mx-auto rounded-lg" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  OptaNex
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                  Complete Eye Care Companion
                </p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                Track your eye health, monitor screen time, and protect your
                vision with our comprehensive suite of tools.
              </p>

              <Button
                onClick={() => setAuthDialogOpen(true)}
                className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
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
