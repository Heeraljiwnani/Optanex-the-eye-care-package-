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
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Optiscreen", url: "/optiscreen", icon: Scan },
  { title: "Optitrack", url: "/optitrack", icon: BarChart3 },
  { title: "PrescriptTracker", url: "/prescripttracker", icon: FileImage },
  { title: "EyeChronicle", url: "/eyechronicle", icon: History },
  { title: "GlareGuard", url: "/glareguard", icon: Shield },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = (active: boolean) =>
    active 
      ? " text-primary-foreground font-medium shadow-custom-sm" 
      : "hover:bg-muted/70 transition-colors";

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-border`}>
      <SidebarContent className="bg-card">
        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? "sr-only" : ""} text-muted-foreground font-medium`}>
            Eye Care Suite
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavCls(isActive(item.url))} rounded-lg p-3 flex items-center gap-3 transition-all duration-200`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="text-sm font-medium">{item.title}</span>
                      )}
                    </NavLink>
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