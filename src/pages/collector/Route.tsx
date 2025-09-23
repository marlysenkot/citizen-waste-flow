import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { 
  Route as RouteIcon,
  MapPin,
  Clock,
  Truck,
  Navigation,
  Zap,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface RouteStop {
  id: string;
  orderId: string;
  address: string;
  customer: string;
  service: string;
  estimatedTime: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'optimized' | 'completed';
}

export default function CollectorRoute() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);
  
  const [routeStops, setRouteStops] = useState<RouteStop[]>([
    {
      id: "STOP-001",
      orderId: "ORD-002",
      address: "123 Main Street, City Center",
      customer: "John Doe",
      service: "Recycling Collection",
      estimatedTime: "10:00 AM",
      priority: 'high',
      status: 'pending'
    },
    {
      id: "STOP-002",
      orderId: "ORD-005",
      address: "456 Oak Avenue, Downtown",
      customer: "Sarah Johnson",
      service: "Household Waste",
      estimatedTime: "11:30 AM",
      priority: 'medium',
      status: 'pending'
    },
    {
      id: "STOP-003",
      orderId: "ORD-006",
      address: "789 Pine Street, Suburb",
      customer: "Mike Wilson",
      service: "Bulk Item Pickup",
      estimatedTime: "2:00 PM",
      priority: 'high',
      status: 'pending'
    },
    {
      id: "STOP-004",
      orderId: "ORD-008",
      address: "321 Elm Drive, Westside",
      customer: "Lisa Brown",
      service: "Recycling Collection",
      estimatedTime: "3:30 PM",
      priority: 'low',
      status: 'pending'
    }
  ]);

  const optimizedStops = [
    {
      id: "STOP-001",
      orderId: "ORD-002",
      address: "123 Main Street, City Center",
      customer: "John Doe",
      service: "Recycling Collection",
      estimatedTime: "9:30 AM",
      priority: 'high' as const,
      status: 'optimized' as const
    },
    {
      id: "STOP-002",
      orderId: "ORD-005",
      address: "456 Oak Avenue, Downtown", 
      customer: "Sarah Johnson",
      service: "Household Waste",
      estimatedTime: "10:15 AM",
      priority: 'medium' as const,
      status: 'optimized' as const
    },
    {
      id: "STOP-004",
      orderId: "ORD-008",
      address: "321 Elm Drive, Westside",
      customer: "Lisa Brown", 
      service: "Recycling Collection",
      estimatedTime: "11:45 AM",
      priority: 'low' as const,
      status: 'optimized' as const
    },
    {
      id: "STOP-003",
      orderId: "ORD-006",
      address: "789 Pine Street, Suburb",
      customer: "Mike Wilson",
      service: "Bulk Item Pickup", 
      estimatedTime: "1:30 PM",
      priority: 'high' as const,
      status: 'optimized' as const
    }
  ];

  const handleOptimizeRoute = () => {
    setIsOptimizing(true);
    
    setTimeout(() => {
      setRouteStops(optimizedStops);
      setIsOptimizing(false);
      setIsOptimized(true);
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimized': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const totalDistance = isOptimized ? "32.4 km" : "45.8 km";
  const estimatedTime = isOptimized ? "4h 30m" : "6h 15m";
  const fuelSavings = isOptimized ? "18%" : "0%";

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Route Optimization</h1>
          <p className="text-muted-foreground">Optimize your collection route for maximum efficiency</p>
        </div>

        {/* Route Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass hover-lift">
            <CardContent className="p-6 text-center">
              <Truck className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary">{totalDistance}</div>
              <div className="text-sm text-muted-foreground">Total Distance</div>
              {isOptimized && (
                <Badge variant="secondary" className="mt-2 text-xs">
                  -13.4 km saved
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-accent">{estimatedTime}</div>
              <div className="text-sm text-muted-foreground">Estimated Time</div>
              {isOptimized && (
                <Badge variant="secondary" className="mt-2 text-xs">
                  -1h 45m saved
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold text-success">{fuelSavings}</div>
              <div className="text-sm text-muted-foreground">Fuel Savings</div>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-warning mx-auto mb-3" />
              <div className="text-2xl font-bold text-warning">{routeStops.length}</div>
              <div className="text-sm text-muted-foreground">Total Stops</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Route Stops */}
          <div className="lg:col-span-2">
            <Card className="glass">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <RouteIcon className="h-5 w-5" />
                  Collection Route
                </CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleOptimizeRoute}
                    disabled={isOptimizing}
                    className="hover-lift"
                  >
                    {isOptimizing ? (
                      <>Optimizing...</>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Optimize Route
                      </>
                    )}
                  </Button>
                  {isOptimized && (
                    <Button size="sm" className="bg-gradient-primary">
                      <Navigation className="h-4 w-4 mr-2" />
                      Start Navigation
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isOptimized && (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2 text-success">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Route Optimized!</span>
                    </div>
                    <p className="text-sm text-success/80 mt-1">
                      New route saves you 1h 45m and 13.4 km. Ready to start navigation.
                    </p>
                  </div>
                )}

                {routeStops.map((stop, index) => (
                  <div key={stop.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(stop.status)}
                        <Badge variant={getPriorityColor(stop.priority)} className="text-xs">
                          {stop.priority} priority
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {stop.orderId}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="font-medium">{stop.service}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {stop.address}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Customer: {stop.customer}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium text-primary">{stop.estimatedTime}</div>
                      {stop.status === 'optimized' && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Optimized
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Route Analytics */}
          <div className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Route Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Optimization Status</span>
                  <Badge variant={isOptimized ? "default" : "outline"}>
                    {isOptimized ? "Optimized" : "Not Optimized"}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">High Priority Stops</span>
                  <span className="font-medium">
                    {routeStops.filter(stop => stop.priority === 'high').length}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">CO₂ Reduction</span>
                  <span className="font-medium text-success">
                    {isOptimized ? "3.2 kg" : "0 kg"}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Efficiency Score</span>
                  <Badge variant={isOptimized ? "default" : "secondary"}>
                    {isOptimized ? "95%" : "72%"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Group nearby locations</div>
                    <div className="text-muted-foreground">Minimize travel distance</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Prioritize urgent requests</div>
                    <div className="text-muted-foreground">Handle high-priority stops first</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-primary mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Consider traffic patterns</div>
                    <div className="text-muted-foreground">Avoid rush hour areas</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}