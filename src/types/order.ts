export interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: Date;
  driver?: Driver;
}

export type PaymentMethod = 'cash' | 'e-wallet' | 'bank-transfer';

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'driver-assigned'
  | 'en-route'
  | 'nearby'
  | 'arrived'
  | 'completed';

export interface Driver {
  id: string;
  name: string;
  photo: string;
  rating: number;
  phone: string;
  vehicleNumber: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Subscription {
  id: string;
  companyName: string;
  type: 'daily' | 'weekly';
  quantity: number;
  startDate: Date;
  status: 'active' | 'paused' | 'cancelled';
  nextDelivery: Date;
  autoScheduling: boolean;
}

export interface DriverOrder extends Order {
  pickupLocation: string;
  deliveryLocation: string;
  proofPhoto?: string;
  driverNotes?: string;
}

export interface SupplierOrder extends Order {
  assignedDriverId?: string;
  preparationStatus: 'pending' | 'preparing' | 'ready' | 'picked-up';
}
