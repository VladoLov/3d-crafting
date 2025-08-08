"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  MapPin,
  CreditCard,
  Truck,
  FileText,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import { useCheckoutStore } from "@/lib/store/checkout-store";

interface OrderConfirmationProps {
  onBack: () => void;
}

export function OrderConfirmation({ onBack }: OrderConfirmationProps) {
  const { checkoutData, setLoading, isLoading, resetCheckout } =
    useCheckoutStore();
  const { items, getTotalPrice, getShippingCost, getFinalTotal, clearCart } =
    useCartStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string>("");

  const subtotal = getTotalPrice();
  const shippingCost = getShippingCost();
  const tax = subtotal * 0.25; // 25% PDV
  const total = getFinalTotal() + tax;

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate order ID
      const newOrderId = `ORD-${Date.now()}`;
      setOrderId(newOrderId);
      setOrderPlaced(true);

      // Clear cart and checkout data
      clearCart();
      resetCheckout();

      toast.success("Narudžba je uspješno poslana!");
    } catch (error) {
      toast.error("Greška pri slanju narudžbe");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Narudžba poslana!
        </h2>

        <p className="text-gray-600 mb-4">
          Vaša narudžba je uspješno poslana. Broj narudžbe je:
        </p>

        <div className="text-xl font-mono font-bold text-primary-600 mb-6">
          {orderId}
        </div>

        <p className="text-sm text-gray-600 mb-8">
          Poslat ćemo vam email s detaljima narudžbe i informacijama o praćenju.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <a href="/">Nastavi kupnju</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/narudzbe">Moje narudžbe</a>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Order Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Pregled narudžbe
        </h3>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-600">
                  Količina: {item.quantity}
                </p>
                {item.selectedMaterial && (
                  <p className="text-sm text-gray-600">
                    Materijal: {item.selectedMaterial.name}
                  </p>
                )}
                {item.selectedSize && (
                  <p className="text-sm text-gray-600">
                    Veličina: {item.selectedSize.name}
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  {formatPrice(item.itemTotal)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Međuzbroj:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Dostava:</span>
            <span>{formatPrice(shippingCost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>PDV (25%):</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Ukupno:</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Adresa dostave
          </h3>
        </div>

        {checkoutData.shipping && (
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-900">
              {checkoutData.shipping.firstName} {checkoutData.shipping.lastName}
            </p>
            {checkoutData.shipping.company && (
              <p>{checkoutData.shipping.company}</p>
            )}
            <p>{checkoutData.shipping.address}</p>
            <p>
              {checkoutData.shipping.postalCode} {checkoutData.shipping.city}
            </p>
            <p>{checkoutData.shipping.country}</p>
            <p className="mt-2">
              Email: {checkoutData.shipping.email}
              <br />
              Telefon: {checkoutData.shipping.phone}
            </p>
          </div>
        )}
      </div>

      {/* Payment & Shipping Method */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CreditCard className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Plaćanje</h3>
          </div>

          {checkoutData.payment && (
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900">
                {checkoutData.payment.type === "card" &&
                  "Kreditna/Debitna kartica"}
                {checkoutData.payment.type === "paypal" && "PayPal"}
                {checkoutData.payment.type === "bank" && "Bankovni transfer"}
                {checkoutData.payment.type === "cash" && "Gotovina pri dostavi"}
              </p>
              {checkoutData.payment.type === "card" &&
                checkoutData.payment.cardNumber && (
                  <p>
                    **** **** **** {checkoutData.payment.cardNumber.slice(-4)}
                  </p>
                )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Truck className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Dostava</h3>
          </div>

          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-900">
              {checkoutData.shippingMethod === "standard"
                ? "Standardna dostava"
                : "Brza dostava"}
            </p>
            <p>
              {checkoutData.shippingMethod === "standard"
                ? "5-7 radnih dana"
                : "2-3 radna dana"}
            </p>
          </div>
        </div>
      </div>

      {/* Special Notes */}
      {checkoutData.notes && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Napomene</h3>
          </div>
          <p className="text-sm text-gray-600">{checkoutData.notes}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
        >
          Nazad
        </Button>
        <Button
          onClick={handlePlaceOrder}
          size="lg"
          disabled={isLoading}
          className="min-w-[200px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Slanje narudžbe...
            </>
          ) : (
            "Potvrdi narudžbu"
          )}
        </Button>
      </div>
    </motion.div>
  );
}
