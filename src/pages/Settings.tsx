import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTranslation } from "react-i18next";
import { Languages, User, Moon, Sun, LogOut, ShieldCheck, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
    const { user, signOut } = useAuth();
    const { t, i18n } = useTranslation();
    const { theme, setTheme } = useTheme();
    const { toast } = useToast();
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("user_id", user.id)
                .single();

            if (data) {
                setProfile(data);
            }
            setIsLoading(false);
        };

        fetchProfile();
    }, [user]);

    const handleToggleConsent = async (field: string, value: boolean) => {
        if (!user || isUpdating) return;
        setIsUpdating(true);

        const { error } = await supabase
            .from("profiles")
            .update({ [field]: value })
            .eq("user_id", user.id);

        if (error) {
            toast({
                title: "Update failed",
                description: "There was an error updating your preferences.",
                variant: "destructive"
            });
        } else {
            setProfile(prev => ({ ...prev, [field]: value }));
            toast({
                title: "Preferences updated",
                description: "Your privacy settings have been saved."
            });
        }
        setIsUpdating(false);
    };

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
                            <p className="font-medium text-lg">{profile?.full_name || "User"}</p>
                            <p className="text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Privacy Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5" />
                        Privacy & Consent
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    ) : (
                        <>
                            <div className="flex items-start space-x-3">
                                <Checkbox
                                    id="training-consent"
                                    checked={profile?.training_consent}
                                    onCheckedChange={(checked) =>
                                        handleToggleConsent("training_consent", checked as boolean)
                                    }
                                    disabled={isUpdating}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor="training-consent" className="font-medium cursor-pointer">
                                        Consent for AI training
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Allow your uploaded retinal images to be used for future AI model training.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <Checkbox
                                    id="management-consent"
                                    checked={profile?.management_consent}
                                    onCheckedChange={(checked) =>
                                        handleToggleConsent("management_consent", checked as boolean)
                                    }
                                    disabled={isUpdating}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor="management-consent" className="font-medium cursor-pointer">
                                        Consent for data management
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Allow OptaNex to securely store your eye health records and screening results.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
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
