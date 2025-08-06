"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  category: string;
  badge?: string;
  description: string;
  materials?: string[];
  sizes?: string[];
}

interface ProductGridProps {
  products: Product[];
  searchParams: {
    sort?: string;
    filter?: string;
    price?: string;
    material?: string;
  };
}

export function ProductGrid({ products, searchParams }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by materials
    if (searchParams.material) {
      const materials = searchParams.material.split(",");
      filtered = filtered.filter((product) =>
        product.materials?.some((material) => materials.includes(material))
      );
    }

    // Filter by sizes
    if (searchParams.filter) {
      const sizes = searchParams.filter.split(",");
      filtered = filtered.filter((product) =>
        product.sizes?.some((size) => sizes.includes(size))
      );
    }

    // Sort products
    switch (searchParams.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Assuming newer products have higher IDs
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      default:
        // Default sorting (featured/bestsellers first)
        filtered.sort((a, b) => {
          if (a.badge === "Bestseller" && b.badge !== "Bestseller") return -1;
          if (b.badge === "Bestseller" && a.badge !== "Bestseller") return 1;
          return 0;
        });
    }

    return filtered;
  }, [products, searchParams]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Proizvodi ({filteredProducts.length})
          </h2>
          <p className="text-gray-600 mt-1">
            Pronađeno {filteredProducts.length} od {products.length} proizvoda
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="px-3"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="px-3"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <ShoppingCart className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nema proizvoda
          </h3>
          <p className="text-gray-600">
            Pokušajte promijeniti filtere ili pretražiti drukčije.
          </p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className={
                viewMode === "grid"
                  ? "group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                  : "group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex"
              }
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden ${
                  viewMode === "list" ? "w-48 flex-shrink-0" : ""
                }`}
              >
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className={`object-cover transition-transform duration-300 group-hover:scale-110 ${
                    viewMode === "grid" ? "w-full h-64" : "w-full h-full"
                  }`}
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary-500 hover:bg-primary-600"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                {/* Category */}
                <div className="text-sm text-primary-600 font-medium mb-2">
                  {product.category}
                </div>

                {/* Title */}
                <Link href={`/proizvod/${product.slug}`}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200 cursor-pointer">
                    {product.name}
                  </h3>
                </Link>

                {/* Description (List view only) */}
                {viewMode === "list" && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                )}

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Materials (List view only) */}
                {viewMode === "list" && product.materials && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.materials.slice(0, 3).map((material) => (
                        <span
                          key={material}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price */}
                <div
                  className={`flex items-center ${
                    viewMode === "list" ? "justify-between" : "justify-between"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {viewMode === "list" && (
                    <Button
                      size="sm"
                      className="bg-primary-500 hover:bg-primary-600"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Dodaj
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
