import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Truck, Shield, Recycle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL; // Backend URL

  const handleLogin = async (userType: string) => {
    setLoading(true);
    setError("");

    try {
      // Prepare form-encoded data for OAuth2PasswordRequestForm
      const formData = new URLSearchParams();
      formData.append("username", email); // OAuth2 expects "username"
      formData.append("password", password);

      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // Store JWT token
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userType", userType);

      // Redirect based on role
      switch (userType) {
        case "citizen":
          navigate("/citizen/dashboard");
          break;
        case "collector":
          navigate("/collector/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <Recycle className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">EcoWaste</span>
          </Link>
          <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="citizen" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="citizen" className="text-xs">
                  <User className="h-4 w-4 mr-1" />
                  Citizen
                </TabsTrigger>
                <TabsTrigger value="collector" className="text-xs">
                  <Truck className="h-4 w-4 mr-1" />
                  Collector
                </TabsTrigger>
                <TabsTrigger value="admin" className="text-xs">
                  <Shield className="h-4 w-4 mr-1" />
                  Admin
                </TabsTrigger>
              </TabsList>

              {["citizen", "collector", "admin"].map((userType) => (
                <TabsContent key={userType} value={userType} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${userType}-email`}>Email</Label>
                    <Input
                      id={`${userType}-email`}
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${userType}-password`}>Password</Label>
                    <Input
                      id={`${userType}-password`}
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button
                    className="w-full"
                    onClick={() => handleLogin(userType)}
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : `Sign In as ${userType}`}
                  </Button>
                </TabsContent>
              ))}
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/auth/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
