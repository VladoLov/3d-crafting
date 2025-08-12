"use client";

import { motion } from "framer-motion";
import { Check, Truck, CreditCard, ShoppingBag, User } from "lucide-react";
import { useCheckoutStore } from "@/lib/store/checkout-store";

const steps = [
  {
    id: 1,
    name: "Dostava",
    description: "Adresa dostave",
    icon: User,
  },
  {
    id: 2,
    name: "Naplata",
    description: "Adresa naplate",
    icon: Truck,
  },
  {
    id: 3,
    name: "Plaćanje",
    description: "Način plaćanja",
    icon: CreditCard,
  },
  {
    id: 4,
    name: "Potvrda",
    description: "Pregled narudžbe",
    icon: ShoppingBag,
  },
];

export function CheckoutSteps() {
  const { currentStep, isStepValid, canProceedToStep } = useCheckoutStore();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between">
          {steps.map((step, stepIdx) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isValid = isStepValid(step.id);
            const canProceed = canProceedToStep(step.id);
            const IconComponent = step.icon;

            return (
              <li key={step.name} className="relative flex-1">
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-200">
                    <motion.div
                      className="h-full bg-primary-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: isCompleted ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}

                <div className="relative flex flex-col items-center group">
                  <motion.div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      isCompleted
                        ? "bg-primary-500 border-primary-500 text-white"
                        : isCurrent
                        ? "bg-white border-primary-500 text-primary-500"
                        : canProceed
                        ? "bg-white border-gray-300 text-gray-500 hover:border-primary-300"
                        : "bg-gray-100 border-gray-200 text-gray-400"
                    }`}
                    whileHover={canProceed ? { scale: 1.05 } : {}}
                    whileTap={canProceed ? { scale: 0.95 } : {}}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <IconComponent className="w-4 h-4" />
                    )}
                  </motion.div>

                  <div className="mt-2 text-center">
                    <div
                      className={`text-sm font-medium ${
                        isCurrent
                          ? "text-primary-600"
                          : isCompleted
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </div>
                    <div className="text-xs text-gray-500 hidden sm:block">
                      {step.description}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
