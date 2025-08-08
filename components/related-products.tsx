"use client";

import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

interface RelatedProductsProps {
  currentProduct: any;
  category: string;
}

export function RelatedProducts({
  currentProduct,
  category,
}: RelatedProductsProps) {
  // Mock related products - replace with actual data
  const relatedProducts = [
    {
      id: "2",
      name: "Gravirana Plaketa",
      slug: "gravirana-plaketa",
      price: 45.99,
      rating: 4.9,
      reviews: 89,
      image: "/engraved-plaque.png",
      category: "Graviranje",
      badge: "Novo",
    },
    {
      id: "3",
      name: "Gravirana Čaša",
      slug: "gravirana-casa",
      price: 18.99,
      rating: 4.7,
      reviews: 156,
      image: "/engraved-glass.png",
      category: "Graviranje",
    },
    {
      id: "5",
      name: "Metalni Dijelovi",
      slug: "metalni-dijelovi",
      price: 125.99,
      rating: 4.8,
      reviews: 43,
      image: "/cnc-metal-parts.png",
      category: "CNC Obrada",
    },
  ].filter((product) => product.id !== currentProduct.id);

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
    <section className="py-16 border-t border-gray-100">
      <div className="mb-12">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
          Slični proizvodi
        </h2>
        <p className="text-gray-600">
          Otkrijte druge proizvode koji bi vam se mogli svidjeti
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {relatedProducts.slice(0, 3).map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
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
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  size="sm"
                  className="bg-primary-500 hover:bg-primary-600"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Dodaj u košaricu
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
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

              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                <Link href={`/proizvod/${product.slug}`}>
                  <Button variant="outline" size="sm">
                    Pogledaj
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
