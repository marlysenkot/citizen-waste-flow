import { Outlet, useNavigate } from "react-router-dom";
import { CollectorSidebar } from "./CollectorSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function CollectorLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens from storage
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Redirect to login
    navigate("/auth/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <CollectorSidebar />
        
        <main className="flex-1 overflow-auto">
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center justify-between px-6 h-full">
              {/* Left side */}
              <div className="flex items-center gap-4">
                <SidebarTrigger className="mr-4" />
                <h1 className="text-xl font-semibold text-foreground">Collector Portal</h1>
              </div>

              {/* Right side - Logout */}
              <div>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </header>
          
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
