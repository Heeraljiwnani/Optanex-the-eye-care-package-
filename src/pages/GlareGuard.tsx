import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider"; // Added for new card content
import {
  Shield,
  Monitor,
  Eye,
  Settings,
  AlertTriangle,
  HelpCircle,
  Moon // Added for new card content
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useScreenTime } from "@/hooks/useScreenTime";
import { Link } from "react-router-dom";
import { t } from "i18next";

export default function GlareGuard() {
  const {
    todayTotal,
    blueLightLevel,
    protectionScore,
    formattedTime,
    isActive,
    blueFilterEnabled,
    breakRemindersEnabled,
    toggleBlueFilter,
    toggleBreakReminders
  } = useScreenTime();

  // New state variables for the updated cards
  const [screenTime, setScreenTime] = useState(0); // Example: in seconds
  const [breakInterval, setBreakInterval] = useState(60 * 30); // 30 minutes in seconds
  const [isBlueLightFilterActive, setIsBlueLightFilterActive] = useState(false);
  const [filterIntensity, setFilterIntensity] = useState(50);

  // Simulate screen time accumulation for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setScreenTime(prev => prev + 1); // Increment by 1 second
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getBlueLightColor = (level) => {
    switch (level) {
      case "High": return "text-destructive";
      case "Medium": return "text-warning";
      case "Low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getScreenTimeColor = (minutes) => {
    if (minutes >= 480) return "text-destructive";
    if (minutes >= 300) return "text-warning";
    return "text-success";
  };

  const getProtectionColor = (score) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getRecommendations = () => {
    const recs = [];

    if (todayTotal > 240) recs.push(t("rec_breaks"));
    if (blueLightLevel === "High") recs.push(t("rec_blue_light"));
    if (protectionScore < 60) recs.push(t("rec_brightness"));
    if (new Date().getHours() >= 20) recs.push(t("rec_night_mode"));

    return recs;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="text-left space-y-1">
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-blue-600 transition-colors">{t("dashboard")}</Link>
            <span className="text-muted-foreground">›</span>
            <span className="text-gradient-head">{t("glareguard")}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-0 sm:ml-2 rounded-full hover:bg-primary/10">
                  <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7 text-dashboard" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-0">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gradient-head mb-4">{t("glareguard_help_title")}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {t("glareguard_help_content")}
                </div>
              </DialogContent>
            </Dialog>
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl">{t("glareguard_subtitle")}</p>
        </div>
      </motion.div>
      {isActive && (
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-success">{t("active_monitoring")}</span>
        </div>
      )}

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Screen Time */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Monitor className="h-5 w-5 text-black" />
                {t("screenTimeTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium text-black">{t("dailyScreenTime")}</p>
                  <p className="text-2xl font-bold text-black">{formatTime(screenTime)}</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm font-medium text-black">{t("breakInterval")}</p>
                  <p className="text-2xl font-bold text-secondary">
                    {Math.floor(breakInterval / 60)} {t("minutes")}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-medium mb-3 text-black">{t("todayProgress")}</h4>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${Math.min((screenTime / (8 * 3600)) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{t("recommendedLimit")}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Night Mode / Blue Light Filter */}
        <motion.div variants={itemVariants}>
          <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm h-full flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Moon className="h-5 w-5 text-secondary" />
                {t("nightMode")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-black">{t("blue_light_filter")}</span>
                  <Switch
                    checked={isBlueLightFilterActive}
                    onCheckedChange={setIsBlueLightFilterActive}
                    className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-400 dark:data-[state=unchecked]:bg-gray-700"
                  />
                </div>
                <div className="space-y-2 text-black">
                  <div className="flex justify-between text-sm">
                    <span>{t("intensity")}</span>
                    <span>{filterIntensity}%</span>
                  </div>
                  <Slider
                    value={[filterIntensity]}
                    max={100}
                    step={1}
                    onValueChange={(val) => setFilterIntensity(val[0])}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Original Stats (Blue Light and Protection Score) - Kept for context, but the instruction implies replacement */}
      {/* If the intention was to keep these AND add the new ones, the structure would need adjustment.
          Based on the diff, the new motion.div replaces the original stats grid.
          I'm keeping the original stats cards here for now, but they would be removed if the new motion.div fully replaces them.
          For now, I'll assume the new motion.div is an *addition* or a *replacement* of the first card, and the other two remain.
          Re-reading the instruction: "Replace the existing stats cards with new motion.div and Card structures".
          This means the original three cards should be replaced by the two new motion.divs.
          I will remove the original Blue Light and Protection Score cards.
      */}

      {/* Original Blue Light Card (removed as per instruction) */}
      {/* Original Protection Score Card (removed as per instruction) */}


      {/* Settings */}
      <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
        <CardHeader>
          <CardTitle className="flex gap-2 text-black">
            <Settings className="h-5 w-5" />
            {t("protection_settings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="font-medium text-black">{t("blue_light_filter")}</p>
              <p className="text-sm text-muted-foreground">
                {t("blue_light_filter_desc")}
              </p>
            </div>
            <Switch
              checked={blueFilterEnabled}
              onCheckedChange={toggleBlueFilter}
              className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-400 dark:data-[state=unchecked]:bg-gray-700"
            />
          </div>

          <div className="flex justify-between">
            <div>
              <p className="font-medium text-black">{t("break_reminders")}</p>
              <p className="text-sm text-muted-foreground">
                {t("break_reminders_desc")}
              </p>
            </div>
            <Switch
              checked={breakRemindersEnabled}
              onCheckedChange={toggleBreakReminders}
              className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-400 dark:data-[state=unchecked]:bg-gray-700"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-0 shadow-custom-sm bg-warning/5">
        <CardContent className="p-6 flex gap-4">
          <AlertTriangle className="h-5 w-5 text-warning mt-1" />
          <div>
            <h3 className="font-semibold mb-2">
              {t("protection_tips")}
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {getRecommendations().length
                ? getRecommendations().map((r, i) => <li key={i}>• {r}</li>)
                : (
                  <>
                    <li>• {t("default_tip_1")}</li>
                    <li>• {t("default_tip_2")}</li>
                    <li>• {t("default_tip_3")}</li>
                    <li>• {t("default_tip_4")}</li>
                  </>
                )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
