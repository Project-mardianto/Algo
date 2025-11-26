import { Droplets } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-50 to-white flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20"></div>
          <div className="relative bg-blue-600 p-6 rounded-full">
            <Droplets className="h-12 w-12 text-white animate-pulse" />
          </div>
        </div>
        <h2 className="mt-6 text-xl font-bold text-gray-900">Air Galon</h2>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
