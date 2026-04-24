"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  Package,
  Truck,
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Mail,
  Search,
  ArrowLeft,
  Box,
  PackageCheck,
  Home,
} from "lucide-react";
import { toast } from "sonner";

export function TrackOrderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderFromUrl = searchParams.get("order");

  const [orderNumber, setOrderNumber] = useState(orderFromUrl || "");
  const [trackingData, setTrackingData] = useState<any>(null);

  // Mock tracking data
  const mockTrackingData = {
    orderNumber: "ORD-2024-987654",
    status: "In Transit",
    statusColor: "blue",
    currentLocation: "Distribution Center - Los Angeles, CA",
    estimatedDelivery: "Feb 23, 2026",
    orderDate: "Feb 18, 2026",
    trackingNumber: "1Z999AA10123456784",
    carrier: "FedEx Express",
    items: [
      {
        id: "1",
        name: "Wireless Headphones Pro Max",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
      },
      {
        id: "2",
        name: "Smart Watch Series 8",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      phone: "+1 (555) 123-4567",
      email: "john@example.com",
    },
    timeline: [
      {
        status: "Delivered",
        description: "Package delivered to your doorstep",
        location: "San Francisco, CA",
        date: "Feb 23, 2026",
        time: "2:30 PM",
        completed: false,
      },
      {
        status: "Out for Delivery",
        description: "Package is on the delivery vehicle",
        location: "San Francisco Hub",
        date: "Feb 23, 2026",
        time: "8:00 AM",
        completed: false,
      },
      {
        status: "In Transit",
        description: "Package is in transit to your city",
        location: "Los Angeles, CA",
        date: "Feb 21, 2026",
        time: "3:45 PM",
        completed: true,
        current: true,
      },
      {
        status: "Departed Facility",
        description: "Package has left our warehouse",
        location: "Phoenix, AZ",
        date: "Feb 20, 2026",
        time: "11:20 AM",
        completed: true,
      },
      {
        status: "Processing",
        description: "Order is being prepared for shipment",
        location: "Warehouse - Phoenix, AZ",
        date: "Feb 19, 2026",
        time: "9:00 AM",
        completed: true,
      },
      {
        status: "Order Placed",
        description: "Your order has been confirmed",
        location: "N4ASHYOL",
        date: "Feb 18, 2026",
        time: "4:15 PM",
        completed: true,
      },
    ],
  };

  const handleTrackOrder = () => {
    if (!orderNumber.trim()) {
      toast.error("Please enter an order number");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setTrackingData(mockTrackingData);
      toast.success("Order found!");
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleTrackOrder();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
      case "out for delivery":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      case "in transit":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "processing":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800";
      default:
        return "bg-muted text-muted-foreground dark:text-muted-foreground border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-950 text-inverse">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-inverse hover:bg-background/20 mb-4"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-background/20 rounded-xl">
              <Package className="size-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Track Your Order</h1>
              <p className="text-blue-100 mt-2">
                Enter your order number to get real-time tracking updates
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="p-6 mb-8 bg-card">
          <Label htmlFor="orderNumber" className="text-lg font-semibold mb-4 block">
            Enter Order Number
          </Label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                id="orderNumber"
                placeholder="e.g., ORD-2024-987654"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                onKeyDown={handleKeyPress}
                className="h-14 text-lg"
              />
            </div>
            <Button
              size="lg"
              onClick={handleTrackOrder}
              className="h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8"
            >
              <Search className="size-5 mr-2" />
              Track Order
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            You can find your order number in the confirmation email or on the
            orders page
          </p>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Status Overview */}
            <Card className="p-6 bg-card">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-foreground">
                      Order {trackingData.orderNumber}
                    </h2>
                    <Badge
                      className={getStatusColor(trackingData.status)}
                      variant="outline"
                    >
                      {trackingData.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {trackingData.currentLocation}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">
                    Estimated Delivery
                  </p>
                  <p className="text-2xl font-bold text-[var(--primary-color)]">
                    {trackingData.estimatedDelivery}
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Carrier Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Truck className="size-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Carrier
                    </p>
                    <p className="font-semibold text-foreground">
                      {trackingData.carrier}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Package className="size-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Tracking Number
                    </p>
                    <p className="font-semibold text-foreground text-sm">
                      {trackingData.trackingNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Calendar className="size-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Order Date
                    </p>
                    <p className="font-semibold text-foreground">
                      {trackingData.orderDate}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Timeline */}
              <div className="lg:col-span-2">
                <Card className="p-6 bg-card">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Tracking Timeline
                  </h3>
                  <div className="space-y-4">
                    {trackingData.timeline.map((event: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        {/* Timeline Line */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`size-10 rounded-full flex items-center justify-center border-2 ${
                              event.current
                                ? "bg-blue-600 border-blue-600"
                                : event.completed
                                ? "bg-green-600 border-green-600"
                                : "bg-border dark:bg-card text-card-foreground border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {event.completed ? (
                              <CheckCircle2 className="size-5 text-inverse" />
                            ) : (
                              <div className="size-3 rounded-full bg-background" />
                            )}
                          </div>
                          {index < trackingData.timeline.length - 1 && (
                            <div
                              className={`w-0.5 h-16 ${
                                event.completed
                                  ? "bg-green-600"
                                  : "bg-border dark:bg-card text-card-foreground"
                              }`}
                            />
                          )}
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 pb-8">
                          <div
                            className={`p-4 rounded-xl border-2 ${
                              event.current
                                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                                : event.completed
                                ? "bg-muted border-gray-200 dark:border-gray-700"
                                : "bg-muted border-gray-200 dark:border-gray-700 opacity-50"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-bold text-foreground">
                                {event.status}
                              </h4>
                              {event.current && (
                                <Badge className="bg-blue-600 text-inverse">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {event.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="size-3" />
                                {event.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="size-3" />
                                {event.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="size-3" />
                                {event.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Order Items */}
                <Card className="p-6 bg-card">
                  <h3 className="font-bold text-foreground mb-4">
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {trackingData.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Shipping Address */}
                <Card className="p-6 bg-card">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Home className="size-5 text-[var(--primary-color)]" />
                    Shipping Address
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">
                      {trackingData.shippingAddress.name}
                    </p>
                    <p>{trackingData.shippingAddress.street}</p>
                    <p>
                      {trackingData.shippingAddress.city},{" "}
                      {trackingData.shippingAddress.state}{" "}
                      {trackingData.shippingAddress.zip}
                    </p>
                    <Separator className="my-3" />
                    <p className="flex items-center gap-2">
                      <Phone className="size-4 text-[var(--primary-color)]" />
                      {trackingData.shippingAddress.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="size-4 text-[var(--primary-color)]" />
                      {trackingData.shippingAddress.email}
                    </p>
                  </div>
                </Card>

                {/* Actions */}
                <Card className="p-6 bg-gradient-to-br from-[var(--primary-color)]/10 to-orange-500/10 dark:from-[var(--primary-color)]/20 dark:to-orange-500/20 border-2 border-[var(--primary-color)]/30">
                  <h3 className="font-bold text-foreground mb-4">
                    Need Help?
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => router.push("/help-center")}
                    >
                      <Package className="size-4 mr-2" />
                      Contact Support
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => router.push("/orders")}
                    >
                      <Box className="size-4 mr-2" />
                      View All Orders
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


