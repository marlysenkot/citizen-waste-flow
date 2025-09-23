import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function AdminCollectors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const collectors = [
    {
      id: "COL-001",
      name: "Mike Johnson",
      email: "mike.j@ecowaste.com",
      phone: "+1 (555) 111-2222",
      joinDate: "2023-12-01",
      status: "Active",
      license: "WM-12345",
      vehicle: "Truck #101",
      rating: 4.9,
      totalCollections: 245,
      thisMonthCollections: 48,
      earnings: "$6,250",
      lastActive: "2024-01-15"
    },
    {
      id: "COL-002", 
      name: "Lisa Brown",
      email: "lisa.b@ecowaste.com",
      phone: "+1 (555) 333-4444",
      joinDate: "2024-01-01",
      status: "Active",
      license: "WM-12346",
      vehicle: "Truck #102",
      rating: 4.8,
      totalCollections: 189,
      thisMonthCollections: 45,
      earnings: "$5,890",
      lastActive: "2024-01-15"
    },
    {
      id: "COL-003",
      name: "Tom Wilson",
      email: "tom.w@ecowaste.com", 
      phone: "+1 (555) 777-8888",
      joinDate: "2023-11-15",
      status: "Inactive",
      license: "WM-12347",
      vehicle: "Truck #103", 
      rating: 4.7,
      totalCollections: 198,
      thisMonthCollections: 42,
      earnings: "$5,640",
      lastActive: "2024-01-12"
    },
    {
      id: "COL-004",
      name: "Sarah Davis",
      email: "sarah.d@ecowaste.com",
      phone: "+1 (555) 999-0000",
      joinDate: "2023-10-20",
      status: "Active", 
      license: "WM-12348",
      vehicle: "Truck #104",
      rating: 4.6,
      totalCollections: 167,
      thisMonthCollections: 39,
      earnings: "$5,230",
      lastActive: "2024-01-14"
    },
    {
      id: "COL-005",
      name: "Robert Garcia",
      email: "robert.g@ecowaste.com",
      phone: "+1 (555) 555-6666",
      joinDate: "2024-01-05", 
      status: "Training",
      license: "WM-12349",
      vehicle: "Truck #105",
      rating: 4.3,
      totalCollections: 23,
      thisMonthCollections: 15,
      earnings: "$890",
      lastActive: "2024-01-15"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Inactive":
        return "secondary"; 
      case "Training":
        return "outline";
      case "Suspended":
        return "destructive";
      default:
        return "outline";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

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
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Collector
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Collectors List */}
        <div className="space-y-4">
          {collectors.map((collector) => (
            <Card key={collector.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{collector.name}</h3>
                      <Badge variant={getStatusColor(collector.status)}>
                        {collector.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{collector.id}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex">{renderStars(collector.rating)}</div>
                      <span className="text-sm font-medium">{collector.rating}/5</span>
                      <span className="text-sm text-muted-foreground">
                        ({collector.totalCollections} collections)
                      </span>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {collector.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {collector.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        {collector.vehicle} • {collector.license}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Joined {collector.joinDate}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">This Month:</span>
                        <span className="font-medium">{collector.thisMonthCollections} collections</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Earnings:</span>
                        <span className="font-medium">{collector.earnings}</span>
                      </div>
                      <div className="text-muted-foreground">
                        Last Active: <span className="font-medium">{collector.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        View Tasks
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      {collector.status === "Active" && (
                        <Button variant="outline" size="sm">
                          Assign Task
                        </Button>
                      )}
                      {collector.status === "Inactive" && (
                        <Button variant="outline" size="sm">
                          Reactivate
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        More Actions
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}