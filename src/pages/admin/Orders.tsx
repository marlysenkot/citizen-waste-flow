import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Search, 
  Package, 
  CheckCircle, 
  Clock, 
  Calendar,
  User,
  Truck,
  MapPin,
  DollarSign
} from "lucide-react";
import { Header } from "@/components/Header";

interface Order {
  id: string;
  customer?: string;
  customerEmail?: string;
  service?: string;
  collector?: string;
  collectorPhone?: string;
  address?: string;
  date?: string;
  time?: string;
  status?: string;
  price?: string;
  notes?: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch orders from backend
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // adjust if needed
      const res = await fetch("http://127.0.0.1:8000/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      (order.customer?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (order.service?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (order.address?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    const matchesStatus =
      statusFilter === "all" || order.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Helpers for UI
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "secondary";
      case "Scheduled":
        return "outline";
      case "Cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />;
      case "In Progress":
        return <Clock className="h-4 w-4" />;
      case "Scheduled":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/admin/dashboard" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Management</h1>
          <p className="text-muted-foreground">Monitor and manage all collection orders.</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4 flex gap-4 flex-wrap">
            <div className="relative flex-1 max-w-md">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button>Export Orders</Button>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status || "Unknown"}
                      </Badge>
                      <span className="text-lg font-semibold">{order.id}</span>
                    </div>
                    <h3 className="text-lg font-semibold">{order.service || "No Service Info"}</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {order.customer || "Unknown Customer"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        {order.collector || "Unassigned"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {order.date || "No Date"} • {order.time || "No Time"}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {order.address || "No Address"}
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        {order.price || "$0.00"}
                      </div>
                    </div>
                    {order.notes && (
                      <div className="text-sm bg-muted/30 p-2 rounded">
                        <strong>Notes:</strong> {order.notes}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-xl font-bold text-primary">{order.price || "$0.00"}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      {order.status === "Scheduled" && <Button variant="outline" size="sm">Assign Collector</Button>}
                      {order.status === "In Progress" && <Button variant="outline" size="sm">Track Progress</Button>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
