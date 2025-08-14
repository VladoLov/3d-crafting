"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Printer,
  Heart,
  Zap,
  ArrowRight,
  Star,
  Package,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  products: Product[];
  _count: {
    products: number;
  };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories/with-products");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryConfig = (slug: string) => {
    const configs = {
      graviranje: {
        icon: Zap,
        color: "from-amber-400 to-orange-500",
        bgColor: "bg-amber-50",
        textColor: "text-amber-700",
        popular: true,
      },
      "cnc-obrada": {
        icon: Wrench,
        color: "from-blue-400 to-indigo-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        popular: false,
      },
      "3d-print": {
        icon: Printer,
        color: "from-green-400 to-emerald-500",
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        popular: true,
      },
      "svadbeni-proizvodi": {
        icon: Heart,
        color: "from-pink-400 to-rose-500",
        bgColor: "bg-pink-50",
        textColor: "text-pink-700",
        popular: false,
      },
    };
    return (
      configs[slug as keyof typeof configs] || {
        icon: Package,
        color: "from-gray-400 to-gray-500",
        bgColor: "bg-gray-50",
        textColor: "text-gray-700",
        popular: false,
      }
    );
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
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75] as [number, number, number, number],
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Naše{" "}
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Kategorije
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Otkrijte naše specijalizirane usluge i pronađite savršeno rješenje
              za vaše kreativne projekte
            </p>
          </div>
        </section>

        {/* Loading Categories */}
        <section className="section-padding bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-lg mb-6"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-6"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Naše{" "}
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Kategorije
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Otkrijte naše specijalizirane usluge i pronađite savršeno rješenje
              za vaše kreativne projekte
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {categories.map((category) => {
              const config = getCategoryConfig(category.slug);
              const IconComponent = config.icon;
              return (
                <motion.div
                  key={category.id}
                  variants={cardVariants}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="group"
                >
                  <div className="card hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden">
                    {/* Popular Badge */}
                    {config.popular && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-primary-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Popularno
                        </Badge>
                      </div>
                    )}

                    {/* Product Count Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant="secondary">
                        {category._count.products} proizvoda
                      </Badge>
                    </div>

                    {/* Image */}
                    <div className="relative overflow-hidden rounded-lg mb-6">
                      <img
                        src={
                          category.image ||
                          "/placeholder.svg?height=256&width=400&query=category"
                        }
                        alt={category.name}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${config.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${config.bgColor}`}
                      >
                        <IconComponent
                          className={`h-6 w-6 ${config.textColor}`}
                        />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                      {category.name}
                    </h3>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {category.description ||
                        `Otkrijte našu ${category.name.toLowerCase()} kolekciju s vrhunskim proizvodima.`}
                    </p>

                    {/* Sample Products */}
                    {category.products.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          Izdvojeni proizvodi:
                        </h4>
                        <div className="space-y-1">
                          {category.products.slice(0, 3).map((product) => (
                            <div
                              key={product.id}
                              className="flex justify-between items-center text-sm"
                            >
                              <span className="text-gray-600 truncate">
                                {product.name}
                              </span>
                              <span className="text-primary-600 font-medium">
                                {product.price}€
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <Link href={`/kategorije/${category.slug}`}>
                      <Button className="w-full group-hover:bg-primary-600 transition-colors duration-200">
                        Pogledajte Proizvode
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Kako Funkcionira Naš Proces
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jednostavan i transparentan proces od ideje do finalnog proizvoda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Konsultacija",
                description: "Razgovaramo o vašoj ideji i potrebama",
              },
              {
                step: "02",
                title: "Dizajn",
                description: "Kreiramo dizajn prema vašim specifikacijama",
              },
              {
                step: "03",
                title: "Proizvodnja",
                description: "Koristimo najnoviju tehnologiju za izradu",
              },
              {
                step: "04",
                title: "Dostava",
                description: "Brza i sigurna dostava na vašu adresu",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Imate Ideju? Ostvarimo Je Zajedno!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Kontaktirajte nas za besplatnu konsultaciju i ponudu
            </p>
            <Button size="lg" variant="secondary">
              Zatražite Ponudu
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
