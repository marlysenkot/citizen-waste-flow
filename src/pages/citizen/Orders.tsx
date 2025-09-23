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

export default function Orders() {
  const orders = [
    {
      id: "ORD-001",
      service: "Household Waste Collection",
      status: "Completed",
      date: "2024-01-10",
      time: "Morning (8:00 AM - 12:00 PM)",
      address: "123 Main Street, City Center",
      price: "$15.00",
      collector: "John Smith"
    },
    {
      id: "ORD-002",
      service: "Recycling Collection",
      status: "Scheduled",
      date: "2024-01-15",
      time: "Afternoon (12:00 PM - 4:00 PM)",
      address: "123 Main Street, City Center",
      price: "$10.00",
      collector: "Not assigned yet"
    },
    {
      id: "ORD-003",
      service: "Bulk Item Pickup",
      status: "In Progress",
      date: "2024-01-12",
      time: "Morning (8:00 AM - 12:00 PM)",
      address: "123 Main Street, City Center",
      price: "$25.00",
      collector: "Sarah Johnson"
    },
    {
      id: "ORD-004",
      service: "Express Collection",
      status: "Cancelled",
      date: "2024-01-08",
      time: "Evening (4:00 PM - 8:00 PM)",
      address: "123 Main Street, City Center",
      price: "$35.00",
      collector: "N/A"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />;
      case "Scheduled":
        return <Clock className="h-4 w-4" />;
      case "In Progress":
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

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
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
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
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

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">1</Button>
            <Button size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}