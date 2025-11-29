import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import BottomNav from "./BottomNav";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Droplets, Bell, LogIn, UserPlus } from "lucide-react";
import { CartItem } from "@/types/order";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ProductSelectionProps {
  onProceedToCheckout: (items: CartItem[]) => void;
}

export default function ProductSelection({
  onProceedToCheckout,
}: ProductSelectionProps) {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const unreadNotifications = 2; // Mock unread count

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const handleCheckout = () => {
    const items: CartItem[] = products
      .filter((product) => quantities[product.id] > 0)
      .map((product) => ({
        product,
        quantity: quantities[product.id],
      }));

    if (items.length > 0) {
      onProceedToCheckout(items);
    }
  };

  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#ea580c]">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Algoplus</h1>
                <p className="text-sm text-gray-600">
                  Fresh water delivered to your door
                </p>
              </div>
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Login/Register Buttons */}
              <Button
                onClick={() => navigate("/login")}
                variant="ghost"
                size="sm"
                className="text-gray-700 hover:text-orange-600"
              >
                <LogIn className="h-4 w-4 mr-1" />
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Register
              </Button>
              
              {/* Notification Icon */}
              <button
                onClick={() => navigate("/notifications")}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Bell className="h-6 w-6 text-gray-700" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-orange-600 text-white text-xs">
                    {unreadNotifications}
                  </Badge>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Choose Your Water
          </h2>
          <p className="text-gray-600">
            Select from our premium water collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 0}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
      </div>
      {/* Floating Checkout Button */}
      {totalItems > 0 ? (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-20">
          <div className="max-w-7xl mx-auto">
            <Button
              onClick={handleCheckout}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white h-14 text-lg font-semibold rounded-xl shadow-lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Proceed to Checkout ({totalItems}{" "}
              {totalItems === 1 ? "item" : "items"})
            </Button>
          </div>
        </div>
      ) : (
        <BottomNav activeTab="home" />
      )}
    </div>
  );
}
