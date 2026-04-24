import { RotateCcw, Package, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import Link from "next/link";

export function ReturnsRefundsPage() {
  const returnProcess = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Log into your account and select the order you wish to return",
      icon: Package,
    },
    {
      step: 2,
      title: "Print Label",
      description: "Download and print your prepaid return shipping label",
      icon: Clock,
    },
    {
      step: 3,
      title: "Ship Package",
      description: "Pack items securely and drop off at any carrier location",
      icon: RotateCcw,
    },
    {
      step: 4,
      title: "Get Refund",
      description: "Receive your refund within 5-7 business days after we receive your return",
      icon: CheckCircle,
    },
  ];

  const eligibleItems = [
    "Unused items in original condition",
    "Items with all original tags attached",
    "Products in original packaging",
    "Items returned within 30 days of delivery",
    "Non-personalized or custom items",
  ];

  const nonEligibleItems = [
    "Personalized or customized products",
    "Intimate apparel and swimwear",
    "Beauty products and cosmetics (opened)",
    "Perishable goods and food items",
    "Digital downloads and gift cards",
    "Final sale items marked as non-returnable",
  ];

  const refundMethods = [
    {
      method: "Original Payment Method",
      time: "5-7 business days",
      description: "Refund issued to the original payment method used for purchase",
    },
    {
      method: "Store Credit",
      time: "Instant",
      description: "Get 110% back as store credit for faster refunds and bonus value",
    },
    {
      method: "Exchange",
      time: "Ships immediately",
      description: "Exchange for different size, color, or equal value item",
    },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-background border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 rounded-lg flex items-center justify-center">
              <RotateCcw className="size-6 text-inverse" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Returns & Refunds
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            We want you to be completely satisfied with your purchase. If you're not
            happy, we're here to help with our hassle-free 30-day return policy.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">30</div>
            <p className="text-muted-foreground">Day Return Window</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">FREE</div>
            <p className="text-muted-foreground">Return Shipping Label</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-4xl font-bold text-[var(--primary-color)] mb-2">5-7</div>
            <p className="text-muted-foreground">Days for Refund</p>
          </Card>
        </div>

        {/* Return Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            How to Return an Item
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnProcess.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} className="p-6 relative">
                  <div className="absolute -top-3 -left-3 size-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-inverse font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                  <Icon className="size-10 text-[var(--primary-color)] mb-4 mt-2" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Button className="bg-[var(--primary-color)] hover:bg-orange-600" size="lg" asChild>
              <Link href="/orders">Start a Return</Link>
            </Button>
          </div>
        </div>

        {/* Eligible vs Non-Eligible */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="size-8 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-bold text-foreground">
                Eligible for Return
              </h3>
            </div>
            <ul className="space-y-3">
              {eligibleItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="size-8 text-red-600 dark:text-red-400" />
              <h3 className="text-xl font-bold text-foreground">
                Not Eligible for Return
              </h3>
            </div>
            <ul className="space-y-3">
              {nonEligibleItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="text-red-600 dark:text-red-400 mt-0.5">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Refund Methods */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Refund Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {refundMethods.map((method, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">
                    {method.method}
                  </h3>
                  {index === 1 && (
                    <Badge className="bg-green-600 hover:bg-green-600 text-inverse">
                      +10% Bonus
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="size-4 text-muted-foreground" />
                  <span className="font-semibold text-[var(--primary-color)]">{method.time}</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {method.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Return Shipping */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Return Shipping Information
          </h2>
          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-foreground mb-3">
                  Free Returns
                </h3>
                <p className="text-muted-foreground mb-4">
                  We provide a prepaid return shipping label for all eligible returns
                  within the United States. The return shipping cost will be deducted from
                  your refund.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-900 dark:text-blue-300">
                    <strong>Standard Return:</strong> $7.99 deducted from refund
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-3">
                  Defective Items
                </h3>
                <p className="text-muted-foreground mb-4">
                  If you received a defective, damaged, or wrong item, we'll cover the
                  full return shipping cost. Contact us immediately with photos of the
                  issue.
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-sm text-green-900 dark:text-green-300">
                    <strong>Defective Returns:</strong> 100% free return shipping
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Exchange Policy */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Exchange Policy
          </h2>
          <Card className="p-8">
            <p className="text-muted-foreground mb-6">
              Want a different size or color? We make exchanges easy! Simply initiate a
              return and place a new order for the item you want. This ensures you get
              your new item as quickly as possible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <AlertCircle className="size-6 text-[var(--primary-color)] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground mb-2">
                    Size Exchanges
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    If you need a different size, we'll waive the return shipping fee and
                    ship your new size for free.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <AlertCircle className="size-6 text-[var(--primary-color)] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-foreground mb-2">
                    Color/Style Exchanges
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Exchange for a different color or style of the same item at no
                    additional cost.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQs */}
        <Card className="p-8 bg-muted border-0">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-foreground mb-2">
                When will I receive my refund?
              </h4>
              <p className="text-muted-foreground">
                Refunds are processed within 2-3 business days after we receive your
                return. It may take an additional 5-7 business days for the refund to
                appear in your account, depending on your bank.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-bold text-foreground mb-2">
                Can I return sale items?
              </h4>
              <p className="text-muted-foreground">
                Yes, most sale items can be returned within 30 days. However, items marked
                as "Final Sale" cannot be returned or exchanged. Check the product page
                for specific details.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-bold text-foreground mb-2">
                What if my return is past 30 days?
              </h4>
              <p className="text-muted-foreground">
                Returns must be initiated within 30 days of delivery. Late returns may be
                accepted at our discretion for store credit only. Contact customer support
                for assistance.
              </p>
            </div>
            <Separator />
            <div>
              <h4 className="font-bold text-foreground mb-2">
                How do I return a gift?
              </h4>
              <p className="text-muted-foreground">
                Gift returns are accepted with proof of purchase. The refund will be
                issued to the original purchaser's payment method or as store credit to
                the gift recipient.
              </p>
            </div>
          </div>
        </Card>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Need Help with Your Return?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our customer service team is here to assist you with any questions
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/help-center">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}


