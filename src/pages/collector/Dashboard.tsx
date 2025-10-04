import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Package, 
  CheckCircle, 
  Clock, 
  Truck, 
  User, 
  Loader,
  AlertCircle,
  TrendingUp,
  Zap,
  Shield,
  Recycle,
  ArrowRight,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CollectionTask {
  id: string;
  location: string;
  status: string;
  created_at: string;
  citizen_name?: string;
  priority?: string;
  waste_type?: string;
  estimated_duration?: string;
}

export default function CollectorDashboard() {
  const [tasks, setTasks] = useState<CollectionTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("http://127.0.0.1:8000/collectors/requests", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/auth/login";
          return;
        }
        throw new Error(`Failed to fetch tasks: ${res.status}`);
      }
      
      const data = await res.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  // Filter tasks with safe defaults
  const todayTasks = tasks.filter(t => t.created_at?.split("T")[0] === today);
  const completedTasks = tasks.filter(t => t.status === "completed");
  const pendingTasks = tasks.filter(t => t.status === "requested" || t.status === "pending");
  const inProgressTasks = tasks.filter(t => t.status === "in_progress");
  
  const thisWeekTasks = tasks.filter(t => {
    if (!t.created_at) return false;
    const taskDate = new Date(t.created_at);
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);
    return taskDate >= weekStart && taskDate <= weekEnd;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-400";
      case "in_progress": return "text-blue-400";
      case "requested": 
      case "pending": return "text-yellow-400";
      default: return "text-slate-400";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 border-green-500/30";
      case "in_progress": return "bg-blue-500/20 border-blue-500/30";
      case "requested": 
      case "pending": return "bg-yellow-500/20 border-yellow-500/30";
      default: return "bg-slate-500/20 border-slate-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high": return "text-red-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-slate-400";
    }
  };

  const StatCard = ({ 
    icon: Icon, 
    value, 
    label, 
    description, 
    color 
  }: { 
    icon: any; 
    value: number; 
    label: string; 
    description?: string;
    color: string;
  }) => (
    <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            <p className="text-lg font-semibold text-slate-300">{label}</p>
            {description && (
              <p className="text-sm text-slate-500 mt-1">{description}</p>
            )}
          </div>
          <div className={cn("p-3 rounded-xl", color)}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="h-12 w-12 text-green-400 animate-spin mx-auto" />
          <p className="text-slate-400 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-500/20 border-red-500/30">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-400 mb-2">Error Loading Dashboard</h3>
          <p className="text-red-300 mb-4">{error}</p>
          <Button onClick={fetchTasks} variant="outline" className="border-red-400 text-red-400">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Collector Dashboard
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Manage your collection tasks and track your performance in real-time
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={Calendar}
          value={todayTasks.length}
          label="Today's Tasks"
          description="Scheduled for today"
          color="bg-blue-500/20"
        />
        <StatCard 
          icon={CheckCircle}
          value={completedTasks.length}
          label="Completed"
          description="Successfully collected"
          color="bg-green-500/20"
        />
        <StatCard 
          icon={Clock}
          value={pendingTasks.length}
          label="Pending"
          description="Awaiting action"
          color="bg-yellow-500/20"
        />
        <StatCard 
          icon={TrendingUp}
          value={thisWeekTasks.length}
          label="This Week"
          description="Total weekly tasks"
          color="bg-purple-500/20"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Today's Tasks */}
        <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50">
          <CardHeader className="border-b border-slate-700/50 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Package className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-white text-lg">Today's Tasks</CardTitle>
                  <CardDescription className="text-slate-400">Collections scheduled for today</CardDescription>
                </div>
              </div>
              <Link to="/collector/tasks">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {todayTasks.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500">No tasks scheduled for today</p>
                <p className="text-sm text-slate-600 mt-1">Enjoy your day off!</p>
              </div>
            ) : (
              todayTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="group p-4 bg-slate-700/30 rounded-xl border border-slate-600/50 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Recycle className="h-4 w-4 text-green-400" />
                      <span className="font-semibold text-white">Collection Request</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "flex items-center gap-1 px-2.5 py-1 border",
                        getStatusBg(task.status)
                      )}
                    >
                      {task.status === "completed" && <CheckCircle className="h-3 w-3" />}
                      {task.status === "in_progress" && <Zap className="h-3 w-3" />}
                      {(task.status === "requested" || task.status === "pending") && <Clock className="h-3 w-3" />}
                      <span className={getStatusColor(task.status)}>
                        {task.status.replace("_", " ")}
                      </span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">{task.location || "Location not specified"}</span>
                    </div>
                    
                    {task.priority && (
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3 text-slate-500" />
                        <span className={cn("text-xs font-medium", getPriorityColor(task.priority))}>
                          {task.priority} Priority
                        </span>
                      </div>
                    )}
                    
                    {task.waste_type && (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>Type: {task.waste_type}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600/50">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <User className="h-3 w-3" />
                      <span>{task.citizen_name || "Citizen"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="h-3 w-3" />
                      <span>{task.created_at ? new Date(task.created_at).toLocaleTimeString() : "Unknown time"}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent Activity & Performance */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50">
            <CardHeader className="border-b border-slate-700/50 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
                    <CardDescription className="text-slate-400">Your completed collections</CardDescription>
                  </div>
                </div>
                <Link to="/collector/history">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    View All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {completedTasks.slice(0, 4).map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      Completed collection at {task.location}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-slate-500" />
                      <p className="text-xs text-slate-400">
                        {task.created_at ? new Date(task.created_at).toLocaleDateString() : "Unknown date"}
                      </p>
                    </div>
                  </div>
                  <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                </div>
              ))}
              
              {completedTasks.length === 0 && (
                <div className="text-center py-6">
                  <CheckCircle className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500">No completed tasks yet</p>
                  <p className="text-sm text-slate-600 mt-1">Start completing tasks to see your activity</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Truck className="h-4 w-4 mr-2" />
                Start New Collection
              </Button>
              <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                <MapPin className="h-4 w-4 mr-2" />
                View Today's Route
              </Button>
              <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                <TrendingUp className="h-4 w-4 mr-2" />
                Performance Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Summary */}
      {tasks.length > 0 && (
        <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 mt-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center text-sm text-slate-400">
              <span>Total tasks assigned: {tasks.length}</span>
              <span>
                Completion rate: {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}