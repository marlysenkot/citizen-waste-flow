import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Truck, Shield, Recycle, Eye, EyeOff, Leaf, Sparkles, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("citizen");

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (userType: string) => {
    setLoading(true);
    setError("");

    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
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

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userType", userType);

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

  const userTypes = [
    {
      id: "citizen",
      label: "Citizen",
      icon: User,
      description: "Manage your waste disposal and track collections",
      color: "from-green-400 to-emerald-500",
      bgColor: "hover:bg-green-950/50",
      activeBg: "bg-green-900/30"
    },
    {
      id: "collector",
      label: "Collector",
      icon: Truck,
      description: "Access collection routes and manage pickups",
      color: "from-blue-400 to-cyan-500",
      bgColor: "hover:bg-blue-950/50",
      activeBg: "bg-blue-900/30"
    },
    {
      id: "admin",
      label: "Admin",
      icon: Shield,
      description: "Manage system operations and analytics",
      color: "from-purple-400 to-indigo-500",
      bgColor: "hover:bg-purple-950/50",
      activeBg: "bg-purple-900/30"
    }
  ];

  const activeUserType = userTypes.find(type => type.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-full blur-3xl opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 rounded-full blur-3xl opacity-30 animate-pulse delay-500"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-10 animate-float">
        <Leaf className="h-8 w-8 text-green-400/60" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float delay-1000">
        <Recycle className="h-8 w-8 text-blue-400/60" />
      </div>
      <div className="absolute top-1/4 right-20 animate-float delay-500">
        <Moon className="h-6 w-6 text-purple-400/40" />
      </div>

      <div className="w-full max-w-lg space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur group-hover:blur-lg transition-all duration-300 opacity-70"></div>
              <Recycle className="h-12 w-12 text-white relative z-10" />
            </div>
            <div className="text-left">
              <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                EcoWaste
              </span>
              <Sparkles className="h-4 w-4 text-yellow-400 inline-block ml-2" />
            </div>
          </Link>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-slate-400 text-lg">Sign in to continue your eco-journey</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-slate-700/50 bg-slate-800/40 backdrop-blur-md relative overflow-hidden border">
          {/* Decorative Gradient Border */}
          <div className={cn(
            "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
            activeUserType?.color
          )}></div>
          
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-white">Login to Your Account</CardTitle>
            <CardDescription className="text-slate-400">
              Choose your role to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Role Selection Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 p-1 bg-slate-700/30 rounded-lg border border-slate-600/50">
                {userTypes.map((type) => (
                  <TabsTrigger
                    key={type.id}
                    value={type.id}
                    className={cn(
                      "flex items-center space-x-2 py-2.5 text-sm font-medium transition-all duration-300 rounded-md",
                      type.bgColor,
                      activeTab === type.id && cn("text-white border border-slate-500/30", type.activeBg)
                    )}
                  >
                    <type.icon className="h-4 w-4" />
                    <span>{type.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab Content */}
              <TabsContent value={activeTab} className="space-y-6 mt-6">
                {/* Role Description */}
                <div className="text-center p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                  <p className="text-slate-300 font-medium">
                    {activeUserType?.description}
                  </p>
                </div>

                {/* Login Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300 font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 pr-4 py-2.5 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-green-500 transition-colors"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium",
                          activeTab === "citizen" && "bg-green-900/50 text-green-400",
                          activeTab === "collector" && "bg-blue-900/50 text-blue-400",
                          activeTab === "admin" && "bg-purple-900/50 text-purple-400"
                        )}>
                          @
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-300 font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-12 py-2.5 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-green-500 transition-colors"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <div className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium",
                          activeTab === "citizen" && "bg-green-900/50 text-green-400",
                          activeTab === "collector" && "bg-blue-900/50 text-blue-400",
                          activeTab === "admin" && "bg-purple-900/50 text-purple-400"
                        )}>
                          •
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute inset-y-0 right-0 pr-3 hover:bg-transparent text-slate-400 hover:text-slate-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-900/30 border border-red-800/50 rounded-lg">
                      <p className="text-red-400 text-sm font-medium">{error}</p>
                    </div>
                  )}

                  <Button
                    className={cn(
                      "w-full py-2.5 text-base font-semibold transition-all duration-300",
                      "bg-gradient-to-r shadow-lg hover:shadow-xl transform hover:scale-[1.02]",
                      activeTab === "citizen" && "from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800",
                      activeTab === "collector" && "from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800",
                      activeTab === "admin" && "from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
                    )}
                    onClick={() => handleLogin(activeTab)}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Signing in...
                      </>
                    ) : (
                      `Sign In as ${activeUserType?.label}`
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Footer Links */}
            <div className="text-center space-y-4 pt-4 border-t border-slate-700/50">
              <p className="text-sm text-slate-400">
                Don't have an account?{" "}
                <Link 
                  to="/auth/register" 
                  className={cn(
                    "font-semibold transition-all duration-300 hover:underline",
                    activeTab === "citizen" && "text-green-400 hover:text-green-300",
                    activeTab === "collector" && "text-blue-400 hover:text-blue-300",
                    activeTab === "admin" && "text-purple-400 hover:text-purple-300"
                  )}
                >
                  Create an account
                </Link>
              </p>
              
              <div className="flex justify-center space-x-4 text-xs text-slate-500">
                <Link to="/forgot-password" className="hover:text-slate-400 transition-colors">
                  Forgot Password?
                </Link>
                <span>•</span>
                <Link to="/" className="hover:text-slate-400 transition-colors">
                  Back to Home
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Highlights */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { icon: "♻️", text: "Eco-Friendly", color: "text-green-400" },
            { icon: "🔒", text: "Secure", color: "text-blue-400" },
            { icon: "⚡", text: "Fast", color: "text-purple-400" }
          ].map((item, index) => (
            <div key={index} className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50">
              <div className={`text-lg ${item.color}`}>{item.icon}</div>
              <div className="text-xs text-slate-400 font-medium">{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}