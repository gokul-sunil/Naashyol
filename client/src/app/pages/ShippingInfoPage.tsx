"use client";


import { Truck, Package, MapPin, Clock, DollarSign, Globe } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

export function ShippingInfoPage() {
  const shippingMethods = [
    {
      name: "Standard Shipping",
      icon: Package,
      price: "$10.00",
      freeThreshold: "$50+",
      time: "5-7 business days",
      description: "Reliable delivery with tracking included",
      features: ["Tracking included", "Signature not required", "Insured up to $100"],
    },
    {
      name: "Express Shipping",
      icon: Truck,
      price: "$25.00",
      freeThreshold: "$150+",
      time: "2-3 business days",
      description: "Fast delivery for urgent orders",
      features: ["Priority processing", "Real-time tracking", "Insured up to $500"],
    },
    {
      name: "Overnight Shipping",
      icon: Clock,
      price: "$45.00",
      freeThreshold: "N/A",
      time: "1 business day",
      description: "Next-day delivery for time-sensitive items",
      features: ["Guaranteed delivery", "Signature required", "Insured up to $1000"],
    },
  ];

  const shippingRegions = [
    {
      region: "United States (Lower 48)",
      standard: "5-7 days",
      express: "2-3 days",
      overnight: "1 day",
    },
    {
      region: "Alaska & Hawaii",
      standard: "7-10 days",
      express: "3-5 days",
      overnight: "2 days",
    },
    {
      region: "Canada",
      standard: "7-14 days",
      express: "5-7 days",
      overnight: "Not Available",
    },
  ];

  const internationalInfo = [
    {
      title: "Customs & Duties",
      description: "International customers are responsible for any customs fees, duties, or import taxes imposed by their country.",
    },
    {
      title: "Delivery Times",
      description: "International shipping times vary by destination and can take 2-4 weeks. Delays may occur due to customs processing.",
    },
    {
      title: "Tracking",
      description: "All international shipments include tracking. However, tracking may be limited once the package enters the destination country.",
    },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-background border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 rounded-lg flex items-center justify-center">
              <Truck className="size-6 text-inverse" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Shipping Information
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            We offer multiple shipping options to get your order to you quickly and
            safely. All orders include tracking and insurance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Free Shipping Banner */}
        <Card className="mb-12 p-8 bg-gradient-to-r from-[var(--primary-color)] to-orange-600 text-inverse border-0">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <DollarSign className="size-8" />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-1">Free Standard Shipping</h2>
              <p className="text-lg text-inverse/90">
                On all orders over $50 within the United States
              </p>
            </div>
          </div>
        </Card>

        {/* Shipping Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Shipping Methods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="mb-4">
                    <Icon className="size-10 text-[var(--primary-color)] mb-3" />
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {method.name}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {method.description}
                    </p>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cost:</span>
                      <span className="font-semibold text-foreground">
                        {method.price}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Free on:</span>
                      <Badge className="bg-green-600 hover:bg-green-600 text-inverse">
                        {method.freeThreshold}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery:</span>
                      <span className="font-semibold text-foreground">
                        {method.time}
                      </span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <ul className="space-y-2">
                    {method.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Shipping Times by Region */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Estimated Delivery Times
          </h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Region
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Standard
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Express
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Overnight
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-800">
                  {shippingRegions.map((region, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 font-medium text-foreground">
                        {region.region}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {region.standard}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {region.express}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {region.overnight}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <p className="mt-4 text-sm text-muted-foreground">
            * Delivery times are estimates and start from the date of shipment. Business
            days exclude weekends and holidays.
          </p>
        </div>

        {/* Processing Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <Card className="p-6">
            <Clock className="size-10 text-[var(--primary-color)] mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">
              Order Processing
            </h3>
            <p className="text-muted-foreground mb-4">
              All orders are processed within 24 hours during business days (Monday
              through Friday). Orders placed on weekends or holidays are processed the
              next business day.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-900 dark:text-blue-300">
                <strong>Note:</strong> You'll receive a shipping confirmation email with
                tracking information once your order ships.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <MapPin className="size-10 text-[var(--primary-color)] mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">
              Package Tracking
            </h3>
            <p className="text-muted-foreground mb-4">
              Track your package anytime through your account or the tracking link in
              your shipping confirmation email. Real-time updates keep you informed every
              step of the way.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-sm text-green-900 dark:text-green-300">
                <strong>Tip:</strong> Enable notifications to receive delivery updates
                via SMS and email.
              </p>
            </div>
          </Card>
        </div>

        {/* International Shipping */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="size-8 text-[var(--primary-color)]" />
            <h2 className="text-2xl font-bold text-foreground">
              International Shipping
            </h2>
          </div>
          <Card className="p-8">
            <p className="text-muted-foreground mb-6">
              We currently ship to Canada with plans to expand internationally soon.
              Subscribe to our newsletter to be notified when we start shipping to your
              country.
            </p>
            <div className="space-y-6">
              {internationalInfo.map((info, index) => (
                <div key={index}>
                  <h3 className="font-bold text-foreground mb-2">
                    {info.title}
                  </h3>
                  <p className="text-muted-foreground">{info.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="p-8 bg-muted border-0">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Important Information
          </h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary-color)] mt-1">•</span>
              <span>
                We ship to P.O. boxes using USPS only. Expedited shipping options are not
                available for P.O. box addresses.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary-color)] mt-1">•</span>
              <span>
                Orders cannot be rerouted once shipped. Please ensure your shipping
                address is correct before completing your order.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary-color)] mt-1">•</span>
              <span>
                If your package shows as delivered but you haven't received it, please
                check with neighbors and your building's mailroom, then contact us within
                48 hours.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--primary-color)] mt-1">•</span>
              <span>
                Weather conditions and carrier delays are beyond our control but may
                affect delivery times during peak seasons.
              </span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}


