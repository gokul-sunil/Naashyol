import { User, Package, Heart, Gift, Settings, LogOut, Mail, Phone, MapPin, Award, RotateCcw, AlertCircle, CheckCircle2, Clock, XCircle, Ticket, Star, TrendingUp, Zap } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { useRouter } from "next/navigation";

export function AccountPage() {
  const navigate = useRouter();

  // Mock returns data
  const returns = [
    {
      id: "RET001",
      orderNumber: "ORD-2024-001",
      productName: "Premium Wireless Headphones",
      status: "approved",
      requestDate: "2026-02-15",
      refundAmount: 299.99,
      reason: "Product defective",
    },
    {
      id: "RET002",
      orderNumber: "ORD-2024-002",
      productName: "Smart Watch Series 5",
      status: "pending",
      requestDate: "2026-02-18",
      refundAmount: 399.99,
      reason: "Wrong item received",
    },
    {
      id: "RET003",
      orderNumber: "ORD-2024-003",
      productName: "Bluetooth Speaker Pro",
      status: "processing",
      requestDate: "2026-02-19",
      refundAmount: 149.99,
      reason: "Changed mind",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="size-5 text-green-500" />;
      case "pending":
        return <Clock className="size-5 text-yellow-500" />;
      case "processing":
        return <AlertCircle className="size-5 text-blue-500" />;
      case "rejected":
        return <XCircle className="size-5 text-red-500" />;
      default:
        return <Clock className="size-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string; label: string }> = {
      approved: {
        className: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
        label: "Approved",
      },
      pending: {
        className: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
        label: "Pending",
      },
      processing: {
        className: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
        label: "Processing",
      },
      rejected: {
        className: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
        label: "Rejected",
      },
    };

    const variant = variants[status] || variants.pending;
    return (
      <Badge className={variant.className}>
        {variant.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-20 md:pb-0">
      {/* Enhanced Hero Header with Glassmorphic Effect */}
      <div className="relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)] to-orange-600 dark:from-orange-600 dark:to-orange-800"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02gNi02eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex items-center gap-4 md:gap-6">
            {/* Avatar with Ring */}
            <div className="relative">
              <div className="absolute inset-0 bg-background/30 rounded-full blur-xl"></div>
              <div className="relative size-20 md:size-24 bg-gradient-to-br from-white to-orange-100 dark:from-orange-200 dark:to-orange-300 rounded-full flex items-center justify-center text-[var(--primary-color)] font-bold text-2xl md:text-3xl flex-shrink-0 shadow-2xl ring-4 ring-white/50">
                JD
              </div>
              <div className="absolute -bottom-1 -right-1 size-6 md:size-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
            </div>
            
            {/* User Info */}
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl md:text-4xl font-bold text-inverse truncate mb-1 drop-shadow-lg">John Doe</h1>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                <div className="flex items-center gap-2 text-inverse/90 text-sm md:text-base">
                  <Mail className="size-4" />
                  <span className="truncate">john@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-inverse/90 text-sm md:text-base">
                  <Award className="size-4" />
                  <span>Gold Member</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <Tabs defaultValue="profile">
          {/* Glassmorphic Tabs */}
          <TabsList className="glass-card grid w-full grid-cols-4 mb-6 md:mb-8 h-auto md:max-w-3xl p-1.5 border border-gray-200/50 dark:border-gray-700/50 shadow-lg rounded-xl">
            <TabsTrigger value="profile" className="flex-col md:flex-row gap-1 md:gap-2 py-3 md:py-2.5 text-xs md:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--primary-color)] data-[state=active]:to-orange-600 data-[state=active]:text-inverse data-[state=active]:shadow-lg transition-all rounded-lg min-h-[60px] md:min-h-[48px]">
              <User className="size-5 md:size-5" />
              <span className="text-[10px] md:text-sm">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="returns" className="flex-col md:flex-row gap-1 md:gap-2 py-3 md:py-2.5 text-xs md:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--primary-color)] data-[state=active]:to-orange-600 data-[state=active]:text-inverse data-[state=active]:shadow-lg transition-all rounded-lg min-h-[60px] md:min-h-[48px]">
              <RotateCcw className="size-5 md:size-5" />
              <span className="text-[10px] md:text-sm">Returns</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex-col md:flex-row gap-1 md:gap-2 py-3 md:py-2.5 text-xs md:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--primary-color)] data-[state=active]:to-orange-600 data-[state=active]:text-inverse data-[state=active]:shadow-lg transition-all rounded-lg min-h-[60px] md:min-h-[48px]">
              <Heart className="size-5 md:size-5" />
              <span className="text-[10px] md:text-sm">Wishlist</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex-col md:flex-row gap-1 md:gap-2 py-3 md:py-2.5 text-xs md:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[var(--primary-color)] data-[state=active]:to-orange-600 data-[state=active]:text-inverse data-[state=active]:shadow-lg transition-all rounded-lg min-h-[60px] md:min-h-[48px]">
              <Gift className="size-5 md:size-5" />
              <span className="text-[10px] md:text-sm">Rewards</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 md:space-y-6">
            {/* Personal Information Card with Glassmorphic Effect */}
            <div className="glass-panel p-6 md:p-8 max-w-2xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 rounded-2xl shadow-lg">
                  <User className="size-5 md:size-6 text-inverse" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Profile Information
                </h2>
              </div>
              
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm md:text-base font-semibold text-muted-foreground flex items-center gap-2">
                      First Name
                    </Label>
                    <Input 
                      id="firstName" 
                      defaultValue="John" 
                      className="glass-input border-gray-300 dark:border-gray-600 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 text-base" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm md:text-base font-semibold text-muted-foreground flex items-center gap-2">
                      Last Name
                    </Label>
                    <Input 
                      id="lastName" 
                      defaultValue="Doe" 
                      className="glass-input border-gray-300 dark:border-gray-600 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 text-base" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm md:text-base font-semibold text-muted-foreground flex items-center gap-2">
                    <Mail className="size-4" />
                    Email Address
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue="john@example.com" 
                    className="glass-input border-gray-300 dark:border-gray-600 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 text-base" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm md:text-base font-semibold text-muted-foreground flex items-center gap-2">
                    <Phone className="size-4" />
                    Phone Number
                  </Label>
                  <Input 
                    id="phone" 
                    defaultValue="+1 (555) 123-4567" 
                    className="glass-input border-gray-300 dark:border-gray-600 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 text-base" 
                  />
                </div>
                
                <div className="pt-2">
                  <Button className="w-full md:w-auto bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-inverse shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-8 text-base font-semibold">
                    Save Profile Changes
                  </Button>
                </div>
              </div>
            </div>

            {/* Address Card with Glassmorphic Effect */}
            <div className="glass-card p-5 md:p-7 max-w-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-5 md:mb-7">
                <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 rounded-xl shadow-lg">
                  <MapPin className="size-5 md:size-6 text-inverse" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Delivery Address
                </h2>
              </div>
              
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm md:text-base font-semibold text-muted-foreground">
                    Street Address
                  </Label>
                  <Input 
                    id="address" 
                    defaultValue="123 Main Street" 
                    className="glass-input w-full border-gray-300 dark:border-gray-600 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 text-base" 
                    placeholder="Enter your street address" 
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                  <div className="space-y-2 w-full">
                    <Label htmlFor="city" className="text-sm md:text-base font-semibold text-muted-foreground">
                      City
                    </Label>
                    <Input 
                      id="city" 
                      defaultValue="San Francisco" 
                      className="glass-input w-full border-gray-300 dark:border-gray-600 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 text-base" 
                      placeholder="Enter city" 
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <Label htmlFor="state" className="text-sm md:text-base font-semibold text-muted-foreground">
                      State
                    </Label>
                    <Input 
                      id="state" 
                      defaultValue="CA" 
                      className="glass-input w-full border-gray-300 dark:border-gray-600 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 text-base" 
                      placeholder="Enter state" 
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <Label htmlFor="zip" className="text-sm md:text-base font-semibold text-muted-foreground">
                      ZIP Code
                    </Label>
                    <Input 
                      id="zip" 
                      defaultValue="94103" 
                      className="glass-input w-full border-gray-300 dark:border-gray-600 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 text-base" 
                      placeholder="Enter ZIP code" 
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button className="w-full md:w-auto bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-inverse shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-8 text-base font-semibold">
                    Save Address
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="returns">
            <div className="space-y-4 md:space-y-6">
              {returns.map((ret) => (
                <div key={ret.id} className="glass-card p-5 md:p-7 max-w-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-5 md:mb-7">
                    <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 rounded-xl shadow-lg">
                      <RotateCcw className="size-5 md:size-6 text-inverse" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                      Return Request
                    </h2>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                      <div className="space-y-2">
                        <Label className="text-sm md:text-base font-semibold text-muted-foreground flex items-center gap-2">
                          Order Number
                        </Label>
                        <Input 
                          defaultValue={ret.orderNumber} 
                          className="glass-input border-gray-300 dark:border-gray-600 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 text-base" 
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm md:text-base font-semibold text-muted-foreground flex items-center gap-2">
                          Product Name
                        </Label>
                        <Input 
                          defaultValue={ret.productName} 
                          className="glass-input border-gray-300 dark:border-gray-600 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 text-base" 
                          readOnly
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm md:text-base font-semibold text-muted-foreground flex items-center gap-2">
                        <Mail className="size-4" />
                        Request Date
                      </Label>
                      <Input 
                        defaultValue={ret.requestDate} 
                        className="glass-input border-gray-300 dark:border-gray-600 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 text-base" 
                        readOnly
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm md:text-base font-semibold text-muted-foreground flex items-center gap-2">
                        <Phone className="size-4" />
                        Refund Amount
                      </Label>
                      <Input 
                        defaultValue={`$${ret.refundAmount.toFixed(2)}`} 
                        className="glass-input border-gray-300 dark:border-gray-600 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 text-base" 
                        readOnly
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm md:text-base font-semibold text-muted-foreground flex items-center gap-2">
                        <MapPin className="size-4" />
                        Reason
                      </Label>
                      <Input 
                        defaultValue={ret.reason} 
                        className="glass-input border-gray-300 dark:border-gray-600 focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[var(--primary-color)]/20 h-12 text-base" 
                        readOnly
                      />
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(ret.status)}
                        {getStatusBadge(ret.status)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            <div className="glass-card p-8 md:p-12 text-center border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <div className="flex flex-col items-center gap-4">
                <div className="p-6 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-full">
                  <Heart className="size-12 text-pink-400 dark:text-pink-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground mb-6">Save items you love for later</p>
                  <Button 
                    onClick={() => navigate.push("/products")}
                    className="bg-gradient-to-r from-[var(--primary-color)] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-inverse shadow-lg active:scale-95 touch-manipulation"
                    style={{
                      WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
                      touchAction: 'manipulation',
                    }}
                  >
                    Browse Products
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            {/* Rewards Points Summary */}
            <div className="glass-card p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 shadow-lg rounded-xl">
                    <TrendingUp className="size-6 text-inverse" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Reward Points
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Earn points with every purchase
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-[var(--primary-color)] to-orange-600 p-6 shadow-lg rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="size-6 text-inverse" />
                    <p className="text-inverse/90 text-sm font-medium">Total Points</p>
                  </div>
                  <p className="text-4xl font-bold text-inverse">2,450</p>
                </div>
                
                <div className="bg-background dark:bg-card text-card-foreground p-6 border-2 border-gray-200 dark:border-gray-700 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="size-6 text-yellow-500" />
                    <p className="text-muted-foreground text-sm font-medium">Points This Month</p>
                  </div>
                  <p className="text-4xl font-bold text-foreground">350</p>
                </div>
                
                <div className="bg-background dark:bg-card text-card-foreground p-6 border-2 border-gray-200 dark:border-gray-700 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="size-6 text-purple-500" />
                    <p className="text-muted-foreground text-sm font-medium">Level</p>
                  </div>
                  <p className="text-4xl font-bold text-foreground">Gold</p>
                </div>
              </div>
            </div>

            {/* Available Coupons */}
            <div className="glass-card p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 shadow-lg rounded-xl">
                  <Ticket className="size-6 text-inverse" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Available Coupons
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Save on your next purchase
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Coupon 1 */}
                <div className="relative bg-gradient-to-r from-[var(--primary-color)] to-orange-600 p-6 shadow-xl overflow-hidden rounded-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-background/10 -mr-16 -mt-16 rotate-45"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-inverse/90 text-sm font-medium mb-1">Welcome Offer</p>
                        <p className="text-4xl font-bold text-inverse mb-1">20% OFF</p>
                        <p className="text-inverse/90 text-xs">On orders above $50</p>
                      </div>
                      <Ticket className="size-8 text-inverse/50" />
                    </div>
                    <Separator className="my-4 bg-background/30" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-inverse/90 text-xs mb-1">Code</p>
                        <p className="text-inverse font-bold tracking-wider">WELCOME20</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-background text-[var(--primary-color)] hover:bg-background/90 font-semibold rounded-lg"
                      >
                        Apply
                      </Button>
                    </div>
                    <p className="text-inverse/80 text-xs mt-3">Valid until: Mar 31, 2026</p>
                  </div>
                </div>

                {/* Coupon 2 */}
                <div className="relative bg-gradient-to-r from-purple-600 to-purple-700 p-6 shadow-xl overflow-hidden rounded-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-background/10 -mr-16 -mt-16 rotate-45"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-inverse/90 text-sm font-medium mb-1">Free Shipping</p>
                        <p className="text-4xl font-bold text-inverse mb-1">$0</p>
                        <p className="text-inverse/90 text-xs">On all orders</p>
                      </div>
                      <Ticket className="size-8 text-inverse/50" />
                    </div>
                    <Separator className="my-4 bg-background/30" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-inverse/90 text-xs mb-1">Code</p>
                        <p className="text-inverse font-bold tracking-wider">FREESHIP</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-background text-purple-600 hover:bg-background/90 font-semibold rounded-lg"
                      >
                        Apply
                      </Button>
                    </div>
                    <p className="text-inverse/80 text-xs mt-3">Valid until: Apr 15, 2026</p>
                  </div>
                </div>

                {/* Coupon 3 */}
                <div className="relative bg-gradient-to-r from-green-600 to-green-700 p-6 shadow-xl overflow-hidden rounded-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-background/10 -mr-16 -mt-16 rotate-45"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-inverse/90 text-sm font-medium mb-1">Spring Sale</p>
                        <p className="text-4xl font-bold text-inverse mb-1">$15 OFF</p>
                        <p className="text-inverse/90 text-xs">On orders above $100</p>
                      </div>
                      <Ticket className="size-8 text-inverse/50" />
                    </div>
                    <Separator className="my-4 bg-background/30" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-inverse/90 text-xs mb-1">Code</p>
                        <p className="text-inverse font-bold tracking-wider">SPRING15</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-background text-green-600 hover:bg-background/90 font-semibold rounded-lg"
                      >
                        Apply
                      </Button>
                    </div>
                    <p className="text-inverse/80 text-xs mt-3">Valid until: May 1, 2026</p>
                  </div>
                </div>

                {/* Coupon 4 */}
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-6 shadow-xl overflow-hidden rounded-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-background/10 -mr-16 -mt-16 rotate-45"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-inverse/90 text-sm font-medium mb-1">Member Special</p>
                        <p className="text-4xl font-bold text-inverse mb-1">30% OFF</p>
                        <p className="text-inverse/90 text-xs">On electronics</p>
                      </div>
                      <Ticket className="size-8 text-inverse/50" />
                    </div>
                    <Separator className="my-4 bg-background/30" />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-inverse/90 text-xs mb-1">Code</p>
                        <p className="text-inverse font-bold tracking-wider">TECH30</p>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-background text-blue-600 hover:bg-background/90 font-semibold rounded-lg"
                      >
                        Apply
                      </Button>
                    </div>
                    <p className="text-inverse/80 text-xs mt-3">Valid until: Mar 25, 2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rewards History */}
            <div className="glass-card p-6 md:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 shadow-lg rounded-xl">
                  <Gift className="size-6 text-inverse" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Rewards History
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your recent rewards activity
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background dark:bg-card text-card-foreground border border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <TrendingUp className="size-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Purchase Reward</p>
                      <p className="text-sm text-muted-foreground">Order #ORD-2024-156</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 dark:text-green-400">+150 pts</p>
                    <p className="text-xs text-muted-foreground">Feb 22, 2026</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-background dark:bg-card text-card-foreground border border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <TrendingUp className="size-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Purchase Reward</p>
                      <p className="text-sm text-muted-foreground">Order #ORD-2024-143</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600 dark:text-green-400">+200 pts</p>
                    <p className="text-xs text-muted-foreground">Feb 18, 2026</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-background dark:bg-card text-card-foreground border border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Star className="size-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Referral Bonus</p>
                      <p className="text-sm text-muted-foreground">Friend joined</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600 dark:text-blue-400">+500 pts</p>
                    <p className="text-xs text-muted-foreground">Feb 15, 2026</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-background dark:bg-card text-card-foreground border border-gray-200 dark:border-gray-700 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <Ticket className="size-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Coupon Redeemed</p>
                      <p className="text-sm text-muted-foreground">WELCOME20</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600 dark:text-red-400">-300 pts</p>
                    <p className="text-xs text-muted-foreground">Feb 10, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


