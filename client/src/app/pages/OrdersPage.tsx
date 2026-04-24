"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  Eye,
  Truck,
  RotateCcw,
  Download,
  MapPin,
  Calendar,
  CreditCard,
  ChevronRight,
  Box,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { ReturnRefundModal } from "../components/ReturnRefundModal";
import { OrderPlacedModal } from "../components/OrderPlacedModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { toast } from "sonner";

export function OrdersPage() {
  const router = useRouter();
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [orderPlacedModalOpen, setOrderPlacedModalOpen] = useState(false);
  const [demoOrderData, setDemoOrderData] = useState<any>(null);

  const orders = [
    {
      id: "#12345",
      orderNumber: "ORD-2026-12345",
      date: "Feb 15, 2026",
      dateTime: "2026-02-15",
      status: "Delivered",
      deliveryDate: "Feb 18, 2026",
      total: 629.97,
      items: [
        {
          id: "1",
          name: "Wireless Headphones Pro Max",
          quantity: 1,
          price: 349.99,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
        },
        {
          id: "2",
          name: "Smart Watch Series 8",
          quantity: 1,
          price: 199.99,
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100",
        },
        {
          id: "3",
          name: "Phone Case Premium",
          quantity: 2,
          price: 39.99,
          image:
            "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=100",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street",
        city: "San Francisco",
        state: "CA",
        zip: "94103",
      },
      paymentMethod: "Credit Card (•••• 4242)",
      trackingNumber: "1Z999AA10123456784",
    },
    {
      id: "#12344",
      orderNumber: "ORD-2026-12344",
      date: "Feb 10, 2026",
      dateTime: "2026-02-10",
      status: "In Transit",
      deliveryDate: "Feb 22, 2026 (Est.)",
      total: 299.99,
      items: [
        {
          id: "4",
          name: "Bluetooth Speaker",
          quantity: 1,
          price: 299.99,
          image:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street",
        city: "San Francisco",
        state: "CA",
        zip: "94103",
      },
      paymentMethod: "PayPal",
      trackingNumber: "1Z999AA10123456785",
    },
    {
      id: "#12343",
      orderNumber: "ORD-2026-12343",
      date: "Feb 5, 2026",
      dateTime: "2026-02-05",
      status: "Processing",
      deliveryDate: "Feb 25, 2026 (Est.)",
      total: 449.99,
      items: [
        {
          id: "5",
          name: "Laptop Stand Pro",
          quantity: 1,
          price: 449.99,
          image:
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main Street",
        city: "San Francisco",
        state: "CA",
        zip: "94103",
      },
      paymentMethod: "Credit Card (•••• 4242)",
      trackingNumber: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800";
      case "In Transit":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "Processing":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800";
      case "Cancelled":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800";
      default:
        return "bg-muted text-muted-foreground dark:text-muted-foreground border-gray-200 dark:border-gray-700";
    }
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setDetailsModalOpen(true);
  };

  const handleTrackOrder = (orderNumber: string) => {
    router.push(`/track-order?order=${orderNumber}`);
  };

  const handleReturnRequest = (order: any) => {
    if (order.status !== "Delivered") {
      toast.error("Returns can only be initiated for delivered orders");
      return;
    }
    setSelectedOrder(order);
    setReturnModalOpen(true);
  };

  const handleDownloadInvoice = (orderNumber: string) => {
    toast.success("Invoice downloaded!", {
      description: `Invoice for ${orderNumber}`,
    });
  };

  const handleOrderPlaced = (order: any) => {
    const demoData = {
      orderId: order.id,
      orderNumber: order.orderNumber,
      amount: order.total,
      paymentMethod: order.paymentMethod,
      estimatedDelivery: order.deliveryDate,
      shippingAddress: order.shippingAddress,
      items: order.items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    setDemoOrderData(demoData);
    setOrderPlacedModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-24 md:pb-0">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)] to-orange-600 dark:from-orange-600 dark:to-orange-800"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-background/20 backdrop-blur-sm rounded-2xl">
              <Package className="size-8 md:size-10 text-inverse" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-inverse drop-shadow-lg">
                My Orders
              </h1>
              <p className="text-inverse/90 text-sm md:text-base mt-1">
                Track and manage your orders
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="glass-card p-6 hover:shadow-xl transition-all duration-300"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-foreground">
                      Order {order.id}
                    </h3>
                    <Badge
                      variant="outline"
                      className={getStatusColor(order.status)}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-4" />
                      {order.date}
                    </span>
                    <span>•</span>
                    <span>{order.items.length} items</span>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm text-muted-foreground">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-[var(--primary-color)]">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Order Items Preview */}
              <div className="mb-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {order.items.slice(0, 4).map((item, idx) => (
                    <img
                      key={idx}
                      src={item.image}
                      alt={item.name}
                      className="size-16 object-cover rounded-lg border dark:border-gray-700 flex-shrink-0"
                    />
                  ))}
                  {order.items.length > 4 && (
                    <div className="size-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-muted-foreground">
                        +{order.items.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleViewDetails(order)}
                  className="h-11"
                >
                  <Eye className="size-4 mr-2" />
                  Details
                </Button>
                {order.trackingNumber && (
                  <Button
                    variant="outline"
                    onClick={() => handleTrackOrder(order.orderNumber)}
                    className="h-11"
                  >
                    <Truck className="size-4 mr-2" />
                    Track
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => handleDownloadInvoice(order.orderNumber)}
                  className="h-11"
                >
                  <Download className="size-4 mr-2" />
                  Invoice
                </Button>
                {order.status === "Delivered" && (
                  <Button
                    variant="outline"
                    onClick={() => handleReturnRequest(order)}
                    className="h-11 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  >
                    <RotateCcw className="size-4 mr-2" />
                    Return
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => handleOrderPlaced(order)}
                  className="h-11"
                >
                  <Box className="size-4 mr-2" />
                  Order Placed
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--primary-color)]/10 rounded-lg">
                  <Box className="size-6 text-[var(--primary-color)]" />
                </div>
                <DialogTitle className="text-2xl">Order Details</DialogTitle>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">
                    Order Number
                  </p>
                  <p className="font-bold text-foreground">
                    {selectedOrder.orderNumber}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">
                    Status
                  </p>
                  <Badge
                    variant="outline"
                    className={getStatusColor(selectedOrder.status)}
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">
                    Order Date
                  </p>
                  <p className="font-bold text-foreground">
                    {selectedOrder.date}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">
                    Delivery Date
                  </p>
                  <p className="font-bold text-foreground">
                    {selectedOrder.deliveryDate}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Order Items */}
              <div>
                <h3 className="font-bold text-foreground mb-4">
                  Order Items ({selectedOrder.items.length})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-muted rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          {item.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Shipping & Payment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-xl">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="size-5 text-[var(--primary-color)]" />
                    Shipping Address
                  </h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">
                      {selectedOrder.shippingAddress.name}
                    </p>
                    <p>{selectedOrder.shippingAddress.address}</p>
                    <p>
                      {selectedOrder.shippingAddress.city},{" "}
                      {selectedOrder.shippingAddress.state}{" "}
                      {selectedOrder.shippingAddress.zip}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-xl">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CreditCard className="size-5 text-[var(--primary-color)]" />
                    Payment Method
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedOrder.paymentMethod}
                  </p>
                  <Separator className="my-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Paid
                    </span>
                    <span className="text-xl font-bold text-[var(--primary-color)]">
                      ${selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tracking */}
              {selectedOrder.trackingNumber && (
                <>
                  <Separator />
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          Tracking Number
                        </h4>
                        <p className="text-sm text-muted-foreground font-mono">
                          {selectedOrder.trackingNumber}
                        </p>
                      </div>
                      <Button
                        onClick={() =>
                          handleTrackOrder(selectedOrder.orderNumber)
                        }
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Truck className="size-4 mr-2" />
                        Track Order
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Return/Refund Modal */}
      {selectedOrder && (
        <ReturnRefundModal
          isOpen={returnModalOpen}
          onClose={() => setReturnModalOpen(false)}
          orderData={{
            orderNumber: selectedOrder.orderNumber,
            orderDate: selectedOrder.date,
            items: selectedOrder.items,
          }}
        />
      )}

      {/* Order Placed Modal */}
      {demoOrderData && (
        <OrderPlacedModal
          isOpen={orderPlacedModalOpen}
          onClose={() => setOrderPlacedModalOpen(false)}
          orderData={demoOrderData}
        />
      )}
    </div>
  );
}


