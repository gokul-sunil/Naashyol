import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { menuItems } from "../config/menuItems";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { NotificationDropdown } from "../components/NotificationDropdown";
import { Toaster } from "../components/ui/sonner";

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#F8FAFC]">

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-60" : "w-20"
        } bg-[#111111] text-white transition-all duration-300 fixed h-full z-30`}
      >

        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#1F2937]">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F7931A] rounded-lg flex items-center justify-center">
                <span className="font-bold text-sm">N4</span>
              </div>
              <span className="font-semibold">N4ASHYOL</span>
            </div>
          )}

          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                  isActive
                    ? "bg-[#F7931A]"
                    : "text-gray-300 hover:bg-[#1F2937]"
                }`}
              >
                <item.icon size={20} />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Area */}
      <div
        className={`flex-1 flex flex-col transition-all ${
          sidebarOpen ? "ml-60" : "ml-20"
        }`}
      >

        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 fixed right-0 left-0 z-20"
          style={{ marginLeft: sidebarOpen ? "240px" : "80px" }}
        >
          <div className="flex items-center gap-4 w-full max-w-md">
            <Search className="text-gray-400" size={18} />
            <Input placeholder="Search..." />
          </div>

          <div className="flex items-center gap-5">

            <NotificationDropdown />

            <div className="flex items-center gap-3 border-l pl-4">
              <Avatar>
                <AvatarFallback className="bg-[#F7931A] text-white">
                  AD
                </AvatarFallback>
              </Avatar>

              <div className="hidden md:block">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>

              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto pt-16 p-6">
          <Outlet />
        </main>
      </div>

      <Toaster />
    </div>
  );
}