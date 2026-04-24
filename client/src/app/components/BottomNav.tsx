"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, ShoppingCart, User, LayoutGrid } from "lucide-react";
import { Badge } from "./ui/badge";
import { useCart } from "../contexts/CartContext";

export function BottomNav() {
  const { items } = useCart();
  const pathname = usePathname();
  const navigate = useRouter();
  
  const cartItemsCount = items.length;

  const navItems = [
    {
      label: "Home",
      icon: Home,
      path: "/",
    },
    {
      label: "Categories",
      icon: LayoutGrid,
      path: "/products",
    },
    {
      label: "Cart",
      icon: ShoppingCart,
      path: "/cart",
      badge: cartItemsCount,
    },
    {
      label: "Account",
      icon: User,
      path: "/account",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const handleClick = (path: string) => {
    // Force scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Navigate
    navigate.push(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-background/95 dark:bg-card text-card-foreground/95 backdrop-blur-xl border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.3)] safe-area-inset-bottom">
      <div className="grid grid-cols-4 px-2 py-1.5 pb-safe max-w-screen-sm mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <div
              key={item.path}
              onClick={() => handleClick(item.path)}
              className="flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-xl transition-all relative cursor-pointer select-none"
              style={{
                WebkitTapHighlightColor: 'rgba(247, 147, 26, 0.2)',
                touchAction: 'manipulation',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none',
              }}
            >
              <div className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${
                active 
                  ? "bg-[var(--primary-color)] text-inverse shadow-lg shadow-[var(--primary-color)]/30" 
                  : "bg-muted text-muted-foreground"
              }`}>
                <Icon 
                  className={`size-4 transition-all pointer-events-none ${active ? "scale-110" : ""}`}
                  strokeWidth={2.5}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] flex items-center justify-center px-1 bg-red-500 hover:bg-red-500 text-inverse text-[9px] font-bold border-2 border-white dark:border-gray-900 rounded-full shadow-md pointer-events-none">
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-[9px] font-semibold transition-colors pointer-events-none ${
                active 
                  ? "text-[var(--primary-color)]" 
                  : "text-muted-foreground"
              }`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}


