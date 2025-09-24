import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, MapPin, Calendar, Plus, Loader, Trash2, Edit, Truck, Recycle } from "lucide-react";
import axios from "axios";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";

interface Collection {
  id: string;
  location: string;
  status: string;
  date: string;
  notes?: string;
  collector_name?: string;
  estimated_time?: string;
}

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "scheduled" | "in-progress" | "completed">("all");

  const navigate = useNavigate();

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/citizens/collections", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCollections(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      console.error("Error fetching collections:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setCollections([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleSchedule = async () => {
    if (!location.trim()) {
      alert("Please enter a location");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.post(
        "http://localhost:8000/citizens/collections",
        { location, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Collection requested successfully!");
      setLocation("");
      setNotes("");
      fetchCollections();
    } catch (err: any) {
      console.error("Error requesting collection:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Failed to request collection");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "default";
      case "scheduled":
        return "secondary";
      case "in progress":
        return "outline";
      default:
        return "destructive";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "scheduled":
        return <Clock className="h-4 w-4" />;
      case "in progress":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-400";
      case "scheduled":
        return "text-blue-400";
      case "in progress":
        return "text-yellow-400";
      default:
        return "text-red-400";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 border-green-500/30";
      case "scheduled":
        return "bg-blue-500/20 border-blue-500/30";
      case "in progress":
        return "bg-yellow-500/20 border-yellow-500/30";
      default:
        return "bg-red-500/20 border-red-500/30";
    }
  };

  const filteredCollections = collections.filter(collection => {
    if (activeTab === "all") return true;
    return collection.status.toLowerCase() === activeTab.replace("-", " ");
  });

  const stats = {
    total: collections.length,
    scheduled: collections.filter(c => c.status.toLowerCase() === "scheduled").length,
    inProgress: collections.filter(c => c.status.toLowerCase() === "in progress").length,
    completed: collections.filter(c => c.status.toLowerCase() === "completed").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8 space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Waste Collection Management
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Schedule and track your waste collection requests in real-time
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Requests", value: stats.total, icon: Recycle, color: "bg-blue-500/20" },
            { label: "Scheduled", value: stats.scheduled, icon: Clock, color: "bg-yellow-500/20" },
            { label: "In Progress", value: stats.inProgress, icon: AlertCircle, color: "bg-orange-500/20" },
            { label: "Completed", value: stats.completed, icon: CheckCircle, color: "bg-green-500/20" },
          ].map((stat, index) => (
            <Card key={index} className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className={cn("p-3 rounded-full", stat.color)}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Schedule Collection Form */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 hover:border-green-500/30 transition-all duration-300">
              <CardHeader className="text-center border-b border-slate-700/50">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white">Request New Collection</CardTitle>
                <CardDescription className="text-slate-400">
                  Schedule a waste collection pickup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <label className="text-slate-300 font-medium flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Collection Location *</span>
                  </label>
                  <Input
                    placeholder="Enter your address or location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-slate-300 font-medium flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Additional Notes</span>
                  </label>
                  <Textarea
                    placeholder="Special instructions, waste type, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px]"
                  />
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-2.5 text-base font-semibold transition-all duration-300"
                  onClick={handleSchedule}
                  disabled={submitting || !location.trim()}
                >
                  {submitting ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Truck className="h-4 w-4 mr-2" />
                      Request Collection
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Collections List */}
          <div className="lg:col-span-2">
            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1 mb-6">
              {[
                { id: "all" as const, label: "All Requests", count: stats.total },
                { id: "scheduled" as const, label: "Scheduled", count: stats.scheduled },
                { id: "in-progress" as const, label: "In Progress", count: stats.inProgress },
                { id: "completed" as const, label: "Completed", count: stats.completed },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300",
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                      : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                  )}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Collections List */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="h-8 w-8 text-green-400 animate-spin mr-3" />
                <span className="text-slate-400">Loading collections...</span>
              </div>
            ) : filteredCollections.length === 0 ? (
              <Card className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50">
                <CardContent className="p-8 text-center">
                  <Truck className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-300 mb-2">
                    {activeTab === "all" ? "No collections yet" : `No ${activeTab.replace("-", " ")} collections`}
                  </h3>
                  <p className="text-slate-500">
                    {activeTab === "all" 
                      ? "Schedule your first waste collection request above."
                      : `You don't have any ${activeTab.replace("-", " ")} collections at the moment.`
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredCollections.map((collection) => (
                  <Card 
                    key={collection.id} 
                    className="bg-slate-800/40 backdrop-blur-sm border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant="secondary" 
                              className={cn(
                                "flex items-center gap-1.5 px-3 py-1.5 border",
                                getStatusBg(collection.status)
                              )}
                            >
                              {getStatusIcon(collection.status)}
                              <span className={getStatusColor(collection.status)}>
                                {collection.status}
                              </span>
                            </Badge>
                            
                            {collection.collector_name && (
                              <Badge variant="outline" className="bg-slate-700/50 text-slate-300">
                                Collector: {collection.collector_name}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-white">
                              <MapPin className="h-4 w-4 text-green-400" />
                              <span className="font-medium">{collection.location}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-slate-400 text-sm">
                              <Calendar className="h-4 w-4" />
                              <span>{collection.date}</span>
                              {collection.estimated_time && (
                                <>
                                  <span>•</span>
                                  <Clock className="h-4 w-4" />
                                  <span>Est: {collection.estimated_time}</span>
                                </>
                              )}
                            </div>
                            
                            {collection.notes && (
                              <p className="text-slate-400 text-sm bg-slate-700/30 rounded px-3 py-2">
                                {collection.notes}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}