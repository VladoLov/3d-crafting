"use client";

import { easeIn, motion } from "framer-motion";
import { Wrench, Printer, Heart, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
}

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const getIconForCategory = (slug: string) => {
    switch (slug) {
      case "graviranje":
        return Zap;
      case "cnc-obrada":
        return Wrench;
      case "3d-print":
        return Printer;
      case "svadbeni-proizvodi":
        return Heart;
      default:
        return Zap;
    }
  };

  const getColorsForCategory = (slug: string) => {
    switch (slug) {
      case "graviranje":
        return {
          color: "from-amber-400 to-orange-500",
          bgColor: "bg-amber-50",
          textColor: "text-amber-700",
        };
      case "cnc-obrada":
        return {
          color: "from-blue-400 to-indigo-500",
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
        };
      case "3d-print":
        return {
          color: "from-green-400 to-emerald-500",
          bgColor: "bg-green-50",
          textColor: "text-green-700",
        };
      case "svadbeni-proizvodi":
        return {
          color: "from-pink-400 to-rose-500",
          bgColor: "bg-pink-50",
          textColor: "text-pink-700",
        };
      default:
        return {
          color: "from-gray-400 to-gray-500",
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
        };
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: easeIn,
      },
    },
  };
  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
              Naše Specijalizacije
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Učitavanje kategorija...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-6"></div>
                <div className="bg-gray-200 h-12 w-12 rounded-xl mb-4"></div>
                <div className="bg-gray-200 h-6 rounded mb-3"></div>
                <div className="bg-gray-200 h-4 rounded mb-6"></div>
                <div className="bg-gray-200 h-10 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeIn }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
            Naše Specijalizacije
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Otkrijte naše četiri glavne oblasti rada i pronađite savršeno
            rješenje za vaše potrebe
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category) => {
            const IconComponent = getIconForCategory(category.slug);
            const colors = getColorsForCategory(category.slug);
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Link href={`kategorije/${category.slug}`}>
                  <div className="card hover:shadow-xl transition-all duration-700 h-full">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-lg mb-6">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${colors.color} opacity-20 group-hover:opacity-30 transition-opacity duration-700`}
                      />
                    </div>

                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.bgColor} mb-4`}
                    >
                      <IconComponent
                        className={`h-6 w-6 ${colors.textColor}`}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors duration-700">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* CTA */}
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-violet-50 group-hover:border-violet-200 transition-colors duration-700"
                    >
                      Saznajte Više
                    </Button>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
