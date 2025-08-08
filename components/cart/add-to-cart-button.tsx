"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, CartItem } from "@/lib/store/cart-store";

interface AddToCartButtonProps {
  product: any; // Replace with proper product type
  selectedMaterial?: any;
  selectedSize?: any;
  quantity: number;
  customText?: string;
  disabled?: boolean;
  className?: string;
}

export function AddToCartButton({
  product,
  selectedMaterial,
  selectedSize,
  quantity,
  customText,
  disabled,
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (disabled) return;

    const cartItem: Omit<CartItem, "id" | "itemTotal"> = {
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      category: product.category,
      quantity,
      selectedMaterial,
      selectedSize,
      customText,
    };

    addItem(cartItem);

    // Show success state
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isAdded}
      className={className}
      size="lg"
    >
      <motion.div
        className="flex items-center space-x-2"
        animate={isAdded ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {isAdded ? (
          <>
            <Check className="h-5 w-5" />
            <span>Dodano u košaricu!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            <span>Dodaj u košaricu</span>
          </>
        )}
      </motion.div>
    </Button>
  );
}
