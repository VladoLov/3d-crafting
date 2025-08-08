"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  CreditCard,
  Truck,
  Package,
  Phone,
  Mail,
  Calendar,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminOrder, OrderStatus } from "@/lib/types/admin";
import { useAdminStore } from "@/lib/store/admin-store";
import { formatPrice, formatDate } from "@/lib/utils";

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

const statusLabels: Record<OrderStatus, string> = {
  pending: "Na čekanju",
  confirmed: "Potvrđeno",
  processing: "U obradi",
  shipped: "Poslano",
  delivered: "Dostavljeno",
  cancelled: "Otkazano",
  refunded: "Refundirano",
};

interface OrderDetailsModalProps {
  order: AdminOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
}: OrderDetailsModalProps) {
  const { updateOrderStatus } = useAdminStore();

  if (!order) return null;

  const handleStatusChange = (newStatus: OrderStatus) => {
    updateOrderStatus(order.id, newStatus);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Narudžba {order.orderNumber}
                </h2>
                <Badge className={statusColors[order.status]}>
                  {statusLabels[order.status]}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="p-6 space-y-6">
                {/* Status Update */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">
                      Promijeni status
                    </h3>
                    <Select
                      value={order.status}
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusLabels).map(([status, label]) => (
                          <SelectItem key={status} value={status}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Naručeno: {formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Hash className="h-4 w-4" />
                      <span>ID: {order.id}</span>
                    </div>
                    {order.trackingNumber && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Package className="h-4 w-4" />
                        <span>Tracking: {order.trackingNumber}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{order.customer.email}</span>
                    </div>
                    {order.customer.phone && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{order.customer.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Dostava:</span>{" "}
                      {order.shippingMethod === "standard"
                        ? "Standardna"
                        : "Brza"}
                    </div>
                    {order.estimatedDelivery && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Procjena dostave:</span>{" "}
                        {formatDate(order.estimatedDelivery)}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Proizvodi
                  </h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex space-x-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.productImage || "/placeholder.svg"}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.productName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Količina: {item.quantity}
                          </p>
                          {item.customizations && (
                            <div className="text-sm text-gray-600 space-y-1 mt-2">
                              {item.customizations.material && (
                                <div>
                                  Materijal: {item.customizations.material}
                                </div>
                              )}
                              {item.customizations.size && (
                                <div>Veličina: {item.customizations.size}</div>
                              )}
                              {item.customizations.customText && (
                                <div>
                                  Tekst: "{item.customizations.customText}"
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            {formatPrice(item.total)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {formatPrice(item.price)} × {item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Addresses and Payment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipping Address */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="h-5 w-5 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">
                        Adresa dostave
                      </h3>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="font-medium text-gray-900">
                        {order.shippingAddress.firstName}{" "}
                        {order.shippingAddress.lastName}
                      </p>
                      <p>{order.shippingAddress.address}</p>
                      <p>
                        {order.shippingAddress.postalCode}{" "}
                        {order.shippingAddress.city}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">
                        Način plaćanja
                      </h3>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="font-medium text-gray-900">
                        {order.paymentMethod.type === "card" &&
                          "Kreditna/Debitna kartica"}
                        {order.paymentMethod.type === "paypal" && "PayPal"}
                        {order.paymentMethod.type === "bank" &&
                          "Bankovni transfer"}
                        {order.paymentMethod.type === "cash" &&
                          "Gotovina pri dostavi"}
                      </p>
                      {order.paymentMethod.cardNumber && (
                        <p>{order.paymentMethod.cardNumber}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {order.notes && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Napomene
                      </h3>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {order.notes}
                      </p>
                    </div>
                  </>
                )}

                <Separator />

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Sažetak narudžbe
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Međuzbroj:</span>
                      <span>{formatPrice(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Dostava:</span>
                      <span>{formatPrice(order.shipping)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>PDV:</span>
                      <span>{formatPrice(order.tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Ukupno:</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
