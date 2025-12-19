import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Scan,
  BarChart3,
  FileImage,
  History,
  Shield,
  ArrowRight,
  Activity,
  Users,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";




export default function Dashboard() {
  const { t } = useTranslation();
  const features = [
    {
      title:  t("optiscreen"),
      description:  t("optisdecsription"),
      icon: Scan,
      href: "/optiscreen",
      color: "bg-[hsl(var(--optiscreen))]",
      stats: t("feat1stat"),
    },
    {
      title:  t("optitrack"),
      description:  t("optitdescription"),
      icon: BarChart3,
      href: "/optitrack",
      color: "bg-[hsl(var(--optitrack))]",
      stats: t("feat2stat"),
    },
    {
      title:  t("prescripttracker"),
      description: t("prescriptdescription"),
      icon: FileImage,
      href: "/prescripttracker",
      color: "bg-[hsl(var(--prescripttracker))]",
      stats: t("feat3stat"),
    },
    {
      title:  t("eyechronical"),
      description:t("eyechronicaldescription"),
      icon: History,
      href: "/eyechronicle",
      color: "bg-[hsl(var(--eyechronical))]",
      stats: t("feat4stat"),
    },
    {
      title:t("glaredescription"),
      description: "Blue light exposure tracking",
      icon: Shield,
      href: "/glareguard",
      color: "bg-[hsl(var(--glareguard))]",
      stats: t("feat5stat"),
    }
  ];
  const { user } = useAuth();
  const [stats, setStats] = useState({
    lastCheckup: "No data",
    eyePower: "No data", 
    healthScore: "No data"
  });

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
      setupRealtimeSubscription();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      // Fetch latest eye power record
      const { data: eyePowerData } = await supabase
        .from('eye_power_records')
        .select('*')
        .eq('user_id', user?.id)
        .order('checkup_date', { ascending: false })
        .limit(1);

      // Get last checkup date in same format as Optitrack
      const getLastCheckupText = () => {
        if (!eyePowerData?.[0]?.checkup_date) return "No checkups yet";

        const checkupDate = new Date(eyePowerData[0].checkup_date);
        return format(checkupDate, "MMM dd, yyyy");
      };

      // Fetch screening results for health score
      const { data: screeningData } = await supabase
        .from('screening_results')
        .select('*')
        .eq('user_id', user?.id)
        .order('test_date', { ascending: false })
        .limit(1);

      setStats({
        lastCheckup: getLastCheckupText(),
        eyePower: eyePowerData?.[0] ? 
          `${eyePowerData[0].left_eye_power || 0} / ${eyePowerData[0].right_eye_power || 0} D` : "No data",
        healthScore: screeningData?.[0]?.risk_level === 'low' ? "95%" : 
                    screeningData?.[0]?.risk_level === 'medium' ? "75%" : 
                    screeningData?.[0]?.risk_level === 'high' ? "45%" : "No data"
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('dashboard-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'eye_power_records', filter: `user_id=eq.${user?.id}` },
        () => fetchDashboardStats()
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'medical_history', filter: `user_id=eq.${user?.id}` },
        () => fetchDashboardStats()
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'screening_results', filter: `user_id=eq.${user?.id}` },
        () => fetchDashboardStats()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const quickStats = [
    { label: t("checkup"), value: stats.lastCheckup, icon: Activity },
    { label: t("eyepower"), value: stats.eyePower, icon: Eye },
    { label:  t("healthscore"), value: stats.healthScore, icon: TrendingUp }
  ];
  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-2 text-white">
  <div
    className="relative z-10 max-w-6xl rounded-2xl p-8 shadow-lg"
    style={{ background: "var(--gradient-hero-box)" }}
  >
    <h1 className="text-4xl font-bold mb-4">{t("welcome")}</h1>
    <p className="text-lg mb-6 opacity-90">
  {t("heroDescription")}
</p>

    <div className="flex gap-4">
    <Button size="lg" variant="secondary" asChild>
      <Link to="/optiscreen">
        {t("startbutton")} <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
    <Button size ="lg" variant="glass" asChild>
    <Link to="/optitrack">
   {  t( "manageCare")} <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
    </div>
  </div>

  {/* Decorative blobs remain outside the box */}
  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
</div>


      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat) => (
          <Card key={stat.label} className=" border-0  bg-[hsl(var(--gradient-card))] shadow-custom-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-black">{stat.label}</p>
                  <p className="text-2xl font-bold text-black">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-primary/15 rounded-lg flex items-center justify-center">
                <stat.icon
  strokeWidth={2.5}
  className="
    h-6 w-6
    text-[#4DA3FF]
    drop-shadow-[0_0_6px_rgba(77,163,255,0.9)]
    drop-shadow-[0_0_16px_rgba(77,163,255,0.7)]
    drop-shadow-[0_0_32px_rgba(77,163,255,0.5)]
  "
/>


</div>



              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6"> {t("featureheading")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="group hover:shadow-custom-lg transition-all duration-300 border-0 bg-[hsl(var(--gradient-card))] text-black
">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                    {feature.stats}
                  </span>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Button  variant="outline" className="w-full text-white " asChild>
                  <Link to={feature.href}>
                   {t( "open" )}{feature.title} <ArrowRight className="ml-2 h-4 w-4 text-white" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Privacy Notice */}
      <Card className="bg-success/5 border-success/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">{t("privacy")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("privacydescription")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}