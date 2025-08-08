"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { CartSummary } from "@/components/cart/cart-summary";
import Link from "next/link";

function CheckoutPageContent() {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Košarica je prazna
          </h2>
          <p className="text-gray-600 mb-6">
            Dodajte proizvode u košaricu prije prelaska na plaćanje.
          </p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Nastavi kupnju
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/kosara">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Nazad na košaricu
            </Link>
          </Button>

          <h1 className="text-3xl font-bold text-gray-900">Plaćanje</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="text-center py-12">
                <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Checkout funkcionalnost
                </h3>
                <p className="text-gray-600 mb-6">
                  Ovdje će biti implementiran checkout proces s formama za
                  dostavu i plaćanje.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                    <Truck className="h-8 w-8 text-primary-500 mb-2" />
                    <span className="text-sm font-medium">Dostava</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                    <CreditCard className="h-8 w-8 text-primary-500 mb-2" />
                    <span className="text-sm font-medium">Plaćanje</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                    <Shield className="h-8 w-8 text-primary-500 mb-2" />
                    <span className="text-sm font-medium">Sigurnost</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary />

              <div className="mt-6">
                <Button className="w-full" size="lg" disabled>
                  Završi narudžbu
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Checkout funkcionalnost će biti implementirana u sljedećem
                  koraku
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <AuthGuard
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Prijavite se za plaćanje
            </h2>
            <p className="text-gray-600 mb-6">
              Morate se prijaviti da biste mogli završiti narudžbu.
            </p>
          </div>
        </div>
      }
    >
      <CheckoutPageContent />
    </AuthGuard>
  );
}
