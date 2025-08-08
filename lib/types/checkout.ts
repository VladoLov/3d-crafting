export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  company?: string;
}

export interface BillingAddress extends ShippingAddress {
  sameAsShipping: boolean;
}

export interface PaymentMethod {
  type: "card" | "paypal" | "bank" | "cash";
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}

export interface CheckoutData {
  shipping: ShippingAddress;
  billing: BillingAddress;
  payment: PaymentMethod;
  shippingMethod: "standard" | "express";
  notes?: string;
}

export interface OrderSummary {
  items: any[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}
