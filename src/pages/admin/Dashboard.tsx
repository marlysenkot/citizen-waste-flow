import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Truck, 
  Package, 
  MessageSquare, 
  TrendingUp,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

export default function AdminDashboard() {
  const stats = {
    totalUsers: 1247,
    activeCollectors: 45,
    todayOrders: 127,
    pendingComplaints: 8,
    monthlyRevenue: 45620,
    completionRate: 96.5
  };

  const recentOrders = [
    { id: "ORD-201", customer: "John Doe", service: "Household Waste", status: "Completed", collector: "Mike Johnson" },
    { id: "ORD-202", customer: "Sarah Smith", service: "Recycling", status: "In Progress", collector: "Lisa Brown" },
    { id: "ORD-203", customer: "David Wilson", service: "Bulk Item", status: "Scheduled", collector: "Not Assigned" },
    { id: "ORD-204", customer: "Emma Davis", service: "Express", status: "Completed", collector: "Tom Wilson" }
  ];

  const recentComplaints = [
    { id: "COMP-15", customer: "Alice Johnson", subject: "Missed Collection", status: "Open", priority: "High" },
    { id: "COMP-16", customer: "Bob Smith", subject: "Damaged Property", status: "Under Review", priority: "Medium" },
    { id: "COMP-17", customer: "Carol Brown", subject: "Late Service", status: "Resolved", priority: "Low" }
  ];

  const topCollectors = [
    { name: "Mike Johnson", collections: 48, rating: 4.9, earnings: "$1,240" },
    { name: "Lisa Brown", collections: 45, rating: 4.8, earnings: "$1,180" },
    { name: "Tom Wilson", collections: 42, rating: 4.7, earnings: "$1,095" },
    { name: "Sarah Davis", collections: 39, rating: 4.6, earnings: "$1,020" }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your waste management platform performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Collectors</p>
                  <p className="text-2xl font-bold text-success">{stats.activeCollectors}</p>
                </div>
                <Truck className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Orders</p>
                  <p className="text-2xl font-bold text-accent">{stats.todayOrders}</p>
                </div>
                <Package className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Complaints</p>
                  <p className="text-2xl font-bold text-warning">{stats.pendingComplaints}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-primary">${stats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold text-success">{stats.completionRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Link to="/admin/orders">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.service}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.id} • {order.customer} • {order.collector}
                    </p>
                  </div>
                  <Badge variant={
                    order.status === "Completed" ? "default" : 
                    order.status === "In Progress" ? "secondary" : 
                    "outline"
                  }>
                    {order.status === "Completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {order.status === "In Progress" && <Clock className="h-3 w-3 mr-1" />}
                    {order.status === "Scheduled" && <Calendar className="h-3 w-3 mr-1" />}
                    {order.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Complaints */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Complaints</CardTitle>
              <Link to="/admin/complaints">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{complaint.subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {complaint.id} • {complaint.customer}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={
                      complaint.priority === "High" ? "text-red-600" :
                      complaint.priority === "Medium" ? "text-yellow-600" :
                      "text-green-600"
                    }>
                      {complaint.priority}
                    </Badge>
                    <Badge variant={
                      complaint.status === "Resolved" ? "default" :
                      complaint.status === "Under Review" ? "secondary" :
                      "destructive"
                    }>
                      {complaint.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
      </div>

      {/* Top Collectors */}
      <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Performing Collectors</CardTitle>
            <Link to="/admin/collectors">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCollectors.map((collector, index) => (
                <div key={collector.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{collector.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {collector.collections} collections • {collector.rating}★ rating
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{collector.earnings}</p>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                </div>
              ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}