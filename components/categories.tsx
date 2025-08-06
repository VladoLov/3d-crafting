"use client";

import { motion } from "framer-motion";
import { Wrench, Printer, Heart, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Categories() {
  const categories = [
    {
      id: "graviranje",
      name: "Graviranje",
      description:
        "Precizno graviranje na metal, drvo, staklo i druge materijale",
      icon: Zap,
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      href: "/kategorije/graviranje",
      image: "/laser-engraving-workshop.jpg",
    },
    {
      id: "cnc",
      name: "CNC Obrada",
      description: "Profesionalna CNC obrada za složene i precizne dijelove",
      icon: Wrench,
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      href: "/kategorije/cnc",
      image: "/cnc-workshop-precision.jpg",
    },
    {
      id: "3d-print",
      name: "3D Print",
      description: "Inovativni 3D print za prototipove i finalne proizvode",
      icon: Printer,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      href: "/kategorije/3d-print",
      image: "/3d-printer-creation.jpg",
    },
    {
      id: "svadbe",
      name: "Svadbeni Proizvodi",
      description: "Personalizirani svadbeni detalji za vaš poseban dan",
      icon: Heart,
      color: "from-pink-400 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
      href: "/kategorije/svadbe",
      image: "/elegant-wedding-setup.jpg",
    },
  ];

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
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto py-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Link href={category.href}>
                  <div className="card hover:shadow-xl transition-all duration-300 h-full">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-lg mb-6">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                      />
                    </div>

                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${category.bgColor} mb-4`}
                    >
                      <IconComponent
                        className={`h-6 w-6 ${category.textColor}`}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors duration-200">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* CTA */}
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-violet-50 group-hover:border-violet-200 transition-colors duration-200"
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
