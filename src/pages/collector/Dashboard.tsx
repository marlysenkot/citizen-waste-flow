import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Package, 
  CheckCircle, 
  Clock, 
  Route,
  Truck,
  User
} from "lucide-react";

export default function CollectorDashboard() {
  const todayTasks = [
    {
      id: "TASK-001",
      orderId: "ORD-002",
      address: "123 Main Street, City Center",
      service: "Recycling Collection",
      time: "2:00 PM - 4:00 PM",
      status: "Pending",
      customer: "John Doe",
      phone: "+1 (555) 123-4567"
    },
    {
      id: "TASK-002",
      orderId: "ORD-003",
      address: "456 Oak Avenue, Riverside",  
      service: "Household Waste",
      time: "10:00 AM - 12:00 PM",
      status: "Completed",
      customer: "Sarah Johnson",
      phone: "+1 (555) 987-6543"
    }
  ];

  const recentActivity = [
    { id: "ACT-001", action: "Completed collection at 789 Pine St", time: "2 hours ago" },
    { id: "ACT-002", action: "Started route optimization", time: "4 hours ago" },
    { id: "ACT-003", action: "Reported damaged bin at 321 Elm St", time: "1 day ago" }
  ];

  const stats = {
    today: 8,
    completed: 6,
    pending: 2,
    thisWeek: 34
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "secondary";
      case "Pending":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Collector Dashboard</h1>
        <p className="text-muted-foreground">Manage your collection tasks and track your performance</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold text-primary">{stats.today}</div>
            <div className="text-sm text-muted-foreground">Today's Tasks</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-3" />
            <div className="text-2xl font-bold text-success">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-3" />
            <div className="text-2xl font-bold text-warning">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Truck className="h-8 w-8 text-accent mx-auto mb-3" />
            <div className="text-2xl font-bold text-accent">{stats.thisWeek}</div>
            <div className="text-sm text-muted-foreground">This Week</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Today's Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Today's Tasks</CardTitle>
            <Link to="/collector/tasks">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayTasks.map((task) => (
              <div key={task.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    <span className="font-medium">{task.service}</span>
                  </div>
                  <Badge variant={getStatusColor(task.status)}>
                    {task.status === "Completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {task.status === "Pending" && <Clock className="h-3 w-3 mr-1" />}
                    {task.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{task.address}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{task.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{task.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Link to="/collector/history">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

  </div>
  );
}