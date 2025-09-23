import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";

export default function NewComplaint() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    orderId: "",
    description: "",
    contactPhone: ""
  });

  const handleSubmit = () => {
    // Mock submission
    alert("Complaint submitted successfully! Reference ID: COMP-004");
    navigate("/citizen/complaints");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/citizen/complaints" className="inline-flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Complaints
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Submit Complaint</h1>
          <p className="text-muted-foreground">Let us know about any issues with our services.</p>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief description of the issue"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select complaint category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="missed-collection">Missed Collection</SelectItem>
                    <SelectItem value="late-service">Late Service</SelectItem>
                    <SelectItem value="damaged-property">Damaged Property</SelectItem>
                    <SelectItem value="billing-issue">Billing Issue</SelectItem>
                    <SelectItem value="service-quality">Service Quality</SelectItem>
                    <SelectItem value="staff-behavior">Staff Behavior</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priority Level</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Minor inconvenience</SelectItem>
                    <SelectItem value="medium">Medium - Noticeable impact</SelectItem>
                    <SelectItem value="high">High - Significant issue</SelectItem>
                    <SelectItem value="urgent">Urgent - Immediate attention needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orderId">Related Order ID (Optional)</Label>
                <Input
                  id="orderId"
                  placeholder="e.g., ORD-001"
                  value={formData.orderId}
                  onChange={(e) => setFormData({...formData, orderId: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  placeholder="Your phone number for follow-up"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide a detailed description of the issue, including dates, times, and any other relevant information..."
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">What happens next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• You'll receive a reference ID for tracking</li>
                  <li>• Our team will review your complaint within 24 hours</li>
                  <li>• You'll be contacted for any additional information needed</li>
                  <li>• Regular updates will be provided until resolution</li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <Button className="flex-1" onClick={handleSubmit}>
                  Submit Complaint
                </Button>
                <Link to="/citizen/complaints">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}