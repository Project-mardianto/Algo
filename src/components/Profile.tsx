import { User, MapPin, Phone, Mail, Bell, CreditCard, LogOut, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pb-20">
      <div className="max-w-2xl mx-auto p-4">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-sm text-gray-500">+62 812-3456-7890</p>
              <p className="text-sm text-gray-500">john.doe@email.com</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </Card>

        {/* Account Settings */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
          <Card className="divide-y">
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-sm text-gray-500">Jl. Sudirman No. 123, Jakarta</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium">Payment Methods</p>
                  <p className="text-sm text-gray-500">Manage your payment options</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-gray-500">Push notifications for orders</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </div>

        {/* Order Stats */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Order Statistics</h3>
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">12</p>
              <p className="text-sm text-gray-500">Total Orders</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">10</p>
              <p className="text-sm text-gray-500">Completed</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">2</p>
              <p className="text-sm text-gray-500">Pending</p>
            </Card>
          </div>
        </div>

        {/* Support & Legal */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Support & Legal</h3>
          <Card className="divide-y">
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <p className="font-medium">Help Center</p>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <p className="font-medium">Terms & Conditions</p>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <p className="font-medium">Privacy Policy</p>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </Card>
        </div>

        {/* Logout Button */}
        <Button variant="destructive" className="w-full" size="lg">
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
