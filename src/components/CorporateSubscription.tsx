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

  return <></>;
}
