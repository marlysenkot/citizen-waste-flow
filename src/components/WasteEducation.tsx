import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Recycle,
  Trash2,
  Leaf,
  Battery,
  Package,
  Droplets,
  AlertTriangle,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const wasteCategories = [
  {
    id: 1,
    title: "Recyclable Materials",
    description: "Paper, plastic bottles, glass, aluminum cans",
    icon: Recycle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    items: ["Newspapers & magazines", "Plastic bottles & containers", "Glass jars & bottles", "Aluminum cans"],
    tip: "Clean containers before recycling"
  },
  {
    id: 2,
    title: "Organic Waste",
    description: "Food scraps, garden waste, biodegradable materials",
    icon: Leaf,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    items: ["Fruit & vegetable scraps", "Coffee grounds", "Eggshells", "Garden trimmings"],
    tip: "Perfect for composting"
  },
  {
    id: 3,
    title: "General Waste",
    description: "Non-recyclable household waste",
    icon: Trash2,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    items: ["Dirty packaging", "Broken ceramics", "Used tissues", "Food-contaminated items"],
    tip: "Last resort after recycling & composting"
  },
  {
    id: 4,
    title: "Hazardous Waste",
    description: "Batteries, chemicals, electronics, paint",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    items: ["Old batteries", "Paint & solvents", "Electronics", "Fluorescent bulbs"],
    tip: "Requires special disposal methods"
  }
];

const wasteSteps = [
  {
    step: 1,
    title: "Separate at Source",
    description: "Sort waste into different categories as you generate it",
    icon: Package
  },
  {
    step: 2,
    title: "Clean & Prepare",
    description: "Rinse containers and remove labels when necessary",
    icon: Droplets
  },
  {
    step: 3,
    title: "Store Properly",
    description: "Use appropriate bins and containers for each waste type",
    icon: CheckCircle
  },
  {
    step: 4,
    title: "Schedule Collection",
    description: "Book our collection service for proper disposal",
    icon: ArrowRight
  }
];

export const WasteEducation = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge className="mb-4">Educational Guide</Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Proper Waste Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to properly sort, prepare, and dispose of different types of waste for a cleaner environment
          </p>
        </div>

        {/* Waste Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {wasteCategories.map((category) => (
            <Card 
              key={category.id} 
              className={`hover:shadow-lg transition-all duration-300 animate-fade-in ${category.borderColor} hover-scale`}
              style={{ animationDelay: `${category.id * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center mb-4`}>
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Examples:</h4>
                  <ul className="space-y-1">
                    {category.items.map((item, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-center">
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${category.color.replace('text-', 'bg-')}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`p-3 rounded-lg ${category.bgColor} border-l-4 ${category.borderColor.replace('border-', 'border-l-')}`}>
                  <p className={`text-xs font-medium ${category.color}`}>
                    💡 {category.tip}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Steps */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
              4 Simple Steps to Proper Waste Management
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow these easy steps to ensure your waste is properly sorted and ready for collection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {wasteSteps.map((step, index) => (
              <div 
                key={step.step} 
                className="text-center space-y-4 animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>

                {index < wasteSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 transform -translate-x-4">
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="mt-20 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary">Environmental Impact</Badge>
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Make a Difference
                </h3>
                <p className="text-lg text-muted-foreground">
                  Proper waste management contributes to environmental sustainability and helps build cleaner communities for future generations.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">75%</div>
                  <div className="text-sm text-muted-foreground">Waste Reduction</div>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-2xl font-bold text-accent">90%</div>
                  <div className="text-sm text-muted-foreground">Recycling Rate</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Recycle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Reduce Landfill</h4>
                  <p className="text-sm text-muted-foreground">Less waste in landfills means cleaner soil and water</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Save Energy</h4>
                  <p className="text-sm text-muted-foreground">Recycling uses less energy than producing new materials</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Battery className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Prevent Pollution</h4>
                  <p className="text-sm text-muted-foreground">Proper disposal prevents harmful chemicals from spreading</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium">Build Future</h4>
                  <p className="text-sm text-muted-foreground">Creating sustainable habits for future generations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};