import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  ArrowRight,
  Users,
  Headphones
} from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our customer service team",
    info: "+(237) 696 588 373",
    action: "Call Now",
    available: "24/7 Support"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us your questions and we'll respond quickly",
    info: "support@ecowaste.com",
    action: "Send Email",
    available: "Response within 2 hours"
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Get instant help from our support agents",
    info: "Available on website",
    action: "Start Chat",
    available: "Mon-Fri 8AM-8PM"
  }
];

const offices = [
  {
    city: "Yaounde",
    address: "123 IAI-Cameroon, Awae-Escalier, AE 101",
    phone: "+(237) 696 588 373",
    hours: "Mon-Fri: 8AM-6PM"
  },
  {
    city: "Douala",
    address: "456 Rue, Bepanda, 210", 
    phone: "+(237) 699 816 6331",
    hours: "Mon-Fri: 8AM-6PM"
  },
  {
    city: "",
    address: "789 Waste St, Chicago, IL 60601",
    phone: "+1 (555) 456-7890", 
    hours: "Mon-Fri: 8AM-6PM"
  }
];

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-glass animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge className="mb-4">Get In Touch</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Contact Our Expert Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our services? Need a custom solution? 
            Our team is here to help you find the perfect waste management solution.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <method.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{method.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{method.description}</p>
                <div className="space-y-2">
                  <div className="font-semibold text-foreground">{method.info}</div>
                  <div className="text-sm text-muted-foreground">{method.available}</div>
                </div>
                <Button className="w-full">
                  {method.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Office Locations */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Our Office Locations
            </h3>
            <p className="text-lg text-muted-foreground">
              Visit us at any of our conveniently located offices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold">{office.city}</h4>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">{office.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{office.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{office.hours}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Contact Form */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Need Immediate Assistance?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Our customer service team is available 24/7 to help you with emergency collections, 
                service issues, or any urgent waste management needs.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Headphones className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">24/7 Emergency Hotline</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">Dedicated Account Managers</span>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <div className="text-3xl font-bold text-primary mb-2">
                +1 (555) 911-WASTE
              </div>
              <div className="text-muted-foreground mb-6">Emergency & Priority Support</div>
              <div className="space-y-3">
                <Button size="lg" className="w-full lg:w-auto">
                  Call Emergency Line
                  <Phone className="ml-2 h-5 w-5" />
                </Button>
                <div className="text-sm text-muted-foreground">
                  For non-emergency inquiries, use our regular contact methods above
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};