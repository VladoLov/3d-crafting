"use client";

import { useState } from "react";
import { useSession, SessionProvider } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProtectedCartButton } from "@/components/cart/protected-cart-button";
import { UserMenu } from "@/components/auth/user-menu";
import { AuthModal } from "@/components/auth/auth-modal";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const session = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Početna" },
    { href: "/kategorije/graviranje", label: "Graviranje" },
    { href: "/kategorije/cnc-obrada", label: "CNC" },
    { href: "/kategorije/3d-print", label: "3D Print" },
    { href: "/kategorije/svadbeni-proizvodi", label: "Svadbe" },
    { href: "/o-nama", label: "O nama" },
  ];

  return (
    <SessionProvider>
      <>
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <span className="text-2xl font-bold text-gray-900">
                  CraftShop
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                <ProtectedCartButton />

                {session?.data?.user?.name ? (
                  <UserMenu />
                ) : (
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    variant="outline"
                    size="sm"
                  >
                    Prijava
                  </Button>
                )}

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </>
    </SessionProvider>
  );
}
