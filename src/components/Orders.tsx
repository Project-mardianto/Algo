import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "delivering" | "completed" | "cancelled";
  driverName?: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    items: [
      { name: "Mineral Water 19L", quantity: 2, price: 25000 },
      { name: "Alkaline Water 19L", quantity: 1, price: 35000 },
    ],
    total: 85000,
    status: "completed",
    driverName: "Ahmad Rizki",
  },
  {
    id: "ORD-002",
    date: "2024-01-14",
    items: [{ name: "Purified Water 19L", quantity: 3, price: 20000 }],
    total: 60000,
    status: "delivering",
    driverName: "Budi Santoso",
  },
  {
    id: "ORD-003",
    date: "2024-01-10",
    items: [{ name: "Mineral Water 19L", quantity: 1, price: 25000 }],
    total: 25000,
    status: "cancelled",
  },
];

const statusConfig = {
  pending: { icon: Clock, label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  delivering: { icon: Package, label: "Delivering", color: "bg-orange-100 text-orange-800" },
  completed: { icon: CheckCircle, label: "Completed", color: "bg-green-100 text-green-800" },
  cancelled: { icon: XCircle, label: "Cancelled", color: "bg-red-100 text-red-800" },
};

export default function Orders() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        <div className="space-y-4">
          {mockOrders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon;
            return (
              <Card key={order.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-lg">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <Badge className={statusConfig[order.status].color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusConfig[order.status].label}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-lg font-bold text-orange-600">
                      Rp {order.total.toLocaleString()}
                    </p>
                  </div>
                  {order.status === "delivering" && (
                    <Button variant="outline" size="sm">
                      Track Order
                    </Button>
                  )}
                  {order.status === "completed" && (
                    <Button variant="outline" size="sm">
                      Reorder
                    </Button>
                  )}
                </div>

                {order.driverName && (
                  <p className="text-xs text-gray-500 mt-2">
                    Driver: {order.driverName}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
