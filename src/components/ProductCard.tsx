import { Product } from "@/types/order";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
}

export default function ProductCard({
  product,
  quantity,
  onQuantityChange,
}: ProductCardProps) {
  const handleIncrement = () => {
    onQuantityChange(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange(product.id, quantity - 1);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-blue-600 text-card-foreground">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-gray-500">per gallon</p>
          </div>
          {quantity === 0 ? (
            <Button
              onClick={handleIncrement}
              className="hover:bg-orange-700 text-white px-6 bg-[#ea580c]"
            >
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-black-50 rounded-lg p-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleDecrement}
                className="h-8 w-8 rounded-md hover:bg-black-100"
              >
                <Minus className="h-4 w-4 text-black-600" />
              </Button>
              <span className="font-bold text-black-600 w-8 text-center">
                {quantity}
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleIncrement}
                className="h-8 w-8 rounded-md hover:bg-black-100"
              >
                <Plus className="h-4 w-4 text-black-600" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
