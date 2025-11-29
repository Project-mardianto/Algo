import { Bell, Package, Truck, CheckCircle, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "order" | "delivery" | "promo" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "delivery",
    title: "Driver is on the way",
    message: "Your order #ORD-002 will arrive in 15 minutes",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    type: "order",
    title: "Order Confirmed",
    message: "Your order #ORD-002 has been confirmed and is being prepared",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "promo",
    title: "Special Discount 20%",
    message: "Get 20% off on your next order. Valid until end of month!",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "delivery",
    title: "Order Delivered",
    message: "Your order #ORD-001 has been successfully delivered",
    time: "1 day ago",
    read: true,
  },
  {
    id: "5",
    type: "system",
    title: "Welcome to AirGalon",
    message: "Thank you for joining us! Enjoy fresh water delivery at your doorstep",
    time: "2 days ago",
    read: true,
  },
];

const notificationIcons = {
  order: Package,
  delivery: Truck,
  promo: Bell,
  system: CheckCircle,
};

const notificationColors = {
  order: "text-blue-600 bg-blue-50",
  delivery: "text-orange-600 bg-orange-50",
  promo: "text-green-600 bg-green-50",
  system: "text-gray-600 bg-gray-50",
};

export default function Notifications() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-500">
                  {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
                </p>
              )}
            </div>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-4 space-y-3">
            {mockNotifications.map((notification) => {
              const Icon = notificationIcons[notification.type];
              const colorClass = notificationColors[notification.type];

              return (
                <Card
                  key={notification.id}
                  className={`p-4 transition-colors ${
                    !notification.read ? "bg-orange-50/50 border-orange-200" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{notification.title}</h3>
                        {!notification.read && (
                          <Badge className="bg-orange-600 text-white text-xs px-2 py-0">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-400">{notification.time}</p>
                    </div>

                    <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
