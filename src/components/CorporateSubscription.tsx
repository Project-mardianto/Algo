import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Building2, Calendar, Package, CheckCircle2 } from "lucide-react";
import { Subscription } from "@/types/order";

export default function CorporateSubscription() {
  const [companyName, setCompanyName] = useState("");
  const [subscriptionType, setSubscriptionType] = useState<"daily" | "weekly">(
    "daily",
  );
  const [autoScheduling, setAutoScheduling] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const handleCreateSubscription = () => {
    const quantity = subscriptionType === "daily" ? 50 : 300;
    const newSubscription: Subscription = {
      id: `SUB-${Date.now()}`,
      companyName,
      type: subscriptionType,
      quantity,
      startDate: new Date(),
      status: "active",
      nextDelivery: new Date(Date.now() + 86400000),
      autoScheduling,
    };
    setSubscriptions([...subscriptions, newSubscription]);
    setCompanyName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#ea580c]">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Corporate Subscription
              </h1>
              <p className="text-sm text-gray-600">
                Manage bulk water delivery
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Create Subscription */}
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle>New Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Subscription Plan</Label>
              <RadioGroup
                value={subscriptionType}
                onValueChange={(v) =>
                  setSubscriptionType(v as "daily" | "weekly")
                }
                className="mt-2"
              >
                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-blue-50 cursor-pointer">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Daily Plan</p>
                        <p className="text-sm text-gray-600">
                          50 gallons per day
                        </p>
                      </div>
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-blue-50 cursor-pointer">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Weekly Plan</p>
                        <p className="text-sm text-gray-600">
                          300 gallons per week
                        </p>
                      </div>
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold">Auto-Scheduling</p>
                  <p className="text-sm text-gray-600">
                    Automatic delivery scheduling
                  </p>
                </div>
              </div>
              <Switch
                checked={autoScheduling}
                onCheckedChange={setAutoScheduling}
              />
            </div>

            <Button
              onClick={handleCreateSubscription}
              disabled={!companyName}
              className="w-full bg-blue-600 hover:bg-blue-700 h-12"
            >
              Create Subscription
            </Button>
          </CardContent>
        </Card>

        {/* Active Subscriptions */}
        {subscriptions.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Active Subscriptions
            </h2>
            <div className="grid gap-4">
              {subscriptions.map((sub) => (
                <Card key={sub.id} className="border-green-100">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          {sub.companyName}
                        </h3>
                        <p className="text-sm text-gray-600">ID: {sub.id}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700 capitalize">
                          {sub.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Plan Type</p>
                        <p className="font-semibold capitalize">{sub.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Quantity</p>
                        <p className="font-semibold">{sub.quantity} gallons</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Next Delivery</p>
                        <p className="font-semibold">
                          {sub.nextDelivery.toLocaleDateString("id-ID")}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Auto-Scheduling</p>
                        <p className="font-semibold">
                          {sub.autoScheduling ? "Enabled" : "Disabled"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
