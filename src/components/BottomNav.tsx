import { Home, ShoppingBag, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  activeTab?: 'home' | 'orders' | 'profile';
}

export default function BottomNav({ activeTab = 'home' }: BottomNavProps) {
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/orders' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 safe-area-bottom">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon className={`h-6 w-6 mb-1 ${isActive ? 'fill-orange-100' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
