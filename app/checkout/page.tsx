"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { useCheckoutStore } from "@/lib/store/checkout-store";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { ShippingForm } from "@/components/checkout/shipping-form";
import { BillingForm } from "@/components/checkout/billing-form";
import { PaymentForm } from "@/components/checkout/payment-form";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";
import { CartSummary } from "@/components/cart/cart-summary";
import Link from "next/link";

function CheckoutPageContent() {
  const { items } = useCartStore();
  const { currentStep, setCurrentStep, canProceedToStep } = useCheckoutStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
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

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ShippingForm onNext={handleNext} />;
      case 2:
        return <BillingForm onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <PaymentForm onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <OrderConfirmation onBack={handleBack} />;
      default:
        return <ShippingForm onNext={handleNext} />;
    }
  };

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

        {/* Progress Steps */}
        <CheckoutSteps />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary />
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
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
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
