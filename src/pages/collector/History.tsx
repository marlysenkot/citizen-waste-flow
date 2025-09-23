import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, MapPin } from "lucide-react";
import { Header } from "@/components/Header";

export default function CollectorHistory() {
  const [completedTasks, setCompletedTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchCompletedTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/collectors/history", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`Failed to fetch tasks: ${res.status}`);
      const data = await res.json();
      console.log("Fetched completed tasks:", data);
      setCompletedTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  // Function to format date/time
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/collector/dashboard" className="inline-flex items-center text-primary hover:underline mb-4">
            <CheckCircle className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Collection History</h1>
          <p className="text-muted-foreground">Review your completed collections.</p>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading completed tasks...</p>
        ) : completedTasks.length === 0 ? (
          <p className="text-muted-foreground">No completed tasks yet.</p>
        ) : (
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="default" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Completed
                    </Badge>
                    <span className="text-sm text-muted-foreground">#{task.id}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {formatDate(task.created_at)}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {task.location}
                  </div>

                  <div className="flex justify-end mt-2">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
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
