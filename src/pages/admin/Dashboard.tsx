import { useState, useEffect } from "react";
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
  CheckCircle,
  Clock
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeCollectors: 0,
    todayOrders: 0,
    pendingComplaints: 0,
    monthlyRevenue: 0,
    completionRate: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [topCollectors, setTopCollectors] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchStats = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/admin/stats", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) setStats(await res.json());
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/admin/orders", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) setRecentOrders(await res.json());
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchComplaints = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/admin/complaints", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) setRecentComplaints(await res.json());
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    const fetchTopCollectors = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/admin/top-collectors", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) setTopCollectors(await res.json());
      } catch (error) {
        console.error("Error fetching top collectors:", error);
      }
    };

    fetchStats();
    fetchOrders();
    fetchComplaints();
    fetchTopCollectors();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "default";
      case "In Progress": return "secondary";
      case "Scheduled": return "outline";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-600";
      case "Medium": return "text-yellow-600";
      case "Low": return "text-green-600";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your waste management platform performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold text-primary">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Active Collectors</p>
              <p className="text-2xl font-bold text-success">{stats.activeCollectors}</p>
            </div>
            <Truck className="h-8 w-8 text-success" />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Today's Orders</p>
              <p className="text-2xl font-bold text-accent">{stats.todayOrders}</p>
            </div>
            <Package className="h-8 w-8 text-accent" />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Open Complaints</p>
              <p className="text-2xl font-bold text-warning">{stats.pendingComplaints}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-warning" />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <p className="text-2xl font-bold text-primary">${stats.monthlyRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <p className="text-2xl font-bold text-success">{stats.completionRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-success" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Complaints */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Recent Orders</CardTitle>
            <Link to="/admin/orders">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{order.service}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.id} • {order.customer} • {order.collector || "Not Assigned"}
                  </p>
                </div>
                <Badge variant={getStatusColor(order.status)}>
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
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Recent Complaints</CardTitle>
            <Link to="/admin/complaints">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentComplaints.map((complaint: any) => (
              <div key={complaint.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{complaint.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {complaint.id} • {complaint.customer}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
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
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Top Performing Collectors</CardTitle>
          <Link to="/admin/collectors">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCollectors.map((collector: any, index: number) => (
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
