"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { useSession } from "@/lib/auth-client";
import { AuthModal } from "@/components/auth/auth-modal";

export function ProtectedCartButton() {
  const { data: session } = useSession();
  const { getTotalItems, toggleCart } = useCartStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const itemCount = getTotalItems();

  const handleClick = () => {
    if (!session) {
      setShowAuthModal(true);
      return;
    }
    toggleCart();
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={handleClick}
      >
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

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          toggleCart();
        }}
      />
    </>
  );
}
