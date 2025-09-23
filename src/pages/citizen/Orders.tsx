import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  MapPin
} from "lucide-react";
import { Header } from "@/components/Header";

interface Order {
  id: string;
  service: string;
  status: string;
  date: string;
  time: string;
  address: string;
  price: string;
  collector: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
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
          price: `$${order.total_price?.toFixed(2) || "0.00"}`,
          collector: order.collector || "Not assigned yet"
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
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />;
      case "Scheduled":
        return <Clock className="h-4 w-4" />;
      case "In Progress":
        return <AlertCircle className="h-4 w-4" />;
      case "Cancelled":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "Scheduled":
        return "secondary";
      case "In Progress":
        return "outline";
      case "Cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/citizen/dashboard" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order History</h1>
          <p className="text-muted-foreground">Track and manage your waste collection orders.</p>
        </div>

        {/* Search and New Order */}
        <Card className="mb-6">
          <CardContent className="p-4 flex gap-4">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input placeholder="Search orders..." className="pl-10" />
            </div>
            <Link to="/citizen/schedule">
              <Button>
                <Package className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </Link>
          </CardContent>
        </Card>

        {loading ? (
          <p className="text-center text-muted-foreground mt-8">Loading orders...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-8">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-muted-foreground mt-8">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge variant={getStatusVariant(order.status)} className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                        <span className="text-sm font-medium text-muted-foreground">{order.id}</span>
                      </div>

                      <h3 className="text-lg font-semibold">{order.service}</h3>

                      <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {order.date} • {order.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {order.address}
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="text-muted-foreground">Collector: </span>
                        <span className="font-medium">{order.collector}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="text-xl font-bold text-primary">{order.price}</div>
                      <div className="flex gap-2">
                        {order.status === "Scheduled" && (
                          <Button variant="outline" size="sm">
                            Modify
                          </Button>
                        )}
                        {order.status === "In Progress" && (
                          <Button variant="outline" size="sm">
                            Track
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
