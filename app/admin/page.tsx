"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { motion } from "framer-motion";
import { ShoppingBag, TrendingUp, Users, Package } from "lucide-react";
import { useAdminStore } from "@/lib/store/admin-store";
import { formatPrice, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-gray-100 text-gray-800",
};

const statusLabels = {
  pending: "Na čekanju",
  confirmed: "Potvrđeno",
  processing: "U obradi",
  shipped: "Poslano",
  delivered: "Dostavljeno",
  cancelled: "Otkazano",
  refunded: "Refundirano",
};

export default function AdminDashboard() {
  const redirect = useRouter();
  const { dashboardMetrics } = useAdminStore();
  const { data: session } = useSession();
  if (!session || session.user.role !== "admin") return null;

  if (!dashboardMetrics) return null;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Pregled poslovanja i ključnih metrika</p>
        </div>

        {/* Stats Cards */}
        <DashboardStats />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Nedavne narudžbe
              </h2>
              <ShoppingBag className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {dashboardMetrics.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.orderNumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.customer.name}
                        </p>
                      </div>
                      <Badge className={statusColors[order.status]}>
                        {statusLabels[order.status]}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(order.total)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Najprodavaniji proizvodi
              </h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {dashboardMetrics.topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary-600">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {product.sales} prodaja
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(product.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Orders by Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Narudžbe po statusu
            </h2>
            <Package className="h-5 w-5 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dashboardMetrics.ordersByStatus.map((statusData) => (
              <div
                key={statusData.status}
                className="text-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {statusData.count}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {statusLabels[statusData.status]}
                </div>
                <div className="text-xs text-gray-500">
                  {statusData.percentage}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
