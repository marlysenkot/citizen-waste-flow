import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  Plus
} from "lucide-react";
import { Header } from "@/components/Header";

export default function CitizenDashboard() {
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [activeComplaints, setActiveComplaints] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        setRecentOrders(ordersData);
        setActiveComplaints(complaintsData);
        setCollections(collectionsData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, apiUrl]);

  const getStatusBadge = (status: string) => {
    let variant: "default" | "secondary" | "outline" | "destructive" = "outline";
    let Icon = null;

    switch (status) {
      case "Completed":
        variant = "default";
        Icon = CheckCircle;
        break;
      case "Scheduled":
        variant = "secondary";
        Icon = Clock;
        break;
      case "In Progress":
        variant = "outline";
        Icon = AlertCircle;
        break;
      case "Cancelled":
        variant = "destructive";
        Icon = AlertCircle;
        break;
      default:
        variant = "outline";
    }

    return (
      <Badge variant={variant} className="flex items-center gap-1">
        {Icon && <Icon className="h-3 w-3" />}
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your waste management services
          </p>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Link to="/citizen/orders">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.length === 0 && !loading && <p>No orders found</p>}
              {recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.product?.name || "Waste Collection"}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {order.quantity} • Total: {order.total_price?.toFixed(2)} FCFA
                    </p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  {getStatusBadge(order.status || "Scheduled")}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Complaints */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Complaints & Feedback</CardTitle>
              <Link to="/citizen/complaints">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeComplaints.length === 0 && !loading && <p>No complaints found</p>}
              {activeComplaints.map((complaint: any) => (
                <div key={complaint.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{complaint.subject || "No Subject"}</p>
                    <p className="text-sm text-muted-foreground">{complaint.date}</p>
                  </div>
                  {getStatusBadge(complaint.status || "Pending")}
                </div>
              ))}
              <Link to="/citizen/complaints/new">
                <Button className="w-full" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Submit New Complaint
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Collections */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Waste Collections</CardTitle>
              <Link to="/citizen/collections">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {collections.length === 0 && !loading && <p>No collections found</p>}
              {collections.map((collection: any) => (
                <div key={collection.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{collection.location || "Unknown Location"}</p>
                    <p className="text-sm text-muted-foreground">{collection.date}</p>
                  </div>
                  {getStatusBadge(collection.status || "Scheduled")}
                </div>
              ))}
              <Link to="/citizen/collections/new">
                <Button className="w-full" variant="outline">
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
