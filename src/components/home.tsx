import { useState } from 'react';
import ProductSelection from './ProductSelection';
import Checkout from './Checkout';
import OrderTracking from './OrderTracking';
import OrderComplete from './OrderComplete';
import { CartItem, Order } from '@/types/order';

type AppScreen = 'products' | 'checkout' | 'tracking' | 'complete';

function Home() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('products');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const handleProceedToCheckout = (items: CartItem[]) => {
    setCartItems(items);
    setCurrentScreen('checkout');
  };

  const handleBackToProducts = () => {
    setCurrentScreen('products');
  };

  const handleConfirmOrder = (order: Order) => {
    setCurrentOrder(order);
    setCurrentScreen('tracking');
  };

  const handleOrderComplete = () => {
    setCurrentScreen('complete');
  };

  const handleNewOrder = () => {
    setCartItems([]);
    setCurrentOrder(null);
    setCurrentScreen('products');
  };

  return (
    <div className="w-screen min-h-screen bg-white">
      {currentScreen === 'products' && (
        <ProductSelection onProceedToCheckout={handleProceedToCheckout} />
      )}
      
      {currentScreen === 'checkout' && (
        <Checkout
          items={cartItems}
          onBack={handleBackToProducts}
          onConfirmOrder={handleConfirmOrder}
        />
      )}
      
      {currentScreen === 'tracking' && currentOrder && (
        <OrderTracking
          order={currentOrder}
          onOrderComplete={handleOrderComplete}
        />
      )}
      
      {currentScreen === 'complete' && currentOrder && (
        <OrderComplete
          order={currentOrder}
          onNewOrder={handleNewOrder}
        />
      )}
    </div>
  );
}

export default Home;
