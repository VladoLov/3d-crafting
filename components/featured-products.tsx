"use client";

import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function FeaturedProducts() {
  const products = [
    {
      id: "1",
      name: "Personalizirani Privjesak",
      price: 25.99,
      originalPrice: 35.99,
      rating: 4.8,
      reviews: 124,
      image: "/personalizirani-privjesak.jpg",
      category: "Graviranje",
      badge: "Bestseller",
    },
    {
      id: "2",
      name: "CNC Drvena Kutija",
      price: 89.99,
      rating: 4.9,
      reviews: 67,
      image: "/drvena-kutija.jpg",
      category: "CNC Obrada",
      badge: "Novo",
    },
    {
      id: "3",
      name: "3D Figurica po Fotografiji",
      price: 149.99,
      rating: 4.7,
      reviews: 89,
      image: "/custom-3d-figurine.jpg",
      category: "3D Print",
      badge: "Popularan",
    },
    {
      id: "4",
      name: "Svadbeni Prsteni Držač",
      price: 45.99,
      rating: 5.0,
      reviews: 156,
      image: "/3d-ring.jpg",
      category: "Svadbe",
      badge: "Top Rated",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.25, 0.25, 0.75] as [number, number, number, number],
      },
    },
  };

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
            Izdvojeni Proizvodi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Otkrijte naše najpopularnije proizvode koje naši klijenti najviše
            vole
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-700"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                    {product.badge}
                  </span>
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center space-x-3">
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
              <div className="p-6">
                {/* Category */}
                <div className="text-sm text-primary-600 font-medium mb-2">
                  {product.category}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-700">
                  {product.name}
                </h3>

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
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" className="btn-secondary">
            Pogledajte Sve Proizvode
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
