import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import axios from "axios";
import { Header } from "@/components/Header";

interface Collection {
  id: string;
  location: string;
  status: string;
  date: string;
}

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8000/citizens/collections", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCollections(Array.isArray(res.data) ? res.data : []);
    } catch (err: any) {
      console.error("Error fetching collections:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setCollections([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleSchedule = async () => {
    if (!location.trim()) {
      alert("Please enter a location");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.post(
        "http://localhost:8000/citizens/collections",
        { location }, // send only location
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Collection requested successfully!");
      setLocation("");
      setNotes("");
      fetchCollections(); // refresh list
    } catch (err: any) {
      console.error("Error requesting collection:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Failed to request collection");
      }
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "Scheduled":
        return "secondary";
      case "In Progress":
        return "outline";
      default:
        return "destructive";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />;
      case "Scheduled":
        return <Clock className="h-4 w-4" />;
      case "In Progress":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">My Collections</h1>

        {/* Schedule Collection Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Request New Collection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Collection location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Textarea
              placeholder="Additional notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button onClick={handleSchedule}>Request Collection</Button>
          </CardContent>
        </Card>

        {/* Existing Collections */}
        {loading ? (
          <p>Loading collections...</p>
        ) : collections.length === 0 ? (
          <p>No collections requested yet.</p>
        ) : (
          <div className="space-y-4">
            {collections.map((c) => (
              <Card key={c.id}>
                <CardContent className="flex justify-between items-center">
                  <div>
                    <Badge variant={getStatusVariant(c.status)} className="flex items-center gap-1">
                      {getStatusIcon(c.status)}
                      {c.status}
                    </Badge>
                    <p>{c.location}</p>
                    <p className="text-sm text-muted-foreground">{c.date}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
