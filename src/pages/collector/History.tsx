import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Search, 
  Calendar,
  CheckCircle,
  MapPin,
  Clock,
  Star
} from "lucide-react";
import { Header } from "@/components/Header";

export default function CollectorHistory() {
  const completedTasks = [
    {
      id: "TASK-098",
      orderId: "ORD-198",
      date: "2024-01-10",
      service: "Household Waste Collection",
      address: "456 Oak Avenue, Downtown",
      customer: "Sarah Johnson",
      completedAt: "11:45 AM",
      rating: 5,
      feedback: "Excellent service, very professional!",
      earnings: "$15.00"
    },
    {
      id: "TASK-097",
      orderId: "ORD-197", 
      date: "2024-01-10",
      service: "Recycling Collection",
      address: "789 Pine Street, Suburb",
      customer: "Mike Wilson",
      completedAt: "2:30 PM",
      rating: 4,
      feedback: "Good service, on time.",
      earnings: "$10.00"
    },
    {
      id: "TASK-096",
      orderId: "ORD-196",
      date: "2024-01-09", 
      service: "Bulk Item Pickup",
      address: "321 Elm Drive, Eastside",
      customer: "Lisa Brown",
      completedAt: "10:15 AM",
      rating: 5,
      feedback: "Great job handling heavy items!",
      earnings: "$25.00"
    },
    {
      id: "TASK-095",
      orderId: "ORD-195",
      date: "2024-01-09",
      service: "Express Collection", 
      address: "654 Maple Lane, Westside",
      customer: "David Lee",
      completedAt: "4:00 PM",
      rating: 4,
      feedback: "Fast and efficient service.",
      earnings: "$35.00"
    },
    {
      id: "TASK-094",
      orderId: "ORD-194",
      date: "2024-01-08",
      service: "Hazardous Waste",
      address: "987 Cedar Road, Northside", 
      customer: "Emma Davis",
      completedAt: "9:30 AM",
      rating: 5,
      feedback: "Very careful with hazardous materials.",
      earnings: "$20.00"
    }
  ];

  const weeklyStats = {
    totalEarnings: "$105.00",
    avgRating: 4.6,
    totalCollections: 5,
    onTimeRate: "100%"
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/collector/dashboard" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Collection History</h1>
          <p className="text-muted-foreground">Review your completed collections and performance metrics.</p>
        </div>

        {/* Weekly Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{weeklyStats.totalEarnings}</div>
              <div className="text-sm text-muted-foreground">Total Earnings</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{weeklyStats.avgRating}</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{weeklyStats.totalCollections}</div>
              <div className="text-sm text-muted-foreground">Collections</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{weeklyStats.onTimeRate}</div>
              <div className="text-sm text-muted-foreground">On-Time Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input placeholder="Search by customer or address..." className="pl-10" />
              </div>
              <Select defaultValue="week">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* History List */}
        <div className="space-y-4">
          {completedTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="default" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Completed
                      </Badge>
                      <span className="text-sm font-medium text-muted-foreground">{task.orderId}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold">{task.service}</h3>
                    
                    <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {task.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Completed at {task.completedAt}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {task.address}
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="text-muted-foreground">Customer: </span>
                      <span className="font-medium">{task.customer}</span>
                    </div>
                    
                    {/* Rating and Feedback */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(task.rating)}</div>
                        <span className="text-sm font-medium">{task.rating}/5</span>
                      </div>
                      {task.feedback && (
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <p className="text-sm italic">"{task.feedback}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-xl font-bold text-primary">{task.earnings}</div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
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