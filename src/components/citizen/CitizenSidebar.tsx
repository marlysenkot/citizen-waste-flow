import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  ShoppingCart,
  MessageSquare,
  Plus,
  User,
  Recycle,
  Trash2,
  Package,
  AlertTriangle,
  MapPin,
  BarChart3,
  Settings,
  HelpCircle,
  Leaf
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
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/citizen/dashboard", 
    icon: LayoutDashboard,
    description: "Overview & analytics"
  },
  { 
    title: "Orders", 
    url: "/citizen/orders", 
    icon: Package,
    description: "Purchase history",
    badge: 3
  },
  { 
    title: "Collections", 
    url: "/citizen/collections", 
    icon: Trash2,
    description: "Waste pickups",
    badge: 2
  },
  { 
    title: "Complaints", 
    url: "/citizen/complaints", 
    icon: AlertTriangle,
    description: "Issues & feedback",
    badge: 1
  },
  { 
    title: "New Complaint", 
    url: "/citizen/complaints/new", 
    icon: Plus,
    description: "Report an issue",
    variant: "accent" as const
  },
  { 
    title: "Products", 
    url: "/citizen/products", 
    icon: ShoppingCart,
    description: "Eco-friendly items"
  },
  { 
    title: "Profile", 
    url: "/citizen/profile", 
    icon: User,
    description: "Account settings"
  },
];

const supportItems = [
  {
    title: "Help Center",
    url: "/citizen/help",
    icon: HelpCircle,
    description: "Get assistance"
  },
  {
    title: "Settings",
    url: "/citizen/settings",
    icon: Settings,
    description: "Preferences"
  }
];

export function CitizenSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar 
      className={cn(
        "bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-r border-slate-700/50 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <SidebarHeader className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-white text-lg tracking-tight">EcoWaste</h2>
              <p className="text-xs text-green-400 font-medium bg-green-500/10 px-2 py-1 rounded-full w-fit">
                Citizen Portal
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isItemActive = isActive(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-12">
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 px-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden",
                            "hover:shadow-lg hover:scale-[1.02]",
                            isActive
                              ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-white shadow-lg border border-green-500/30"
                              : "text-slate-400 hover:text-white hover:bg-slate-700/50",
                            item.variant === "accent" && "bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30"
                          )
                        }
                      >
                        {/* Active indicator */}
                        {isItemActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-emerald-400 rounded-r-full" />
                        )}
                        
                        <div className={cn(
                          "p-2 rounded-lg transition-all duration-300",
                          isItemActive 
                            ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg" 
                            : "bg-slate-700/50 group-hover:bg-slate-600/50",
                          item.variant === "accent" && "bg-gradient-to-br from-orange-500 to-red-500"
                        )}>
                          <Icon className="w-4 h-4 flex-shrink-0" />
                        </div>
                        
                        {!collapsed && (
                          <div className="flex-1 min-w-0 flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <span className="font-medium tracking-wide block truncate">
                                {item.title}
                              </span>
                              <span className="text-xs text-slate-500 block truncate">
                                {item.description}
                              </span>
                            </div>
                            
                            {/* Badge */}
                            {item.badge && item.badge > 0 && (
                              <Badge 
                                variant={isItemActive ? "secondary" : "default"}
                                className={cn(
                                  "ml-2 h-5 min-w-[20px] flex items-center justify-center text-xs",
                                  isItemActive 
                                    ? "bg-white/20 text-white" 
                                    : "bg-green-500/20 text-green-400"
                                )}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support Section */}
        {!collapsed && (
          <SidebarGroup className="mt-8">
            <SidebarGroupContent>
              <div className="px-3 mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Support
                </span>
              </div>
              <SidebarMenu className="space-y-1">
                {supportItems.map((item) => {
                  const Icon = item.icon;
                  const isItemActive = isActive(item.url);
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className="h-11">
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-3 px-3 rounded-lg text-sm transition-all duration-300 group",
                              "hover:bg-slate-700/30 hover:text-white",
                              isActive && "bg-slate-700/50 text-white border border-slate-600"
                            )
                          }
                        >
                          <Icon className="w-4 h-4 flex-shrink-0 text-slate-400" />
                          <span className="font-medium tracking-wide flex-1">
                            {item.title}
                          </span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Quick Stats (Visible when expanded) */}
        {!collapsed && (
          <div className="mt-8 mx-3 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-white">Quick Stats</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Collections</span>
                <span className="text-green-400 font-semibold">5/10</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Orders</span>
                <span className="text-blue-400 font-semibold">3</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Points</span>
                <span className="text-yellow-400 font-semibold">1,250</span>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed View Badges */}
        {collapsed && (
          <div className="mt-4 space-y-2">
            {navigationItems.slice(1, 4).map((item) => (
              item.badge && item.badge > 0 && (
                <div key={item.title} className="relative flex justify-center">
                  <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-green-500 border-2 border-slate-900">
                    {item.badge}
                  </Badge>
                </div>
              )
            ))}
          </div>
        )}
      </SidebarContent>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-700/50 mt-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Leaf className="w-3 h-3 text-green-400" />
            <span>Making cities cleaner</span>
          </div>
          <div className="text-[10px] text-slate-600 mt-1">
            EcoWaste v1.0.0
          </div>
        </div>
      )}
    </Sidebar>
  );
}