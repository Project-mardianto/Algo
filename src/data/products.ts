import { Product } from '@/types/order';

export const products: Product[] = [
  {
    id: '1',
    name: 'Mineral Water',
    type: 'Natural Mineral',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80',
    description: 'Pure natural mineral water from mountain springs'
  },
  {
    id: '2',
    name: 'Purified Water',
    type: 'Reverse Osmosis',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80',
    description: 'Advanced purified water through RO process'
  },
  {
    id: '3',
    name: 'Alkaline Water',
    type: 'pH 8.5+',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&q=80',
    description: 'High pH alkaline water for better hydration'
  },
  {
    id: '4',
    name: 'Oxygenated Water',
    type: 'O2 Enhanced',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
    description: 'Oxygen-enriched water for enhanced vitality'
  }
];
