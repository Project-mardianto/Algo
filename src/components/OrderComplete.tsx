import { Order } from '@/types/order';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Download, Share2, Home } from 'lucide-react';
import { format } from 'date-fns';

interface OrderCompleteProps {
  order: Order;
  onNewOrder: () => void;
}

export default function OrderComplete({ order, onNewOrder }: OrderCompleteProps) {
  const handleDownloadPDF = () => {
    // Mock PDF download
    alert('PDF invoice downloaded!');
  };

  const handleShareWhatsApp = () => {
    // Mock WhatsApp share
    const message = `Order #${order.id} completed! Total: Rp ${order.total.toLocaleString('id-ID')}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Completed!</h1>
          <p className="text-gray-600">Thank you for your order</p>
        </div>

        {/* Invoice Card */}
        <Card className="mb-6 border-green-100">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
            <CardTitle className="text-xl">Digital Invoice</CardTitle>
            <p className="text-green-100 text-sm">Order #{order.id}</p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Order Details */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex gap-3 flex-1">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{item.product.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} x Rp {item.product.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">
                      Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Payment Breakdown */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Payment Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rp {order.subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>Rp {order.deliveryFee.toLocaleString('id-ID')}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total Paid</span>
                  <span className="text-green-600">Rp {order.total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Method & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                <p className="font-semibold text-gray-900 capitalize">
                  {order.paymentMethod.replace('-', ' ')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                <p className="font-semibold text-gray-900">
                  {format(order.createdAt, 'dd MMM yyyy, HH:mm')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleDownloadPDF}
              variant="outline"
              className="h-14 border-2 border-orange-600 text-orange-600 hover:bg-orange-50"
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
            <Button
              onClick={handleShareWhatsApp}
              variant="outline"
              className="h-14 border-2 border-green-600 text-green-600 hover:bg-green-50"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share
            </Button>
          </div>
          
          <Button
            onClick={onNewOrder}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg font-semibold rounded-xl shadow-lg"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Button>
        </div>

        {/* Rating Prompt */}
        <Card className="mt-6 border-blue-100 bg-blue-50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-700">
              How was your experience? Rate your delivery driver to help us improve!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
