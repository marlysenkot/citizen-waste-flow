import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Product {
  id: number | string;
  name: string;
  description?: string;
  category?: { id: number | string; name: string };
  features?: string[];
  image?: string | null;
  popular?: boolean;
  price?: number;
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
    setCheckoutData(prev => ({ ...prev, quantity: 1 })); // reset quantity
    setCheckoutOpen(true);
  };

  const handleCheckoutChange = (field: keyof CheckoutForm, value: string | number) => {
    setCheckoutData(prev => ({ ...prev, [field]: value }));
  };

  const submitOrderAndPayment = async () => {
    if (!selectedProduct || !token) return;

    // Frontend validation
    if (!checkoutData.first_name || !checkoutData.last_name || !checkoutData.phone || checkoutData.quantity < 1) {
      alert("Please fill all required fields correctly.");
      return;
    }

    setProcessing(true);

    try {
      // Format phone number for Cameroon
      const formattedPhone = checkoutData.phone.startsWith("237") 
        ? checkoutData.phone 
        : `237${checkoutData.phone.replace(/^0/, "")}`;

      // 1️⃣ Create order
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

      // 2️⃣ Make quick Monetbil payment
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

      // 3️⃣ Redirect to Monetbil payment URL
      window.location.href = paymentData.payment_url;

    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setProcessing(false);
      setCheckoutOpen(false);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading products...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (products.length === 0) return <p className="text-center mt-8">No products available.</p>;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-6">Available Products</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow relative">
              {product.popular && (
                <Badge className="absolute -top-2 left-4 bg-gradient-primary text-white">
                  Popular
                </Badge>
              )}
              <CardHeader>
                <img
                  src={getImageUrl(product.image || null)}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  onError={(e: any) => { e.currentTarget.src = "/placeholder.png"; }}
                />
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                {product.category && <p className="text-sm text-muted-foreground mb-2">Category: {product.category.name}</p>}
                {product.description && <p className="text-muted-foreground mb-2">{product.description}</p>}
                {product.features && product.features.length > 0 && (
                  <ul className="mb-4 list-disc list-inside text-sm text-muted-foreground">
                    {product.features.map((f, idx) => <li key={idx}>{f}</li>)}
                  </ul>
                )}
                <p className="text-sm font-medium mb-2">Price: {product.price} XAF</p>
                <Button className="w-full" onClick={() => handleBuyNow(product)}>
                  Buy Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Checkout Dialog */}
        <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Checkout for {selectedProduct?.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="First Name"
                value={checkoutData.first_name}
                onChange={e => handleCheckoutChange("first_name", e.target.value)}
              />
              <Input
                placeholder="Last Name"
                value={checkoutData.last_name}
                onChange={e => handleCheckoutChange("last_name", e.target.value)}
              />
              <Input
                placeholder="Email"
                type="email"
                value={checkoutData.email}
                onChange={e => handleCheckoutChange("email", e.target.value)}
              />
              <Input
                placeholder="Phone Number"
                value={checkoutData.phone}
                onChange={e => handleCheckoutChange("phone", e.target.value)}
              />
              <Input
                placeholder="Quantity"
                type="number"
                min={1}
                value={checkoutData.quantity}
                onChange={e => handleCheckoutChange("quantity", Number(e.target.value))}
              />
              <Button
                className="w-full bg-gradient-primary"
                onClick={submitOrderAndPayment}
                disabled={processing}
              >
                {processing ? "Processing..." : "Pay Now"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
