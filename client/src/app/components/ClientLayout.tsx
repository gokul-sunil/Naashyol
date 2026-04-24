"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { FilterDrawer } from "./FilterDrawer";
import { useCart } from "../contexts/CartContext";
import { CartDrawer } from "./CartDrawer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Header - always visible */}
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        {children}
      </main>
      {/* Footer - hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>
      {/* Bottom nav - only on mobile */}
      <div className="md:hidden">
        <BottomNav />
      </div>
      {/* Global Filter Drawer */}
      <FilterDrawer />
      {/* Global Cart Drawer */}
      <CartDrawer />
    </div>
  );
}


