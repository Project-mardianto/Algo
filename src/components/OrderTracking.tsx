import { useState, useEffect } from 'react';
import { Order, Driver, OrderStatus } from '@/types/order';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Phone, Star, MapPin, Clock, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderTrackingProps {
  order: Order;
  onOrderComplete: () => void;
}

const mockDriver: Driver = {
  id: 'DRV-001',
  name: 'Ahmad Rizki',
  photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad',
  rating: 4.8,
  phone: '+62 812-3456-7890',
  vehicleNumber: 'B 1234 XYZ',
  location: {
    lat: -6.2088,
    lng: 106.8456
  }
};

const statusSteps: { status: OrderStatus; label: string; time: string }[] = [
  { status: 'confirmed', label: 'Order Confirmed', time: '2 min ago' },
  { status: 'driver-assigned', label: 'Driver Assigned', time: '1 min ago' },
  { status: 'en-route', label: 'Driver En Route', time: 'Just now' },
  { status: 'nearby', label: 'Driver Nearby', time: '' },
  { status: 'arrived', label: 'Driver Arrived', time: '' }
];

export default function OrderTracking({ order, onOrderComplete }: OrderTrackingProps) {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('driver-assigned');
  const [estimatedTime, setEstimatedTime] = useState(15);

  useEffect(() => {
    // Simulate status progression
    const timer1 = setTimeout(() => setCurrentStatus('en-route'), 3000);
    const timer2 = setTimeout(() => {
      setCurrentStatus('nearby');
      setEstimatedTime(5);
    }, 8000);
    const timer3 = setTimeout(() => setCurrentStatus('arrived'), 13000);

    // Countdown timer
    const countdown = setInterval(() => {
      setEstimatedTime(prev => Math.max(0, prev - 1));
    }, 60000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(countdown);
    };
  }, []);

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.status === currentStatus);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Track Your Order</h1>
          <p className="text-sm text-gray-600">Order #{order.id}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Map Placeholder */}
        <Card className="overflow-hidden border-blue-100">
          <div className="relative h-64 bg-gradient-to-br from-blue-100 via-blue-50 to-green-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Navigation className="h-16 w-16 text-blue-600 mx-auto mb-2 animate-pulse" />
                <p className="text-sm text-gray-600">Live tracking map</p>
              </div>
            </div>
            {/* Mock location markers */}
            <div className="absolute top-1/4 left-1/3 bg-blue-600 rounded-full p-2 shadow-lg animate-bounce">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="absolute bottom-1/4 right-1/3 bg-green-600 rounded-full p-2 shadow-lg">
              <MapPin className="h-5 w-5 text-white" />
            </div>
          </div>
        </Card>

        {/* ETA Card */}
        <Card className="border-blue-100 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Estimated Arrival</p>
                <p className="text-3xl font-bold">{estimatedTime} mins</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <Clock className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver Info */}
        <Card className="border-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-16 w-16 border-2 border-blue-200">
                <AvatarImage src={mockDriver.photo} alt={mockDriver.name} />
                <AvatarFallback>{mockDriver.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900">{mockDriver.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-yellow-700">{mockDriver.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">{mockDriver.vehicleNumber}</span>
                </div>
              </div>
              <Button
                size="icon"
                className="bg-green-600 hover:bg-green-700 rounded-full h-12 w-12"
              >
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Status Timeline */}
        <Card className="border-blue-100">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Delivery Status</h3>
            <div className="space-y-4">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= getCurrentStepIndex();
                const isCurrent = index === getCurrentStepIndex();
                
                return (
                  <div key={step.status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-400'
                        } ${isCurrent ? 'ring-4 ring-blue-200 scale-110' : ''}`}
                      >
                        {isCompleted ? (
                          <div className="w-3 h-3 bg-white rounded-full" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        )}
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${
                            isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-2">
                        <p
                          className={`font-semibold ${
                            isCompleted ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        >
                          {step.label}
                        </p>
                        {isCurrent && (
                          <Badge className="bg-blue-600 text-white">Current</Badge>
                        )}
                      </div>
                      {step.time && (
                        <p className="text-sm text-gray-600 mt-1">{step.time}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Complete Order Button (shown when arrived) */}
        {currentStatus === 'arrived' && (
          <Button
            onClick={onOrderComplete}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-lg font-semibold rounded-xl shadow-lg"
          >
            Complete Order
          </Button>
        )}
      </div>
    </div>
  );
}
