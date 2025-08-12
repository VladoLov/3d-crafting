"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CreditCard, Truck, DollarSign, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCheckoutStore } from "@/lib/store/checkout-store";
import { PaymentMethod } from "@/lib/types/checkout";
import { formatPrice } from "@/lib/utils";

const paymentSchema = z
  .object({
    type: z.enum(["card", "paypal", "bank", "cash"]),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
    cardholderName: z.string().optional(),
    shippingMethod: z.enum(["standard", "express"]),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "card") {
        return !!(
          data.cardNumber &&
          data.expiryDate &&
          data.cvv &&
          data.cardholderName
        );
      }
      return true;
    },
    {
      message: "Sva polja kartice su obavezna",
    }
  );

const paymentMethods = [
  {
    id: "card",
    name: "Kreditna/Debitna kartica",
    description: "Visa, Mastercard, American Express",
    icon: CreditCard,
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Platite sigurno s PayPal računom",
    icon: DollarSign,
  },
  {
    id: "bank",
    name: "Bankovni transfer",
    description: "Direktni transfer na naš račun",
    icon: Building2,
  },
  {
    id: "cash",
    name: "Gotovina pri dostavi",
    description: "Platite kada primite paket",
    icon: Truck,
  },
];

const shippingMethods = [
  {
    id: "standard",
    name: "Standardna dostava",
    description: "5-7 radnih dana",
    price: 15,
  },
  {
    id: "express",
    name: "Brza dostava",
    description: "2-3 radna dana",
    price: 25,
  },
];

interface PaymentFormProps {
  onNext: () => void;
  onBack: () => void;
}

export function PaymentForm({ onNext, onBack }: PaymentFormProps) {
  const { checkoutData, updatePayment, updateShippingMethod, updateNotes } =
    useCheckoutStore();
  const [selectedPayment, setSelectedPayment] = useState<string>(
    checkoutData.payment?.type || "card"
  );

  const form = useForm<
    PaymentMethod & { shippingMethod: "standard" | "express"; notes?: string }
  >({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      type: checkoutData.payment?.type || "card",
      cardNumber: checkoutData.payment?.cardNumber || "",
      expiryDate: checkoutData.payment?.expiryDate || "",
      cvv: checkoutData.payment?.cvv || "",
      cardholderName: checkoutData.payment?.cardholderName || "",
      shippingMethod: checkoutData.shippingMethod || "standard",
      notes: checkoutData.notes || "",
    },
  });

  const onSubmit = (
    data: PaymentMethod & {
      shippingMethod: "standard" | "express";
      notes?: string;
    }
  ) => {
    const { shippingMethod, notes, ...paymentData } = data;
    updatePayment(paymentData);
    updateShippingMethod(shippingMethod);
    if (notes) updateNotes(notes);
    onNext();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Shipping Method */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Način dostave
        </h3>

        <RadioGroup
          value={form.watch("shippingMethod")}
          onValueChange={(value) =>
            form.setValue("shippingMethod", value as "standard" | "express")
          }
          className="space-y-3"
        >
          {shippingMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
            >
              <RadioGroupItem value={method.id} id={method.id} />
              <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-600">
                      {method.description}
                    </div>
                  </div>
                  <div className="font-semibold">
                    {formatPrice(method.price)}
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Način plaćanja
        </h3>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <RadioGroup
            value={selectedPayment}
            onValueChange={(value) => {
              setSelectedPayment(value);
              form.setValue("type", value as any);
            }}
            className="space-y-3"
          >
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={method.id}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                >
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-gray-600" />
                      <div>
                        <div className="font-medium">{method.name}</div>
                        <div className="text-sm text-gray-600">
                          {method.description}
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>

          {/* Card Details */}
          {selectedPayment === "card" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <Label htmlFor="cardholderName">Ime na kartici *</Label>
                <Input
                  id="cardholderName"
                  {...form.register("cardholderName")}
                  className="mt-1"
                />
                {form.formState.errors.cardholderName && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.cardholderName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="cardNumber">Broj kartice *</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  {...form.register("cardNumber")}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    form.setValue("cardNumber", formatted);
                  }}
                  maxLength={19}
                  className="mt-1"
                />
                {form.formState.errors.cardNumber && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Datum isteka *</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    {...form.register("expiryDate")}
                    onChange={(e) => {
                      const formatted = formatExpiryDate(e.target.value);
                      form.setValue("expiryDate", formatted);
                    }}
                    maxLength={5}
                    className="mt-1"
                  />
                  {form.formState.errors.expiryDate && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.expiryDate.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    {...form.register("cvv")}
                    maxLength={4}
                    className="mt-1"
                  />
                  {form.formState.errors.cvv && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.cvv.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Special Instructions */}
          <div>
            <Label htmlFor="notes">Posebne napomene (opcionalno)</Label>
            <Textarea
              id="notes"
              placeholder="Dodatne informacije o dostavi ili narudžbi..."
              {...form.register("notes")}
              className="mt-1"
              rows={3}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline" onClick={onBack}>
              Nazad
            </Button>
            <Button type="submit" size="lg">
              Pregled narudžbe
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
