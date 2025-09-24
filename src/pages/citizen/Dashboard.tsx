import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  Plus,
  Truck,
  Package,
  AlertTriangle,
  User,
  Calendar,
  MapPin,
  ArrowRight,
  Loader,
  Recycle,
  BarChart3,
  Shield
} from "lucide-react";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";

export default function CitizenDashboard() {
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [activeComplaints, setActiveComplaints] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingComplaints: 0,
    scheduledCollections: 0,
    completedServices: 0
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const [ordersRes, complaintsRes, collectionsRes] = await Promise.all([
          fetch(`${apiUrl}/citizens/orders`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${apiUrl}/citizens/complaints`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${apiUrl}/citizens/collections`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        if (!ordersRes.ok) throw new Error("Failed to fetch orders");
        if (!complaintsRes.ok) throw new Error("Failed to fetch complaints");
        if (!collectionsRes.ok) throw new Error("Failed to fetch collections");

        const [ordersData, complaintsData, collectionsData] = await Promise.all([
          ordersRes.json(),
          complaintsRes.json(),
          collectionsRes.json(),
        ]);

        setRecentOrders(Array.isArray(ordersData) ? ordersData.slice(0, 3) : []);
        setActiveComplaints(Array.isArray(complaintsData) ? complaintsData.slice(0, 3) : []);
        setCollections(Array.isArray(collectionsData) ? collectionsData.slice(0, 3) : []);

        // Calculate stats
        setStats({
          totalOrders: Array.isArray(ordersData) ? ordersData.length : 0,
          pendingComplaints: Array.isArray(complaintsData) ? complaintsData.filter((c: any) => c.status === "Pending").length : 0,
          scheduledCollections: Array.isArray(collectionsData) ? collectionsData.filter((c: any) => c.status === "Scheduled").length : 0,
          completedServices: Array.isArray(collectionsData) ? collectionsData.filter((c: any) => c.status === "Completed").length : 0
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, apiUrl]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "Completed": { variant: "default" as const, icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/20" },
      "Scheduled": { variant: "secondary" as const, icon: Clock, color: "text-blue-400", bg: "bg-blue-500/20" },
      "In Progress": { variant: "outline" as const, icon: AlertCircle, color: "text-yellow-400", bg: "bg-yellow-500/20" },
      "Pending": { variant: "outline" as const, icon: Clock, color: "text-orange-400", bg: "bg-orange-500/20" },
      "Cancelled": { variant: "destructive" as const, icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/20" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Pending;
    const IconComponent = config.icon;

    return (
      <Badge 
        variant={config.variant} 
        className={cn("flex items-center gap-1.5 px-2.5 py-1 border-0", config.bg)}
      >
        <IconComponent className="h-3 w-3" />
        <span className={config.color}>{status}</span>
      </Badge>
    );
  };

  const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: number, color: string }) => (
    <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-slate-400 text-sm mt-1">{label}</p>
          </div>
          <div className={cn("p-3 rounded-full", color)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Loader className="h-12 w-12 text-green-400 animate-spin mx-auto" />
            <p className="text-slate-400 text-lg">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Here's an overview of your waste management services and activities
          </p>
        </div>

        {error && (
          <Card className="bg-red-500/20 border-red-500/30 mb-6">
            <CardContent className="p-4 flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <p className="text-red-400">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Statistics Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Package} 
            label="Total Orders" 
            value={stats.totalOrders} 
            color="bg-blue-500/20" 
          />
          <StatCard 
            icon={AlertTriangle} 
            label="Pending Complaints" 
            value={stats.pendingComplaints} 
            color="bg-orange-500/20" 
          />
          <StatCard 
            icon={Truck} 
            label="Scheduled Collections" 
            value={stats.scheduledCollections} 
            color="bg-yellow-500/20" 
          />
          <StatCard 
            icon={CheckCircle} 
            label="Completed Services" 
            value={stats.completedServices} 
            color="bg-green-500/20" 
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 hover:border-green-500/30 transition-all duration-300">
            <CardHeader className="border-b border-slate-700/50 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Package className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">Recent Orders</CardTitle>
                    <CardDescription className="text-slate-400">Your recent product purchases</CardDescription>
                  </div>
                </div>
                <Link to="/citizen/orders">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    View All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500">No orders yet</p>
                  <Link to="/citizen/products">
                    <Button variant="outline" className="mt-3 border-slate-600 text-slate-300">
                      Browse Products
                    </Button>
                  </Link>
                </div>
              ) : (
                recentOrders.map((order: any) => (
                  <div key={order.id} className="group p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="font-medium text-white truncate">
                          {order.product?.name || "Waste Collection Service"}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <span>Qty: {order.quantity}</span>
                          <span>•</span>
                          <span className="text-green-400 font-semibold">
                            {order.total_price?.toFixed(2) || "0.00"} FCFA
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <Calendar className="h-3 w-3" />
                          <span>{order.date || "Unknown date"}</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        {getStatusBadge(order.status || "Scheduled")}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Active Complaints */}
          <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 hover:border-orange-500/30 transition-all duration-300">
            <CardHeader className="border-b border-slate-700/50 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">Complaints & Feedback</CardTitle>
                    <CardDescription className="text-slate-400">Your recent complaints</CardDescription>
                  </div>
                </div>
                <Link to="/citizen/complaints">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    View All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {activeComplaints.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500">No complaints yet</p>
                </div>
              ) : (
                activeComplaints.map((complaint: any) => (
                  <div key={complaint.id} className="group p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <p className="font-medium text-white truncate">
                          {complaint.subject || "No Subject"}
                        </p>
                        <p className="text-sm text-slate-400 line-clamp-2">
                          {complaint.description || "No description available"}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <Calendar className="h-3 w-3" />
                          <span>{complaint.date || "Unknown date"}</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        {getStatusBadge(complaint.status || "Pending")}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <Link to="/citizen/complaints/new">
                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 py-2.5 transition-all duration-300">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Submit New Complaint
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Collections */}
          <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
            <CardHeader className="border-b border-slate-700/50 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Truck className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">Waste Collections</CardTitle>
                    <CardDescription className="text-slate-400">Your collection requests</CardDescription>
                  </div>
                </div>
                <Link to="/citizen/collections">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    View All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {collections.length === 0 ? (
                <div className="text-center py-8">
                  <Truck className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500">No collections scheduled</p>
                </div>
              ) : (
                collections.map((collection: any) => (
                  <div key={collection.id} className="group p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2 text-white">
                          <MapPin className="h-4 w-4 text-green-400" />
                          <p className="font-medium truncate">{collection.location || "Unknown Location"}</p>
                        </div>
                        <p className="text-sm text-slate-400">{collection.notes || "No additional notes"}</p>
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <Calendar className="h-3 w-3" />
                          <span>{collection.date || "Unknown date"}</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        {getStatusBadge(collection.status || "Scheduled")}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <Link to="/citizen/collections/new">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 py-2.5 transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Request New Collection
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}