"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  DollarSign,
  Users,
  Package,
} from "lucide-react";
import { useAdminStore } from "@/lib/store/admin-store";
import { formatPrice } from "@/lib/utils";

const statCards = [
  {
    title: "Danas",
    key: "today",
    icon: ShoppingBag,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Ovaj tjedan",
    key: "weekly",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Ovaj mjesec",
    key: "monthly",
    icon: Package,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

export function DashboardStats() {
  const { dashboardMetrics } = useAdminStore();

  if (!dashboardMetrics) return null;

  const stats = [
    {
      title: "Danas",
      orders: dashboardMetrics.todayOrders,
      revenue: dashboardMetrics.todayRevenue,
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      growth: 12.5,
    },
    {
      title: "Ovaj tjedan",
      orders: dashboardMetrics.weeklyOrders,
      revenue: dashboardMetrics.weeklyRevenue,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      growth: 8.2,
    },
    {
      title: "Ovaj mjesec",
      orders: dashboardMetrics.monthlyOrders,
      revenue: dashboardMetrics.monthlyRevenue,
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      growth: -2.1,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        const isPositive = stat.growth > 0;

        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <IconComponent className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div
                className={`flex items-center space-x-1 text-sm ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{Math.abs(stat.growth)}%</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </h3>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">
                  {stat.orders} narudžbi
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  {formatPrice(stat.revenue)}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
