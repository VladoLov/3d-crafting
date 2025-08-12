"use client";

import { motion } from "framer-motion";
import { Wrench, Printer, Heart, Zap, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CategoriesPage() {
  const categories = [
    {
      id: "graviranje",
      name: "Graviranje",
      description:
        "Precizno graviranje na metal, drvo, staklo i druge materijale s najnovijom laser tehnologijom",
      longDescription:
        "Naša laser graviranje usluga omogućava vam da personalizirate bilo koji predmet s nevjerojatnom preciznošću. Radimo s različitim materijalima uključujući metal, drvo, staklo, kožu i plastiku.",
      icon: Zap,
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      href: "/kategorije/graviranje",
      image: "/laser-engraving-workshop.jpg",
      features: [
        "Laser preciznost",
        "Različiti materijali",
        "Brza izrada",
        "Personalizacija",
      ],
      popular: true,
    },
    {
      id: "cnc",
      name: "CNC Obrada",
      description:
        "Profesionalna CNC obrada za složene i precizne dijelove s 3D modeliranjem",
      longDescription:
        "CNC obrada omogućava nam stvaranje složenih i preciznih dijelova iz različitih materijala. Koristimo najnovije CNC strojeve za postizanje savršenih rezultata.",
      icon: Wrench,
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      href: "/kategorije/cnc",
      image: "/cnc-workshop-precision.jpg",
      features: [
        "3D modeliranje",
        "Precizna obrada",
        "Različiti materijali",
        "Složeni oblici",
      ],
      popular: false,
    },
    {
      id: "3d-print",
      name: "3D Print",
      description:
        "Inovativni 3D print za prototipove i finalne proizvode s visokom kvalitetom",
      longDescription:
        "3D printanje omogućava brzu izradu prototipova i finalnih proizvoda. Koristimo najkvalitetnije materijale i najnoviju tehnologiju za savršene rezultate.",
      icon: Printer,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      href: "/kategorije/3d-print",
      image: "/3d-printer-creation.jpg",
      features: [
        "Brzi prototipovi",
        "Visoka kvaliteta",
        "Različiti materijali",
        "Složene geometrije",
      ],
      popular: true,
    },
    {
      id: "svadbe",
      name: "Svadbeni Proizvodi",
      description:
        "Personalizirani svadbeni detalji za vaš poseban dan s jedinstvenim dizajnom",
      longDescription:
        "Stvaramo nezaboravne svadbene detalje koji će učiniti vaš dan još posebnijim. Od pozivnica do dekoracija, sve je prilagođeno vašem stilu.",
      icon: Heart,
      color: "from-pink-400 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
      href: "/kategorije/svadbe",
      image: "/elegant-wedding-setup.jpg",
      features: [
        "Personalizacija",
        "Jedinstveni dizajn",
        "Kompletna usluga",
        "Romantični detalji",
      ],
      popular: false,
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
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75] as [number, number, number, number],
      },
    },
  };

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
              <span className="bg-gradient-to-r from-violet-400 to-accent bg-clip-text text-transparent">
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
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  variants={cardVariants}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="group"
                >
                  <div className="card hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden">
                    {/* Popular Badge */}
                    <div>
                      {category.popular && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-violet-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Popularno
                          </Badge>
                        </div>
                      )}

                      {/* Image */}
                      <div className="relative overflow-hidden rounded-lg mb-6">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${category.bgColor}`}
                        >
                          <IconComponent
                            className={`h-6 w-6 ${category.textColor}`}
                          />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-violet-600 transition-colors duration-200">
                        {category.name}
                      </h3>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {category.description}
                      </p>

                      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                        {category.longDescription}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {category.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="secondary"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div>
                      <Link href={category.href}>
                        <Button className="w-full group-hover:bg-violet-600 transition-colors duration-200">
                          Saznajte Više
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                      </Link>
                    </div>
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
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-violet-600">
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
      <section className="section-padding bg-violet-600 text-white">
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
