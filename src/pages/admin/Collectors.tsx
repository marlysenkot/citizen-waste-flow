import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Search, 
  Truck, 
  Users, 
  Plus,
  Mail,
  Phone,
  Star,
  Calendar,
  DollarSign,
  Package
} from "lucide-react";
import { Header } from "@/components/Header";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function AdminCollectors() {
  const [collectors, setCollectors] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Add Collector Modal State
  const [newCollector, setNewCollector] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch collectors from API
  useEffect(() => {
    const fetchCollectors = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/admin/collectors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setCollectors(data);
        }
      } catch (err) {
        console.error("Failed to fetch collectors:", err);
      }
    };
    fetchCollectors();
  }, []);

  const handleAddCollector = async () => {
    if (!newCollector.username || !newCollector.email || !newCollector.password) {
      setMessage("All fields are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/admin/collectors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCollector),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.detail || "Failed to create collector");
      } else {
        setMessage(data.msg);
        setNewCollector({ username: "", email: "", password: "" });

        // Refresh collectors list
        const collectorsRes = await fetch("http://127.0.0.1:8000/admin/collectors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const collectorsData = await collectorsRes.json();
        setCollectors(collectorsData);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Active": return "default";
      case "Inactive": return "secondary"; 
      case "Training": return "outline";
      case "Suspended": return "destructive";
      default: return "outline";
    }
  };

  const renderStars = (rating?: number) => {
    const r = rating ?? 0;
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i}
        className={`h-4 w-4 ${i < Math.floor(r) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const filteredCollectors = collectors.filter((c) => {
    const name = c.username || "";
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const status = c.status || "";
    const matchesStatus = 
      statusFilter === "all" ||
      (statusFilter === "active" && status === "Active") ||
      (statusFilter === "inactive" && status === "Inactive") ||
      (statusFilter === "training" && status === "Training") ||
      (statusFilter === "suspended" && status === "Suspended");
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: collectors.length,
    active: collectors.filter(c => c.status === "Active").length,
    inactive: collectors.filter(c => c.status === "Inactive").length,
    training: collectors.filter(c => c.status === "Training").length
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Collector Management</h1>
          <p className="text-muted-foreground">Manage your waste collection team and performance.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Collectors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.active}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.inactive}</div>
              <div className="text-sm text-muted-foreground">Inactive</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.training}</div>
              <div className="text-sm text-muted-foreground">In Training</div>
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
                  placeholder="Search collectors..." 
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
                  <SelectItem value="all">All Collectors</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                  <SelectItem value="training">In Training</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>

              {/* Add Collector Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Add Collector
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Collector</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-2 mt-2">
                    <Input 
                      placeholder="Username"
                      value={newCollector.username}
                      onChange={(e) => setNewCollector({ ...newCollector, username: e.target.value })}
                    />
                    <Input 
                      placeholder="Email"
                      type="email"
                      value={newCollector.email}
                      onChange={(e) => setNewCollector({ ...newCollector, email: e.target.value })}
                    />
                    <Input 
                      placeholder="Password"
                      type="password"
                      value={newCollector.password}
                      onChange={(e) => setNewCollector({ ...newCollector, password: e.target.value })}
                    />
                    {message && <p className="text-sm text-green-600">{message}</p>}
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddCollector} disabled={loading}>
                      {loading ? "Adding..." : "Add Collector"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            </div>
          </CardContent>
        </Card>

        {/* Collectors List */}
        <div className="space-y-4">
          {filteredCollectors.map((collector) => (
            <Card key={collector.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{collector.username || "Unknown"}</h3>
                      <Badge variant={getStatusColor(collector.status)}>{collector.status || "N/A"}</Badge>
                      <span className="text-sm text-muted-foreground">{collector.id || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(collector.rating)}</div>
                      <span className="text-sm font-medium">{collector.rating ?? 0}/5</span>
                      <span className="text-sm text-muted-foreground">
                        ({collector.totalCollections ?? 0} collections)
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {collector.email || "N/A"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {collector.phone || "N/A"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        {collector.vehicle || "N/A"} • {collector.license || "N/A"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Joined {collector.joinDate || "N/A"}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">This Month:</span>
                        <span className="font-medium">{collector.thisMonthCollections ?? 0} collections</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Earnings:</span>
                        <span className="font-medium">{collector.earnings || "$0"}</span>
                      </div>
                      <div className="text-muted-foreground">
                        Last Active: <span className="font-medium">{collector.lastActive || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button variant="outline" size="sm">View Tasks</Button>
                    </div>
                    <div className="flex gap-2">
                      {collector.status === "Active" && <Button variant="outline" size="sm">Assign Task</Button>}
                      {collector.status === "Inactive" && <Button variant="outline" size="sm">Reactivate</Button>}
                      <Button variant="ghost" size="sm">More Actions</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
