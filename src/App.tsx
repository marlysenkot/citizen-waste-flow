import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Citizen pages
import CitizenDashboard from "./pages/citizen/Dashboard";
import Orders from "./pages/citizen/Orders";
import Collections from "./pages/citizen/Collections";
import Complaints from "./pages/citizen/Complaints";
import NewComplaint from "./pages/citizen/NewComplaint";
import Profile from "./pages/citizen/Profile";

// Collector pages
import CollectorDashboard from "./pages/collector/Dashboard";
import CollectorTasks from "./pages/collector/Tasks";
import CollectorHistory from "./pages/collector/History";
import CollectorRoute from "./pages/collector/Route";
import CollectorReportIssue from "./pages/collector/ReportIssue";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminOrders from "./pages/admin/Orders";
import AdminCollectors from "./pages/admin/Collectors";
import AdminProducts from "./pages/admin/Products";
import AdminLocations from "./pages/admin/Locations";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CollectorLayout } from "@/components/collector/CollectorLayout";
import { CitizenLayout } from "@/components/citizen/CitizenLayout";
import { Products } from "./pages/citizen/Products";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          {/* Citizen Routes */}
          <Route path="/citizen" element={<CitizenLayout />}>
            <Route path="dashboard" element={<CitizenDashboard />} />
            <Route path="collections" element={<Collections />} />
            <Route path="orders" element={<Orders />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="complaints/new" element={<NewComplaint />} />
            <Route path="profile" element={<Profile />} />
             <Route path="products" element={<Products />} /> {/* ← Products */}
          </Route>
          
          {/* Collector Routes */}
          <Route path="/collector" element={<CollectorLayout />}>
            <Route path="dashboard" element={<CollectorDashboard />} />
            <Route path="tasks" element={<CollectorTasks />} />
            <Route path="history" element={<CollectorHistory />} />
            <Route path="route" element={<CollectorRoute />} />
            <Route path="report-issue" element={<CollectorReportIssue />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="collectors" element={<AdminCollectors />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="locations" element={<AdminLocations />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
  </QueryClientProvider>
);

export default App;
