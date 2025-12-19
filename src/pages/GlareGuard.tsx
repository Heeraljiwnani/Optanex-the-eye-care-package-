import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Shield,
  Monitor,
  Eye,
  Settings,
  AlertTriangle
} from "lucide-react";

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

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground flex items-center gap-2">
          <Link to="/">{t("dashboard")}</Link>
          <span className="text-muted-foreground">›</span>
          <span className="text-gradient-head">{t("glareguard")}</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {t("glareguard_subtitle")}
        </p>

        {isActive && (
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success">{t("active_monitoring")}</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Screen Time */}
        <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-black">{t("today_screen_time")}</p>
              <p className="text-3xl font-bold text-black">{formattedTime}</p>
              <Progress value={Math.min((todayTotal / 480) * 100, 100)} className="h-2 mt-2" />
              <p className="text-xs text-black mt-1">
                {todayTotal > 480
                  ? t("exceeded_recommended")
                  : t("minutes_remaining", { minutes: Math.round(480 - todayTotal) })}
              </p>
            </div>
            <Monitor className={`h-6 w-6 ${getScreenTimeColor(todayTotal)}`} />
          </CardContent>
        </Card>

        {/* Blue Light */}
        <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-black">{t("blue_light_level")}</p>
              <p className={`text-3xl font-bold ${getBlueLightColor(blueLightLevel)}`}>
                {blueLightLevel}
              </p>
              <Badge className="mt-2">
                {blueLightLevel === "High"
                  ? t("take_action")
                  : blueLightLevel === "Medium"
                  ? t("monitor")
                  : t("good")}
              </Badge>
            </div>
            <Eye className={`h-6 w-6 ${getBlueLightColor(blueLightLevel)}`} />
          </CardContent>
        </Card>

        {/* Protection Score */}
        <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-black">{t("protection_score")}</p>
              <p className={`text-3xl font-bold ${getProtectionColor(protectionScore)}`}>
                {protectionScore}%
              </p>
              <Progress value={protectionScore} className="h-2 mt-2" />
            </div>
            <Shield className={`h-6 w-6 ${getProtectionColor(protectionScore)}`} />
          </CardContent>
        </Card>
      </div>

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
            <Switch checked={blueFilterEnabled} onCheckedChange={toggleBlueFilter} />
          </div>

          <div className="flex justify-between">
            <div>
              <p className="font-medium text-black">{t("break_reminders")}</p>
              <p className="text-sm text-muted-foreground">
                {t("break_reminders_desc")}
              </p>
            </div>
            <Switch checked={breakRemindersEnabled} onCheckedChange={toggleBreakReminders} />
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
