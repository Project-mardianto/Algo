import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Package,
  MapPin,
  Camera,
  CheckCircle2,
  Navigation,
  Clock,
} from "lucide-react";
import { DriverOrder } from "@/types/order";

const mockOrders: DriverOrder[] = [
  {
    id: "ORD-1001",
    items: [
      {
        product: {
          id: "1",
          name: "Mineral Water",
          type: "Natural Mineral",
          price: 25000,
          image:
            "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80",
          description: "",
        },
        quantity: 5,
      },
    ],
    subtotal: 125000,
    deliveryFee: 5000,
    total: 130000,
    paymentMethod: "cash",
    status: "driver-assigned",
    createdAt: new Date(),
    pickupLocation: "Depot Sudirman - Jl. Sudirman No. 45",
    deliveryLocation: "PT. Maju Jaya - Jl. Gatot Subroto No. 123",
  },
];

export default function DriverApp() {
  const [orders, setOrders] = useState<DriverOrder[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<DriverOrder | null>(null);
  const [driverNotes, setDriverNotes] = useState("");
  const [proofUploaded, setProofUploaded] = useState(false);

  const handleAcceptOrder = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, status: "en-route" as const } : o,
      ),
    );
  };

  const handlePickup = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, status: "en-route" as const } : o,
      ),
    );
  };

  const handleUploadProof = () => {
    setProofUploaded(true);
  };

  const handleCompleteDelivery = (orderId: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "completed" as const,
              driverNotes,
              proofPhoto: "uploaded",
            }
          : o,
      ),
    );
    setSelectedOrder(null);
    setDriverNotes("");
    setProofUploaded(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="text-white shadow-lg bg-amber-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Driver" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">Driver Dashboard</h1>
              <p className="text-sm text-blue-100">Ahmad Rizki - B 1234 XYZ</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-blue-100">
            <CardContent className="p-4 text-center">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((o) => o.status !== "completed").length}
              </p>
              <p className="text-sm text-gray-600">Active Orders</p>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((o) => o.status === "completed").length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>
          <Card className="border-purple-100">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">8h</p>
              <p className="text-sm text-gray-600">Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Today's Orders
          </h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="border-blue-100 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        Order #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {order.items.reduce(
                          (sum, item) => sum + item.quantity,
                          0,
                        )}{" "}
                        gallons
                      </p>
                    </div>
                    <Badge
                      className={
                        order.status === "completed"
                          ? "bg-green-600"
                          : order.status === "en-route"
                            ? "bg-blue-600"
                            : "bg-yellow-600"
                      }
                    >
                      {order.status === "driver-assigned"
                        ? "New Order"
                        : order.status === "en-route"
                          ? "En Route"
                          : "Completed"}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex gap-3">
                      <Package className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Pickup Location</p>
                        <p className="font-semibold text-gray-900">
                          {order.pickupLocation}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <MapPin className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Delivery Location
                        </p>
                        <p className="font-semibold text-gray-900">
                          {order.deliveryLocation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {order.status === "driver-assigned" && (
                      <>
                        <Button
                          onClick={() => handleAcceptOrder(order.id)}
                          className="flex-1 hover:bg-blue-700 bg-amber-500"
                        >
                          Accept Order
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Navigation className="mr-2 h-4 w-4" />
                          Navigate
                        </Button>
                      </>
                    )}
                    {order.status === "en-route" && (
                      <Button
                        onClick={() => setSelectedOrder(order)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Complete Delivery
                      </Button>
                    )}
                    {order.status === "completed" && (
                      <div className="w-full text-center py-2 bg-green-50 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-600 inline mr-2" />
                        <span className="text-green-700 font-semibold">
                          Completed
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Complete Delivery Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Complete Delivery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">
                    Order #{selectedOrder.id}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedOrder.deliveryLocation}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Proof Photo
                  </label>
                  <Button
                    onClick={handleUploadProof}
                    variant="outline"
                    className="w-full h-32 border-2 border-dashed"
                  >
                    {proofUploaded ? (
                      <div className="text-center">
                        <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-green-600 font-semibold">
                          Photo Uploaded
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Take Photo</p>
                      </div>
                    )}
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Notes (Optional)
                  </label>
                  <Textarea
                    value={driverNotes}
                    onChange={(e) => setDriverNotes(e.target.value)}
                    placeholder="Add any notes about the delivery..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedOrder(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleCompleteDelivery(selectedOrder.id)}
                    disabled={!proofUploaded}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Confirm Delivery
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
