"use client";

import { motion } from "framer-motion";
import { Target, Heart, Lightbulb, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Preciznost",
      description:
        "Svaki detalj je važan. Koristimo najnapredniju tehnologiju za postizanje savršenih rezultata.",
    },
    {
      icon: Heart,
      title: "Strast",
      description:
        "Ljubav prema radu i kreativnosti je ono što nas pokreće svaki dan.",
    },
    {
      icon: Lightbulb,
      title: "Inovacija",
      description:
        "Kontinuirano ulagamo u nova rješenja i tehnologije za bolje rezultate.",
    },
    {
      icon: Star,
      title: "Izvrsnost",
      description:
        "Težimo savršenstvu u svakom projektu, bez obzira na veličinu.",
    },
  ];

  const stats = [
    { number: "500+", label: "Zadovoljnih Klijenata" },
    { number: "10+", label: "Godina Iskustva" },
    { number: "1000+", label: "Završenih Projekata" },
    { number: "24/7", label: "Podrška" },
  ];

  const team = [
    {
      name: "Marko Petrović",
      role: "Osnivač i CNC Specijalista",
      image: "/professional-man-portrait.png",
      description:
        "Više od 15 godina iskustva u CNC obradi i preciznoj izradi.",
    },
    {
      name: "Ana Marić",
      role: "Dizajner i 3D Print Ekspert",
      image: "/professional-woman-portrait.png",
      description: "Kreativni um iza naših najkompleksnijih 3D projekata.",
    },
    {
      name: "Stefan Nikolić",
      role: "Graviranje Specijalista",
      image: "/craftsman-portrait.png",
      description: "Majstor graviranja s okom za najfinije detalje.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                O{" "}
                <span className="bg-gradient-to-r from-violet-400 to-accent bg-clip-text text-transparent">
                  Nama
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                CraftShop je vaš partner za sve kreativne projekte. Kombiniramo
                tradicionalno umijeće s najnovijom tehnologijom kako bismo
                ostvarili vaše vizije.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/kategorije">Pogledajte Usluge</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-gray-900 bg-transparent"
                >
                  Kontaktirajte Nas
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/modern-workshop.jpg"
                alt="CraftShop radionica"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-violet-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Naše Vrijednosti
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ono što nas čini drugačijima i zašto klijenti biraju baš nas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-2xl mb-6">
                    <IconComponent className="h-8 w-8 text-violet-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Naš Tim
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upoznajte stručnjake koji stoje iza svakog uspješnog projekta
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card text-center hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-violet-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-300 text-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Spremni za Vaš Sljedeći Projekt?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Kontaktirajte nas danas i ostvarite svoje kreativne ideje
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Zatražite Ponudu
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-violet-600 bg-transparent"
              >
                Pogledajte Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
