"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { uploadImage, deleteImage } from "@/lib/supabase";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  images: string[];
  categoryId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface AdminProductsClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export function AdminProductsClient({
  initialProducts,
  categories,
}: AdminProductsClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<string[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    isActive: true,
    images: [] as string[],
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      isActive: true,
      images: [],
    });
    setEditingProduct(null);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      categoryId: product.categoryId,
      isActive: product.isActive,
      images: product.images,
    });
    setIsDialogOpen(true);
  };

  const handleImageUpload = async (files: FileList) => {
    if (!files.length) return;

    const newUploadingImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${Date.now()}-${file.name}`;
        newUploadingImages.push(fileName);

        setUploadingImages((prev) => [...prev, fileName]);

        const publicUrl = await uploadImage(file, `products/${fileName}`);

        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, publicUrl],
        }));

        setUploadingImages((prev) => prev.filter((name) => name !== fileName));
      }

      toast.success("Slike uspješno učitane");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Greška pri učitavanju slika");
      setUploadingImages([]);
    }
  };

  const removeImage = async (imageUrl: string, index: number) => {
    try {
      // Extract path from URL for deletion
      const urlParts = imageUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];

      await deleteImage(`products/${fileName}`);

      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));

      toast.success("Slika uklonjena");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Greška pri brisanju slike");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        categoryId: formData.categoryId,
        isActive: formData.isActive,
        images: formData.images,
      };

      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : "/api/admin/products";

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Greška pri spremanju proizvoda");
      }

      const savedProduct = await response.json();

      if (editingProduct) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? savedProduct : p))
        );
        toast.success("Proizvod uspješno ažuriran");
      } else {
        setProducts((prev) => [savedProduct, ...prev]);
        toast.success("Proizvod uspješno kreiran");
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Greška pri spremanju proizvoda");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Jeste li sigurni da želite obrisati ovaj proizvod?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Greška pri brisanju proizvoda");
      }

      setProducts((prev) => prev.filter((p) => p.id !== productId));
      toast.success("Proizvod uspješno obrisan");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Greška pri brisanju proizvoda");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          Proizvodi ({products.length})
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Dodaj Proizvod
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Uredi Proizvod" : "Dodaj Novi Proizvod"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Naziv proizvoda</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Cijena (€)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Kategorija</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, categoryId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Odaberite kategoriju" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Opis</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                />
              </div>

              <div>
                <Label>Slike proizvoda</Label>
                <div className="mt-2">
                  <div className="flex items-center gap-4 mb-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Učitaj Slike
                    </Button>
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files && handleImageUpload(e.target.files)
                      }
                    />
                  </div>

                  {/* Image preview grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {formData.images.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={`Slika ${index + 1}`}
                          width={150}
                          height={150}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(imageUrl, index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}

                    {/* Show uploading placeholders */}
                    {uploadingImages.map((fileName) => (
                      <div
                        key={fileName}
                        className="w-full h-32 bg-gray-100 rounded-lg border flex items-center justify-center"
                      >
                        <div className="text-sm text-gray-500">
                          Učitavanje...
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                />
                <Label htmlFor="isActive">Proizvod je aktivan</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Odustani
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading
                    ? "Spremanje..."
                    : editingProduct
                    ? "Ažuriraj"
                    : "Kreiraj"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48">
              {product.images.length > 0 ? (
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Nema slike</span>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge variant={product.isActive ? "default" : "secondary"}>
                  {product.isActive ? "Aktivan" : "Neaktivan"}
                </Badge>
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">€{product.price}</span>
                <Badge variant="outline">{product.category.name}</Badge>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(product)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Nema proizvoda za prikaz</p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Dodaj Prvi Proizvod
          </Button>
        </div>
      )}
    </div>
  );
}
