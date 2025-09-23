import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  CheckSquare,
  History,
  AlertTriangle,
  Truck
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/collector/dashboard", icon: LayoutDashboard },
  { title: "Tasks", url: "/collector/tasks", icon: CheckSquare },
  { title: "Route", url: "/collector/route", icon: MapPin },
  { title: "History", url: "/collector/history", icon: History },
  { title: "Report Issue", url: "/collector/report-issue", icon: AlertTriangle },
];

export function CollectorSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"}>
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Truck className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-foreground">Eco-Waste</h2>
              <p className="text-xs text-muted-foreground">Collector</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11">
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                          isActive
                            ? "bg-gradient-primary text-white shadow-elegant border-0"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/70 hover:shadow-md"
                        }`
                      }
                    >
                      <item.icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                        isActive(item.url) ? "text-white" : "group-hover:scale-110"
                      }`} />
                      {!collapsed && (
                        <span className="font-medium tracking-wide">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}