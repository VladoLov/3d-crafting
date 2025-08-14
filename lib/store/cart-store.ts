import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string | { id: string; name: string; slug: string };
  quantity: number;

  // Customization options
  selectedMaterial?: {
    name: string;
    price: number;
    image?: string;
  };
  selectedSize?: {
    name: string;
    dimensions: string;
    price: number;
  };
  customText?: string;

  // Calculated fields
  itemTotal: number;
  savings?: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  // Actions
  addItem: (item: Omit<CartItem, "id" | "itemTotal">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateCustomization: (
    itemId: string,
    customization: Partial<
      Pick<CartItem, "selectedMaterial" | "selectedSize" | "customText">
    >
  ) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed values
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getTotalSavings: () => number;
  getShippingCost: () => number;
  getFinalTotal: () => number;
}

const FREE_SHIPPING_THRESHOLD = 100;
const STANDARD_SHIPPING_COST = 15;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),

      addItem: (newItem) => {
        const items = get().items;

        // Generate unique ID for cart item
        const itemId = `${newItem.productId}-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        // Calculate item total
        const basePrice =
          newItem.price +
          (newItem.selectedMaterial?.price || 0) +
          (newItem.selectedSize?.price || 0);
        const itemTotal = basePrice * newItem.quantity;
        const savings = newItem.originalPrice
          ? (newItem.originalPrice - newItem.price) * newItem.quantity
          : undefined;

        const cartItem: CartItem = {
          ...newItem,
          id: itemId,
          itemTotal,
          savings,
        };

        // Check if similar item exists (same product, material, size, customization)
        const existingItemIndex = items.findIndex(
          (item) =>
            item.productId === newItem.productId &&
            item.selectedMaterial?.name === newItem.selectedMaterial?.name &&
            item.selectedSize?.name === newItem.selectedSize?.name &&
            item.customText === newItem.customText
        );

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          const updatedItems = [...items];
          const existingItem = updatedItems[existingItemIndex];
          const newQuantity = existingItem.quantity + newItem.quantity;

          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
            itemTotal: basePrice * newQuantity,
            savings: existingItem.savings
              ? existingItem.savings + (savings || 0)
              : savings,
          };

          set({ items: updatedItems });
        } else {
          // Add new item
          set({ items: [...items, cartItem] });
        }

        // Auto-open cart when item is added
        set({ isOpen: true });
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const items = get().items.map((item) => {
          if (item.id === itemId) {
            const basePrice =
              item.price +
              (item.selectedMaterial?.price || 0) +
              (item.selectedSize?.price || 0);
            const itemTotal = basePrice * quantity;
            const savings = item.originalPrice
              ? (item.originalPrice - item.price) * quantity
              : undefined;

            return {
              ...item,
              quantity,
              itemTotal,
              savings,
            };
          }
          return item;
        });

        set({ items });
      },

      updateCustomization: (itemId, customization) => {
        const items = get().items.map((item) => {
          if (item.id === itemId) {
            const updatedItem = { ...item, ...customization };
            const basePrice =
              updatedItem.price +
              (updatedItem.selectedMaterial?.price || 0) +
              (updatedItem.selectedSize?.price || 0);
            const itemTotal = basePrice * updatedItem.quantity;

            return {
              ...updatedItem,
              itemTotal,
            };
          }
          return item;
        });

        set({ items });
      },

      clearCart: () => {
        set({ items: [], isOpen: false });
      },

      toggleCart: () => {
        set({ isOpen: !get().isOpen });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.itemTotal, 0);
      },

      getTotalSavings: () => {
        return get().items.reduce(
          (total, item) => total + (item.savings || 0),
          0
        );
      },

      getShippingCost: () => {
        const totalPrice = get().getTotalPrice();
        return totalPrice >= FREE_SHIPPING_THRESHOLD
          ? 0
          : STANDARD_SHIPPING_COST;
      },

      getFinalTotal: () => {
        return get().getTotalPrice() + get().getShippingCost();
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);
