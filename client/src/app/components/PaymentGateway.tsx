import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../contexts/CartContext";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  CreditCard,
  Wallet,
  Smartphone,
  Banknote,
  Shield,
  Lock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface PaymentGatewayProps {
  amount: number;
  onPaymentComplete?: (paymentData: any) => void;
  showTitle?: boolean;
  disabled?: boolean;
}

export function PaymentGateway({
  amount,
  onPaymentComplete,
  showTitle = true,
  disabled = false,
}: PaymentGatewayProps) {
  const router = useRouter();
  const { clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Payment gateway options
  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, Amex",
      badge: "Secure",
      logos: ["💳"],
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Wallet,
      description: "Pay with your PayPal account",
      badge: "Popular",
      logos: ["🅿️"],
    },
    {
      id: "applepay",
      name: "Apple Pay",
      icon: Smartphone,
      description: "Quick checkout with Apple",
      badge: "Fast",
      logos: ["🍎"],
    },
    {
      id: "googlepay",
      name: "Google Pay",
      icon: Smartphone,
      description: "Pay with Google",
      badge: "Fast",
      logos: ["🔵"],
    },
    {
      id: "razorpay",
      name: "Razorpay",
      icon: CreditCard,
      description: "UPI, Cards, Wallets & More",
      badge: "India",
      logos: ["💰"],
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: Banknote,
      description: "Pay when you receive",
      badge: "Available",
      logos: ["💵"],
    },
  ];

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.substring(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4);
    setCvv(value);
  };

  const validateCard = () => {
    if (cardNumber.replace(/\s/g, "").length < 13) {
      toast.error("Invalid card number");
      return false;
    }
    if (!cardName.trim()) {
      toast.error("Please enter cardholder name");
      return false;
    }
    if (expiryDate.length < 5) {
      toast.error("Invalid expiry date");
      return false;
    }
    if (cvv.length < 3) {
      toast.error("Invalid CVV");
      return false;
    }
    return true;
  };

  const processPayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const paymentData = {
      method: paymentMethod,
      amount: amount,
      timestamp: new Date().toISOString(),
      transactionId: `TXN${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
    };

    setIsProcessing(false);

    toast.success("Payment successful!", {
      description: `Transaction ID: ${paymentData.transactionId}`,
      duration: 5000,
    });

    if (onPaymentComplete) {
      onPaymentComplete(paymentData);
    }

    // Clear cart and redirect
    clearCart();
    router.push("/order-success");
  };

  const handlePayment = () => {
    if (disabled) {
      toast.error("Please accept Terms & Conditions to continue");
      return;
    }

    if (paymentMethod === "card") {
      if (!validateCard()) return;
    }

    processPayment();
  };

  const selectedMethod = paymentMethods.find((m) => m.id === paymentMethod);

  return (
    <Card className="p-4 sm:p-6 bg-card border-none shadow-none">
      {showTitle && (
        <>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Payment Gateway
            </h2>
            <Badge
              variant="outline"
              className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 text-xs"
            >
              <Shield className="size-3 mr-1" />
              Secure
            </Badge>
          </div>
          <Separator className="mb-4 sm:mb-6" />
        </>
      )}

      {/* Amount Display */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-[var(--primary-color)]/10 to-orange-500/10 dark:from-[var(--primary-color)]/20 dark:to-orange-500/20 rounded-lg border-2 border-[var(--primary-color)]/30">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Total Amount
          </span>
          <span className="text-xl sm:text-2xl font-bold text-[var(--primary-color)]">
            ${amount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-4 sm:mb-6">
        <Label className="text-sm font-semibold mb-3 sm:mb-4 block text-foreground">
          Select Payment Method
        </Label>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const isSelected = paymentMethod === method.id;

              return (
                <div
                  key={method.id}
                  className={`relative flex items-center space-x-3 border-2 rounded-xl p-3 sm:p-4 cursor-pointer transition-all hover:shadow-md ${isSelected
                      ? "border-[var(--primary-color)] bg-[var(--primary-color)]/5 dark:bg-[var(--primary-color)]/10"
                      : "border-gray-200 dark:border-gray-700 hover:border-[var(--primary-color)]/50"
                    }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <RadioGroupItem value={method.id} id={method.id} className="flex-shrink-0" />
                  <Label
                    htmlFor={method.id}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div
                        className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${isSelected
                            ? "bg-[var(--primary-color)] text-inverse"
                            : "bg-muted text-muted-foreground"
                          }`}
                      >
                        <Icon className="size-4 sm:size-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm sm:text-base text-foreground truncate">
                            {method.name}
                          </span>
                          {method.logos.map((logo, idx) => (
                            <span key={idx} className="text-base sm:text-lg flex-shrink-0">
                              {logo}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {method.description}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-muted flex-shrink-0 hidden sm:flex"
                      >
                        {method.badge}
                      </Badge>
                    </div>
                  </Label>
                  {isSelected && (
                    <CheckCircle2 className="absolute top-2 right-2 size-4 sm:size-5 text-[var(--primary-color)]" />
                  )}
                </div>
              );
            })}
          </div>
        </RadioGroup>
      </div>

      <Separator className="my-4 sm:my-6" />

      {/* Payment Details Based on Selected Method */}
      <div className="space-y-6">
        {paymentMethod === "card" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Lock className="size-4" />
              <span>Your card details are encrypted and secure</span>
            </div>

            <div>
              <Label htmlFor="cardNumber" className="mb-2">
                Card Number *
              </Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                  className="pl-10"
                />
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              </div>
            </div>

            <div>
              <Label htmlFor="cardName" className="mb-2">
                Cardholder Name *
              </Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate" className="mb-2">
                  Expiry Date *
                </Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="mb-2">
                  CVV *
                </Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  value={cvv}
                  onChange={handleCvvChange}
                  maxLength={4}
                />
              </div>
            </div>

            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>We accept:</span>
              <div className="flex gap-2">
                <span>💳 Visa</span>
                <span>💳 Mastercard</span>
                <span>💳 Amex</span>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl text-center">
              <div className="text-4xl mb-3">🅿️</div>
              <p className="text-sm text-muted-foreground mb-4">
                You will be redirected to PayPal to complete your payment
                securely.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="size-4" />
                <span>Protected by PayPal Buyer Protection</span>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "applepay" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="p-6 bg-inverse dark:bg-card text-card-foreground text-inverse rounded-xl text-center">
              <div className="text-4xl mb-3">🍎</div>
              <p className="text-sm mb-4">
                Use Touch ID or Face ID to complete your purchase
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted">
                <Shield className="size-4" />
                <span>Secured by Apple</span>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "googlepay" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl text-center">
              <div className="text-4xl mb-3">🔵</div>
              <p className="text-sm text-muted-foreground mb-4">
                Complete your payment with Google Pay for a faster checkout
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="size-4" />
                <span>Secured by Google</span>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "razorpay" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl text-center">
              <div className="text-4xl mb-3">💰</div>
              <p className="text-sm text-muted-foreground mb-4">
                Pay using UPI, Cards, Net Banking, Wallets & EMI
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-4">
                <div className="p-2 bg-background dark:bg-card text-card-foreground rounded">UPI</div>
                <div className="p-2 bg-background dark:bg-card text-card-foreground rounded">Cards</div>
                <div className="p-2 bg-background dark:bg-card text-card-foreground rounded">Wallets</div>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="size-4" />
                <span>100% Secure Payments</span>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "cod" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="p-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl">
              <div className="flex items-start gap-4">
                <Banknote className="size-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Cash on Delivery
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Pay with cash when your order is delivered to your doorstep.
                  </p>
                  <div className="flex items-start gap-2 text-xs text-amber-700 dark:text-amber-400">
                    <AlertCircle className="size-4 flex-shrink-0 mt-0.5" />
                    <span>
                      COD orders may take 1-2 additional days for processing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Separator className="my-4 sm:my-6" />

      {/* Security Info */}
      <div className="mb-4 sm:mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="size-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-green-900 dark:text-green-300 mb-1">
              Secure Payment
            </p>
            <p className="text-green-700 dark:text-green-400">
              All transactions are encrypted and secure. Your payment information
              is never stored on our servers.
            </p>
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <Button
        size="lg"
        onClick={handlePayment}
        className={`w-full bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-[var(--primary-color)] text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all border-none ${disabled || isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        {isProcessing ? (
          <>
            <div className="size-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          <>
            <Lock className="size-5 mr-2" />
            Pay ${amount.toFixed(2)} Securely
          </>
        )}
      </Button>


      {/* Trust Badges */}
      <div className="mt-4 sm:mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Shield className="size-3" />
          <span>SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="size-3" />
          <span>PCI DSS Compliant</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle2 className="size-3" />
          <span>Verified Merchant</span>
        </div>
      </div>
    </Card>
  );
}


