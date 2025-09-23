import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Search, 
  MessageSquare, 
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { Header } from "@/components/Header";

export default function Complaints() {
  const complaints = [
    {
      id: "COMP-001",
      subject: "Missed Collection",
      description: "My scheduled collection was missed on January 8th. No notification was provided.",
      status: "Under Review",
      date: "2024-01-08",
      priority: "Medium",
      response: "We are investigating this issue and will get back to you within 24 hours."
    },
    {
      id: "COMP-002",
      subject: "Damaged Bin",
      description: "My recycling bin was damaged during the last collection. Requesting replacement.",
      status: "Resolved",
      date: "2024-01-05",
      priority: "Low",
      response: "A new recycling bin has been scheduled for delivery on January 10th."
    },
    {
      id: "COMP-003",
      subject: "Late Collection",
      description: "Collection service was 3 hours late without prior notification.",
      status: "Open",
      date: "2024-01-12",
      priority: "High",
      response: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "Under Review":
        return <Clock className="h-4 w-4" />;
      case "Open":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Resolved":
        return "default";
      case "Under Review":
        return "secondary";
      case "Open":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/citizen/dashboard" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Complaints & Feedback</h1>
          <p className="text-muted-foreground">Submit and track your service complaints and feedback.</p>
        </div>

        {/* Search and New Complaint */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input placeholder="Search complaints..." className="pl-10" />
              </div>
              <Link to="/citizen/complaints/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Complaint
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Complaints List */}
        <div className="space-y-4">
          {complaints.map((complaint) => (
            <Card key={complaint.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Badge variant={getStatusVariant(complaint.status)} className="flex items-center gap-1">
                        {getStatusIcon(complaint.status)}
                        {complaint.status}
                      </Badge>
                      <span className="text-sm font-medium text-muted-foreground">{complaint.id}</span>
                      <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
                        {complaint.priority} Priority
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{complaint.date}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{complaint.subject}</h3>
                    <p className="text-muted-foreground">{complaint.description}</p>
                  </div>
                  
                  {complaint.response && (
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Response
                      </h4>
                      <p className="text-sm text-muted-foreground">{complaint.response}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                    {complaint.status === "Open" && (
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state if no complaints */}
        {complaints.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No complaints submitted</h3>
              <p className="text-muted-foreground mb-4">
                You haven't submitted any complaints yet. If you experience any issues with our services, don't hesitate to reach out.
              </p>
              <Link to="/citizen/complaints/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Submit First Complaint
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}