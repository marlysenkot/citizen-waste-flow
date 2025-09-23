import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Header } from "@/components/Header";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  category: Category;
  description: string;
  price: string;
  stock: number;
  status: 'active' | 'inactive';
  features: string[];
  image?: string | File | null;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: undefined,
    description: "",
    price: "",
    stock: 0,
    status: 'active',
    features: [],
    image: null
  });
  const [newFeatures, setNewFeatures] = useState<string>("");

  // Helper: get correct image URL
  const getImageUrl = (image?: string | File | null) => {
    if (!image) return undefined;
    if (image instanceof File) return URL.createObjectURL(image);
    return `http://127.0.0.1:8000/images/${image}`;
  };

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const [resProd, resCat] = await Promise.all([
        fetch("http://127.0.0.1:8000/admin/products", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("http://127.0.0.1:8000/admin/categories", { headers: { Authorization: `Bearer ${token}` } })
      ]);
      if (resProd.ok) setProducts(await resProd.json());
      if (resCat.ok) setCategories(await resCat.json());
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(p =>
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (p.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "all" || p.category?.name === selectedCategory)
  );

  // --- Add Product ---
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("category_id", newProduct.category.id.toString());
    formData.append("price", newProduct.price.toString());
    formData.append("stock", (newProduct.stock || 0).toString());
    formData.append("description", newProduct.description || "");
    formData.append("status", newProduct.status || "active");
    formData.append("features", newFeatures || "");
    if (newProduct.image instanceof File) formData.append("image", newProduct.image);

    const res = await fetch("http://127.0.0.1:8000/admin/products", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      const data: Product = await res.json();
      setProducts(prev => [...prev, data]);
      setNewProduct({ name: "", category: undefined, description: "", price: "", stock: 0, status: 'active', features: [], image: null });
      setNewFeatures("");
      setIsAddDialogOpen(false);
    } else console.error("Failed to add product");
  };

  // --- Update Product ---
  const handleUpdateProduct = async () => {
    if (!editingProduct) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", editingProduct.name);
    formData.append("category_id", editingProduct.category.id.toString());
    formData.append("price", editingProduct.price.toString());
    formData.append("stock", editingProduct.stock.toString());
    formData.append("description", editingProduct.description || "");
    formData.append("status", editingProduct.status || "active");
    formData.append("features", (editingProduct.features || []).join(","));
    if (editingProduct.image instanceof File) formData.append("image", editingProduct.image);

    const res = await fetch(`http://127.0.0.1:8000/admin/products/${editingProduct.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      const data: Product = await res.json();
      setProducts(prev => prev.map(p => p.id === data.id ? data : p));
      setEditingProduct(null);
    } else console.error("Failed to update product");
  };

  // --- Delete Product ---
  const handleDeleteProduct = async (id: number) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://127.0.0.1:8000/admin/products/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Product Management</h1>

        {/* Add Product Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" className="bg-gradient-primary mb-4"><Plus className="h-4 w-4 mr-2" /> Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {/* Name */}
              <div>
                <Label>Name</Label>
                <Input
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>

              {/* Category */}
              <div>
                <Label>Category</Label>
                <Select
                  value={newProduct.category?.id?.toString() || ""}
                  onValueChange={(value) =>
                    setNewProduct({ ...newProduct, category: categories.find(c => c.id.toString() === value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => (
                      <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </div>

              {/* Stock */}
              <div>
                <Label>Stock</Label>
                <Input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <Label>Description</Label>
                <Textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>

              {/* Features */}
              <div className="col-span-2">
                <Label>Features (comma-separated)</Label>
                <Input
                  value={newFeatures}
                  onChange={(e) => setNewFeatures(e.target.value)}
                />
              </div>

              {/* Image */}
              <div className="col-span-2">
                <Label>Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setNewProduct({ ...newProduct, image: file });
                  }}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button type="button" className="bg-gradient-primary" onClick={handleAddProduct}>Add</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Products Table */}
        <Card className="glass">
          <CardHeader><CardTitle>Products ({filteredProducts.length})</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map(p => (
                  <TableRow key={p.id} className="hover:bg-muted/50">
                    <TableCell>
                      {p.image && <img src={getImageUrl(p.image)} alt={p.name} className="w-12 h-12 object-cover rounded" />}
                    </TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell><Badge>{p.category?.name}</Badge></TableCell>
                    <TableCell>{p.price}</TableCell>
                    <TableCell><Badge variant={p.stock < 10 ? "destructive" : "default"}>{p.stock}</Badge></TableCell>
                    <TableCell><Badge variant={p.status === "active" ? "default" : "secondary"}>{p.status}</Badge></TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button onClick={() => setEditingProduct(p)}><Edit /></Button>
                        <Button onClick={() => handleDeleteProduct(p.id)}><Trash2 /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Product Dialog */}
        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
            {editingProduct && (
              <div className="grid grid-cols-2 gap-4 py-4">
                {/* Name */}
                <div>
                  <Label>Name</Label>
                  <Input value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} />
                </div>

                {/* Category */}
                <div>
                  <Label>Category</Label>
                  <Select
                    value={editingProduct.category.id.toString()}
                    onValueChange={(v) => setEditingProduct({ ...editingProduct, category: categories.find(c => c.id.toString() === v)! })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price */}
                <div>
                  <Label>Price</Label>
                  <Input value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} />
                </div>

                {/* Stock */}
                <div>
                  <Label>Stock</Label>
                  <Input type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })} />
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <Label>Description</Label>
                  <Textarea value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} />
                </div>

                {/* Features */}
                <div className="col-span-2">
                  <Label>Features (comma-separated)</Label>
                  <Input value={editingProduct.features.join(",")} onChange={(e) => setEditingProduct({ ...editingProduct, features: e.target.value.split(",") })} />
                </div>

                {/* Image */}
                <div className="col-span-2">
                  <Label>Image</Label>
                  {editingProduct.image && <img src={getImageUrl(editingProduct.image)} className="w-32 h-32 object-cover mb-2 rounded" />}
                  <Input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setEditingProduct({ ...editingProduct, image: file });
                  }} />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
              <Button className="bg-gradient-primary" onClick={handleUpdateProduct}>Update</Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}
