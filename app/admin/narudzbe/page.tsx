"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { OrdersTable } from "@/components/admin/orders-table";
import { OrderDetailsModal } from "@/components/admin/order-details-modal";
import { AdminOrder } from "@/lib/types/admin";

export default function AdminOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderSelect = (order: AdminOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Upravljanje narudžbama
          </h1>
          <p className="text-gray-600">Pregled i upravljanje svim narudžbama</p>
        </div>

        {/* Orders Table */}
        <OrdersTable onOrderSelect={handleOrderSelect} />

        {/* Order Details Modal */}
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </AdminLayout>
  );
}
