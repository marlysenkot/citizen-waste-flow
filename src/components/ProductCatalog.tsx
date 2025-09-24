import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  category?: { id: string; name: string };
  features?: string[];
  popular?: boolean;
  image?: string | File | null; // same as citizen dashboard
}

export const ProductCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  // Helper: get correct image URL (like citizen dashboard)
  const getImageUrl = (image?: string | File | null) => {
    if (!image) return "/placeholder.png"; // fallback
    if (image instanceof File) return URL.createObjectURL(image);
    return `${apiUrl}/images/${image}`; // backend filename
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const headers: any = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(`${apiUrl}/products`, { headers });
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiUrl, token]);

  if (loading) return <p className="text-center mt-8">Loading products...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (products.length === 0) return <p className="text-center mt-8">No products available.</p>;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Products</h2>
          <p className="text-muted-foreground mt-2">Explore our range of products and buy the ones you like.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card
  key={product.id}
  className="relative hover:shadow-glow transition-all duration-500 border-border/50 hover:border-primary/30 group glass hover-lift"
  style={{ animationDelay: `${index * 0.1}s`, animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both` }}
>
  {product.popular && (
    <Badge className="absolute -top-2 left-4 bg-gradient-primary text-white shadow-glow animate-pulse-glow">
      Popular Choice
    </Badge>
  )}

  {/* Product Image */}
  {product.image && (
    <img
      src={getImageUrl(product.image)}
      alt={product.name}
      className="w-full h-48 md:h-64 lg:h-72 rounded-t-lg object-cover"
      onError={(e: any) => { e.currentTarget.src = "/placeholder.png"; }}
    />
  )}

  <CardHeader className="pt-4 pb-2">
    <div>
      <Badge variant="outline" className="text-xs mb-2 border-primary/20">
        {product.category?.name || "Uncategorized"}
      </Badge>
      <CardTitle className="text-lg group-hover:text-primary transition-colors">
        {product.name}
      </CardTitle>
    </div>
  </CardHeader>

  <CardContent className="space-y-4">
    <p className="text-muted-foreground text-sm">{product.description}</p>

    <div className="space-y-2">
      <h4 className="text-sm font-medium text-primary">Key Features:</h4>
      <ul className="space-y-1">
        {product.features?.length
          ? product.features.map((feature, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-center hover-lift">
                <div className="w-2 h-2 bg-gradient-primary rounded-full mr-3 animate-pulse-glow" />
                {feature}
              </li>
            ))
          : <li className="text-sm text-muted-foreground">No features listed</li>}
      </ul>
    </div>

    <Button
      className={`w-full transition-all duration-300 ${product.popular ? "bg-gradient-primary hover:shadow-glow" : "hover-lift"}`}
      variant={product.popular ? "default" : "outline"}
      onClick={() => navigate("/auth/login")}
    >
      Buy Now
      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  </CardContent>
</Card>
          ))}
        </div>
      </div>
    </section>
  );
};

