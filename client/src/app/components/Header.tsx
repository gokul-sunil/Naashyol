import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, ShoppingCart, User, Heart, Package, LogOut, ChevronDown, Sun, Moon, X, Gift } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useFilter } from "../contexts/FilterContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useAuth } from "../contexts/AuthContext";
import { CartDrawer } from "./CartDrawer";
import { useTheme } from "../contexts/ThemeContext";

const logoImage = "/logo.png";

export function Header() {
  const navigate = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const { wishlistCount } = useWishlist();
  const { items, updateQuantity, removeItem, openDrawer, isDrawerOpen } = useCart();
  
  // Dynamic promotional messages
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  
  const promoMessages = [
    "✨ Free shipping on orders over $50",
    "🎉 20% OFF on your first order - Use code: WELCOME20",
    "🔥 Flash Sale! Up to 50% OFF on selected items",
    "💎 New Arrivals - Shop the latest trends now",
    "🎁 Earn reward points with every purchase",
  ];

  // Rotate promotional messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promoMessages.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);
  
  const cartItemsCount = items.length;

  // const categories = [
  //   "electronics",
  //   "Fashion",
  //   "Home & Garden",
  //   "Sports",
  //   "Beauty",
  //   "Books",
  // ];

  // Check if current page should show filter button
  // const showFilterButton =
  //   pathname === "/products" ||
  //   pathname === "/electronics" ||
  //   pathname === "/home-garden" ||
  //   pathname === "/sports" ||
  //   pathname === "/beauty" ||
  //   pathname === "/books";

  return (
    <header className="sticky top-0 z-50 w-full border-b glass-navbar shadow-lg">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[var(--primary-color)] via-orange-500 to-orange-600 text-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-10 text-sm font-medium">

      <div className="hidden md:block flex-1 overflow-hidden">
        <p
          key={currentPromoIndex}
          className="animate-[slideIn_0.5s_ease-in-out]"
        >
          {promoMessages[currentPromoIndex]}
        </p>
      </div>

      <p className="md:ml-auto text-white/90">
        24/7 Customer Support 🎧
      </p>

    </div>
  </div>
</div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img
              src={logoImage}
              alt="N4ASHYOL"
              className="h-8 sm:h-10 md:h-12 w-auto object-contain dark:brightness-0 dark:invert"
            />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 h-12 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Theme Toggle - Hidden on mobile */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Wishlist - Hidden on mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-muted dark:hover:bg-card text-card-foreground hidden md:flex"
              asChild
            >
              <Link href="/wishlist">
                <Heart className="size-5 text-muted-foreground hover:text-foreground" />
                {wishlistCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-inverse text-xs font-bold"
                  >
                    {wishlistCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Cart - Hidden on mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-muted dark:hover:bg-card text-card-foreground hidden md:flex"
              onClick={openDrawer}
            >
              <ShoppingCart className="size-5 text-muted-foreground hover:text-foreground transition-colors" />
              {cartItemsCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-inverse text-xs font-bold"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* User Menu - Hidden on mobile */}
            <div className="hidden md:block">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-muted dark:hover:bg-card text-card-foreground"
                    >
                      <User className="size-5 text-muted-foreground hover:text-foreground transition-colors" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center gap-3 p-2">
                      <div className="size-10 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 rounded-full flex items-center justify-center text-inverse font-semibold">
                        {(user.name || "U").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="cursor-pointer">
                        <User className="size-4 mr-2" />
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="cursor-pointer">
                        <Package className="size-4 mr-2" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/rewards" className="cursor-pointer">
                        <Gift className="size-4 mr-2" />
                        Rewards & Coupons
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 dark:text-red-400 cursor-pointer"
                      onClick={() => { logout(); navigate.push("/"); }}
                    >
                      <LogOut className="size-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              )}
            </div>

            {/* Mobile Hamburger Menu - Visible ONLY on mobile */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-muted dark:hover:bg-card text-card-foreground active:scale-95 transition-transform touch-manipulation"
                  style={{
                    WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
                    touchAction: 'manipulation',
                  }}
                >
                  <Menu className="size-5 text-muted-foreground hover:text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader className="sr-only">
                  <SheetTitle>Mobile Menu</SheetTitle>
                  <SheetDescription>Navigate through N4ASHYOL marketplace</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <img
                        src={logoImage}
                        alt="N4ASHYOL"
                        className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
                      />
                    </Link>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-3 p-4 glass-card rounded-xl mb-4">
                    {user ? (
                      <>
                        <div className="size-12 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 rounded-full flex items-center justify-center text-inverse font-semibold">
                          {(user.name || "U").slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-sm dark:text-inverse">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </>
                    ) : (
                      <Link
                        href="/login"
                        className="flex items-center gap-3 w-full"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="size-12 bg-border dark:bg-card text-card-foreground rounded-full flex items-center justify-center">
                          <User className="size-6 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-sm text-muted-foreground">Sign In</span>
                      </Link>
                    )}
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 overflow-y-auto">
                    <div className="space-y-1">
                      <Link
                        href="/"
                        className="block px-4 py-3 rounded-lg hover:bg-muted dark:hover:bg-card text-card-foreground font-medium text-foreground transition-colors active:scale-95 touch-manipulation"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
                          touchAction: 'manipulation',
                        }}
                      >
                        Home
                      </Link>
                      <Link
                        href="/products"
                        className="block px-4 py-3 rounded-lg hover:bg-muted dark:hover:bg-card text-card-foreground font-medium text-foreground transition-colors active:scale-95 touch-manipulation"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
                          touchAction: 'manipulation',
                        }}
                      >
                        All Products
                      </Link>
                      <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                        Categories
                      </div>
                      {/* {categories.map((category) => (
                        <Link
                          key={category}
                          href={`/products?category=${category}`}
                          className="block px-4 py-2 rounded-lg hover:bg-muted dark:hover:bg-card text-card-foreground text-muted-foreground transition-colors active:scale-95 touch-manipulation"
                          onClick={() => setMobileMenuOpen(false)}
                          style={{
                            WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
                            touchAction: 'manipulation',
                          }}
                        >
                          {category}
                        </Link>
                      ))} */}
                      
                      <div className="h-px bg-border dark:bg-card text-card-foreground my-3" />
                      
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted dark:hover:bg-card text-card-foreground font-medium text-foreground transition-colors active:scale-95 touch-manipulation"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
                          touchAction: 'manipulation',
                        }}
                      >
                        <Heart className="size-5" />
                        Wishlist
                        {wishlistCount > 0 && (
                          <Badge className="ml-auto bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-inverse">
                            {wishlistCount}
                          </Badge>
                        )}
                      </Link>
                      
                      <Link
                        href="/orders"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted dark:hover:bg-card text-card-foreground font-medium text-foreground transition-colors active:scale-95 touch-manipulation"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
                          touchAction: 'manipulation',
                        }}
                      >
                        <Package className="size-5" />
                        My Orders
                      </Link>
                      
                      <Link
                        href="/rewards"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted dark:hover:bg-card text-card-foreground font-medium text-foreground transition-colors active:scale-95 touch-manipulation"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
                          touchAction: 'manipulation',
                        }}
                      >
                        <Gift className="size-5" />
                        Rewards & Coupons
                      </Link>
                      
                      <div className="h-px bg-border dark:bg-card text-card-foreground my-3" />
                      
                      <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                        Theme
                      </div>
                      <div className="px-4 py-2">
                        <ThemeToggle />
                      </div>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Mobile Search Bar - Below logo on mobile only */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 h-11 bg-muted/50 border-border text-foreground placeholder:text-muted-foreground rounded-full touch-manipulation"
              style={{
                WebkitUserSelect: 'text',
                userSelect: 'text',
                touchAction: 'manipulation',
              }}
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-t border-border bg-background hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-8 h-14 overflow-x-auto">
            <Link
              href="/products"
              className="text-sm font-semibold text-foreground hover:text-[var(--primary-color)] dark:hover:text-[var(--primary-color)] whitespace-nowrap transition-colors py-4"
            >
              All Products
            </Link>
            
            {/* {categories.map((category) => (
              <Link key={category}
                href={`/products?category=${category}`}
                className="text-sm font-semibold text-foreground hover:text-[var(--primary-color)] dark:hover:text-[var(--primary-color)] whitespace-nowrap transition-colors py-4"
              >
                {category}
              </Link>
            ))} */}

            <Link
              href="/electronics"
              className="text-sm font-semibold text-foreground hover:text-primary whitespace-nowrap transition-colors py-4"
            >
              Electronics
            </Link>

             <Link
              href="/fashion"
              className="text-sm font-semibold text-foreground hover:text-primary whitespace-nowrap transition-colors py-4"
            >
              Fashion
            </Link>
            
             <Link
              href="/home-garden"
              className="text-sm font-semibold text-foreground hover:text-primary whitespace-nowrap transition-colors py-4"
            >
              Home & Garden
            </Link>
            
             <Link
              href="/sports"
              className="text-sm font-semibold text-foreground hover:text-primary whitespace-nowrap transition-colors py-4"
            >
              Sports
            </Link>
            
             <Link
              href="/beauty"
              className="text-sm font-semibold text-foreground hover:text-primary whitespace-nowrap transition-colors py-4"
            >
              Beauty
            </Link>
             <Link
              href="/books"
              className="text-sm font-semibold text-foreground hover:text-primary whitespace-nowrap transition-colors py-4"
            >
              Books
            </Link>
            
            

          </nav>
        </div>
      </div>

    </header>
  );
}


