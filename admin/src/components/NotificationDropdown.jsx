import { useState } from "react";
import { Bell, Check, X, Trash2, Package, ShoppingCart, User, DollarSign, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

const initialNotifications = [
  {
    id: "1",
    type: "order",
    title: "New Order Received",
    message: "Order #12345 from John Doe - $299.99",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "product",
    title: "Product Approval Needed",
    message: "3 products are waiting for your approval",
    timestamp: "15 minutes ago",
    read: false,
  },
  {
    id: "3",
    type: "vendor",
    title: "New Vendor Application",
    message: "Fashion Hub submitted vendor application",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "4",
    type: "payment",
    title: "Payout Completed",
    message: "Payout of $5,234.50 processed to TechStore Pro",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "alert",
    title: "Low Stock Alert",
    message: "5 products have stock below minimum threshold",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "order",
    title: "Order Delivered",
    message: "Order #12340 has been delivered successfully",
    timestamp: "4 hours ago",
    read: true,
  },
];

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingCart size={16} className="text-[#F7931A]" />;
      case "product":
        return <Package size={16} className="text-[#3B82F6]" />;
      case "vendor":
        return <User size={16} className="text-[#10B981]" />;
      case "payment":
        return <DollarSign size={16} className="text-[#8B5CF6]" />;
      case "alert":
        return <AlertCircle size={16} className="text-[#EF4444]" />;
      default:
        return null;
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} className="text-gray-600" />

          {unreadCount > 0 && (
            <>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#F7931A] rounded-full animate-pulse"></span>
              <span className="absolute -top-1 -right-1 bg-[#F7931A] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[400px] p-0 mt-2"
        sideOffset={5}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#E5E7EB] bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-[#111111]">
              Notifications
            </h3>

            {unreadCount > 0 && (
              <Badge className="bg-[#F7931A] text-white">
                {unreadCount} new
              </Badge>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs text-[#F7931A] hover:text-[#E8850F] h-7 px-2"
                >
                  <Check size={12} className="mr-1" />
                  Mark all read
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-xs text-[#6B7280] hover:text-[#EF4444] h-7 px-2"
              >
                <Trash2 size={12} className="mr-1" />
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <ScrollArea className="max-h-[500px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F8FAFC] rounded-full mb-3">
                <Bell size={24} className="text-[#6B7280]" />
              </div>

              <p className="text-sm font-medium text-[#111111] mb-1">
                No notifications
              </p>

              <p className="text-xs text-[#6B7280]">
                You're all caught up! Check back later.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#E5E7EB]">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-[#F8FAFC] transition-colors group ${
                    !notification.read ? "bg-[#FFF7ED]" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-[#F8FAFC]">
                      {getIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4
                          className={`text-sm font-semibold ${
                            !notification.read
                              ? "text-[#111111]"
                              : "text-[#6B7280]"
                          }`}
                        >
                          {notification.title}
                        </h4>

                        {!notification.read && (
                          <span className="w-2 h-2 bg-[#F7931A] rounded-full mt-1"></span>
                        )}
                      </div>

                      <p className="text-xs text-[#6B7280] mb-2">
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#9CA3AF]">
                          {notification.timestamp}
                        </span>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 hover:bg-[#E5E7EB] rounded text-[#6B7280] hover:text-[#F7931A]"
                            >
                              <Check size={14} />
                            </button>
                          )}

                          <button
                            onClick={() =>
                              deleteNotification(notification.id)
                            }
                            className="p-1 hover:bg-[#E5E7EB] rounded text-[#6B7280] hover:text-[#EF4444]"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-[#E5E7EB] bg-[#F8FAFC]">
            <Button
              variant="ghost"
              className="w-full text-sm text-[#F7931A] hover:text-[#E8850F] hover:bg-[#FFF7ED]"
              onClick={() => setOpen(false)}
            >
              View all notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}