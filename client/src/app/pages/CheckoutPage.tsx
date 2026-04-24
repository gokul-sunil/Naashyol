"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
import { Package, Truck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { PaymentGateway } from "../components/PaymentGateway";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { ordersApi, addressesApi } from "@/services/api";

export function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.name?.split(" ").slice(1).join(" ") || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const validateShippingInfo = () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!address.trim() || !city.trim() || !state.trim() || !zip.trim()) {
      toast.error("Please complete your shipping address");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return false;
    }
    return true;
  };

  const handlePaymentComplete = async (paymentData: any) => {
    if (!validateShippingInfo()) return;

    setIsProcessing(true);
    try {
      const orderData = {
        address: {
          fullName: `${firstName} ${lastName}`,
          phone,
          street: address,
          city,
          state,
          pincode: zip,
        },
        paymentId: paymentData.id || "manual-payment",
      };

      const result = await ordersApi.create(orderData);
      toast.success("Order placed successfully!");
      clearCart();

      // Store order info for success page
      localStorage.setItem("lastOrder", JSON.stringify({
        ...result,
        items,
        shippingAddress: orderData.address,
        amount: total,
        paymentMethod: paymentData.method || "Credit Card",
      }));

      router.push("/order-success");
    } catch (err: any) {
      toast.error(err.message || "Failed to place order");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button onClick={() => router.push("/products")}>Go Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <CheckCircle2 className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
            <p className="text-muted-foreground">Complete your order</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <Card className="p-6 border-0 shadow-sm rounded-3xl bg-card">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="size-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" className="rounded-xl border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" className="rounded-xl border-border" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="rounded-xl border-border" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St" className="rounded-xl border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="New York" className="rounded-xl border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="NY" className="rounded-xl border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="10001" className="rounded-xl border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="rounded-xl border-border" />
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6 border-0 shadow-sm rounded-3xl bg-card">
              <PaymentGateway
                amount={total}
                onPaymentComplete={handlePaymentComplete}
                disabled={!termsAccepted}
              />

              <div className="mt-6 flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the <Link href="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </Label>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6 border-0 shadow-sm rounded-3xl bg-card sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <Package className="size-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Order Summary</h2>
              </div>

              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={`${item.id}-${item.sku}`} className="flex gap-4">
                    <div className="size-16 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                      {item.variant?.attributes && (
                        <div className="flex gap-1 mt-1">
                          {item.variant.attributes.map((a: any) => (
                            <span key={a.name} className="text-[10px] text-muted-foreground bg-muted px-1 rounded">{a.value}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-sm font-bold text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6 bg-muted" />

              <div className="space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-lg font-bold text-foreground">Total</span>
                  <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/20">
                <p className="text-xs text-orange-800 dark:text-orange-300 font-medium leading-relaxed">
                  ✨ Secure checkout powered by industry-standard encryption. Your payment data is never stored on our servers.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

