import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  Recycle,
  User,
  Truck,
  Shield,
  Menu,
  X
} from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b bg-gradient-glass backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50 shadow-elegant">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 hover-lift">
            <Recycle className="h-8 w-8 text-primary animate-bounce-subtle" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">EcoWaste</span>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm hover-lift transition-all duration-300 hover:text-primary"
                  onClick={() => scrollToSection('hero')}
                >
                  Home
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover-lift transition-all duration-300 hover:text-primary">Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[500px] glass">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 hover-lift">
                        <h4 className="font-medium text-primary">Collection Services</h4>
                        <p className="text-sm text-muted-foreground">
                          Residential and commercial waste collection
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-sm text-primary hover:underline justify-start p-0"
                          onClick={() => scrollToSection('services')}
                        >
                          Schedule Collection →
                        </Button>
                      </div>
                      <div className="space-y-2 hover-lift">
                        <h4 className="font-medium text-accent">Recycling Programs</h4>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive recycling solutions
                        </p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-sm text-accent hover:underline justify-start p-0"
                          onClick={() => scrollToSection('services')}
                        >
                          View Services →
                        </Button>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm hover-lift transition-all duration-300 hover:text-primary"
                  onClick={() => scrollToSection('products')}
                >
                  Products
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm hover-lift transition-all duration-300 hover:text-primary"
                  onClick={() => scrollToSection('about')}
                >
                  About Us
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm hover-lift transition-all duration-300 hover:text-primary"
                  onClick={() => scrollToSection('contact')}
                >
                  Contact
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/auth/login">
              <Button variant="default" size="sm" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover-lift"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 glass animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="justify-start w-full hover-lift"
                    onClick={() => scrollToSection('hero')}
                  >
                    Home
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="justify-start w-full hover-lift"
                    onClick={() => scrollToSection('services')}
                  >
                    Services
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="justify-start w-full hover-lift"
                    onClick={() => scrollToSection('products')}
                  >
                    Products
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="justify-start w-full hover-lift"
                    onClick={() => scrollToSection('about')}
                  >
                    About Us
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="justify-start w-full hover-lift"
                    onClick={() => scrollToSection('contact')}
                  >
                    Contact
                  </Button>
                </div>
              </div>
              <Link to="/auth/login" className="w-full">
                <Button className="w-full bg-gradient-primary">Sign In</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};