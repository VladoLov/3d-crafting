"use client";

import { motion } from "framer-motion";
import { Truck, Shield, RotateCcw } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartSummary() {
  const {
    getTotalItems,
    getTotalPrice,
    getTotalSavings,
    getShippingCost,
    getFinalTotal,
  } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const totalSavings = getTotalSavings();
  const shippingCost = getShippingCost();
  const finalTotal = getFinalTotal();

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Sažetak narudžbe
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Proizvodi ({totalItems}):</span>
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

        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Ukupno:</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-6 pt-6 border-t space-y-3">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Truck className="h-4 w-4 text-primary-500" />
          <span>Besplatna dostava preko {formatPrice(100)}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Shield className="h-4 w-4 text-primary-500" />
          <span>Sigurno plaćanje</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <RotateCcw className="h-4 w-4 text-primary-500" />
          <span>30 dana za povrat</span>
        </div>
      </div>
    </motion.div>
  );
}
