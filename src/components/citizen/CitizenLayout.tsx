import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { CitizenSidebar } from "./CitizenSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  User, 
  Settings, 
  Bell, 
  Moon, 
  Sun,
  Search,
  Menu,
  Shield,
  Recycle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function CitizenLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [userProfile, setUserProfile] = useState({
    name: "John Citizen",
    email: "john.citizen@example.com",
    avatar: null
  });

  useEffect(() => {
    // Check for user profile data
    const token = localStorage.getItem("token");
    if (token) {
      // In a real app, you would fetch user profile here
      // For now, we'll use mock data
      const userData = localStorage.getItem("userProfile");
      if (userData) {
        setUserProfile(JSON.parse(userData));
      }
    }
  }, []);

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userProfile");
    sessionStorage.removeItem("token");

    // Redirect to login page
    navigate("/auth/login");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You can add logic to persist dark mode preference
  };

  const getPageTitle = () => {
    const path = location.pathname;
    const titles: { [key: string]: string } = {
      "/citizen/dashboard": "Dashboard Overview",
      "/citizen/orders": "Order Management",
      "/citizen/collections": "Waste Collections",
      "/citizen/complaints": "Complaints & Feedback",
      "/citizen/products": "Eco Products",
      "/citizen/profile": "Profile Settings",
      "/citizen/settings": "Account Settings"
    };
    
    return titles[path] || "Citizen Portal";
  };

  return (
    <SidebarProvider>
      <div className={cn(
        "min-h-screen flex w-full bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 transition-all duration-300",
        isDarkMode ? "dark" : "light"
      )}>
        <CitizenSidebar />
        
        <main className="flex-1 overflow-auto">
          {/* Enhanced Header */}
          <header className="h-16 border-b border-slate-700/50 bg-slate-800/40 backdrop-blur-lg sticky top-0 z-50 transition-all duration-300">
            <div className="flex items-center justify-between px-6 h-full">
              {/* Left side */}
              <div className="flex items-center gap-4">
                <SidebarTrigger className="mr-2 p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200" />
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Recycle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
                      {getPageTitle()}
                    </h1>
                    <p className="text-xs text-slate-500">Citizen Waste Management Portal</p>
                  </div>
                </div>
              </div>

              {/* Center - Search Bar */}
              <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search orders, collections, or help..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:border-green-500 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Right side - Actions */}
              <div className="flex items-center gap-3">
                {/* Dark Mode Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
                >
                  {isDarkMode ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>

                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <Bell className="h-4 w-4" />
                  {notificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notificationsCount}
                    </span>
                  )}
                </Button>

                {/* User Profile Dropdown */}
                <div className="flex items-center space-x-3 ml-2">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-white">{userProfile.name}</p>
                    <p className="text-xs text-slate-400">Citizen</p>
                  </div>
                  
                  <div className="relative group">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
                    >
                      <User className="h-4 w-4 text-white" />
                    </Button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800/95 backdrop-blur-lg border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-2">
                        <div className="px-3 py-2 border-b border-slate-700">
                          <p className="text-sm font-medium text-white">{userProfile.name}</p>
                          <p className="text-xs text-slate-400 truncate">{userProfile.email}</p>
                        </div>
                        
                        <button className="w-full flex items-center px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 rounded-md transition-colors duration-150">
                          <User className="h-4 w-4 mr-2" />
                          Profile Settings
                        </button>
                        
                        <button className="w-full flex items-center px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 rounded-md transition-colors duration-150">
                          <Settings className="h-4 w-4 mr-2" />
                          Account Settings
                        </button>
                        
                        <div className="border-t border-slate-700 mt-1 pt-1">
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 rounded-md transition-colors duration-150"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white hover:bg-slate-700/50"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </header>
          
          {/* Main Content Area */}
          <div className="p-6">
            <Outlet />
          </div>

          {/* Enhanced Footer */}
          <footer className="border-t border-slate-700/50 bg-slate-800/40 backdrop-blur-lg mt-8">
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <Recycle className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-slate-400">EcoWaste Management System</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <span>© 2024 EcoWaste. All rights reserved.</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">v1.0.0</span>
                </div>
                
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white text-xs">
                    Privacy Policy
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white text-xs">
                    Terms of Service
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white text-xs">
                    Help Center
                  </Button>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}