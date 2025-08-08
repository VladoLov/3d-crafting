import { create } from "zustand";
import {
  AdminOrder,
  OrderFilter,
  OrderStatus,
  DashboardMetrics,
} from "@/lib/types/admin";

interface AdminState {
  // Orders
  orders: AdminOrder[];
  selectedOrder: AdminOrder | null;
  orderFilter: OrderFilter;
  isLoading: boolean;

  // Dashboard
  dashboardMetrics: DashboardMetrics | null;

  // Actions
  setOrders: (orders: AdminOrder[]) => void;
  setSelectedOrder: (order: AdminOrder | null) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  setOrderFilter: (filter: OrderFilter) => void;
  setLoading: (loading: boolean) => void;
  setDashboardMetrics: (metrics: DashboardMetrics) => void;

  // Computed
  getFilteredOrders: () => AdminOrder[];
  getOrdersByStatus: (status: OrderStatus) => AdminOrder[];
}

// Mock data
const mockOrders: AdminOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customer: {
      id: "cust-1",
      name: "Marija Kovač",
      email: "marija@example.com",
      phone: "+385 91 234 5678",
    },
    items: [
      {
        id: "item-1",
        productId: "prod-1",
        productName: "Personalizirani Privjesak",
        productImage: "/engraved-pendant.png",
        quantity: 2,
        price: 25.99,
        total: 51.98,
        customizations: {
          material: "Srebro",
          size: "M",
          customText: "M&A 2024",
        },
      },
    ],
    status: "pending",
    total: 66.98,
    subtotal: 51.98,
    shipping: 15,
    tax: 12.99,
    shippingAddress: {
      firstName: "Marija",
      lastName: "Kovač",
      email: "marija@example.com",
      phone: "+385 91 234 5678",
      address: "Ilica 10",
      city: "Zagreb",
      postalCode: "10000",
      country: "HR",
    },
    billingAddress: {
      firstName: "Marija",
      lastName: "Kovač",
      email: "marija@example.com",
      phone: "+385 91 234 5678",
      address: "Ilica 10",
      city: "Zagreb",
      postalCode: "10000",
      country: "HR",
      sameAsShipping: true,
    },
    paymentMethod: {
      type: "card",
      cardNumber: "**** **** **** 1234",
    },
    shippingMethod: "standard",
    notes: "Molim pažljivu dostavu",
    createdAt: new Date("2024-01-15T10:30:00"),
    updatedAt: new Date("2024-01-15T10:30:00"),
    estimatedDelivery: new Date("2024-01-22T00:00:00"),
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customer: {
      id: "cust-2",
      name: "Petar Novak",
      email: "petar@example.com",
      phone: "+385 92 345 6789",
    },
    items: [
      {
        id: "item-2",
        productId: "prod-4",
        productName: "CNC Drvena Kutija",
        productImage: "/cnc-wooden-box.png",
        quantity: 1,
        price: 89.99,
        total: 89.99,
        customizations: {
          material: "Hrast",
          size: "Velika",
        },
      },
    ],
    status: "processing",
    total: 114.99,
    subtotal: 89.99,
    shipping: 25,
    tax: 22.5,
    shippingAddress: {
      firstName: "Petar",
      lastName: "Novak",
      email: "petar@example.com",
      phone: "+385 92 345 6789",
      address: "Vukovarska 15",
      city: "Split",
      postalCode: "21000",
      country: "HR",
    },
    billingAddress: {
      firstName: "Petar",
      lastName: "Novak",
      email: "petar@example.com",
      phone: "+385 92 345 6789",
      address: "Vukovarska 15",
      city: "Split",
      postalCode: "21000",
      country: "HR",
      sameAsShipping: true,
    },
    paymentMethod: {
      type: "paypal",
    },
    shippingMethod: "express",
    createdAt: new Date("2024-01-14T14:20:00"),
    updatedAt: new Date("2024-01-15T09:15:00"),
    estimatedDelivery: new Date("2024-01-18T00:00:00"),
    trackingNumber: "TRK123456789",
  },
];

const mockDashboardMetrics: DashboardMetrics = {
  todayOrders: 5,
  todayRevenue: 450.5,
  weeklyOrders: 28,
  weeklyRevenue: 2150.75,
  monthlyOrders: 124,
  monthlyRevenue: 8950.25,
  topProducts: [
    { id: "1", name: "Personalizirani Privjesak", sales: 45, revenue: 1169.55 },
    { id: "4", name: "CNC Drvena Kutija", sales: 23, revenue: 2069.77 },
    { id: "6", name: "3D Figurica", sales: 18, revenue: 2699.82 },
  ],
  recentOrders: mockOrders.slice(0, 5),
  ordersByStatus: [
    { status: "pending", count: 12, percentage: 25 },
    { status: "processing", count: 18, percentage: 37.5 },
    { status: "shipped", count: 8, percentage: 16.7 },
    { status: "delivered", count: 10, percentage: 20.8 },
  ],
};

export const useAdminStore = create<AdminState>((set, get) => ({
  orders: mockOrders,
  selectedOrder: null,
  orderFilter: {},
  isLoading: false,
  dashboardMetrics: mockDashboardMetrics,

  setOrders: (orders) => set({ orders }),

  setSelectedOrder: (order) => set({ selectedOrder: order }),

  updateOrderStatus: (orderId, status) => {
    const orders = get().orders.map((order) =>
      order.id === orderId ? { ...order, status, updatedAt: new Date() } : order
    );
    set({ orders });

    // Update selected order if it's the one being updated
    const selectedOrder = get().selectedOrder;
    if (selectedOrder?.id === orderId) {
      set({
        selectedOrder: { ...selectedOrder, status, updatedAt: new Date() },
      });
    }
  },

  setOrderFilter: (filter) => set({ orderFilter: filter }),

  setLoading: (isLoading) => set({ isLoading }),

  setDashboardMetrics: (dashboardMetrics) => set({ dashboardMetrics }),

  getFilteredOrders: () => {
    const { orders, orderFilter } = get();
    let filtered = [...orders];

    if (orderFilter.status?.length) {
      filtered = filtered.filter((order) =>
        orderFilter.status!.includes(order.status)
      );
    }

    if (orderFilter.dateFrom) {
      filtered = filtered.filter(
        (order) => order.createdAt >= orderFilter.dateFrom!
      );
    }

    if (orderFilter.dateTo) {
      filtered = filtered.filter(
        (order) => order.createdAt <= orderFilter.dateTo!
      );
    }

    if (orderFilter.customer) {
      const searchTerm = orderFilter.customer.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.customer.name.toLowerCase().includes(searchTerm) ||
          order.customer.email.toLowerCase().includes(searchTerm) ||
          order.orderNumber.toLowerCase().includes(searchTerm)
      );
    }

    if (orderFilter.minAmount) {
      filtered = filtered.filter(
        (order) => order.total >= orderFilter.minAmount!
      );
    }

    if (orderFilter.maxAmount) {
      filtered = filtered.filter(
        (order) => order.total <= orderFilter.maxAmount!
      );
    }

    return filtered.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  },

  getOrdersByStatus: (status) => {
    return get().orders.filter((order) => order.status === status);
  },
}));
