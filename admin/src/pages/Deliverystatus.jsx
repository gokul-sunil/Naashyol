import { useState } from "react";

const statusConfig = {
  "Out for Delivery": { bg: "bg-orange-500", text: "text-white" },
  "Delivered":        { bg: "bg-green-500",  text: "text-white" },
  "In Transit":       { bg: "bg-blue-500",   text: "text-white" },
  "Picked Up":        { bg: "bg-violet-500", text: "text-white" },
  "Failed":           { bg: "bg-red-500",    text: "text-white" },
  "Pending":          { bg: "bg-gray-400",   text: "text-white" },
  "Cancelled":        { bg: "bg-rose-400",   text: "text-white" },
};

const summaryCards = [
  {
    label: "Pending",
    count: 1,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 sm:w-9 sm:h-9">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    label: "In Transit",
    count: 3,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 sm:w-9 sm:h-9">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
  {
    label: "Delivered",
    count: 1,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 sm:w-9 sm:h-9">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Failed",
    count: 1,
    iconBg: "bg-red-100",
    iconColor: "text-red-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 sm:w-9 sm:h-9">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
      </svg>
    ),
  },
  {
    label: "Cancelled",
    count: 0,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7 sm:w-9 sm:h-9">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6M9 9l6 6" />
      </svg>
    ),
  },
];

const orders = [
  {
    id: "ORD-2026-001234",
    status: "Out for Delivery",
    customer: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    orderDate: "2026-02-15",
    eta: "2026-02-19",
    items: 2,
    amount: "$1399.98",
    carrier: "FedEx",
    tracking: "FDX7894561230",
    trackingColor: "text-orange-500",
  },
  {
    id: "ORD-2026-001189",
    status: "Delivered",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Avenue, Los Angeles, CA 90001",
    orderDate: "2026-02-14",
    eta: "2026-02-18",
    items: 1,
    amount: "$399.99",
    carrier: "UPS",
    tracking: "UPS1234567890",
    trackingColor: "text-orange-500",
  },
  {
    id: "ORD-2026-001156",
    status: "In Transit",
    customer: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine Street, Chicago, IL 60601",
    orderDate: "2026-02-16",
    eta: "2026-02-20",
    items: 2,
    amount: "$479.98",
    carrier: "DHL",
    tracking: "DHL9876543210",
    trackingColor: "text-orange-500",
  },
  {
    id: "ORD-2026-001098",
    status: "Picked Up",
    customer: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    address: "321 Elm Road, Miami, FL 33101",
    orderDate: "2026-02-17",
    eta: "2026-02-21",
    items: 1,
    amount: "$1299.99",
    carrier: "FedEx",
    tracking: "FDX3216549870",
    trackingColor: "text-orange-500",
  },
  {
    id: "ORD-2026-001045",
    status: "Failed",
    customer: "David Wilson",
    email: "d.wilson@example.com",
    phone: "+1 (555) 567-8901",
    address: "654 Maple Drive, Seattle, WA 98101",
    orderDate: "2026-02-13",
    eta: "2026-02-18",
    items: 1,
    amount: "$658.00",
    carrier: "UPS",
    tracking: "UPS7531598420",
    trackingColor: "text-orange-500",
  },
  {
    id: "ORD-2026-001020",
    status: "Pending",
    customer: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "+1 (555) 678-9012",
    address: "987 Cedar Lane, Boston, MA 02101",
    orderDate: "2026-02-18",
    eta: "2026-02-22",
    items: 1,
    amount: "$1099.00",
    carrier: "Not Assigned",
    tracking: null,
    trackingColor: "",
  },
];

const orderItems = {
  "ORD-2026-001234": [
    { name: "iPhone 15 Pro Max - 256GB", qty: 1 },
    { name: "AirPods Pro (2nd Gen)", qty: 1 },
  ],
  "ORD-2026-001189": [{ name: "Samsung Galaxy S24 Ultra", qty: 1 }],
  "ORD-2026-001156": [
    { name: "MacBook Air M2", qty: 1 },
    { name: "USB-C Hub", qty: 1 },
  ],
  "ORD-2026-001098": [{ name: "Sony WH-1000XM5 Headphones", qty: 1 }],
  "ORD-2026-001045": [{ name: "iPad Pro 12.9 inch - 256GB", qty: 1 }],
  "ORD-2026-001020": [{ name: "Apple Watch Series 9", qty: 1 }],
};

const timelineData = {
  "ORD-2026-001234": [
    { label: "Order Confirmed", date: "2026-02-15 10:30 AM", location: "New York, NY", desc: "Order confirmed and processing started", color: "bg-green-500" },
    { label: "Picked by Courier", date: "2026-02-16 02:15 PM", location: "Distribution Center, NY", desc: "Package picked up from warehouse", color: "bg-green-500" },
    { label: "In Transit", date: "2026-02-17 08:00 AM", location: "Regional Hub, NY", desc: "Package in transit to local facility", color: "bg-green-500" },
    { label: "Out for Delivery", date: "2026-02-19 06:30 AM", location: "Local Facility, NY", desc: "Package out for delivery today", color: "bg-orange-500" },
  ],
  "ORD-2026-001189": [
    { label: "Order Confirmed", date: "2026-02-14 09:00 AM", location: "Los Angeles, CA", desc: "Order confirmed and processing started", color: "bg-green-500" },
    { label: "Picked by Courier", date: "2026-02-15 11:00 AM", location: "Distribution Center, CA", desc: "Package picked up from warehouse", color: "bg-green-500" },
    { label: "In Transit", date: "2026-02-16 07:00 AM", location: "Regional Hub, CA", desc: "Package in transit to local facility", color: "bg-green-500" },
    { label: "Delivered", date: "2026-02-18 02:00 PM", location: "Los Angeles, CA", desc: "Package delivered successfully", color: "bg-green-500" },
  ],
  "ORD-2026-001156": [
    { label: "Order Confirmed", date: "2026-02-16 08:00 AM", location: "Chicago, IL", desc: "Order confirmed and processing started", color: "bg-green-500" },
    { label: "Picked by Courier", date: "2026-02-17 10:00 AM", location: "Distribution Center, IL", desc: "Package picked up from warehouse", color: "bg-green-500" },
    { label: "In Transit", date: "2026-02-18 06:00 AM", location: "Regional Hub, IL", desc: "Package in transit to local facility", color: "bg-orange-500" },
  ],
  "ORD-2026-001098": [
    { label: "Order Confirmed", date: "2026-02-17 09:30 AM", location: "Miami, FL", desc: "Order confirmed and processing started", color: "bg-green-500" },
    { label: "Picked by Courier", date: "2026-02-18 01:00 PM", location: "Distribution Center, FL", desc: "Package picked up from warehouse", color: "bg-green-500" },
  ],
  "ORD-2026-001045": [
    { label: "Order Confirmed", date: "2026-02-13 10:00 AM", location: "Seattle, WA", desc: "Order confirmed and processing started", color: "bg-green-500" },
    { label: "Picked by Courier", date: "2026-02-14 12:00 PM", location: "Distribution Center, WA", desc: "Package picked up from warehouse", color: "bg-green-500" },
    { label: "Failed Delivery", date: "2026-02-18 03:00 PM", location: "Seattle, WA", desc: "Delivery attempt failed - recipient not available", color: "bg-red-500" },
  ],
  "ORD-2026-001020": [
    { label: "Order Confirmed", date: "2026-02-18 11:00 AM", location: "Boston, MA", desc: "Order confirmed and processing started", color: "bg-green-500" },
  ],
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig["Pending"];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${cfg.bg} ${cfg.text}`}>
      {status}
    </span>
  );
}

function DeliveryModal({ order, onClose }) {
  const items = orderItems[order.id] || [];
  const timeline = timelineData[order.id] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose} />

      {/* Modal — slides up from bottom on mobile, centered on sm+ */}
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg sm:mx-4 max-h-[92vh] flex flex-col">
        <div className="overflow-y-auto flex-1 p-5 sm:p-8">

          {/* Drag handle on mobile */}
          <div className="flex justify-center mb-4 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-gray-200" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Delivery Details</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Complete delivery tracking information</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors ml-4 mt-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Order summary row — 2 cols on mobile, 4 on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 sm:mb-8">
            <div>
              <p className="text-xs text-gray-400 mb-1">Order ID</p>
              <p className="font-bold text-gray-900 text-xs sm:text-sm break-all">{order.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Order Date</p>
              <p className="font-bold text-gray-900 text-xs sm:text-sm">{order.orderDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Status</p>
              <StatusBadge status={order.status} />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Est. Delivery</p>
              <p className="font-bold text-gray-900 text-xs sm:text-sm">{order.eta}</p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Customer Information</h3>
            <div className="space-y-2.5">
              {[
                { icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", val: order.customer, bold: true },
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", val: order.email },
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", val: order.phone },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", val: order.address },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={row.icon} />
                  </svg>
                  <span className={row.bold ? "font-semibold text-gray-900" : "text-gray-600 break-words min-w-0"}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Order Items</h3>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm gap-2">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-500 flex-shrink-0">Qty: {item.qty}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <span className="font-bold text-gray-900 text-sm">Total Amount</span>
              <span className="font-bold text-orange-500 text-base sm:text-lg">{order.amount}</span>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Delivery Information</h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">Delivery Partner</p>
                <p className="text-sm font-medium text-gray-900">{order.carrier}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Tracking Number</p>
                <p className="text-xs sm:text-sm font-bold text-orange-500 font-mono break-all">{order.tracking || "—"}</p>
              </div>
            </div>
          </div>

          {/* Delivery Timeline */}
          <div className="mb-2">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-5">Delivery Timeline</h3>
            <div className="space-y-5">
              {timeline.map((step, i) => (
                <div key={i} className="flex gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${step.color}`} />
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                  </div>
                  <div className="pb-2 min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-6">
                      <span className="font-semibold text-gray-900 text-sm">{step.label}</span>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{step.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="text-xs text-gray-400">{step.location}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-5 sm:px-8 py-4 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function UpdateModal({ order, onClose }) {
  const [formData, setFormData] = useState({
    status: order.status,
    carrier: order.carrier === "Not Assigned" ? "" : order.carrier,
    tracking: order.tracking || "",
    eta: order.eta,
    location: "",
    notes: "",
  });

  const statusOptions = ["Pending", "In Transit", "Out for Delivery", "Picked Up", "Delivered", "Failed", "Cancelled"];
  const carrierOptions = ["FedEx", "UPS", "DHL", "USPS", "BlueDart", "Other"];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg sm:mx-4 max-h-[92vh] flex flex-col">
        <div className="overflow-y-auto flex-1 p-5 sm:p-8">

          {/* Drag handle on mobile */}
          <div className="flex justify-center mb-4 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-gray-200" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Update Delivery Status</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Update tracking information and delivery status</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors ml-4 mt-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Order ID */}
          <div className="mb-5">
            <p className="text-xs sm:text-sm text-gray-400 mb-1">Order ID</p>
            <p className="font-bold text-gray-900 text-sm sm:text-base">{order.id}</p>
          </div>

          {/* Row 1: Delivery Status + Delivery Partner — stacked on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Delivery Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full appearance-none pl-4 pr-9 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition cursor-pointer"
                >
                  {statusOptions.map((s) => <option key={s}>{s}</option>)}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Delivery Partner</label>
              <div className="relative">
                <select
                  value={formData.carrier}
                  onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
                  className="w-full appearance-none pl-4 pr-9 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition cursor-pointer"
                >
                  {carrierOptions.map((c) => <option key={c}>{c}</option>)}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Row 2: Tracking Number + Estimated Delivery — stacked on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tracking Number</label>
              <input
                type="text"
                value={formData.tracking}
                onChange={(e) => setFormData({ ...formData, tracking: e.target.value })}
                placeholder="e.g., FDX1234567890"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Estimated Delivery</label>
              <input
                type="date"
                value={formData.eta}
                onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Current Location */}
          <div className="mb-3 sm:mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Regional Hub, Chicago IL"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
          </div>

          {/* Delivery Notes */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Delivery Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any notes about this status update..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-5 sm:px-8 py-4 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order, onView, onUpdate }) {
  return (
    <div className="border-b border-gray-100 last:border-b-0 py-5 sm:py-7 first:pt-2">
      {/* Top row: Order ID + badge + buttons (buttons move to bottom on mobile) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="font-bold text-gray-900 text-base sm:text-lg">{order.id}</span>
          <StatusBadge status={order.status} />
        </div>
        {/* Buttons — inline on mobile top row for easy access */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onView}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </button>
          <button
            onClick={onUpdate}
            className="flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Update
          </button>
        </div>
      </div>

      {/* Detail grid: stacks to 1 col on mobile, 2 cols on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-10">
        {/* Left column */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-semibold text-gray-900">{order.customer}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="break-all">{order.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {order.phone}
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-500">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {order.address}
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-500 pt-1">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Order: {order.orderDate}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ETA: {order.eta}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-2 mt-2 sm:mt-0">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>{order.items} item(s) – <strong className="text-gray-900">{order.amount}</strong></span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            {order.carrier}
          </div>
          {order.tracking && (
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <span className="text-gray-400">Tracking:</span>
              <span className={`font-mono font-semibold text-xs sm:text-sm ${order.trackingColor}`}>{order.tracking}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DeliveryStatus() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Status");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateOrder, setUpdateOrder] = useState(null);

  const statusOptions = [
    "All Status", "Pending", "In Transit", "Out for Delivery",
    "Picked Up", "Delivered", "Failed", "Cancelled",
  ];

  const filtered = orders.filter((o) => {
    const matchSearch =
      search === "" ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      (o.tracking && o.tracking.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "All Status" || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedOrder && <DeliveryModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
      {updateOrder && <UpdateModal order={updateOrder} onClose={() => setUpdateOrder(null)} />}

      <div className="pb-4 px-3 sm:px-6">

        {/* Page Header */}
        <div className="mb-4 pt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Delivery Status</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Track and manage order delivery statuses</p>
        </div>

        {/* Summary Cards — 2 cols on mobile, 3 on sm, 5 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-4 w-full">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between"
            >
              <div className="flex flex-col gap-2 sm:gap-4">
                <p className="text-xs text-gray-400 font-medium leading-none">{card.label}</p>
                <p className="text-3xl sm:text-4xl font-bold text-gray-900 leading-none">{card.count}</p>
              </div>
              <div className={`${card.iconBg} ${card.iconColor} rounded-full p-2 sm:p-3 flex-shrink-0 ml-2`}>
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Orders Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 sm:px-10 py-5">

          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Delivery Orders</h2>

          {/* Search + Filter + Export — wraps on small screens */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
            {/* Search — full width on mobile */}
            <div className="relative w-full sm:flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by order ID, customer, tracking..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
            </div>

            {/* Filter + Export side by side on all screen sizes */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full sm:w-36 appearance-none pl-4 pr-9 py-2.5 sm:py-3 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition cursor-pointer"
                >
                  {statusOptions.map((s) => <option key={s}>{s}</option>)}
                </select>
                <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <button className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
            </div>
          </div>

          {/* Orders list */}
          <div>
            {filtered.length > 0 ? (
              filtered.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onView={() => setSelectedOrder(order)}
                  onUpdate={() => setUpdateOrder(order)}
                />
              ))
            ) : (
              <div className="text-center py-16 sm:py-20 text-gray-300">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-base">No orders found</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}