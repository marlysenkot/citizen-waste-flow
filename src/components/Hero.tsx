import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Recycle,
  Truck,
  Calendar,
  Phone,
  ArrowRight
} from "lucide-react";
import heroImage from "@/assets/hero-waste-management.jpg";

export const Hero = () => {
  return (
    <section id="hero" className="relative py-20 lg:py-32 overflow-hidden bg-gradient-hero animate-gradient">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern waste management and recycling services"
          className="w-full h-full object-cover opacity-20 animate-float"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/80" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Smart Waste</span>
                <span className="text-primary block animate-slide-in-left">Management</span>
                <span className="text-accent animate-slide-in-right">Solutions</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg animate-fade-in">
                Efficient, sustainable waste collection and recycling services for a cleaner tomorrow. 
                Schedule collections, track orders, and contribute to environmental sustainability.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-gradient-primary hover-glow transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById('services');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Schedule Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 hover-lift glass transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById('products');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Browse Services
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 animate-fade-in">
              <div className="text-center hover-lift">
                <div className="text-2xl font-bold text-primary animate-pulse-scale">500+</div>
                <div className="text-sm text-muted-foreground">Active Collectors</div>
              </div>
              <div className="text-center hover-lift">
                <div className="text-2xl font-bold text-accent animate-pulse-scale">25K+</div>
                <div className="text-sm text-muted-foreground">Collections Made</div>
              </div>
              <div className="text-center hover-lift">
                <div className="text-2xl font-bold text-success animate-pulse-scale">98%</div>
                <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="space-y-6 animate-slide-in-right">
            <Card className="border-primary/20 hover:border-primary/40 hover-lift glass transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-primary rounded-lg animate-pulse-glow">
                    <Recycle className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Recycling Services</h3>
                    <p className="text-muted-foreground">
                      Comprehensive recycling programs for all material types
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 hover:border-accent/40 hover-lift glass transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-accent rounded-lg animate-pulse-glow">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Collection Services</h3>
                    <p className="text-muted-foreground">
                      Regular and on-demand waste collection for homes and businesses
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-success/20 hover:border-success/40 hover-lift glass transition-all duration-500">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-success rounded-lg animate-bounce-subtle">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Flexible Scheduling</h3>
                    <p className="text-muted-foreground">
                      Schedule collections that fit your timeline and needs
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};