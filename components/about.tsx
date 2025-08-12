"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, Shield } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Award,
      title: "Kvaliteta",
      description:
        "Koristimo najkvalitetnije materijale i najnoviju tehnologiju",
    },
    {
      icon: Users,
      title: "Iskustvo",
      description: "Više od 10 godina iskustva u personalizaciji proizvoda",
    },
    {
      icon: Clock,
      title: "Brzina",
      description: "Brza izrada i dostava u roku od 3-7 radnih dana",
    },
    {
      icon: Shield,
      title: "Garancija",
      description: "Puna garancija na sve naše proizvode i usluge",
    },
  ];

  return (
    <section className="section-padding bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              Zašto Odabrati{" "}
              <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Nas?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Kombiniramo tradicionalno umijeće s modernom tehnologijom kako
              bismo stvorili proizvode koji nadmašuju vaša očekivanja. Svaki
              projekt je jedinstvena prilika da pokažemo našu strast prema
              savršenstvu.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/modern-workshop.jpg"
                alt="Naša radionica"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
            </div>

            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-xl shadow-xl"
            >
              <div className="text-2xl font-bold text-primary-600">500+</div>
              <div className="text-sm font-medium">Zadovoljnih Klijenata</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -top-6 -right-6 bg-primary-500 text-white p-6 rounded-xl shadow-xl"
            >
              <div className="text-2xl font-bold">10+</div>
              <div className="text-sm font-medium">Godina Iskustva</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
