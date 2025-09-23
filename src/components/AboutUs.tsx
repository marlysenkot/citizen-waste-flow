import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award,
  Users,
  Globe,
  Recycle,
  Target,
  Heart,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const stats = [
  { label: "Years of Experience", value: "2+", icon: Award },
  { label: "Happy Customers", value: "10,000+", icon: Users },
  { label: "Cities Served", value: "50+", icon: Globe },
  { label: "Tons Recycled", value: "1M+", icon: Recycle }
];

const values = [
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously innovate to provide cutting-edge waste management solutions that meet evolving environmental needs."
  },
  {
    icon: Heart,
    title: "Sustainability",
    description: "Environmental responsibility is at the core of everything we do, ensuring a cleaner planet for future generations."
  },
  {
    icon: Users,
    title: "Community",
    description: "We work closely with communities to create customized solutions that benefit both people and the environment."
  }
];

const achievements = [
  "ISO 14001 Environmental Management Certification",
  "Green Business Award Winner 2023",
  "Carbon Neutral Operations Since 2020",
  "98% Customer Satisfaction Rate",
  "Zero Waste to Landfill Partner Program"
];

export const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-gradient-card animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge className="mb-4">About EcoWaste</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Leading the Future of Waste Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            For over 15 years, we've been pioneering innovative waste management solutions 
            that protect our environment while serving communities worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-lg text-muted-foreground">
                To revolutionize waste management through innovative technology and sustainable practices, 
                creating cleaner communities and a healthier planet for future generations.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-lg text-muted-foreground">
                A world where waste is viewed as a resource, where every community has access to 
                smart, sustainable waste management solutions, and where environmental stewardship 
                is seamlessly integrated into daily life.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold">Key Achievements:</h4>
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Our Core Values</h3>
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Waste Management?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust EcoWaste for their waste management needs. 
            Let's create a cleaner, more sustainable future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More About Our Process
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};