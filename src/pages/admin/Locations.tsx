import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Header } from "@/components/Header";
import { 
  Plus, 
  Edit, 
  Trash2, 
  MapPin,
  Search,
  Filter,
  Users,
  Truck
} from "lucide-react";

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
  const [locations, setLocations] = useState<Location[]>([
    {
      id: 1,
      name: "Downtown District",
      address: "Main Street Area",
      city: "City Center",
      zipCode: "12345",
      type: 'commercial',
      status: 'active',
      collectorAssigned: "John Smith",
      serviceFrequency: "Daily",
      lastService: "2024-01-15",
      customerCount: 45
    },
    {
      id: 2,
      name: "Residential Zone A",
      address: "Oak Avenue Neighborhood",
      city: "Suburb North",
      zipCode: "12346",
      type: 'residential',
      status: 'active',
      collectorAssigned: "Sarah Johnson",
      serviceFrequency: "Weekly",
      lastService: "2024-01-14",
      customerCount: 128
    },
    {
      id: 3,
      name: "Industrial Park",
      address: "Factory District",
      city: "Industrial Zone",
      zipCode: "12347",
      type: 'industrial',
      status: 'active',
      collectorAssigned: "Mike Wilson",
      serviceFrequency: "Bi-weekly",
      lastService: "2024-01-10",
      customerCount: 8
    }
  ]);

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

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || location.type === selectedType;
    const matchesStatus = selectedStatus === "all" || location.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.address && newLocation.city) {
      const location: Location = {
        id: locations.length + 1,
        name: newLocation.name,
        address: newLocation.address,
        city: newLocation.city,
        zipCode: newLocation.zipCode || "",
        type: newLocation.type || 'residential',
        status: newLocation.status || 'active',
        serviceFrequency: newLocation.serviceFrequency || "Weekly",
        customerCount: newLocation.customerCount || 0
      };
      setLocations([...locations, location]);
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
    }
  };

  const handleDeleteLocation = (id: number) => {
    setLocations(locations.filter(location => location.id !== id));
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
  };

  const handleUpdateLocation = () => {
    if (editingLocation) {
      setLocations(locations.map(l => l.id === editingLocation.id ? editingLocation : l));
      setEditingLocation(null);
    }
  };

  const getTotalCustomers = () => locations.reduce((sum, loc) => sum + loc.customerCount, 0);
  const getActiveLocations = () => locations.filter(loc => loc.status === 'active').length;
  const getLocationsByType = (type: string) => locations.filter(loc => loc.type === type).length;

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

        {/* Actions and Filters */}
        <Card className="mb-8 glass">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
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
                    <Filter className="h-4 w-4 mr-2" />
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
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary hover:shadow-glow">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Location
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Location</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div>
                      <Label htmlFor="name">Location Name</Label>
                      <Input
                        id="name"
                        value={newLocation.name}
                        onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                        placeholder="Enter location name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Location Type</Label>
                      <Select value={newLocation.type} onValueChange={(value: any) => setNewLocation({...newLocation, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
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
                        placeholder="Enter full address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={newLocation.city}
                        onChange={(e) => setNewLocation({...newLocation, city: e.target.value})}
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        value={newLocation.zipCode}
                        onChange={(e) => setNewLocation({...newLocation, zipCode: e.target.value})}
                        placeholder="Enter zip code"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frequency">Service Frequency</Label>
                      <Select value={newLocation.serviceFrequency} onValueChange={(value) => setNewLocation({...newLocation, serviceFrequency: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
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
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddLocation} className="bg-gradient-primary">
                      Add Location
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Locations Table */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Locations ({filteredLocations.length})</CardTitle>
          </CardHeader>
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
                {filteredLocations.map((location) => (
                  <TableRow key={location.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{location.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {location.address}, {location.city} {location.zipCode}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {location.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {location.collectorAssigned || "Unassigned"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{location.serviceFrequency}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{location.customerCount}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={location.status === 'active' ? "default" : "secondary"}>
                        {location.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditLocation(location)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteLocation(location.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
            <DialogHeader>
              <DialogTitle>Edit Location</DialogTitle>
            </DialogHeader>
            {editingLocation && (
              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <Label htmlFor="edit-name">Location Name</Label>
                  <Input
                    id="edit-name"
                    value={editingLocation.name}
                    onChange={(e) => setEditingLocation({...editingLocation, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-type">Location Type</Label>
                  <Select value={editingLocation.type} onValueChange={(value: any) => setEditingLocation({...editingLocation, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
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
                    onChange={(e) => setEditingLocation({...editingLocation, address: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-city">City</Label>
                  <Input
                    id="edit-city"
                    value={editingLocation.city}
                    onChange={(e) => setEditingLocation({...editingLocation, city: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-zipCode">Zip Code</Label>
                  <Input
                    id="edit-zipCode"
                    value={editingLocation.zipCode}
                    onChange={(e) => setEditingLocation({...editingLocation, zipCode: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-frequency">Service Frequency</Label>
                  <Select value={editingLocation.serviceFrequency} onValueChange={(value) => setEditingLocation({...editingLocation, serviceFrequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceFrequencies.map(freq => (
                        <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-customers">Customer Count</Label>
                  <Input
                    id="edit-customers"
                    type="number"
                    value={editingLocation.customerCount}
                    onChange={(e) => setEditingLocation({...editingLocation, customerCount: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingLocation(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateLocation} className="bg-gradient-primary">
                Update Location
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}