"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Gift,
  Copy,
  Check,
  Share2,
  Users,
  Trophy,
  Tag,
  Clock,
  ChevronRight,
  Sparkles,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Separator } from "../components/ui/separator";
import { toast } from "sonner";
import { referralsApi } from "@/services/api";
import { useAuth } from "../contexts/AuthContext";

export function CouponsReferralsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applyCode, setApplyCode] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await referralsApi.stats();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchStats();
  }, [user]);

  const handleApplyReferral = async () => {
    if (!applyCode.trim()) return;
    try {
      const res = await referralsApi.apply(applyCode);
      toast.success(res.message);
      // Refresh stats
      const data = await referralsApi.stats();
      setStats(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to apply code");
    }
  };

  const referralCode = stats?.referralCode || "LOGIN TO SEE";
  const referralLink = typeof window !== "undefined" ? `${window.location.origin}?ref=${referralCode}` : "";

  const availableCoupons = [
    {
      id: "1",
      code: "WELCOME20",
      description: "Welcome bonus for new users",
      discount: "20",
      discountType: "percentage" as const,
      minPurchase: 50,
      maxDiscount: 100,
      expiryDate: "2026-12-31",
    },
  ];

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Coupon code copied!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedReferral(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to see your rewards</h2>
          <Button onClick={() => router.push("/login")}>Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Gift className="size-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-foreground">Rewards & Referrals</h1>
              <p className="text-muted-foreground">Share with friends and earn rewards</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card p-2 pl-4 rounded-2xl border shadow-sm">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Wallet Balance</p>
              <p className="text-xl font-black text-primary">${stats?.walletBalance?.toFixed(2) || "0.00"}</p>
            </div>
            <Button size="icon" variant="ghost" className="rounded-xl"><ChevronRight className="size-5" /></Button>
          </div>
        </div>

        <Tabs defaultValue="referrals" className="space-y-8">
          <TabsList className="bg-card p-1.5 rounded-2xl border shadow-sm w-full md:w-auto h-auto">
            <TabsTrigger value="referrals" className="rounded-xl px-8 py-3 font-bold data-[state=active]:bg-primary data-[state=active]:text-inverse transition-all">
              <Users className="size-4 mr-2" />
              Referrals
            </TabsTrigger>
            <TabsTrigger value="coupons" className="rounded-xl px-8 py-3 font-bold data-[state=active]:bg-primary data-[state=active]:text-inverse transition-all">
              <Tag className="size-4 mr-2" />
              My Coupons
            </TabsTrigger>
          </TabsList>

          <TabsContent value="referrals" className="space-y-8 animate-in fade-in duration-500">
            {/* Referral Card */}
            <Card className="overflow-hidden border-0 shadow-xl rounded-[2.5rem] bg-gradient-to-br from-primary to-orange-600 p-8 md:p-12 text-inverse relative">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <Badge className="bg-background/20 text-inverse border-0 py-1.5 px-4 rounded-full font-bold uppercase tracking-wider">Limited Time Offer</Badge>
                  <h2 className="text-4xl md:text-5xl font-black leading-tight">Refer a Friend, Get <span className="text-orange-200">5% Reward</span></h2>
                  <p className="text-inverse/80 text-lg font-medium leading-relaxed">Share your unique link. When they make their first purchase, we'll add 5% of their order value to your wallet.</p>
                  
                  <div className="space-y-4 pt-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-inverse/60">Your Referral Code</p>
                    <div className="flex gap-3">
                      <div className="flex-1 bg-background/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 font-mono text-2xl font-black tracking-widest">
                        {referralCode}
                      </div>
                      <Button onClick={handleCopyReferralLink} className="h-full px-8 bg-background text-primary hover:bg-orange-50 font-black rounded-2xl shadow-lg">
                        {copiedReferral ? <Check className="size-6" /> : <Copy className="size-6" />}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Total Referrals", value: stats?.referralCount || 0, icon: Users },
                    { label: "Wallet Rewards", value: `$${stats?.walletBalance || 0}`, icon: Trophy },
                  ].map((stat, i) => (
                    <div key={i} className="bg-background/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
                      <div className="bg-background/20 p-3 rounded-2xl w-fit mb-4">
                        <stat.icon className="size-6 text-inverse" />
                      </div>
                      <p className="text-sm font-bold text-inverse/60 uppercase tracking-wider mb-1">{stat.label}</p>
                      <p className="text-3xl font-black">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Sparkles className="absolute top-10 right-10 size-32 text-inverse/5" />
            </Card>

            {/* Apply Referral Code */}
            <Card className="p-8 border-0 shadow-sm rounded-3xl bg-card">
              <h3 className="text-xl font-bold mb-4">Got a referral code?</h3>
              <p className="text-muted-foreground mb-6">Enter it below to link your account and get special discounts on your first order.</p>
              <div className="flex gap-4 max-w-md">
                <Input 
                  placeholder="Enter code (e.g. FRIEND50)" 
                  value={applyCode}
                  onChange={(e) => setApplyCode(e.target.value)}
                  className="rounded-xl h-12"
                />
                <Button onClick={handleApplyReferral} className="h-12 px-8 font-bold rounded-xl">Apply</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="coupons" className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableCoupons.map((coupon) => (
                <Card key={coupon.id} className="group relative overflow-hidden border-0 shadow-md rounded-3xl bg-card flex flex-col sm:flex-row">
                  <div className="bg-gradient-to-br from-primary to-orange-600 sm:w-1/3 p-8 flex flex-col items-center justify-center text-inverse text-center relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-4xl font-black">{coupon.discount}{coupon.discountType === "percentage" ? "%" : "$"}</p>
                      <p className="text-sm font-bold uppercase tracking-widest mt-1 opacity-80">OFF</p>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-10">
                      <Tag className="size-32 rotate-12" />
                    </div>
                  </div>
                  <div className="flex-1 p-8">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-black text-foreground uppercase tracking-tight">{coupon.code}</h3>
                      <Badge variant="outline" className="rounded-full font-bold border-green-500 text-green-600">ACTIVE</Badge>
                    </div>
                    <p className="text-muted-foreground font-medium mb-6">{coupon.description}</p>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">
                      <Clock className="size-3.5" />
                      Expires {new Date(coupon.expiryDate).toLocaleDateString()}
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => handleCopyCoupon(coupon.code)}
                      className="w-full h-12 rounded-xl font-bold border-2 border-gray-100 dark:border-gray-800 hover:border-primary hover:text-primary transition-all group"
                    >
                      {copiedCode === coupon.code ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2 group-hover:scale-110 transition-transform" />}
                      {copiedCode === coupon.code ? "Copied!" : "Copy Code"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

