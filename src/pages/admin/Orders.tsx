import { useState } from "react";
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

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      id: "ORD-201",
      customer: "John Doe",
      customerEmail: "john.doe@email.com",
      service: "Household Waste Collection",
      collector: "Mike Johnson",
      collectorPhone: "+1 (555) 111-2222",
      address: "123 Main Street, City Center",
      date: "2024-01-15",
      time: "2:00 PM - 4:00 PM",
      status: "Completed",
      price: "$15.00",
      notes: "Regular pickup"
    },
    {
      id: "ORD-202",
      customer: "Sarah Smith",
      customerEmail: "sarah.s@email.com", 
      service: "Recycling Collection",
      collector: "Lisa Brown",
      collectorPhone: "+1 (555) 333-4444",
      address: "456 Oak Avenue, Downtown",
      date: "2024-01-15",
      time: "10:00 AM - 12:00 PM",
      status: "In Progress",
      price: "$10.00",
      notes: "Large amount of cardboard"
    },
    {
      id: "ORD-203",
      customer: "David Wilson",
      customerEmail: "david.w@email.com",
      service: "Bulk Item Pickup", 
      collector: "Not Assigned",
      collectorPhone: "N/A",
      address: "789 Pine Street, Suburb",
      date: "2024-01-16",
      time: "Morning (8:00 AM - 12:00 PM)",
      status: "Scheduled",
      price: "$25.00",
      notes: "Old refrigerator - needs 2 people"
    },
    {
      id: "ORD-204",
      customer: "Emma Davis",
      customerEmail: "emma.d@email.com",
      service: "Express Collection",
      collector: "Tom Wilson", 
      collectorPhone: "+1 (555) 777-8888",
      address: "321 Elm Drive, Eastside",
      date: "2024-01-15",
      time: "4:00 PM - 6:00 PM",
      status: "Completed",
      price: "$35.00",
      notes: "Urgent pickup requested"
    },
    {
      id: "ORD-205",
      customer: "Michael Brown",
      customerEmail: "m.brown@email.com",
      service: "Hazardous Waste",
      collector: "Sarah Davis",
      collectorPhone: "+1 (555) 999-0000", 
      address: "654 Maple Lane, Westside",
      date: "2024-01-16",
      time: "9:00 AM - 11:00 AM",
      status: "Scheduled",
      price: "$20.00",
      notes: "Paint cans and batteries"
    }
  ];

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
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

  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.status === "Completed").length,
    inProgress: orders.filter(o => o.status === "In Progress").length,
    scheduled: orders.filter(o => o.status === "Scheduled").length
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/admin/dashboard" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Management</h1>
          <p className="text-muted-foreground">Monitor and manage all collection orders.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Package className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Orders</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.inProgress}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.scheduled}</div>
              <div className="text-sm text-muted-foreground">Scheduled</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                Export Orders
              </Button>
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
                      <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                      <span className="text-lg font-semibold">{order.id}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold">{order.service}</h3>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {order.customer}
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        {order.collector}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {order.date} • {order.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {order.address}
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        {order.price}
                      </div>
                    </div>
                    
                    {order.notes && (
                      <div className="text-sm bg-muted/30 p-2 rounded">
                        <strong>Notes:</strong> {order.notes}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="text-xl font-bold text-primary">{order.price}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === "Scheduled" && (
                        <Button variant="outline" size="sm">
                          Assign Collector
                        </Button>
                      )}
                      {order.status === "In Progress" && (
                        <Button variant="outline" size="sm">
                          Track Progress
                        </Button>
                      )}
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
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}