import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Checkout } from "@/components/Checkout";
import { 
  Recycle,
  Trash2,
  Package,
  Truck,
  Calendar,
  Shield,
  CheckCircle,
  ArrowRight,
  ShoppingCart
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "EcoSmart Bins",
    category: "Smart Equipment",
    description: "IoT-enabled smart waste bins with sensors for optimal collection scheduling",
    icon: Trash2,
    features: ["Fill-level sensors", "Real-time monitoring", "Weather resistant", "Solar powered"],
    price: "From 50000 FCFA",
    image: "smart-bin",
    popular: true
  },
  {
    id: 2,
    name: "RecycleMax Pro",
    category: "Recycling Solutions",
    description: "Advanced recycling containers with multi-compartment sorting system",
    icon: Recycle,
    features: ["4-compartment design", "Color-coded sorting", "Easy-empty system", "Odor control"],
    price: "From 20000 FCFA",
    image: "recycle-pro",
    popular: false
  },
  {
    id: 3,
    name: "Commercial Compactors",
    category: "Commercial Equipment",
    description: "Industrial-grade waste compactors for businesses and large facilities",
    icon: Package,
    features: ["High compression ratio", "Safety controls", "Easy maintenance", "Energy efficient"],
    price: "From 5000 FCFA",
    image: "compactor",
    popular: false
  },
  {
    id: 4,
    name: "Fleet Management System",
    category: "Software Solutions",
    description: "Complete fleet tracking and route optimization software for waste collection",
    icon: Truck,
    features: ["GPS tracking", "Route optimization", "Driver apps", "Analytics dashboard"],
    price: "From 7000 FCFA/month",
    image: "fleet-software",
    popular: true
  },
  {
    id: 5,
    name: "EcoShield Collection Bags",
    category: "Consumables",
    description: "Biodegradable waste collection bags made from recycled materials",
    icon: Shield,
    features: ["100% biodegradable", "Extra strength", "Leak-proof", "Various sizes"],
    price: "From 3000 FCFA/pack",
    image: "eco-bags",
    popular: false
  },
  {
    id: 6,
    name: "Scheduling Platform",
    category: "Software Solutions",
    description: "Customer-facing scheduling platform for waste collection appointments",
    icon: Calendar,
    features: ["Online booking", "Mobile app", "SMS notifications", "Payment integration"],
    price: "From 5000 FCFA/month",
    image: "scheduling-app",
    popular: false
  }
];

export const ProductShowcase = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: string;
  }>>([]);

  const addToCart = (product: typeof products[0]) => {
    const price = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price,
        quantity: 1,
        category: product.category
      }]);
    }
    setIsCheckoutOpen(true);
  };

  return (
    <section id="products" className="py-20 bg-gradient-glass animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 animate-fade-in-up">
          <Badge className="mb-4 bg-gradient-accent">Our Products</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Innovative Waste Management Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our range of smart equipment, software solutions, and eco-friendly products 
            designed to revolutionize waste management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="relative hover:shadow-glow transition-all duration-500 border-border/50 hover:border-primary/30 group glass hover-lift"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {product.popular && (
                <Badge className="absolute -top-2 left-4 bg-gradient-primary text-white shadow-glow animate-pulse-glow">
                  Best Seller
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-primary rounded-lg group-hover:animate-bounce-subtle transition-all duration-300">
                      <product.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs mb-2 border-accent/20">
                        {product.category}
                      </Badge>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {product.name}
                      </CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  {product.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-primary">Key Features:</h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center hover-lift">
                        <CheckCircle className="h-3 w-3 text-primary mr-2 animate-pulse-glow" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t glass rounded-lg p-3">
                  <div className="text-lg font-semibold text-primary">{product.price}</div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="hover-lift"
                      onClick={() => {
                        const element = document.getElementById('contact');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Learn More
                    </Button>
                    <Button 
                      variant={product.popular ? "default" : "outline"} 
                      size="sm"
                      className={`group/button transition-all duration-300 ${
                        product.popular 
                          ? 'bg-gradient-primary hover:shadow-glow' 
                          : 'hover-lift'
                      }`}
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <div className="bg-gradient-hero rounded-2xl p-8 inline-block glass shadow-glow">
            <h3 className="text-xl font-semibold mb-4 text-white">Need a Custom Solution?</h3>
            <p className="text-white/90 mb-6">
              We offer customized waste management solutions tailored to your specific needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 hover:shadow-glow transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Request Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 hover-lift transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Checkout 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onCartUpdate={setCartItems}
      />
    </section>
  );
};