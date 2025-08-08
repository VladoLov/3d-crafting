"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";

export function CartButton() {
  const { getTotalItems, toggleCart } = useCartStore();
  const itemCount = getTotalItems();

  return (
    <Button variant="ghost" size="sm" className="relative" onClick={toggleCart}>
      <ShoppingCart className="h-5 w-5" />

      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
