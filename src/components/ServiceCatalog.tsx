import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Trash2,
  Recycle,
  Package,
  Home,
  Building,
  Calendar,
  Clock,
  DollarSign,
  Phone,
  ArrowRight
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Household Waste Collection",
    description: "Regular collection of general household waste with flexible scheduling options.",
    icon: Home,
    category: "Residential",
    frequency: "Weekly/Bi-weekly",
    features: ["Flexible scheduling", "SMS notifications", "Eco-friendly disposal"],
    popular: true
  },
  {
    id: 2,
    title: "Recycling Collection",
    description: "Comprehensive recycling service for paper, plastic, glass, and metal materials.",
    icon: Recycle,
    category: "Recycling",
    frequency: "Weekly",
    features: ["Material sorting", "Environmental reports", "Pickup reminders"],
    popular: false
  },
  {
    id: 3,
    title: "Commercial Waste",
    description: "Tailored waste management solutions for businesses and commercial properties.",
    icon: Building,
    category: "Commercial",
    frequency: "Daily/Custom",
    features: ["Volume discounts", "Contract options", "Compliance reporting"],
    popular: false
  },
  {
    id: 4,
    title: "Bulk Item Pickup",
    description: "Collection service for large items like furniture, appliances, and electronics.",
    icon: Package,
    category: "Special",
    frequency: "On-demand",
    features: ["Same-day booking", "Heavy item handling", "Recycling priority"],
    popular: false
  },
  {
    id: 5,
    title: "Hazardous Waste",
    description: "Safe disposal of hazardous materials including chemicals, batteries, and electronics.",
    icon: Trash2,
    category: "Special",
    frequency: "Monthly",
    features: ["Safe handling", "Certified disposal", "Environmental compliance"],
    popular: false
  },
  {
    id: 6,
    title: "Express Collection",
    description: "Same-day or next-day collection service for urgent waste removal needs.",
    icon: Clock,
    category: "Express",
    frequency: "On-demand",
    features: ["Same-day service", "Priority handling", "Real-time tracking"],
    popular: true
  }
];

export const ServiceCatalog = () => {
  return (
    <section id="services" className="py-20 bg-gradient-card animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 animate-fade-in-up">
          <Badge className="mb-4 bg-gradient-primary">Our Services</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Complete Waste Management Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose from our comprehensive range of waste management and recycling services 
            designed to meet your specific needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.id} 
              className="relative hover:shadow-glow transition-all duration-500 border-border/50 hover:border-primary/30 group glass hover-lift"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {service.popular && (
                <Badge className="absolute -top-2 left-4 bg-gradient-primary text-white shadow-glow animate-pulse-glow">
                  Popular Choice
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-primary rounded-lg group-hover:animate-bounce-subtle">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs mb-2 border-primary/20">
                      {service.category}
                    </Badge>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm glass rounded-lg p-2">
                    <span className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1 text-accent" />
                      Frequency
                    </span>
                    <span className="font-semibold text-accent">{service.frequency}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-primary">Key Features:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center hover-lift">
                        <div className="w-2 h-2 bg-gradient-primary rounded-full mr-3 animate-pulse-glow" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className={`w-full transition-all duration-300 ${
                    service.popular 
                      ? 'bg-gradient-primary hover:shadow-glow' 
                      : 'hover-lift'
                  }`}
                  variant={service.popular ? "default" : "outline"}
                  onClick={() => {
                    const element = document.getElementById('contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Schedule Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <div className="glass rounded-2xl p-6 inline-block">
            <h3 className="text-xl font-semibold mb-4">Need Custom Service Solutions?</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Contact our team to discuss personalized waste management plans for your specific requirements
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="hover-glow transition-all duration-300"
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Us
              <Phone className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};