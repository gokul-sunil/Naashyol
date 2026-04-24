"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";

export function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");

  const handleUpdateQuantity = async (productId: string, sku: string, newQuantity: number) => {
    try {
      await updateQuantity(productId, sku, newQuantity);
    } catch (err: any) {
      toast.error(err.message || "Failed to update quantity");
    }
  };

  const handleRemoveItem = async (productId: string, sku: string) => {
    try {
      await removeItem(productId, sku);
      toast.success("Item removed from cart");
    } catch (err: any) {
      toast.error(err.message || "Failed to remove item");
    }
  };

  const applyCoupon = () => {
    if (couponCode.trim()) {
      toast.success("Coupon applied!", {
        description: `${couponCode} - 10% discount`,
      });
    }
  };

  const shipping = subtotal > 100 ? 0 : 10;
  const discount = 0;
  const total = subtotal + shipping - discount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/20 to-purple-50/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
        <div className="glass-card p-12 text-center max-w-md rounded-3xl">
          <div className="bg-gradient-to-br from-[var(--primary-color)]/20 to-orange-600/20 p-6 rounded-full w-fit mx-auto mb-6">
            <ShoppingBag className="size-16 text-[var(--primary-color)]" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Add some products to get started
          </p>
          <Button className="bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-[var(--primary-color)] text-inverse transition-all hover:scale-105 border-0" asChild>
            <Link href="/products">
              Continue Shopping
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/20 to-purple-50/10 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 rounded-2xl shadow-lg">
            <ShoppingBag className="size-6 text-inverse" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground">Review your items before checkout</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.sku}`} className="glass-card p-6 border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="flex gap-4 sm:gap-6">
                  <div className="relative size-24 sm:size-32 bg-muted dark:bg-card text-card-foreground rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-foreground line-clamp-1">{item.name}</h3>
                        <button onClick={() => handleRemoveItem(item.id, item.sku)} className="text-muted-foreground hover:text-red-500 p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.variant?.attributes?.map((attr: any) => (
                          <Badge key={attr.name} variant="secondary" className="bg-muted text-muted-foreground hover:bg-border dark:hover:bg-card text-card-foreground transition-colors">
                            {attr.name}: {attr.value}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded-xl bg-background overflow-hidden shadow-sm">
                        <button onClick={() => handleUpdateQuantity(item.id, item.sku, item.quantity - 1)} className="p-2 hover:bg-muted dark:hover:bg-card text-card-foreground text-muted-foreground transition-colors">
                          <Minus className="size-4" />
                        </button>
                        <span className="w-12 text-center font-bold text-foreground">{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.id, item.sku, item.quantity + 1)} className="p-2 hover:bg-muted dark:hover:bg-card text-card-foreground text-muted-foreground transition-colors">
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-1">Total Price</p>
                        <p className="text-xl font-black text-[var(--primary-color)]">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="lg:col-span-1 glass-card p-6 border-0 rounded-3xl sticky  self-start">
            <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground font-medium">
                  <span>Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground font-medium">
                  <span>Shipping Estimate</span>
                  <span className="text-green-600">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator className="bg-muted" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-foreground">Order Total</span>
                  <span className="text-2xl font-black text-[var(--primary-color)]">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Promo Code" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="glass-input border-0 rounded-xl"
                  />
                  <Button variant="outline" onClick={applyCoupon} className="font-bold border-2 border-border rounded-xl hover:bg-muted dark:hover:bg-card text-card-foreground">Apply</Button>
                </div>
                <Button
                  className="w-full h-14 font-bold text-lg bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-[var(--primary-color)] text-inverse shadow-xl shadow-orange-500/20 rounded-2xl group transition-all border-0"
                  onClick={() => router.push("/checkout")}
                >
                  Proceed to Checkout
                  <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                  <div className="size-1.5 bg-green-500 rounded-full" />
                  Secure SSL Encryption
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                  <div className="size-1.5 bg-green-500 rounded-full" />
                  Free 30-Day Returns
                </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

