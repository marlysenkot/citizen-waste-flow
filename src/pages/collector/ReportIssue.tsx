import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle,
  Camera,
  MapPin,
  Clock,
  Send,
  FileText
} from "lucide-react";

export default function CollectorReportIssue() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [reportData, setReportData] = useState({
    issueType: "",
    severity: "",
    location: "",
    orderId: "",
    description: "",
    customerContact: "",
    images: [] as File[]
  });

  const issueTypes = [
    { value: "access-denied", label: "Access Denied to Property" },
    { value: "hazardous-waste", label: "Hazardous Waste Found" },
    { value: "overweight-bin", label: "Overweight/Oversized Bin" },
    { value: "contaminated-recycling", label: "Contaminated Recycling" },
    { value: "blocked-access", label: "Blocked Access Route" },
    { value: "vehicle-breakdown", label: "Vehicle Breakdown" },
    { value: "aggressive-customer", label: "Aggressive Customer Behavior" },
    { value: "safety-concern", label: "Safety Concern" },
    { value: "equipment-malfunction", label: "Equipment Malfunction" },
    { value: "other", label: "Other Issue" }
  ];

  const severityLevels = [
    { value: "low", label: "Low - Minor inconvenience" },
    { value: "medium", label: "Medium - Affects collection" },
    { value: "high", label: "High - Safety risk" },
    { value: "critical", label: "Critical - Immediate attention needed" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportData.issueType || !reportData.severity || !reportData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Issue Reported Successfully",
        description: "Your issue has been submitted and will be reviewed by our team.",
      });
      
      // Reset form
      setReportData({
        issueType: "",
        severity: "",
        location: "",
        orderId: "",
        description: "",
        customerContact: "",
        images: []
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setReportData({
      ...reportData,
      images: [...reportData.images, ...files].slice(0, 5) // Max 5 images
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-destructive';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Report an Issue</h1>
            <p className="text-muted-foreground">
              Report any problems encountered during your collection route
            </p>
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Issue Report Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Issue Type */}
                <div>
                  <Label htmlFor="issueType">Issue Type *</Label>
                  <Select value={reportData.issueType} onValueChange={(value) => setReportData({...reportData, issueType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of issue" />
                    </SelectTrigger>
                    <SelectContent>
                      {issueTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Severity Level */}
                <div>
                  <Label htmlFor="severity">Severity Level *</Label>
                  <Select value={reportData.severity} onValueChange={(value) => setReportData({...reportData, severity: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity level" />
                    </SelectTrigger>
                    <SelectContent>
                      {severityLevels.map(level => (
                        <SelectItem key={level.value} value={level.value}>
                          <span className={getSeverityColor(level.value)}>
                            {level.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location and Order ID */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="location"
                        value={reportData.location}
                        onChange={(e) => setReportData({...reportData, location: e.target.value})}
                        placeholder="Enter location/address"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="orderId">Order ID (if applicable)</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="orderId"
                        value={reportData.orderId}
                        onChange={(e) => setReportData({...reportData, orderId: e.target.value})}
                        placeholder="ORD-001"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Customer Contact */}
                <div>
                  <Label htmlFor="customerContact">Customer Contact (if applicable)</Label>
                  <Input
                    id="customerContact"
                    value={reportData.customerContact}
                    onChange={(e) => setReportData({...reportData, customerContact: e.target.value})}
                    placeholder="Customer name or phone number"
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Issue Description *</Label>
                  <Textarea
                    id="description"
                    value={reportData.description}
                    onChange={(e) => setReportData({...reportData, description: e.target.value})}
                    placeholder="Provide detailed information about the issue, including what happened, when it occurred, and any relevant circumstances."
                    rows={5}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <Label htmlFor="images">Supporting Images (optional)</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('imageInput')?.click()}
                        className="hover-lift"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Add Photos ({reportData.images.length}/5)
                      </Button>
                      <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    
                    {reportData.images.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Selected files: {reportData.images.map(file => file.name).join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-primary hover:shadow-glow"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Issue Report
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="hover-lift"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Emergency Contact Info */}
          <Card className="mt-6 glass border-warning/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                <div className="space-y-2">
                  <div className="font-medium text-warning">Emergency Situations</div>
                  <p className="text-sm text-muted-foreground">
                    For immediate safety concerns, vehicle breakdowns, or critical issues, 
                    call our emergency hotline directly: <strong>(555) 911-HELP</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}