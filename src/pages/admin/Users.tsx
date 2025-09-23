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
  Users, 
  UserCheck, 
  UserX, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  MoreHorizontal
} from "lucide-react";
import { Header } from "@/components/Header";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const users = [
    {
      id: "USR-001",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, City Center",
      joinDate: "2024-01-15",
      status: "Active",
      verified: true,
      totalOrders: 12,
      lastOrder: "2024-01-10"
    },
    {
      id: "USR-002", 
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Avenue, Downtown", 
      joinDate: "2024-01-10",
      status: "Active",
      verified: true,
      totalOrders: 8,
      lastOrder: "2024-01-12"
    },
    {
      id: "USR-003",
      name: "Mike Wilson", 
      email: "mike.w@email.com",
      phone: "+1 (555) 456-7890",
      address: "789 Pine Street, Suburb",
      joinDate: "2024-01-05",
      status: "Inactive",
      verified: false,
      totalOrders: 3,
      lastOrder: "2023-12-28"
    },
    {
      id: "USR-004",
      name: "Lisa Brown",
      email: "lisa.brown@email.com", 
      phone: "+1 (555) 234-5678",
      address: "321 Elm Drive, Eastside",
      joinDate: "2024-01-12",
      status: "Suspended",
      verified: true,
      totalOrders: 15,
      lastOrder: "2024-01-08"
    },
    {
      id: "USR-005",
      name: "David Lee",
      email: "david.lee@email.com",
      phone: "+1 (555) 345-6789",
      address: "654 Maple Lane, Westside",
      joinDate: "2024-01-08",
      status: "Active", 
      verified: true,
      totalOrders: 6,
      lastOrder: "2024-01-11"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Inactive": 
        return "secondary";
      case "Suspended":
        return "destructive";
      default:
        return "outline";
    }
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "Active").length,
    verified: users.filter(u => u.verified).length,
    newThisMonth: users.filter(u => u.joinDate >= "2024-01-01").length
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
          <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage citizen accounts and user verification.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <UserCheck className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.active}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <UserCheck className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.verified}</div>
              <div className="text-sm text-muted-foreground">Verified Users</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.newThisMonth}</div>
              <div className="text-sm text-muted-foreground">New This Month</div>
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
                  placeholder="Search users..." 
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
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                  <SelectItem value="suspended">Suspended Only</SelectItem>
                  <SelectItem value="unverified">Unverified Only</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                Export Users
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <Badge variant={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                        {user.verified && (
                          <Badge variant="outline" className="text-green-600">
                            <UserCheck className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {!user.verified && (
                          <Badge variant="outline" className="text-red-600">
                            <UserX className="h-3 w-3 mr-1" />
                            Unverified
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {user.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {user.address}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Joined {user.joinDate}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          Total Orders: <span className="font-medium text-foreground">{user.totalOrders}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Last Order: <span className="font-medium text-foreground">{user.lastOrder}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        {!user.verified && (
                          <Button variant="outline" size="sm">
                            Verify User
                          </Button>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Send Message
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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