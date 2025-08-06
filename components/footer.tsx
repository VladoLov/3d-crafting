"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Kategorije",
      links: [
        { name: "Graviranje", href: "/kategorije/graviranje" },
        { name: "CNC Obrada", href: "/kategorije/cnc" },
        { name: "3D Print", href: "/kategorije/3d-print" },
        { name: "Svadbeni Proizvodi", href: "/kategorije/svadbe" },
      ],
    },
    {
      title: "Informacije",
      links: [
        { name: "O nama", href: "/o-nama" },
        { name: "Kontakt", href: "/kontakt" },
        { name: "Dostava", href: "/dostava" },
        { name: "Povrat", href: "/povrat" },
      ],
    },
    {
      title: "Podrška",
      links: [
        { name: "FAQ", href: "/faq" },
        { name: "Uvjeti korištenja", href: "/uvjeti" },
        { name: "Privatnost", href: "/privatnost" },
        { name: "Garancija", href: "/garancija" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="text-2xl font-display font-bold text-primary-400 mb-4 block"
              >
                Vlado
              </Link>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Specijalizirani smo za graviranje, CNC obradu, 3D print i
                svadbene proizvode. Svaki proizvod je jedinstvena priča kreirana
                posebno za vas.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary-400" />
                  <span className="text-gray-300">info@vlado-webshop.hr</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-400" />
                  <span className="text-gray-300">+385 1 234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary-400" />
                  <span className="text-gray-300">Zagreb, Hrvatska</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Vlado Webshop. Sva prava pridržana.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="#"
              className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
            >
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
