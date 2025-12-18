import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Monitor, 
  Clock, 
  Eye, 
  TrendingUp, 
  Activity, 
  Settings, 
  AlertTriangle 
} from "lucide-react";

import { useScreenTime } from "@/hooks/useScreenTime";
import { Link } from "react-router-dom";
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

  const getBlueLightColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };
  const getScreenTimeColor = (minutes: number) => {
    if (minutes >= 480) return "text-destructive"; // > 8 hrs
    if (minutes >= 300) return "text-warning";     // > 5 hrs
    return "text-success";
  };
  
  const getProtectionColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (todayTotal > 240) { // More than 4 hours
      recommendations.push("Consider taking more frequent breaks");
    }
    
    if (blueLightLevel === 'High') {
      recommendations.push("Use blue light filtering glasses or screen filter");
    }
    
    if (protectionScore < 60) {
      recommendations.push("Reduce screen brightness and increase ambient lighting");
    }
    
    const currentHour = new Date().getHours();
    if (currentHour >= 20) {
      recommendations.push("Consider night mode or reducing screen time before bed");
    }
    
    return recommendations;
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground flex items-center gap-2">
               <Link to="/">Dashboard</Link>
               <span className="text-muted-foreground">›</span>
               <span className="text-gradient-head">GlareGuard</span>
             </h1>
             <p className="text-lg text-muted-foreground max-w-2xl" >Monitors and Protects your eye</p>
        {isActive && (
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success">Active monitoring</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black">Today's Screen Time</p>
                <p className="text-3xl font-bold text-black">{formattedTime}</p>
                <div className="mt-2 text-black">
                  <Progress value={Math.min((todayTotal / 480) * 100, 100)} className="h-2" />
                  <p className="text-xs text-black mt-1">
                    {todayTotal > 480 ? 'Exceeded recommended' : `${Math.round(480 - todayTotal)}min remaining`}
                  </p>
                </div>
              </div>
              <Monitor
  className={`h-6 w-6 ${getScreenTimeColor(todayTotal)}`}
/>

            </div>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black">Blue Light Level</p>
                <p className={`text-3xl font-bold ${getBlueLightColor(blueLightLevel)}`}>{blueLightLevel}</p>
                <Badge variant={blueLightLevel === 'High' ? 'destructive' : blueLightLevel === 'Medium' ? 'secondary' : 'outline'} className="mt-2 text-black">
                  {blueLightLevel === 'High' ? 'Take action' : blueLightLevel === 'Medium' ? 'Monitor' : 'Good'}
                </Badge>
              </div>
              <Eye className={`h-6 w-6 ${getBlueLightColor(blueLightLevel).replace('text-', 'text-')}`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black">Protection Score</p>
                <p className={`text-3xl font-bold ${getProtectionColor(protectionScore)}`}>{protectionScore}%</p>
                <div className="mt-2">
                  <Progress 
                    value={protectionScore} 
                    className="h-2" 
                  />
                </div>
              </div>
              <Shield className={`h-6 w-6 ${getProtectionColor(protectionScore).replace('text-', 'text-')}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Protection Settings */}
      <Card className="bg-[hsl(var(--gradient-card))] border-0 shadow-custom-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black">
            <Settings className="h-5 w-5" />
            Protection Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-black">Blue Light Filter</p>
              <p className="text-sm text-muted-foreground">Apply software blue light reduction</p>
            </div>
            <Switch 
              checked={blueFilterEnabled} 
              onCheckedChange={toggleBlueFilter}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-black">Break Reminders</p>
              <p className="text-sm text-muted-foreground">Get notified every 20 minutes</p>
            </div>
            <Switch 
              checked={breakRemindersEnabled} 
              onCheckedChange={toggleBreakReminders}
            />
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Recommendations */}
      <Card className={`border-0 shadow-custom-sm ${
        blueLightLevel === 'High' || protectionScore < 60 
          ? 'bg-destructive/5 border-destructive/20' 
          : 'bg-warning/5 border-warning/20'
      }`}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {blueLightLevel === 'High' || protectionScore < 60 ? (
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-1" />
            ) : (
              <Shield className="h-5 w-5 text-warning flex-shrink-0 mt-1" />
            )}
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                {blueLightLevel === 'High' || protectionScore < 60 
                  ? 'Immediate Action Recommended' 
                  : 'Blue Light Protection Tips'}
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {getRecommendations().length > 0 ? (
                  getRecommendations().map((rec, index) => (
                    <li key={index}>• {rec}</li>
                  ))
                ) : (
                  <>
                    <li>• Take breaks every 20 minutes</li>
                    <li>• Use blue light filtering glasses</li>
                    <li>• Reduce screen brightness in low light</li>
                    <li>• Consider screen filters or apps</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}