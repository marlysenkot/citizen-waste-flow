import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Star, Zap, Shield, Truck, CreditCard, Loader } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Product {
  id: number | string;
  name: string;
  description?: string;
  category?: { id: number | string; name: string };
  features?: string[];
  image?: string | null;
  popular?: boolean;
  price?: number;
  rating?: number;
  stock?: number;
}

interface CheckoutForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  quantity: number;
}

interface OrderResponse {
  id: number;
  product_id: number;
  user_id: number;
  quantity: number;
  total_price: number;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutForm>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    quantity: 1,
  });
  const [processing, setProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
  const token = localStorage.getItem("token");

  const getImageUrl = (image?: string | null) => {
    if (!image) return "/placeholder.png";
    return `${apiUrl}/images/${image}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        setError("Please log in to view products");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${apiUrl}/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [apiUrl, token]);

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setCheckoutData(prev => ({ ...prev, quantity: 1 }));
    setCheckoutOpen(true);
  };

  const handleCheckoutChange = (field: keyof CheckoutForm, value: string | number) => {
    setCheckoutData(prev => ({ ...prev, [field]: value }));
  };

  const submitOrderAndPayment = async () => {
    if (!selectedProduct || !token) return;

    if (!checkoutData.first_name || !checkoutData.last_name || !checkoutData.phone || checkoutData.quantity < 1) {
      alert("Please fill all required fields correctly.");
      return;
    }

    setProcessing(true);

    try {
      const formattedPhone = checkoutData.phone.startsWith("237") 
        ? checkoutData.phone 
        : `237${checkoutData.phone.replace(/^0/, "")}`;

      const orderRes = await fetch(`${apiUrl}/citizens/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: selectedProduct.id,
          quantity: checkoutData.quantity
        })
      });

      if (!orderRes.ok) throw new Error("Failed to create order");
      const order: OrderResponse = await orderRes.json();

      const paymentRes = await fetch(`${apiUrl}/payments/monetbil/quick`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          order_id: order.id,
          first_name: checkoutData.first_name,
          last_name: checkoutData.last_name,
          email: checkoutData.email,
          phone: formattedPhone,
          return_url: "https://yourwebsite.com/return",
          cancel_url: "https://yourwebsite.com/payment/cancel"
        })
      });

      const paymentData = await paymentRes.json();
      if (!paymentRes.ok) throw new Error(paymentData.detail || "Payment failed");

      window.location.href = paymentData.payment_url;

    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setProcessing(false);
      setCheckoutOpen(false);
    }
  };

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ["all", ...new Set(products.map(p => p.category?.name).filter(Boolean))] as string[];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="h-12 w-12 text-green-400 animate-spin mx-auto" />
          <p className="text-slate-300 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <Card className="bg-slate-800/50 border-red-500/30 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-red-400" />
            </div>
            <p className="text-red-400 text-lg">{error}</p>
            <Button className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600">
              Please Log In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <ShoppingCart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-300 text-lg">No products available at the moment.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Eco-Friendly Products
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover sustainable products that help you contribute to a cleaner environment
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
            
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={cn(
                    "cursor-pointer transition-all duration-300",
                    selectedCategory === category 
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white" 
                      : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card 
              key={product.id} 
              className="group bg-slate-800/40 backdrop-blur-sm border-slate-700/50 hover:border-green-500/30 transition-all duration-300 hover:transform hover:scale-105 relative overflow-hidden"
            >
              {/* Popular Badge */}
              {product.popular && (
                <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white z-10 shadow-lg">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Popular
                </Badge>
              )}

              {/* Stock Badge */}
              {product.stock !== undefined && (
                <Badge className={cn(
                  "absolute -top-2 right-4 z-10",
                  product.stock > 10 ? "bg-green-600/90" : 
                  product.stock > 0 ? "bg-yellow-600/90" : "bg-red-600/90"
                )}>
                  {product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock"}
                </Badge>
              )}

              <CardHeader className="p-0 relative">
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(product.image || null)}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e: any) => { e.currentTarget.src = "/placeholder.png"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </CardHeader>
              
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-white text-lg font-semibold line-clamp-1">
                    {product.name}
                  </CardTitle>
                  {product.rating && (
                    <Badge variant="secondary" className="bg-slate-700/50 text-yellow-400">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      {product.rating}
                    </Badge>
                  )}
                </div>

                {product.category && (
                  <Badge variant="outline" className="bg-slate-700/30 text-slate-300 border-slate-600">
                    {product.category.name}
                  </Badge>
                )}

                {product.description && (
                  <CardDescription className="text-slate-400 text-sm line-clamp-2">
                    {product.description}
                  </CardDescription>
                )}

                {product.features && product.features.length > 0 && (
                  <ul className="space-y-1">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs text-slate-400">
                        <Zap className="h-3 w-3 text-green-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-2xl font-bold text-green-400">{product.price} XAF</p>
                    {product.stock !== undefined && (
                      <p className="text-xs text-slate-500">Stock: {product.stock}</p>
                    )}
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                    onClick={() => handleBuyNow(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No products found matching your criteria.</p>
          </div>
        )}

        {/* Checkout Dialog */}
        <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
          <DialogContent className="max-w-md bg-slate-800/90 backdrop-blur-md border-slate-600 text-white">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-green-400" />
                <span>Checkout - {selectedProduct?.name}</span>
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Complete your purchase with secure payment
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="text-slate-300">First Name</Label>
                  <Input
                    id="first_name"
                    placeholder="First Name"
                    value={checkoutData.first_name}
                    onChange={e => handleCheckoutChange("first_name", e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-slate-300">Last Name</Label>
                  <Input
                    id="last_name"
                    placeholder="Last Name"
                    value={checkoutData.last_name}
                    onChange={e => handleCheckoutChange("last_name", e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={checkoutData.email}
                  onChange={e => handleCheckoutChange("email", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Phone Number"
                  value={checkoutData.phone}
                  onChange={e => handleCheckoutChange("phone", e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-slate-300">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  max={selectedProduct?.stock}
                  value={checkoutData.quantity}
                  onChange={e => handleCheckoutChange("quantity", Number(e.target.value))}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>

              {/* Order Summary */}
              <div className="bg-slate-700/30 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal:</span>
                  <span className="text-white">{(selectedProduct?.price || 0) * checkoutData.quantity} XAF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Shipping:</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="border-t border-slate-600 pt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-green-400">{(selectedProduct?.price || 0) * checkoutData.quantity} XAF</span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-2.5 text-base font-semibold transition-all duration-300"
                onClick={submitOrderAndPayment}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// Search icon component
const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);