import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Search, 
  Package, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Calendar,
  MapPin,
  User,
  DollarSign,
  Loader,
  Filter,
  Download,
  Eye,
  Edit,
  Truck,
  Recycle
} from "lucide-react";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  service: string;
  status: string;
  date: string;
  time: string;
  address: string;
  price: string;
  collector: string;
  quantity?: number;
  product_type?: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${apiUrl}/citizens/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.detail || "Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data.map((order: any) => ({
          id: order.id,
          service: order.product?.name || "Waste Collection",
          status: order.status || "Scheduled",
          date: order.date || new Date().toISOString().split("T")[0],
          time: order.time || "Morning (8:00 AM - 12:00 PM)",
          address: order.address || "Not provided",
          price: `${order.total_price?.toFixed(2) || "0.00"} FCFA`,
          collector: order.collector || "Not assigned yet",
          quantity: order.quantity || 1,
          product_type: order.product?.type || "Service"
        })));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [apiUrl, token]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "scheduled":
        return <Clock className="h-4 w-4" />;
      case "in progress":
        return <AlertCircle className="h-4 w-4" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "default";
      case "scheduled":
        return "secondary";
      case "in progress":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-400";
      case "scheduled":
        return "text-blue-400";
      case "in progress":
        return "text-yellow-400";
      case "cancelled":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 border-green-500/30";
      case "scheduled":
        return "bg-blue-500/20 border-blue-500/30";
      case "in progress":
        return "bg-yellow-500/20 border-yellow-500/30";
      case "cancelled":
        return "bg-red-500/20 border-red-500/30";
      default:
        return "bg-slate-500/20 border-slate-500/30";
    }
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: orders.length,
    scheduled: orders.filter(o => o.status.toLowerCase() === "scheduled").length,
    "in progress": orders.filter(o => o.status.toLowerCase() === "in progress").length,
    completed: orders.filter(o => o.status.toLowerCase() === "completed").length,
    cancelled: orders.filter(o => o.status.toLowerCase() === "cancelled").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Loader className="h-12 w-12 text-green-400 animate-spin mx-auto" />
            <p className="text-slate-400 text-lg">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Link 
            to="/citizen/dashboard" 
            className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors duration-300 mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Order History
              </h1>
              <p className="text-slate-400 text-lg mt-2">Track and manage your waste collection orders</p>
            </div>
            
            <Link to="/citizen/products">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300">
                <Package className="h-4 w-4 mr-2" />
                Place New Order
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats and Filters */}
        <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                <Input 
                  placeholder="Search orders by service or ID..." 
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-slate-400" />
                <div className="flex flex-wrap gap-2">
                  {["all", "scheduled", "in progress", "completed", "cancelled"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                        statusFilter === status
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                          : "bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 hover:text-white"
                      )}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status as keyof typeof statusCounts]})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {error ? (
          <Card className="bg-red-500/20 border-red-500/30">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-400 text-lg">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-red-600 hover:bg-red-700"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : filteredOrders.length === 0 ? (
          <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No orders found</h3>
              <p className="text-slate-500 mb-6">
                {searchTerm || statusFilter !== "all" 
                  ? "No orders match your current filters. Try adjusting your search criteria."
                  : "You haven't placed any orders yet. Start by exploring our products and services."
                }
              </p>
              <Link to="/citizen/products">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Recycle className="h-4 w-4 mr-2" />
                  Browse Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card 
                key={order.id} 
                className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 hover:border-green-500/30 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Order Details */}
                    <div className="space-y-4 flex-1">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 w-fit border",
                            getStatusBg(order.status)
                          )}
                        >
                          {getStatusIcon(order.status)}
                          <span className={getStatusColor(order.status)}>
                            {order.status}
                          </span>
                        </Badge>
                        <span className="text-sm font-mono text-slate-400 bg-slate-700/50 px-2 py-1 rounded">
                          ID: {order.id}
                        </span>
                      </div>

                      {/* Service Info */}
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{order.service}</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Calendar className="h-4 w-4 text-green-400" />
                            <span>{order.date} • {order.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <MapPin className="h-4 w-4 text-blue-400" />
                            <span className="truncate">{order.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <User className="h-4 w-4 text-purple-400" />
                            <span>{order.collector}</span>
                          </div>
                        </div>
                      </div>

                      {/* Additional Info */}
                      {(order.quantity || order.product_type) && (
                        <div className="flex gap-4 text-sm text-slate-500">
                          {order.quantity && (
                            <span>Qty: {order.quantity}</span>
                          )}
                          {order.product_type && (
                            <span>Type: {order.product_type}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions and Price */}
                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">{order.price}</div>
                        <div className="text-sm text-slate-500 mt-1">Total Amount</div>
                      </div>
                      
                      <div className="flex gap-2">
                        {order.status.toLowerCase() === "scheduled" && (
                          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                            <Edit className="h-3 w-3 mr-1" />
                            Modify
                          </Button>
                        )}
                        {order.status.toLowerCase() === "in progress" && (
                          <Button variant="outline" size="sm" className="border-blue-600 text-blue-300 hover:bg-blue-700/20">
                            <Truck className="h-3 w-3 mr-1" />
                            Track
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                          <Download className="h-3 w-3 mr-1" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Summary */}
        {filteredOrders.length > 0 && (
          <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 mt-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center text-sm text-slate-400">
                <span>Showing {filteredOrders.length} of {orders.length} orders</span>
                <span>Total spent: {orders.reduce((sum, order) => sum + parseFloat(order.price), 0).toFixed(2)} FCFA</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}