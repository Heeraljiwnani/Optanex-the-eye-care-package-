import { useState } from "react";
import { 
  Eye, 
  BarChart3, 
  FileImage, 
  History, 
  Shield, 
  Home,
  Scan,
  Calendar,
  Upload,
  Clock,
  Monitor
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { t } from "i18next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

const menuItems = [
  { title: t("dashboard"), url: "/", icon: Home },
  { title: t("optiscreen"), url: "/optiscreen", icon: Scan },
  { title:t("optitrack"), url: "/optitrack", icon: BarChart3 },
  { title: t("prescripttracker"), url: "/prescripttracker", icon: FileImage },
  { title: t("eyechronical"), url: "/eyechronicle", icon: History },
  { title: t("glareguard"), url: "/glareguard", icon: Shield },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = (active: boolean) =>
    active
      ? "text-foreground font-semibold"
      : "text-muted-foreground hover:text-foreground";
  
  
  

  return (
    <Sidebar
    collapsible="icon"
    className="border-r border-border"
  >
  
  <SidebarContent className="bg-card flex flex-col h-full">

        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? "sr-only" : ""} text-muted-foreground font-medium`}>
            Eye Care Suite
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                  <TooltipProvider delayDuration={0}>
  <Tooltip>
    <TooltipTrigger asChild>
    <NavLink
        to={item.url}
        className={`${getNavCls(isActive(item.url))} rounded-lg p-3 flex items-center gap-3`}
      >
{isActive(item.url) && (
  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-[linear-gradient(135deg,hsl(210_100%_50%),hsl(225_69%_73%))]" />
)}
<item.icon
  className="
    h-5 w-5 flex-shrink-0
    text-[hsl(var(--icon-glow-blue))]
    drop-shadow-[0_0_6px_hsl(var(--icon-glow-blue))]
    drop-shadow-[0_0_14px_hsl(var(--icon-glow-blue)/0.8)]
    transition-all duration-200
  "
/>



  {!collapsed && (
    <span
  className={`
    text-sm font-medium transition-all duration-200
    ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
  `}
>
  {item.title}
</span>
  )}
  
</NavLink>
</TooltipTrigger>
{collapsed && (
      <TooltipContent side="right" className="text-sm">
        {item.title}
      </TooltipContent>
    )}
      </Tooltip>
      </TooltipProvider>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">DPDP Act 2023 Compliant</p>
              <div className="flex items-center justify-center gap-1">
                <Shield className="h-3 w-3 text-success" />
                <span className="text-xs text-success font-medium">Secure & Private</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}