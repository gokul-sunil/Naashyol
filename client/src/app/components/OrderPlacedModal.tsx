"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  CheckCircle2,
  Package,
  MapPin,
  Calendar,
  CreditCard,
  Download,
  Share2,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface OrderPlacedModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderId: string;
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
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
  } | null;
}

export function OrderPlacedModal({
  isOpen,
  onClose,
  orderData,
}: OrderPlacedModalProps) {
  const navigate = useRouter();

  useEffect(() => {
    if (isOpen && orderData) {
      // Play success sound (optional)
      // Confetti effect (optional)
    }
  }, [isOpen, orderData]);

  const handleDownloadReceipt = () => {
    console.log("Download Receipt clicked");
    alert("Download Receipt button clicked!"); // Visual confirmation
    toast.success("Receipt downloaded!", {
      description: `Order ${orderData?.orderNumber}`,
    });
  };

  const handleShare = () => {
    if (!orderData) {
      return;
    }
    
    try {
      const shareText = `Order ${orderData.orderNumber} - Track at: ${window.location.origin}/orders`;
      
      // Fallback method for clipboard access
      const textArea = document.createElement("textarea");
      textArea.value = shareText;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand("copy");
        toast.success("Order details copied to clipboard!", {
          description: shareText,
        });
      } catch (err) {
        toast.error("Unable to copy to clipboard");
      } finally {
        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error("Share error:", error);
      toast.error("Unable to copy to clipboard");
    }
  };

  const handleViewOrder = () => {
    onClose();
    navigate.push("/orders");
  };

  const handleTrackOrder = () => {
    if (!orderData) return;
    
    onClose();
    navigate.push(`/track-order?order=${orderData.orderNumber}`);
  };

  // Don't render if no order data
  if (!orderData) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Accessibility: Hidden title and description for screen readers */}
        <DialogTitle className="sr-only">Order Confirmation</DialogTitle>
        <DialogDescription className="sr-only">
          Your order has been placed successfully. Order number {orderData.orderNumber} with estimated delivery on {orderData.estimatedDelivery}.
        </DialogDescription>
        
        {/* Success Animation */}
        <div className="flex flex-col items-center justify-center py-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative size-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl">
                <CheckCircle2 className="size-12 text-inverse" strokeWidth={3} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-6"
          >
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Order Placed Successfully! 🎉
            </h2>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </motion.div>
        </div>

        <Separator />

        {/* Order Details */}
        <div className="space-y-6 py-4">
          {/* Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Package className="size-5 text-[var(--primary-color)]" />
                <span className="text-sm font-semibold text-muted-foreground">
                  Order Number
                </span>
              </div>
              <p className="text-xl font-bold text-foreground">
                {orderData.orderNumber}
              </p>
            </div>

            <div className="p-4 bg-muted rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="size-5 text-[var(--primary-color)]" />
                <span className="text-sm font-semibold text-muted-foreground">
                  Estimated Delivery
                </span>
              </div>
              <p className="text-xl font-bold text-foreground">
                {orderData.estimatedDelivery}
              </p>
            </div>
          </div>

          {/* Payment & Amount */}
          <div className="p-4 bg-gradient-to-r from-[var(--primary-color)]/10 to-orange-500/10 dark:from-[var(--primary-color)]/20 dark:to-orange-500/20 rounded-xl border-2 border-[var(--primary-color)]/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="size-5 text-[var(--primary-color)]" />
                <span className="text-sm font-semibold text-muted-foreground">
                  Payment Method
                </span>
              </div>
              <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                Paid
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {orderData.paymentMethod}
              </span>
              <span className="text-2xl font-bold text-[var(--primary-color)]">
                ${orderData.amount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="size-5 text-[var(--primary-color)]" />
              <span className="font-semibold text-foreground">
                Shipping Address
              </span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground">
                {orderData.shippingAddress.name}
              </p>
              <p>{orderData.shippingAddress.address}</p>
              <p>
                {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{" "}
                {orderData.shippingAddress.zip}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-4 bg-muted rounded-xl">
            <h3 className="font-semibold text-foreground mb-3">
              Order Items ({orderData.items.length})
            </h3>
            <div className="space-y-2">
              {orderData.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b dark:border-gray-700 last:border-0"
                >
                  <div>
                    <p className="font-medium text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleDownloadReceipt}
              className="h-12"
            >
              <Download className="size-4 mr-2" />
              Download Receipt
            </Button>
            <Button
              variant="outline"
              onClick={handleShare}
              className="h-12"
            >
              <Share2 className="size-4 mr-2" />
              Share Order
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              size="lg"
              variant="outline"
              onClick={handleViewOrder}
              className="h-14 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)]/10"
            >
              View All Orders
            </Button>
            <Button
              size="lg"
              onClick={handleTrackOrder}
              className="h-14 bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-[var(--primary-color)]"
            >
              Track Order
              <ArrowRight className="size-5 ml-2" />
            </Button>
          </div>

          {/* Info Message */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-300">
              📧 A confirmation email has been sent to your registered email
              address with order details and tracking information.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


