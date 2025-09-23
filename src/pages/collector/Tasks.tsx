import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  User, 
  Clock, 
  Phone,
  Calendar,
  Route,
  CheckCircle
} from "lucide-react";
import { Header } from "@/components/Header";

export default function CollectorTasks() {
  const [searchTerm, setSearchTerm] = useState("");

  const allTasks = [
    {
      id: "TASK-001",
      orderId: "ORD-002",
      address: "123 Main Street, City Center",
      service: "Recycling Collection",
      time: "2:00 PM - 4:00 PM",
      date: "2024-01-15",
      status: "Pending",
      customer: "John Doe",
      phone: "+1 (555) 123-4567",
      priority: "Medium",
      notes: "Large amount of cardboard"
    },
    {
      id: "TASK-002", 
      orderId: "ORD-005",
      address: "456 Oak Avenue, Downtown",
      service: "Household Waste Collection", 
      time: "10:00 AM - 12:00 PM",
      date: "2024-01-15",
      status: "Completed",
      customer: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      priority: "Low",
      notes: "Regular pickup"
    },
    {
      id: "TASK-003",
      orderId: "ORD-006", 
      address: "789 Pine Street, Suburb",
      service: "Bulk Item Pickup",
      time: "4:00 PM - 6:00 PM",
      date: "2024-01-15", 
      status: "In Progress",
      customer: "Mike Wilson",
      phone: "+1 (555) 456-7890",
      priority: "High",
      notes: "Old refrigerator - needs 2 people"
    },
    {
      id: "TASK-004",
      orderId: "ORD-007",
      address: "321 Elm Drive, Eastside", 
      service: "Hazardous Waste",
      time: "9:00 AM - 11:00 AM",
      date: "2024-01-16",
      status: "Scheduled",
      customer: "Lisa Brown",
      phone: "+1 (555) 234-5678", 
      priority: "High",
      notes: "Paint cans and batteries"
    }
  ];

  const todayTasks = allTasks.filter(task => task.date === "2024-01-15");
  const upcomingTasks = allTasks.filter(task => task.date > "2024-01-15");
  const completedTasks = allTasks.filter(task => task.status === "Completed");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "secondary";
      case "Pending":
        return "outline";
      case "Scheduled":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-muted-foreground";
    }
  };

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant={getStatusColor(task.status)}>
              {task.status}
            </Badge>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
              <span className="text-sm text-muted-foreground">{task.orderId}</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium">{task.service}</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Clock className="h-4 w-4" />
              {task.time}
            </div>
          </div>
          
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {task.address}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              {task.customer}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              {task.phone}
            </div>
          </div>
          
          {task.notes && (
            <div className="text-sm bg-muted/30 p-2 rounded">
              <strong>Notes:</strong> {task.notes}
            </div>
          )}
          
          <div className="flex gap-2">
            {task.status === "Pending" && (
              <>
                <Button size="sm" className="flex-1">
                  Start Collection
                </Button>
                <Button size="sm" variant="outline">
                  Call
                </Button>
              </>
            )}
            {task.status === "In Progress" && (
              <>
                <Button size="sm" className="flex-1">
                  Mark Complete
                </Button>
                <Button size="sm" variant="outline">
                  Issue
                </Button>
              </>
            )}
            {task.status === "Scheduled" && (
              <Button size="sm" variant="outline" className="w-full">
                View Details
              </Button>
            )}
            {task.status === "Completed" && (
              <Button size="sm" variant="ghost" className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/collector/dashboard" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Collection Tasks</h1>
          <p className="text-muted-foreground">Manage your assigned collection tasks and routes.</p>
        </div>

        {/* Search and Actions */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input 
                  placeholder="Search tasks..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button>
                <Route className="h-4 w-4 mr-2" />
                Optimize Route
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Tabs */}
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today ({todayTasks.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingTasks.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todayTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}