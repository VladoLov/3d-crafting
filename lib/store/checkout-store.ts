import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  CheckoutData,
  ShippingAddress,
  BillingAddress,
  PaymentMethod,
} from "@/lib/types/checkout";

interface CheckoutState {
  currentStep: number;
  checkoutData: Partial<CheckoutData>;
  isLoading: boolean;

  // Actions
  setCurrentStep: (step: number) => void;
  updateShipping: (shipping: ShippingAddress) => void;
  updateBilling: (billing: BillingAddress) => void;
  updatePayment: (payment: PaymentMethod) => void;
  updateShippingMethod: (method: "standard" | "express") => void;
  updateNotes: (notes: string) => void;
  setLoading: (loading: boolean) => void;
  resetCheckout: () => void;

  // Validation
  isStepValid: (step: number) => boolean;
  canProceedToStep: (step: number) => boolean;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      checkoutData: {},
      isLoading: false,

      setCurrentStep: (step) => set({ currentStep: step }),

      updateShipping: (shipping) =>
        set((state) => ({
          checkoutData: { ...state.checkoutData, shipping },
        })),

      updateBilling: (billing) =>
        set((state) => ({
          checkoutData: { ...state.checkoutData, billing },
        })),

      updatePayment: (payment) =>
        set((state) => ({
          checkoutData: { ...state.checkoutData, payment },
        })),

      updateShippingMethod: (shippingMethod) =>
        set((state) => ({
          checkoutData: { ...state.checkoutData, shippingMethod },
        })),

      updateNotes: (notes) =>
        set((state) => ({
          checkoutData: { ...state.checkoutData, notes },
        })),

      setLoading: (isLoading) => set({ isLoading }),

      resetCheckout: () =>
        set({
          currentStep: 1,
          checkoutData: {},
          isLoading: false,
        }),

      isStepValid: (step) => {
        const { checkoutData } = get();

        switch (step) {
          case 1: // Shipping
            return !!(
              checkoutData.shipping?.firstName &&
              checkoutData.shipping?.lastName &&
              checkoutData.shipping?.email &&
              checkoutData.shipping?.phone &&
              checkoutData.shipping?.address &&
              checkoutData.shipping?.city &&
              checkoutData.shipping?.postalCode &&
              checkoutData.shipping?.country
            );
          case 2: // Billing
            if (checkoutData.billing?.sameAsShipping) return true;
            return !!(
              checkoutData.billing?.firstName &&
              checkoutData.billing?.lastName &&
              checkoutData.billing?.address &&
              checkoutData.billing?.city &&
              checkoutData.billing?.postalCode &&
              checkoutData.billing?.country
            );
          case 3: // Payment
            return !!(
              checkoutData.payment?.type && checkoutData.shippingMethod
            );
          default:
            return false;
        }
      },

      canProceedToStep: (step) => {
        const { isStepValid } = get();
        for (let i = 1; i < step; i++) {
          if (!isStepValid(i)) return false;
        }
        return true;
      },
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ checkoutData: state.checkoutData }),
    }
  )
);
