"use client";
import { useCartStore } from "@/lib/store/cart-store";
import { useSession } from "next-auth/react";
import { AuthModal } from "@/components/auth/auth-modal";
import { useState } from "react";
import { CartSidebar } from "./cart-sidebar";

export function ProtectedCartSidebar() {
  const { data: session } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);
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
    toggleCart,
    setIsOpen,
  } = useCartStore();

  if (!session && isOpen) {
    setIsOpen(false);
    setShowAuthModal(true);
  }

  if (!session) {
    return (
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    );
  }

  return <CartSidebar />;
}
