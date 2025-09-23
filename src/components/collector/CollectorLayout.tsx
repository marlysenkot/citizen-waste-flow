import { Outlet } from "react-router-dom";
import { CollectorSidebar } from "./CollectorSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export function CollectorLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <CollectorSidebar />
        
        <main className="flex-1 overflow-auto">
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center px-6 h-full">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold text-foreground">Collector Portal</h1>
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