import { motion } from "motion/react";
import { useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  CheckCircle2,
  Package,
  MapPin,
  Calendar,
  CreditCard,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useSuccessSound } from "../hooks/useSuccessSound";

interface OrderSuccessCardProps {
  orderData: {
    orderNumber: string;
    amount: number;
    paymentMethod: string;
    estimatedDelivery: string;
    shippingAddress: {
      name: string;
      address: string;
      city: string;
      state: string;
      zip: string;
    };
    itemCount: number;
    items?: any[];
  };
  onClose?: () => void;
}

export function OrderSuccessCard({
  orderData,
  onClose,
}: OrderSuccessCardProps) {
  const { playSuccessSound } = useSuccessSound();

  useEffect(() => {
    // Play success sound
    playSuccessSound();

    // Fire confetti on mount
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Fire confetti from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['var(--primary-color)', '#22c55e', '#3b82f6', '#f59e0b', '#10b981'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['var(--primary-color)', '#22c55e', '#3b82f6', '#f59e0b', '#10b981'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, [playSuccessSound]);

  return (
    <div className="w-full max-w-full px-4 py-6 md:px-6 lg:px-8">
      <Card className="relative w-full bg-card border-0 rounded-[24px] shadow-2xl overflow-hidden">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 size-10 rounded-full bg-muted hover:bg-border dark:hover:bg-card text-card-foreground transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <X className="size-5 text-muted-foreground" />
          </button>
        )}

        <div className="p-8 md:p-12 lg:p-16">
          {/* Success Icon & Title */}
          <div className="flex flex-col items-center text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                <div className="relative size-28 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                  <CheckCircle2 className="size-14 text-inverse" strokeWidth={3} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                Order Placed Successfully! 🎉
              </h1>
              <p className="text-lg text-muted-foreground">
                Thank you for your purchase. Your order has been confirmed.
              </p>
            </motion.div>
          </div>

          {/* Order Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Order Number */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-muted/50 rounded-[20px] backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center">
                  <Package className="size-5 text-[var(--primary-color)]" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Order Number
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {orderData.orderNumber}
              </p>
            </motion.div>

            {/* Estimated Delivery */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-muted/50 rounded-[20px] backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center">
                  <Calendar className="size-5 text-[var(--primary-color)]" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Estimated Delivery
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {orderData.estimatedDelivery}
              </p>
            </motion.div>
          </div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 rounded-[20px] border-2 border-orange-200/50 dark:border-orange-800/50 mb-8 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-card shadow-md flex items-center justify-center">
                  <CreditCard className="size-5 text-[var(--primary-color)]" />
                </div>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Payment Method
                </span>
              </div>
              <Badge className="bg-green-500 hover:bg-green-500 text-inverse font-semibold px-4 py-1 text-sm">
                Paid
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-muted-foreground">
                {orderData.paymentMethod}
              </span>
              <span className="text-4xl font-bold text-[var(--primary-color)]">
                ${orderData.amount.toFixed(2)}
              </span>
            </div>
          </motion.div>

          {/* Shipping Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 bg-muted/50 rounded-[20px] mb-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center">
                <MapPin className="size-5 text-[var(--primary-color)]" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                Shipping Address
              </span>
            </div>
            <div className="text-base text-muted-foreground space-y-1 pl-[52px]">
              <p className="font-semibold text-foreground">
                {orderData.shippingAddress.name}
              </p>
              <p>{orderData.shippingAddress.address}</p>
              <p>
                {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{" "}
                {orderData.shippingAddress.zip}
              </p>
            </div>
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-6">
              Order Items ({orderData.itemCount})
            </h3>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {orderData.items?.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="size-16 sm:size-20 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-foreground mb-1 truncate">
                      {item.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-[10px] bg-muted py-0 px-2">
                        Qty: {item.quantity}
                      </Badge>
                      {item.variant?.attributes?.map((attr: any) => (
                        <Badge key={attr.name} variant="outline" className="text-[10px] py-0 px-2">
                          {attr.value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[var(--primary-color)]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      ${item.price.toFixed(2)} / unit
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Card>
    </div>
  );
}


