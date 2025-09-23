import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Clock, MapPin, CheckCircle } from "lucide-react";
import { Header } from "@/components/Header";

export default function CollectorTasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/collectors/requests", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`Failed to fetch tasks: ${res.status}`);
      const data = await res.json();
      console.log("Fetched tasks:", data); // debug
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Start collection (requested -> in_progress)
  const startCollection = async (id: number) => {
    try {
      await fetch(`http://127.0.0.1:8000/collectors/requests/${id}/accept`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Mark complete (in_progress -> completed)
  const markComplete = async (id: number) => {
    try {
      await fetch(`http://127.0.0.1:8000/collectors/requests/${id}/complete`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Separate tasks by status
  const requestedTasks = tasks.filter((t) => t.status === "requested");
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress");
  const completedTasks = tasks.filter((t) => t.status === "completed");

  // Status badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "requested": return "outline";
      case "in_progress": return "secondary";
      case "completed": return "default";
      default: return "outline";
    }
  };

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
          <span className="text-sm text-muted-foreground">#{task.id}</span>
        </div>

        <div>
          <h4 className="font-medium">Collection Request</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Clock className="h-4 w-4" />
            {new Date(task.created_at).toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {task.location}
        </div>

        <div className="flex gap-2 mt-2">
          {task.status === "requested" && (
            <Button size="sm" className="flex-1" onClick={() => startCollection(task.id)}>
              Start Collection
            </Button>
          )}
          {task.status === "in_progress" && (
            <Button size="sm" className="flex-1" onClick={() => markComplete(task.id)}>
              Mark Complete
            </Button>
          )}
          {task.status === "completed" && (
            <Button size="sm" variant="ghost" className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed
            </Button>
          )}
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
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading tasks...</p>
        ) : (
          <Tabs defaultValue="requested" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="requested">Requested ({requestedTasks.length})</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress ({inProgressTasks.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="requested" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requestedTasks.map((task) => <TaskCard key={task.id} task={task} />)}
              </div>
            </TabsContent>

            <TabsContent value="in_progress" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inProgressTasks.map((task) => <TaskCard key={task.id} task={task} />)}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedTasks.map((task) => <TaskCard key={task.id} task={task} />)}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
