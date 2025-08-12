"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Calendar, Package, Eye } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  status: string;
  total: number;
  notes: string | null;
  createdAt: Date;
  items: {
    id: string;
    quantity: number;
    price: number;
    product: {
      id: string;
      name: string;
      images: string[];
    };
  }[];
}

interface UserOrdersProps {
  orders: Order[];
}

const statusLabels = {
  PENDING: "Na čekanju",
  CONFIRMED: "Potvrđena",
  IN_PROGRESS: "U tijeku",
  COMPLETED: "Završena",
  CANCELLED: "Otkazana",
};

const statusColors = {
  PENDING: "secondary",
  CONFIRMED: "default",
  IN_PROGRESS: "default",
  COMPLETED: "default",
  CANCELLED: "destructive",
} as const;

export function UserOrders({ orders }: UserOrdersProps) {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Nemate narudžbi</h3>
          <p className="text-muted-foreground text-center mb-4">
            Kada napravite narudžbu, ovdje će se prikazati.
          </p>
          <Button asChild>
            <Link href="/">Počnite kupovinu</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  Narudžba #{order.id.slice(-8)}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(order.createdAt).toLocaleDateString("hr-HR")}
                </CardDescription>
              </div>
              <div className="text-right">
                <Badge
                  variant={
                    statusColors[order.status as keyof typeof statusColors]
                  }
                >
                  {statusLabels[order.status as keyof typeof statusLabels]}
                </Badge>
                <p className="text-lg font-semibold mt-1">
                  {order.total.toFixed(2)} €
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                {order.items.length} proizvod
                {order.items.length !== 1 ? "a" : ""}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {order.items.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                      {item.product.images[0] ? (
                        <img
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <Package className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity}x • {item.price.toFixed(2)} €
                      </p>
                    </div>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="flex items-center justify-center p-2 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      +{order.items.length - 3} više
                    </p>
                  </div>
                )}
              </div>

              {order.notes && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Napomene:</p>
                  <p className="text-sm text-muted-foreground">{order.notes}</p>
                </div>
              )}

              <div className="flex justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/narudzbe/${order.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    Detalji
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
