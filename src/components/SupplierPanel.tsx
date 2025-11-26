import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Truck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { SupplierOrder, Driver } from '@/types/order';

const mockDrivers: Driver[] = [
  {
    id: 'DRV-001',
    name: 'Ahmad Rizki',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad',
    rating: 4.8,
    phone: '+62 812-3456-7890',
    vehicleNumber: 'B 1234 XYZ',
    location: { lat: -6.2088, lng: 106.8456 }
  },
  {
    id: 'DRV-002',
    name: 'Budi Santoso',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
    rating: 4.9,
    phone: '+62 813-7654-3210',
    vehicleNumber: 'B 5678 ABC',
    location: { lat: -6.2088, lng: 106.8456 }
  }
];

const mockOrders: SupplierOrder[] = [
  {
    id: 'ORD-2001',
    items: [
      { product: { id: '1', name: 'Mineral Water', type: 'Natural Mineral', price: 25000, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80', description: '' }, quantity: 10 }
    ],
    subtotal: 250000,
    deliveryFee: 5000,
    total: 255000,
    paymentMethod: 'cash',
    status: 'confirmed',
    createdAt: new Date(),
    preparationStatus: 'pending'
  },
  {
    id: 'ORD-2002',
    items: [
      { product: { id: '2', name: 'Purified Water', type: 'RO', price: 20000, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80', description: '' }, quantity: 15 }
    ],
    subtotal: 300000,
    deliveryFee: 5000,
    total: 305000,
    paymentMethod: 'e-wallet',
    status: 'confirmed',
    createdAt: new Date(),
    preparationStatus: 'preparing'
  }
];

export default function SupplierPanel() {
  const [orders, setOrders] = useState<SupplierOrder[]>(mockOrders);

  const handleStartPreparation = (orderId: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, preparationStatus: 'preparing' as const } : o
    ));
  };

  const handleMarkReady = (orderId: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, preparationStatus: 'ready' as const } : o
    ));
  };

  const handleAssignDriver = (orderId: string, driverId: string) => {
    setOrders(orders.map(o => 
      o.id === orderId ? { ...o, assignedDriverId: driverId, preparationStatus: 'picked-up' as const, status: 'driver-assigned' as const } : o
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'preparing': return 'bg-blue-100 text-blue-700';
      case 'ready': return 'bg-green-100 text-green-700';
      case 'picked-up': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'preparing': return <Clock className="h-4 w-4" />;
      case 'ready': return <CheckCircle2 className="h-4 w-4" />;
      case 'picked-up': return <Truck className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Supplier Panel</h1>
              <p className="text-sm text-blue-100">Depot Sudirman</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="border-yellow-100">
            <CardContent className="p-4 text-center">
              <AlertCircle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.preparationStatus === 'pending').length}
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </CardContent>
          </Card>
          <Card className="border-blue-100">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.preparationStatus === 'preparing').length}
              </p>
              <p className="text-sm text-gray-600">Preparing</p>
            </CardContent>
          </Card>
          <Card className="border-green-100">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.preparationStatus === 'ready').length}
              </p>
              <p className="text-sm text-gray-600">Ready</p>
            </CardContent>
          </Card>
          <Card className="border-purple-100">
            <CardContent className="p-4 text-center">
              <Truck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.preparationStatus === 'picked-up').length}
              </p>
              <p className="text-sm text-gray-600">In Transit</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Active Orders</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="border-blue-100">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(order.createdAt).toLocaleString('id-ID')}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.preparationStatus)}>
                      {getStatusIcon(order.preparationStatus)}
                      <span className="ml-1 capitalize">{order.preparationStatus}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.product.name}</p>
                          <p className="text-sm text-gray-600">{item.product.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">{item.quantity}x</p>
                          <p className="text-sm text-gray-600">
                            Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">
                      Rp {order.total.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    {order.preparationStatus === 'pending' && (
                      <Button
                        onClick={() => handleStartPreparation(order.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        <Package className="mr-2 h-4 w-4" />
                        Start Preparation
                      </Button>
                    )}

                    {order.preparationStatus === 'preparing' && (
                      <Button
                        onClick={() => handleMarkReady(order.id)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Mark as Ready
                      </Button>
                    )}

                    {order.preparationStatus === 'ready' && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Assign Driver</p>
                        <div className="grid grid-cols-1 gap-2">
                          {mockDrivers.map((driver) => (
                            <Button
                              key={driver.id}
                              onClick={() => handleAssignDriver(order.id, driver.id)}
                              variant="outline"
                              className="w-full justify-start h-auto p-3"
                            >
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={driver.photo} />
                                <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 text-left">
                                <p className="font-semibold">{driver.name}</p>
                                <p className="text-sm text-gray-600">{driver.vehicleNumber}</p>
                              </div>
                              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                                <span className="text-sm font-semibold text-yellow-700">★ {driver.rating}</span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {order.preparationStatus === 'picked-up' && order.assignedDriverId && (
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Truck className="h-8 w-8 text-purple-600" />
                          <div>
                            <p className="font-semibold text-gray-900">Out for Delivery</p>
                            <p className="text-sm text-gray-600">
                              Driver: {mockDrivers.find(d => d.id === order.assignedDriverId)?.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
