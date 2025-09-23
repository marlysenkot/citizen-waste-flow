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
import { Plus, Edit, Trash2, Package, Search, Filter } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface Product {
  detail: string;
  id: number;
  name: string;
  category: Category;
  description: string;
  price: string;
  stock: number;
  status: 'active' | 'inactive';
  features: string[];
  image?: string | File; // string for existing images, File for new uploads
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

  // --- Fetch products and categories ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [resProd, resCat] = await Promise.all([
          fetch("http://127.0.0.1:8000/admin/products", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("http://127.0.0.1:8000/admin/categories", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        if (resProd.ok) setProducts(await resProd.json());
        if (resCat.ok) setCategories(await resCat.json());
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // --- Add Product ---
  const handleAddProduct = async () => {
  try {
    console.log("Add Product clicked", newProduct);

    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      console.warn("Missing required fields!");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("category_id", newProduct.category.id.toString());
    formData.append("price", newProduct.price);
    formData.append("stock", (newProduct.stock || 0).toString());
    formData.append("description", newProduct.description || "");
    formData.append("status", newProduct.status || "active");
    if (newProduct.image instanceof File) formData.append("image", newProduct.image);

    const res = await fetch("http://127.0.0.1:8000/admin/products", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      // Try to read backend error
      let errMsg = "Failed to create product";
      try {
        const errData = await res.json();
        errMsg = errData.detail || errMsg;
      } catch {}
      return console.error(errMsg);
    }

    let data: Product | null = null;
    try {
      data = await res.json();
    } catch {
      console.warn("No JSON returned from backend after adding product");
    }

    if (data) {
      setProducts(prev => [...prev, data]);
      setNewProduct({ name: "", category: undefined, description: "", price: "", stock: 0, status: 'active', features: [], image: null });
      setIsAddDialogOpen(false);
    }

  } catch (err) {
    console.error("Add Product error:", err);
  }
};

  // --- Update Product ---
  const handleUpdateProduct = async () => {
  if (!editingProduct) return;

  try {
    console.log("Update Product clicked", editingProduct);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", editingProduct.name);
    formData.append("category_id", editingProduct.category.id.toString());
    formData.append("price", editingProduct.price);
    formData.append("stock", editingProduct.stock.toString());
    formData.append("description", editingProduct.description);
    formData.append("status", editingProduct.status);
    if (editingProduct.image instanceof File) formData.append("image", editingProduct.image);

    const res = await fetch(`http://127.0.0.1:8000/admin/products/${editingProduct.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      let errMsg = "Failed to update product";
      try {
        const errData = await res.json();
        errMsg = errData.detail || errMsg;
      } catch {}
      return console.error(errMsg);
    }

    let data: Product | null = null;
    try {
      data = await res.json();
    } catch {
      console.warn("No JSON returned from backend after updating product");
    }

    if (data) {
      setProducts(prev => prev.map(p => p.id === data!.id ? data! : p));
    }

    setEditingProduct(null);

  } catch (err) {
    console.error("Update Product error:", err);
  }
};

  // --- Delete Product ---
  const handleDeleteProduct = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setProducts(prev => prev.filter(p => p.id !== id));
      else console.error("Failed to delete product");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Product Management</h1>
          <p className="text-muted-foreground">Manage your waste management products and inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass hover-lift">
            <CardContent className="p-6 text-center">
              <Package className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary">{products.length}</div>
              <div className="text-sm text-muted-foreground">Total Products</div>
            </CardContent>
          </Card>
          <Card className="glass hover-lift">
            <CardContent className="p-6 text-center">
              <Badge className="h-8 w-8 text-success mx-auto mb-3 flex items-center justify-center">✓</Badge>
              <div className="text-2xl font-bold text-success">{products.filter(p => p.status === 'active').length}</div>
              <div className="text-sm text-muted-foreground">Active Products</div>
            </CardContent>
          </Card>
          <Card className="glass hover-lift">
            <CardContent className="p-6 text-center">
              <Badge className="h-8 w-8 text-warning mx-auto mb-3 flex items-center justify-center">!</Badge>
              <div className="text-2xl font-bold text-warning">{products.filter(p => p.stock < 10).length}</div>
              <div className="text-sm text-muted-foreground">Low Stock</div>
            </CardContent>
          </Card>
          <Card className="glass hover-lift">
            <CardContent className="p-6 text-center">
              <Badge className="h-8 w-8 text-accent mx-auto mb-3 flex items-center justify-center">#</Badge>
              <div className="text-2xl font-bold text-accent">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions and Filters */}
        <Card className="mb-8 glass">
          <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Add Product Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button type="button" className="bg-gradient-primary hover:shadow-glow">
                  <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div>
                    <Label>Product Name</Label>
                    <Input value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} placeholder="Enter product name" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select value={newProduct.category?.id?.toString() || ""} onValueChange={(value) => setNewProduct({...newProduct, category: categories.find(c => c.id.toString() === value)})}>
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Price</Label>
                    <Input value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} placeholder="e.g., $299" />
                  </div>
                  <div>
                    <Label>Stock</Label>
                    <Input type="number" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})} />
                  </div>
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <Textarea value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} />
                  </div>
                  <div className="col-span-2">
                    <Label>Product Image</Label>
                    <Input type="file" accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setNewProduct({...newProduct, image: file});
                    }} />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button type="button" className="bg-gradient-primary" onClick={handleAddProduct}>Add Product</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Products ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map(product => (
                  <TableRow key={product.id} className="hover:bg-muted/50">
                    <TableCell>
                      {product.image && <img src={typeof product.image === "string" ? product.image : URL.createObjectURL(product.image)} alt={product.name} className="w-12 h-12 object-cover rounded" />}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category.name}</Badge>
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <Badge variant={product.stock < 10 ? "destructive" : "default"}>{product.stock} units</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.status === 'active' ? "default" : "secondary"}>{product.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button type="button" size="sm" variant="outline" onClick={() => setEditingProduct(product)}><Edit className="h-4 w-4" /></Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => handleDeleteProduct(product.id)}><Trash2 className="h-4 w-4" /></Button>
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
                <div>
                  <Label>Product Name</Label>
                  <Input value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={editingProduct.category.id.toString()} onValueChange={(value) => setEditingProduct({...editingProduct, category: categories.find(c => c.id.toString() === value)!})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Price</Label>
                  <Input value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} />
                </div>
                <div>
                  <Label>Stock</Label>
                  <Input type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})} />
                </div>
                <div className="col-span-2">
                  <Label>Description</Label>
                  <Textarea value={editingProduct.description} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <Label>Product Image</Label>
                  {editingProduct.image && typeof editingProduct.image === "string" && (
                    <img src={editingProduct.image} alt={editingProduct.name} className="w-32 h-32 object-cover mb-2 rounded" />
                  )}
                  <Input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setEditingProduct({...editingProduct, image: file});
                  }} />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>Cancel</Button>
              <Button type="button" className="bg-gradient-primary" onClick={handleUpdateProduct}>Update Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
