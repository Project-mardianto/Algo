import { useState } from 'react';
import { CartItem, PaymentMethod, Order } from '@/types/order';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Wallet, CreditCard, Building2, MapPin } from 'lucide-react';

interface CheckoutProps {
  items: CartItem[];
  onBack: () => void;
  onConfirmOrder: (order: Order) => void;
}

const DELIVERY_FEE = 5000;

export default function Checkout({ items, onBack, onConfirmOrder }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const total = subtotal + DELIVERY_FEE;

  const handleConfirmOrder = () => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
      paymentMethod,
      status: 'confirmed',
      createdAt: new Date()
    };
    onConfirmOrder(order);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 pb-32">
        {/* Delivery Address */}
        <Card className="mb-6 border-blue-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-gray-900">Home</p>
            <p className="text-sm text-gray-600 mt-1">
              Jl. Sudirman No. 123, Jakarta Selatan<br />
              DKI Jakarta, 12190
            </p>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="mb-6 border-blue-100">
          <CardHeader>
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="flex gap-3 flex-1">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.product.name}</p>
                    <p className="text-sm text-gray-600">{item.product.type}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">
                  Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                </p>
              </div>
            ))}
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>Rp {DELIVERY_FEE.toLocaleString('id-ID')}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span className="text-blue-600">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-lg">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-blue-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center gap-3 flex-1 cursor-pointer">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Wallet className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when your order arrives</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-blue-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="e-wallet" id="e-wallet" />
                  <Label htmlFor="e-wallet" className="flex items-center gap-3 flex-1 cursor-pointer">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">E-Wallet</p>
                      <p className="text-sm text-gray-600">GoPay, OVO, Dana, ShopeePay</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-blue-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                  <Label htmlFor="bank-transfer" className="flex items-center gap-3 flex-1 cursor-pointer">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <Building2 className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold">Bank Transfer</p>
                      <p className="text-sm text-gray-600">BCA, Mandiri, BNI, BRI</p>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-20">
        <div className="max-w-3xl mx-auto">
          <Button
            onClick={handleConfirmOrder}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 text-lg font-semibold rounded-xl shadow-lg"
          >
            Confirm Order - Rp {total.toLocaleString('id-ID')}
          </Button>
        </div>
      </div>
    </div>
  );
}
