import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Header } from "@/components/Header";
import { Plus, Edit, Trash2, MapPin, Search, Users, Truck } from "lucide-react";

interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  type: 'residential' | 'commercial' | 'industrial';
  status: 'active' | 'inactive';
  collectorAssigned?: string;
  serviceFrequency: string;
  lastService?: string;
  customerCount: number;
}

export default function AdminLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    name: "",
    address: "",
    city: "",
    zipCode: "",
    type: 'residential',
    status: 'active',
    serviceFrequency: "Weekly",
    customerCount: 0
  });

  const locationTypes = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' }
  ];
  const serviceFrequencies = ["Daily", "Weekly", "Bi-weekly", "Monthly"];

  // Fetch locations from backend
  const fetchLocations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/admin/locations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch locations");
      const data = await res.json();
      setLocations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Filtered locations for search/type/status
  const filteredLocations = Array.isArray(locations)
    ? locations.filter(loc => {
        const matchesSearch =
          loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loc.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loc.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === "all" || loc.type === selectedType;
        const matchesStatus = selectedStatus === "all" || loc.status === selectedStatus;
        return matchesSearch && matchesType && matchesStatus;
      })
    : [];

  // Add new location via backend
  const handleAddLocation = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:8000/admin/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newLocation),
      });
      if (!res.ok) throw new Error("Failed to add location");
      await fetchLocations();
      setNewLocation({
        name: "",
        address: "",
        city: "",
        zipCode: "",
        type: 'residential',
        status: 'active',
        serviceFrequency: "Weekly",
        customerCount: 0
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete location
  const handleDeleteLocation = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/admin/locations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete location");
      await fetchLocations();
    } catch (error) {
      console.error(error);
    }
  };

  // Update location
  const handleUpdateLocation = async () => {
    if (!editingLocation) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/admin/locations/${editingLocation.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingLocation),
      });
      if (!res.ok) throw new Error("Failed to update location");
      setEditingLocation(null);
      await fetchLocations();
    } catch (error) {
      console.error(error);
    }
  };

  // Stats helpers
  const getTotalCustomers = () => locations.reduce((sum, loc) => sum + loc.customerCount, 0);
  const getActiveLocations = () => locations.filter(loc => loc.status === 'active').length;
  const getLocationsByType = (type: string) => locations.filter(loc => loc.type === type).length;

  if (loading) return <div>Loading locations...</div>;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Location Management</h1>
          <p className="text-muted-foreground">Manage service locations, assignments, and schedules</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass hover-lift">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary">{locations.length}</div>
              <div className="text-sm text-muted-foreground">Total Locations</div>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardContent className="p-6 text-center">
              <Badge className="h-8 w-8 text-success mx-auto mb-3 flex items-center justify-center">✓</Badge>
              <div className="text-2xl font-bold text-success">{getActiveLocations()}</div>
              <div className="text-sm text-muted-foreground">Active Locations</div>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-accent">{getTotalCustomers()}</div>
              <div className="text-sm text-muted-foreground">Total Customers</div>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardContent className="p-6 text-center">
              <Truck className="h-8 w-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold text-warning">{getLocationsByType('commercial')}</div>
              <div className="text-sm text-muted-foreground">Commercial Zones</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions & Filters */}
        <Card className="mb-8 glass">
          <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {locationTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Add Location Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary hover:shadow-glow">
                  <Plus className="h-4 w-4 mr-2" /> Add Location
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader><DialogTitle>Add New Location</DialogTitle></DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div>
                    <Label htmlFor="name">Location Name</Label>
                    <Input
                      id="name"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newLocation.type}
                      onValueChange={(v) => setNewLocation({...newLocation, type: v as 'residential' | 'commercial' | 'industrial'})}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {locationTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newLocation.address}
                      onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={newLocation.city}
                      onChange={(e) => setNewLocation({...newLocation, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input
                      id="zip"
                      value={newLocation.zipCode}
                      onChange={(e) => setNewLocation({...newLocation, zipCode: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="frequency">Service Frequency</Label>
                    <Select
                      value={newLocation.serviceFrequency}
                      onValueChange={(v) => setNewLocation({...newLocation, serviceFrequency: v})}
                    >
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {serviceFrequencies.map(freq => (
                          <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="customers">Customer Count</Label>
                    <Input
                      id="customers"
                      type="number"
                      value={newLocation.customerCount}
                      onChange={(e) => setNewLocation({...newLocation, customerCount: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddLocation} className="bg-gradient-primary">Add Location</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Locations Table */}
        <Card className="glass">
          <CardHeader><CardTitle>Locations ({filteredLocations.length})</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Collector</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Customers</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLocations.map(loc => (
                  <TableRow key={loc.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{loc.name}</div>
                        <div className="text-sm text-muted-foreground">{loc.address}, {loc.city} {loc.zipCode}</div>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="capitalize">{loc.type}</Badge></TableCell>
                    <TableCell>{loc.collectorAssigned || "Unassigned"}</TableCell>
                    <TableCell><Badge variant="secondary">{loc.serviceFrequency}</Badge></TableCell>
                    <TableCell>{loc.customerCount}</TableCell>
                    <TableCell><Badge variant={loc.status === 'active' ? "default" : "secondary"}>{loc.status}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingLocation(loc)}><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteLocation(loc.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Location Dialog */}
        <Dialog open={!!editingLocation} onOpenChange={() => setEditingLocation(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Edit Location</DialogTitle></DialogHeader>
            {editingLocation && (
              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <Label htmlFor="edit-name">Location Name</Label>
                  <Input
                    id="edit-name"
                    value={editingLocation.name}
                    onChange={e => setEditingLocation({...editingLocation, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-type">Type</Label>
                  <Select
                    value={editingLocation.type}
                    onValueChange={(v) => setEditingLocation({...editingLocation, type: v as 'residential' | 'commercial' | 'industrial'})}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {locationTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="edit-address">Address</Label>
                  <Input
                    id="edit-address"
                    value={editingLocation.address}
                    onChange={e => setEditingLocation({...editingLocation, address: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-city">City</Label>
                  <Input
                    id="edit-city"
                    value={editingLocation.city}
                    onChange={e => setEditingLocation({...editingLocation, city: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-zip">Zip Code</Label>
                  <Input
                    id="edit-zip"
                    value={editingLocation.zipCode}
                    onChange={e => setEditingLocation({...editingLocation, zipCode: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-frequency">Service Frequency</Label>
                  <Select
                    value={editingLocation.serviceFrequency}
                    onValueChange={(v) => setEditingLocation({...editingLocation, serviceFrequency: v})}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {serviceFrequencies.map(freq => <SelectItem key={freq} value={freq}>{freq}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-customers">Customer Count</Label>
                  <Input
                    id="edit-customers"
                    type="number"
                    value={editingLocation.customerCount}
                    onChange={e => setEditingLocation({...editingLocation, customerCount: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingLocation(null)}>Cancel</Button>
              <Button onClick={handleUpdateLocation} className="bg-gradient-primary">Update Location</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
