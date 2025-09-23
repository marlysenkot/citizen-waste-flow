import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Package, 
  MessageSquare, 
  User, 
  Truck, 
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

export default function CitizenDashboard() {
  const recentOrders = [
    { id: "ORD-001", service: "Household Waste Collection", status: "Completed", date: "2024-01-10" },
    { id: "ORD-002", service: "Recycling Collection", status: "Scheduled", date: "2024-01-15" },
    { id: "ORD-003", service: "Bulk Item Pickup", status: "In Progress", date: "2024-01-12" }
  ];

  const activeComplaints = [
    { id: "COMP-001", subject: "Missed Collection", status: "Under Review", date: "2024-01-08" },
    { id: "COMP-002", subject: "Damaged Bin", status: "Resolved", date: "2024-01-05" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">Here's an overview of your waste management services</p>
      </div>


      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link to="/citizen/orders">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{order.service}</p>
                  <p className="text-sm text-muted-foreground">{order.id} • {order.date}</p>
                </div>
                <Badge variant={
                  order.status === "Completed" ? "default" : 
                  order.status === "Scheduled" ? "secondary" : 
                  "outline"
                }>
                  {order.status === "Completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                  {order.status === "Scheduled" && <Clock className="h-3 w-3 mr-1" />}
                  {order.status === "In Progress" && <AlertCircle className="h-3 w-3 mr-1" />}
                  {order.status}
                </Badge>
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
            {activeComplaints.map((complaint) => (
              <div key={complaint.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{complaint.subject}</p>
                  <p className="text-sm text-muted-foreground">{complaint.id} • {complaint.date}</p>
                </div>
                <Badge variant={complaint.status === "Resolved" ? "default" : "secondary"}>
                  {complaint.status}
                </Badge>
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
      </div>
    </div>
  );
}