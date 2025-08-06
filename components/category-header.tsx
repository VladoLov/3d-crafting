"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CategoryHeaderProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
    products: any[];
  };
}

export function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <section className="relative h-96 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Breadcrumb */}
            <nav className="mb-6">
              <Button
                asChild
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/10 p-0"
              >
                <Link href="/" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Nazad na početnu</span>
                </Link>
              </Button>
            </nav>

            {/* Category Info */}
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4"
              >
                {category.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-200 mb-6 leading-relaxed"
              >
                {category.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center space-x-6 text-sm"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">Proizvoda:</span>
                  <span className="font-semibold">
                    {category.products.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">Kategorija:</span>
                  <span className="font-semibold">{category.name}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
