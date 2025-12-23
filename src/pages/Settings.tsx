import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTranslation } from "react-i18next";
import { Languages, User, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "next-themes";

export default function Settings() {
    const { user, signOut } = useAuth();
    const { t, i18n } = useTranslation();
    const { theme, setTheme } = useTheme();

    return (
        <div className="p-6 space-y-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">{t("settings")}</h1>

            {/* Profile Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary border-2 border-primary">
                            {user?.email?.[0].toUpperCase()}
                        </div>
                        <div>
                            <p className="font-medium text-lg">User</p>
                            <p className="text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Appearance Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        Appearance
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Theme</p>
                            <p className="text-sm text-muted-foreground">Select your preferred theme</p>
                        </div>
                        <ThemeToggle />
                    </div>
                </CardContent>
            </Card>

            {/* Language Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Languages className="h-5 w-5" />
                        Language
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Display Language</p>
                            <p className="text-sm text-muted-foreground">Choose between English and Hindi</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")}
                            className="min-w-[100px]"
                        >
                            {i18n.language === "en" ? "Hindi (हिंदी)" : "English"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Account Actions */}
            <div className="flex justify-end">
                <Button variant="destructive" onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
