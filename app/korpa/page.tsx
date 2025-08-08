"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Minus, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store/cart-store";
import { CartSummary } from "@/components/cart/cart-summary";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

function CartPageContent() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Vaša košarica je prazna
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Izgleda da niste dodali nijedan proizvod u košaricu. Istražite
              naše proizvode i pronađite nešto što vam se sviđa!
            </p>
            <Button asChild size="lg">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Nastavi kupnju
              </Link>
            </Button>
          </div>
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
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Nastavi kupnju
            </Link>
          </Button>

          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Košarica ({items.length})
            </h1>
            <Button
              variant="ghost"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Očisti košaricu
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex space-x-4">
                  {/* Image */}
                  <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          <Link
                            href={`/proizvod/${item.slug}`}
                            className="hover:text-primary-600 transition-colors"
                          >
                            {item.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Customizations */}
                    {(item.selectedMaterial ||
                      item.selectedSize ||
                      item.customText) && (
                      <div className="text-sm text-gray-600 space-y-1 mb-3">
                        {item.selectedMaterial && (
                          <div>
                            <span className="font-medium">Materijal:</span>{" "}
                            {item.selectedMaterial.name}
                            {item.selectedMaterial.price > 0 && (
                              <span className="text-primary-600 ml-1">
                                (+{formatPrice(item.selectedMaterial.price)})
                              </span>
                            )}
                          </div>
                        )}
                        {item.selectedSize && (
                          <div>
                            <span className="font-medium">Veličina:</span>{" "}
                            {item.selectedSize.name}
                            {item.selectedSize.price > 0 && (
                              <span className="text-primary-600 ml-1">
                                (+{formatPrice(item.selectedSize.price)})
                              </span>
                            )}
                          </div>
                        )}
                        {item.customText && (
                          <div>
                            <span className="font-medium">
                              Personalizacija:
                            </span>{" "}
                            "{item.customText}"
                          </div>
                        )}
                      </div>
                    )}

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium w-12 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-lg">
                          {formatPrice(item.itemTotal)}
                        </div>
                        {item.savings && item.savings > 0 && (
                          <div className="text-sm text-green-600">
                            Ušteda: {formatPrice(item.savings)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary />

              <div className="mt-6 space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Nastavi na plaćanje</Link>
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <Link href="/">Nastavi kupnju</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <AuthGuard
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Prijavite se za pristup košarici
            </h2>
            <p className="text-gray-600 mb-6">
              Morate se prijaviti da biste vidjeli svoju košaricu i nastavili s
              kupnjom.
            </p>
          </div>
        </div>
      }
    >
      <CartPageContent />
    </AuthGuard>
  );
}
