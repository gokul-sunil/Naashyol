"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { OrderSuccessCard } from "../components/OrderSuccessCard";
import { Button } from "../components/ui/button";
import { ArrowLeft, ArrowRight, Package, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";

export function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get order data from URL params or localStorage
  const [orderData, setOrderData] = useState({
    orderNumber: "ORD-2026-KH7PIF8",
    amount: 680.37,
    paymentMethod: "cod",
    estimatedDelivery: "Feb 25, 2026",
    shippingAddress: {
      name: "Rahul Bose",
      address: "National highway",
      city: "Thiruvananthapuram",
      state: "Kerala",
      zip: "695004",
    },
    itemCount: 0,
    items: [] as any[],
  });

  useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      try {
        const parsed = JSON.parse(lastOrder);
        setOrderData({
          orderNumber: parsed.orderNumber || parsed.id || "ORD-2026-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
          amount: parsed.amount || parsed.total || 0,
          paymentMethod: parsed.paymentMethod || "Credit Card",
          estimatedDelivery: parsed.estimatedDelivery || "Feb 28, 2026",
          shippingAddress: parsed.shippingAddress || orderData.shippingAddress,
          itemCount: parsed.items?.length || parsed.itemCount || 0,
          items: parsed.items || [],
        });
      } catch (err) {
        console.error("Failed to parse lastOrder", err);
      }
    }
  }, []);

  const handleClose = () => {
    router.push("/");
  };

  const handleCelebrate = () => {
    // Trigger confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['var(--primary-color)', '#22c55e', '#3b82f6', '#f59e0b', '#10b981', '#ec4899'],
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 dark:from-gray-950 dark:via-orange-950/10 dark:to-gray-950">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Continue Shopping
            <ArrowRight className="size-4 ml-2" />
          </Button>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleCelebrate}
              className="gap-2 bg-gradient-to-r from-[var(--primary-color)]/10 to-orange-500/10 hover:from-[var(--primary-color)]/20 hover:to-orange-500/20 border-[var(--primary-color)]/30"
            >
              <PartyPopper className="size-4 text-[var(--primary-color)]" />
              Celebrate!
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/orders")}
              className="gap-2"
            >
              <Package className="size-4" />
              View All Orders
            </Button>
          </div>
        </div>
      </div>

      {/* Order Success Card */}
      <div className="container mx-auto">
        <OrderSuccessCard orderData={orderData} onClose={handleClose} />
      </div>

      {/* Additional Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-6 bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-900 rounded-[20px] backdrop-blur-sm">
            <p className="text-center text-blue-900 dark:text-blue-300">
              📧 A confirmation email has been sent to your registered email
              address with order details and tracking information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


