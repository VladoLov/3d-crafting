export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "employee";
  avatar?: string;
  lastLogin?: Date;
  permissions: AdminPermission[];
}

export interface AdminPermission {
  resource: "orders" | "products" | "users" | "analytics" | "settings";
  actions: ("read" | "write" | "delete")[];
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  averageOrderValue: number;
  revenueGrowth: number;
  ordersGrowth: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  items: AdminOrderItem[];
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  paymentMethod: PaymentMethod;
  shippingMethod: "standard" | "express";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
}

export interface AdminOrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
  customizations?: {
    material?: string;
    size?: string;
    customText?: string;
  };
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderFilter {
  status?: OrderStatus[];
  dateFrom?: Date;
  dateTo?: Date;
  customer?: string;
  minAmount?: number;
  maxAmount?: number;
  paymentMethod?: string;
}

export interface DashboardMetrics {
  todayOrders: number;
  todayRevenue: number;
  weeklyOrders: number;
  weeklyRevenue: number;
  monthlyOrders: number;
  monthlyRevenue: number;
  topProducts: {
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }[];
  recentOrders: AdminOrder[];
  ordersByStatus: {
    status: OrderStatus;
    count: number;
    percentage: number;
  }[];
}
