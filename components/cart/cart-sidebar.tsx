"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export function CartSidebar() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalSavings,
    getShippingCost,
    getFinalTotal,
    clearCart,
  } = useCartStore();

  const totalPrice = getTotalPrice();
  const totalSavings = getTotalSavings();
  const shippingCost = getShippingCost();
  const finalTotal = getFinalTotal();
  const freeShippingThreshold = 100;
  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - totalPrice
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">
                Košarica ({items.length})
              </h2>
              <Button variant="ghost" size="sm" onClick={closeCart}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Košarica je prazna
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Dodajte proizvode u košaricu da biste nastavili s kupnjom.
                  </p>
                  <Button onClick={closeCart} className="w-full">
                    Nastavi kupnju
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Free Shipping Progress */}
                {remainingForFreeShipping > 0 && (
                  <div className="p-4 bg-primary-50 border-b">
                    <div className="flex items-center space-x-2 text-sm text-primary-700 mb-2">
                      <Truck className="h-4 w-4" />
                      <span>
                        Dodajte još {formatPrice(remainingForFreeShipping)} za
                        besplatnu dostavu!
                      </span>
                    </div>
                    <div className="w-full bg-primary-200 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            (totalPrice / freeShippingThreshold) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Items */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex space-x-4 bg-gray-50 rounded-lg p-4"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {typeof item.category === "string"
                              ? item.category
                              : item.category?.name || "Nepoznata kategorija"}
                          </p>

                          {/* Customizations */}
                          <div className="text-xs text-gray-500 space-y-1 mt-1">
                            {item.selectedMaterial && (
                              <div>Materijal: {item.selectedMaterial.name}</div>
                            )}
                            {item.selectedSize && (
                              <div>Veličina: {item.selectedSize.name}</div>
                            )}
                            {item.customText && (
                              <div className="truncate">
                                Tekst: "{item.customText}"
                              </div>
                            )}
                          </div>

                          {/* Price and Quantity */}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-900">
                                {formatPrice(item.itemTotal)}
                              </span>
                              {item.savings && item.savings > 0 && (
                                <span className="text-xs text-green-600">
                                  Ušteda: {formatPrice(item.savings)}
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0 bg-transparent"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-6 w-6 p-0 bg-transparent"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 p-0 h-auto mt-2"
                            onClick={() => removeItem(item.id)}
                          >
                            Ukloni
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Footer */}
                <div className="border-t p-4 space-y-4">
                  {/* Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Međuzbroj:</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>

                    {totalSavings > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Ukupna ušteda:</span>
                        <span>-{formatPrice(totalSavings)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span>Dostava:</span>
                      <span>
                        {shippingCost === 0 ? (
                          <span className="text-green-600">Besplatno</span>
                        ) : (
                          formatPrice(shippingCost)
                        )}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold">
                      <span>Ukupno:</span>
                      <span>{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button asChild className="w-full" size="lg">
                      <Link href="/checkout" onClick={closeCart}>
                        Nastavi na plaćanje
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={closeCart}
                      >
                        Nastavi kupnju
                      </Button>
                      <Button
                        variant="ghost"
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={clearCart}
                      >
                        Očisti košaricu
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
