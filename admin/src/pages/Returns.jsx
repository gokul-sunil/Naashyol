import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const initialReturns = [
  {
    id: "RET001",
    orderId: "ORD-2026-001234",
    product: "iPhone 15 Pro Max - 256GB - Natural Titanium",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=200&hei=200&fmt=png-alpha",
    customer: "John Smith",
    email: "john.smith@example.com",
    date: "2026-02-15",
    reason: "Product not as described. The color appears different from the website images.",
    orderAmount: 1199.99,
    refundAmount: 1199.99,
    status: "Pending",
    deliveryStatus: "Pickup Pending",
    tracking: null,
    adminNotes: "",
    quantity: 1,
  },
  {
    id: "RET002",
    orderId: "ORD-2026-001189",
    product: "Sony WH-1000XM5 Wireless Headphones - Black",
    image: "https://m.media-amazon.com/images/I/61eVj8DRWxL._AC_SX679_.jpg",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2026-02-14",
    reason: "Defective product. Right ear cup not working properly.",
    orderAmount: 399.99,
    refundAmount: 399.99,
    status: "Approved",
    deliveryStatus: "In Transit",
    tracking: "TRK9876543210",
    adminNotes: "Return approved. Product pickup scheduled.",
    quantity: 1,
  },
  {
    id: "RET003",
    orderId: "ORD-2026-001156",
    product: "Samsung Galaxy Watch 6 - 44mm - Silver",
    image: "https://images.samsung.com/is/image/samsung/p6pim/levant/2307/gallery/levant-galaxy-watch6-44mm-sm-r940nzsaxfe-537127788?$650_519_PNG$",
    customer: "Michael Chen",
    email: "m.chen@example.com",
    date: "2026-02-12",
    reason: "Changed mind about the purchase.",
    orderAmount: 329.99,
    refundAmount: 329.99,
    status: "Rejected",
    deliveryStatus: "N/A",
    tracking: null,
    adminNotes: "Return rejected. Beyond 7-day return window.",
    quantity: 1,
  },
  {
    id: "RET004",
    orderId: "ORD-2026-001098",
    product: 'Apple MacBook Air M2 - 13" - Space Gray',
    image: "https://m.media-amazon.com/images/I/71JiyXuNSeL._AC_SX679_.jpg",
    customer: "Emily Davis",
    email: "emily.davis@example.com",
    date: "2026-02-10",
    reason: "Received wrong product. Ordered 512GB but received 256GB.",
    orderAmount: 1299.99,
    refundAmount: 1299.99,
    status: "Refunded",
    deliveryStatus: "Delivered",
    tracking: "TRK1234567890",
    adminNotes: "Product received and inspected. Refund processed to original payment method.",
    quantity: 1,
  },
  {
    id: "RET005",
    orderId: "ORD-2026-001045",
    product: "Bose QuietComfort 45 Headphones - White",
    image: "https://m.media-amazon.com/images/I/51f6ZIiRBYL._AC_SX679_.jpg",
    customer: "David Wilson",
    email: "d.wilson@example.com",
    date: "2026-02-13",
    reason: "Package arrived damaged.",
    orderAmount: 329.0,
    refundAmount: 329.0,
    status: "Approved",
    deliveryStatus: "Pickup Pending",
    tracking: null,
    adminNotes: "Return approved. Awaiting product pickup.",
    quantity: 1,
  },
];

const statusColors = {
  Pending: { bg: "#FFF7ED", text: "#D97706", border: "#FED7AA" },
  Approved: { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" },
  Rejected: { bg: "#FEF2F2", text: "#DC2626", border: "#FECACA" },
  Refunded: { bg: "#F0FDF4", text: "#16A34A", border: "#BBF7D0" },
};

const deliveryColors = {
  "Pickup Pending": { bg: "#FFF7ED", text: "#D97706" },
  "In Transit": { bg: "#EFF6FF", text: "#2563EB" },
  Delivered: { bg: "#F0FDF4", text: "#16A34A" },
  "N/A": { bg: "#F3F4F6", text: "#6B7280" },
  "Delivered to Warehouse": { bg: "#F0FDF4", text: "#16A34A" },
};

const StatusBadge = ({ status }) => {
  const c = statusColors[status] || { bg: "#F3F4F6", text: "#6B7280", border: "#E5E7EB" };
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>
      {status === "Pending" ? "Pending Review" : status}
    </span>
  );
};

const DeliveryBadge = ({ status }) => {
  const c = deliveryColors[status] || { bg: "#F3F4F6", text: "#6B7280" };
  return (
    <span style={{ background: c.bg, color: c.text, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>
      {status}
    </span>
  );
};

const Icons = {
  Clock: () => <svg width="22" height="22" fill="none" stroke="#D97706" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  CheckCircle: () => <svg width="22" height="22" fill="none" stroke="#2563EB" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  XCircle: () => <svg width="22" height="22" fill="none" stroke="#DC2626" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
  RefreshCw: () => <svg width="22" height="22" fill="none" stroke="#16A34A" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  Dollar: () => <svg width="22" height="22" fill="none" stroke="#D97706" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Eye: () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Check: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  X: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  DollarCircle: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><path d="M15 10H9.5a1.5 1.5 0 0 0 0 3h5a1.5 1.5 0 0 1 0 3H9"/></svg>,
  Truck: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Search: () => <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  ChevronDown: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>,
  Download: () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Close: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

export default function ReturnsRefunds() {
  const [returns, setReturns] = useState(initialReturns);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [modal, setModal] = useState(null);
  const [approveNote, setApproveNote] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [refundMethod, setRefundMethod] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [trackingNum, setTrackingNum] = useState("");

  const stats = {
    Pending: returns.filter((r) => r.status === "Pending").length,
    Approved: returns.filter((r) => r.status === "Approved").length,
    Rejected: returns.filter((r) => r.status === "Rejected").length,
    Refunded: returns.filter((r) => r.status === "Refunded").length,
    total: returns.filter((r) => r.status === "Refunded").reduce((s, r) => s + r.refundAmount, 0),
  };

  const filtered = returns.filter((r) => {
    const matchSearch =
      !search ||
      r.product.toLowerCase().includes(search.toLowerCase()) ||
      r.orderId.toLowerCase().includes(search.toLowerCase()) ||
      r.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openModal = (type, ret) => {
    setModal({ type, ret });
    if (type === "refund") { setRefundAmount(String(ret.refundAmount)); setRefundMethod(""); }
    if (type === "delivery") { setDeliveryStatus(ret.deliveryStatus === "N/A" ? "Pickup Pending" : ret.deliveryStatus); setTrackingNum(ret.tracking || ""); }
    if (type === "approve") { setApproveNote(""); }
    if (type === "reject") { setRejectReason(""); }
  };

  const closeModal = () => setModal(null);

  const doApprove = () => {
    setReturns((prev) => prev.map((r) => r.id === modal.ret.id ? { ...r, status: "Approved", adminNotes: approveNote || "Return approved." } : r));
    closeModal();
  };

  const doReject = () => {
    if (!rejectReason.trim()) return;
    setReturns((prev) => prev.map((r) => r.id === modal.ret.id ? { ...r, status: "Rejected", adminNotes: rejectReason } : r));
    closeModal();
  };

  const doRefund = () => {
    if (!refundMethod) return;
    setReturns((prev) => prev.map((r) => r.id === modal.ret.id ? { ...r, status: "Refunded", refundAmount: parseFloat(refundAmount), adminNotes: "Refund processed via " + refundMethod } : r));
    closeModal();
  };

  const doDelivery = () => {
    setReturns((prev) => prev.map((r) => r.id === modal.ret.id ? { ...r, deliveryStatus, tracking: trackingNum || null } : r));
    closeModal();
  };

  const styles = {
    page: { minHeight: "100vh", background: "#F8F9FA", fontFamily: "'Geist', 'DM Sans', sans-serif", padding: "0" },
    container: { maxWidth: 1100, margin: "0 auto", padding: "32px 20px" },
    header: { marginBottom: 28 },
    title: { fontSize: 28, fontWeight: 700, color: "#111827", margin: 0 },
    subtitle: { fontSize: 14, color: "#6B7280", marginTop: 4 },
    statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 },
    statCard: { background: "#fff", borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "space-between" },
    statLabel: { fontSize: 13, color: "#6B7280", marginBottom: 4 },
    statValue: { fontSize: 26, fontWeight: 700, color: "#111827" },
    statIcon: { width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" },
    card: { background: "#fff", borderRadius: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB", overflow: "hidden" },
    cardHeader: { padding: "20px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 },
    cardTitle: { fontSize: 18, fontWeight: 700, color: "#111827" },
    searchRow: { padding: "16px 24px", display: "flex", gap: 12, flexWrap: "wrap" },
    searchWrap: { flex: 1, minWidth: 200, position: "relative" },
    searchInput: { width: "100%", padding: "9px 12px 9px 38px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 14, color: "#374151", outline: "none", background: "#F9FAFB", boxSizing: "border-box" },
    searchIcon: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" },
    filterWrap: { position: "relative" },
    filterBtn: { display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 14, color: "#374151", background: "#fff", cursor: "pointer", whiteSpace: "nowrap" },
    dropdown: { position: "absolute", top: "calc(100% + 4px)", right: 0, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.10)", zIndex: 100, minWidth: 150, overflow: "hidden" },
    dropItem: (active) => ({ padding: "10px 16px", fontSize: 14, cursor: "pointer", background: active ? "#FFF7ED" : "#fff", color: active ? "#D97706" : "#374151", display: "flex", alignItems: "center", justifyContent: "space-between" }),
    exportBtn: { display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 14, color: "#374151", background: "#fff", cursor: "pointer" },
    returnItem: { padding: "18px 24px", borderTop: "1px solid #F3F4F6", display: "flex", alignItems: "flex-start", gap: 16 },
    productImg: { width: 70, height: 70, borderRadius: 10, objectFit: "cover", border: "1px solid #E5E7EB", flexShrink: 0, background: "#F3F4F6" },
    returnInfo: { flex: 1, minWidth: 0 },
    productName: { fontSize: 15, fontWeight: 600, color: "#111827", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
    meta: { display: "flex", alignItems: "center", gap: 16, marginTop: 4, flexWrap: "wrap" },
    metaItem: { fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 4 },
    reason: { fontSize: 13, color: "#374151", marginTop: 6 },
    amountRow: { display: "flex", alignItems: "center", gap: 10, marginTop: 8, flexWrap: "wrap" },
    amount: { fontSize: 13, fontWeight: 600, color: "#111827" },
    actions: { display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 },
    btn: (variant) => {
      const v = {
        view: { bg: "#fff", color: "#374151", border: "1px solid #E5E7EB" },
        approve: { bg: "#16A34A", color: "#fff", border: "none" },
        reject: { bg: "#fff", color: "#DC2626", border: "1px solid #FECACA" },
        refund: { bg: "#F97316", color: "#fff", border: "none" },
        delivery: { bg: "#fff", color: "#374151", border: "1px solid #E5E7EB" },
        // ✅ greyed out disabled style for Rejected delivery
        deliveryDisabled: { bg: "#F9FAFB", color: "#9CA3AF", border: "1px solid #E5E7EB" },
      }[variant] || { bg: "#fff", color: "#374151", border: "1px solid #E5E7EB" };
      return { display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: variant === "deliveryDisabled" ? "not-allowed" : "pointer", background: v.bg, color: v.color, border: v.border, whiteSpace: "nowrap", opacity: variant === "deliveryDisabled" ? 0.6 : 1 };
    },
    overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 },
    modalBox: { background: "#fff", borderRadius: 16, width: "100%", maxWidth: 520, boxShadow: "0 8px 40px rgba(0,0,0,0.15)", maxHeight: "90vh", overflowY: "auto" },
    modalHeader: { padding: "24px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    modalTitle: { fontSize: 22, fontWeight: 700, color: "#111827" },
    modalSubtitle: { fontSize: 13, color: "#6B7280", marginTop: 3 },
    modalBody: { padding: "20px 24px" },
    modalFooter: { padding: "0 24px 24px", display: "flex", justifyContent: "flex-end", gap: 10 },
    label: { fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" },
    input: { width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, color: "#111827", outline: "none", boxSizing: "border-box", background: "#F9FAFB" },
    textarea: { width: "100%", padding: "10px 12px", border: "1.5px solid #F97316", borderRadius: 8, fontSize: 14, color: "#111827", outline: "none", boxSizing: "border-box", resize: "vertical", minHeight: 90, background: "#fff", fontFamily: "inherit" },
    select: { width: "100%", padding: "10px 12px", border: "1.5px solid #E5E7EB", borderRadius: 8, fontSize: 14, color: "#111827", outline: "none", background: "#F9FAFB", cursor: "pointer", appearance: "none" },
    idBox: { background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 8, padding: "10px 14px", marginBottom: 18 },
    idLabel: { fontSize: 12, color: "#6B7280" },
    idValue: { fontSize: 16, fontWeight: 700, color: "#111827" },
    detailRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 },
    detailLabel: { fontSize: 12, color: "#6B7280", marginBottom: 2 },
    detailValue: { fontSize: 14, fontWeight: 500, color: "#111827" },
    btnCancel: { padding: "9px 20px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: 14, fontWeight: 500, cursor: "pointer" },
    btnPrimary: (color) => ({ padding: "9px 20px", borderRadius: 8, border: "none", background: color, color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }),
    btnPrimaryDisabled: { padding: "9px 20px", borderRadius: 8, border: "none", background: "#FED7AA", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "not-allowed", display: "flex", alignItems: "center", gap: 6 },
    closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 4 },
    divider: { height: 1, background: "#F3F4F6", margin: "16px 0" },
    metaSvg: { width: 13, height: 13 },
  };

  const CalIcon = () => <svg style={styles.metaSvg} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
  const UserIcon = () => <svg style={styles.metaSvg} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  const OrderIcon = () => <svg style={styles.metaSvg} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>;
  const TruckIcon = () => <svg style={styles.metaSvg} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;

  const renderDetailModal = (ret) => (
    <div style={styles.overlay} onClick={closeModal}>
      <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div>
            <div style={styles.modalTitle}>Return Request Details</div>
            <div style={styles.modalSubtitle}>Complete information about this return request</div>
          </div>
          <button style={styles.closeBtn} onClick={closeModal}><Icons.Close /></button>
        </div>
        <div style={styles.modalBody}>
          <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
            <img src={ret.image} alt={ret.product} style={{ width: 90, height: 90, borderRadius: 10, objectFit: "cover", border: "1px solid #E5E7EB", background: "#F3F4F6" }} onError={e => { e.target.style.background = "#E5E7EB"; }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{ret.product}</div>
              <div style={styles.detailRow}>
                <div><div style={styles.detailLabel}>Order ID:</div><div style={styles.detailValue}>{ret.orderId}</div></div>
                <div><div style={styles.detailLabel}>Request ID:</div><div style={styles.detailValue}>{ret.id}</div></div>
                <div><div style={styles.detailLabel}>Quantity:</div><div style={styles.detailValue}>{ret.quantity}</div></div>
                <div><div style={styles.detailLabel}>Request Date:</div><div style={styles.detailValue}>{ret.date}</div></div>
              </div>
            </div>
          </div>
          <div style={styles.detailRow}>
            <div><div style={styles.detailLabel}>Customer Name</div><div style={{ ...styles.detailValue, fontWeight: 600 }}>{ret.customer}</div></div>
            <div><div style={styles.detailLabel}>Customer Email</div><div style={{ ...styles.detailValue, fontSize: 13 }}>{ret.email}</div></div>
          </div>
          <div style={styles.divider} />
          <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Return Reason</div>
          <div style={{ background: "#F9FAFB", borderRadius: 8, padding: "10px 14px", fontSize: 14, color: "#374151", marginBottom: 16 }}>{ret.reason}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><div style={styles.detailLabel}>Order Amount</div><div style={{ fontSize: 18, fontWeight: 700 }}>${ret.orderAmount.toFixed(2)}</div></div>
            <div><div style={styles.detailLabel}>Refund Amount</div><div style={{ fontSize: 18, fontWeight: 700, color: "#F97316" }}>${ret.refundAmount.toFixed(2)}</div></div>
            <div><div style={styles.detailLabel}>Status</div><StatusBadge status={ret.status} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><div style={styles.detailLabel}>Delivery Status</div><DeliveryBadge status={ret.deliveryStatus} /></div>
            <div><div style={styles.detailLabel}>Tracking Number</div><div style={styles.detailValue}>{ret.tracking || "Not assigned"}</div></div>
          </div>
          {ret.adminNotes && (
            <>
              <div style={styles.divider} />
              <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Admin Notes</div>
              <div style={{ fontSize: 13, color: "#4B5563" }}>{ret.adminNotes}</div>
            </>
          )}
        </div>
        <div style={styles.modalFooter}>
          <button style={styles.btnCancel} onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );

  const renderApproveModal = (ret) => (
    <div style={styles.overlay} onClick={closeModal}>
      <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div>
            <div style={styles.modalTitle}>Approve Return Request</div>
            <div style={styles.modalSubtitle}>Confirm approval of this return request</div>
          </div>
          <button style={styles.closeBtn} onClick={closeModal}><Icons.Close /></button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.idBox}><div style={styles.idLabel}>Return ID</div><div style={styles.idValue}>{ret.id}</div></div>
          <label style={styles.label}>Admin Notes (Optional)</label>
          <textarea style={styles.textarea} placeholder="Add any notes about this approval..." value={approveNote} onChange={e => setApproveNote(e.target.value)} />
        </div>
        <div style={styles.modalFooter}>
          <button style={styles.btnCancel} onClick={closeModal}>Cancel</button>
          <button style={styles.btnPrimary("#16A34A")} onClick={doApprove}><Icons.Check /> Approve Return</button>
        </div>
      </div>
    </div>
  );

  const renderRejectModal = (ret) => (
    <div style={styles.overlay} onClick={closeModal}>
      <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div>
            <div style={styles.modalTitle}>Reject Return Request</div>
            <div style={styles.modalSubtitle}>Provide a reason for rejecting this return</div>
          </div>
          <button style={styles.closeBtn} onClick={closeModal}><Icons.Close /></button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.idBox}><div style={styles.idLabel}>Return ID</div><div style={styles.idValue}>{ret.id}</div></div>
          <label style={styles.label}>Rejection Reason *</label>
          <textarea style={{ ...styles.textarea, border: "1.5px solid #FECACA" }} placeholder="Explain why this return is being rejected..." value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
        </div>
        <div style={styles.modalFooter}>
          <button style={styles.btnCancel} onClick={closeModal}>Cancel</button>
          <button style={rejectReason.trim() ? styles.btnPrimary("#DC2626") : styles.btnPrimaryDisabled} onClick={doReject} disabled={!rejectReason.trim()}>
            <Icons.X /> Reject Return
          </button>
        </div>
      </div>
    </div>
  );

  const renderRefundModal = (ret) => (
    <div style={styles.overlay} onClick={closeModal}>
      <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div>
            <div style={styles.modalTitle}>Process Refund</div>
            <div style={styles.modalSubtitle}>Process refund for this return request</div>
          </div>
          <button style={styles.closeBtn} onClick={closeModal}><Icons.Close /></button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.idBox}><div style={styles.idLabel}>Return ID</div><div style={styles.idValue}>{ret.id}</div></div>
          <label style={styles.label}>Refund Amount *</label>
          <input type="number" style={{ ...styles.input, marginBottom: 14, border: "1.5px solid #F97316", background: "#FFF7ED", fontWeight: 600, color: "#D97706" }} value={refundAmount} onChange={e => setRefundAmount(e.target.value)} />
          <label style={styles.label}>Refund Method *</label>
          <div style={{ position: "relative" }}>
            <select style={{ ...styles.select, paddingRight: 36 }} value={refundMethod} onChange={e => setRefundMethod(e.target.value)}>
              <option value="">Select refund method</option>
              <option value="Original Payment Method">Original Payment Method</option>
              <option value="Store Credit">Store Credit</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
            <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Icons.ChevronDown /></span>
          </div>
        </div>
        <div style={styles.modalFooter}>
          <button style={styles.btnCancel} onClick={closeModal}>Cancel</button>
          <button style={refundMethod ? styles.btnPrimary("#F97316") : styles.btnPrimaryDisabled} onClick={doRefund} disabled={!refundMethod}>
            <Icons.DollarCircle /> Process Refund
          </button>
        </div>
      </div>
    </div>
  );

  const renderDeliveryModal = (ret) => (
    <div style={styles.overlay} onClick={closeModal}>
      <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <div>
            <div style={styles.modalTitle}>Update Delivery Status</div>
            <div style={styles.modalSubtitle}>Update return product delivery information</div>
          </div>
          <button style={styles.closeBtn} onClick={closeModal}><Icons.Close /></button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.idBox}><div style={styles.idLabel}>Return ID</div><div style={styles.idValue}>{ret.id}</div></div>
          <label style={styles.label}>Delivery Status *</label>
          <div style={{ position: "relative", marginBottom: 14 }}>
            <select style={{ ...styles.select, paddingRight: 36 }} value={deliveryStatus} onChange={e => setDeliveryStatus(e.target.value)}>
              <option value="Pickup Pending">Pickup Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered to Warehouse">Delivered to Warehouse</option>
              <option value="Delivered">Delivered</option>
            </select>
            <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Icons.ChevronDown /></span>
          </div>
          <label style={styles.label}>Tracking Number</label>
          <input style={styles.input} placeholder="Enter tracking number" value={trackingNum} onChange={e => setTrackingNum(e.target.value)} />
        </div>
        <div style={styles.modalFooter}>
          <button style={styles.btnCancel} onClick={closeModal}>Cancel</button>
          <button style={styles.btnPrimary("#F97316")} onClick={doDelivery}>
            <Icons.Truck /> Update Status
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Returns & Refunds</h1>
          <p style={styles.subtitle}>Manage product returns and refund requests</p>
        </div>

        <div style={styles.statsGrid}>
          {[
            { label: "Pending", value: stats.Pending, icon: <Icons.Clock />, iconBg: "#FFF7ED" },
            { label: "Approved", value: stats.Approved, icon: <Icons.CheckCircle />, iconBg: "#EFF6FF" },
            { label: "Rejected", value: stats.Rejected, icon: <Icons.XCircle />, iconBg: "#FEF2F2" },
            { label: "Refunded", value: stats.Refunded, icon: <Icons.RefreshCw />, iconBg: "#F0FDF4" },
            { label: "Total Refunded", value: `$${stats.total.toFixed(2)}`, icon: <Icons.Dollar />, iconBg: "#FFF7ED" },
          ].map((s) => (
            <div key={s.label} style={styles.statCard}>
              <div>
                <div style={styles.statLabel}>{s.label}</div>
                <div style={styles.statValue}>{s.value}</div>
              </div>
              <div style={{ ...styles.statIcon, background: s.iconBg }}>{s.icon}</div>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardTitle}>Return Requests</div>
          </div>
          <div style={styles.searchRow}>
            <div style={styles.searchWrap}>
              <span style={styles.searchIcon}><Icons.Search /></span>
              <input style={styles.searchInput} placeholder="Search by order ID, customer, product..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div style={styles.filterWrap}>
              <button style={styles.filterBtn} onClick={() => setShowStatusDropdown(v => !v)}>
                {statusFilter} <Icons.ChevronDown />
              </button>
              {showStatusDropdown && (
                <div style={styles.dropdown}>
                  {["All Status", "Pending", "Approved", "Rejected", "Refunded"].map((s) => (
                    <div key={s} style={styles.dropItem(statusFilter === s)} onClick={() => { setStatusFilter(s); setShowStatusDropdown(false); }}>
                      {s}
                      {statusFilter === s && <svg width="14" height="14" fill="none" stroke="#D97706" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button style={styles.exportBtn}>
              <Icons.Download /> Export
            </button>
          </div>

          {filtered.map((ret) => (
            <div key={ret.id} style={styles.returnItem}>
              <img src={ret.image} alt={ret.product} style={styles.productImg} onError={e => { e.target.style.background = "#E5E7EB"; e.target.src = ""; }} />
              <div style={styles.returnInfo}>
                <div style={styles.productName}>
                  {ret.product}
                  <StatusBadge status={ret.status} />
                </div>
                <div style={styles.meta}>
                  <span style={styles.metaItem}><OrderIcon /> {ret.orderId}</span>
                  <span style={styles.metaItem}><UserIcon /> {ret.customer}</span>
                  <span style={styles.metaItem}><CalIcon /> {ret.date}</span>
                </div>
                <div style={styles.reason}><b>Reason:</b> {ret.reason}</div>
                <div style={styles.amountRow}>
                  <span style={styles.amount}>Refund Amount: <b>${ret.refundAmount.toFixed(2)}</b></span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <TruckIcon />
                    <DeliveryBadge status={ret.deliveryStatus} />
                  </span>
                  {ret.tracking && <span style={{ fontSize: 12, color: "#6B7280" }}>Tracking: {ret.tracking}</span>}
                </div>
              </div>
              <div style={styles.actions}>
                <button style={styles.btn("view")} onClick={() => openModal("view", ret)}><Icons.Eye /> View</button>
                {ret.status === "Pending" && (
                  <>
                    <button style={styles.btn("approve")} onClick={() => openModal("approve", ret)}><Icons.Check /> Approve</button>
                    <button style={styles.btn("reject")} onClick={() => openModal("reject", ret)}><Icons.X /> Reject</button>
                  </>
                )}
                {ret.status === "Approved" && (
                  <>
                    <button style={styles.btn("refund")} onClick={() => openModal("refund", ret)}><Icons.DollarCircle /> Refund</button>
                    <button style={styles.btn("delivery")} onClick={() => openModal("delivery", ret)}><Icons.Truck /> Delivery</button>
                  </>
                )}
                {ret.status === "Refunded" && (
                  <button style={styles.btn("delivery")} onClick={() => openModal("delivery", ret)}><Icons.Truck /> Delivery</button>
                )}
                {/* ✅ Rejected: greyed out disabled — no modal opens */}
                {ret.status === "Rejected" && (
                  <button style={styles.btn("deliveryDisabled")} disabled><Icons.Truck /> Delivery</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal?.type === "view" && renderDetailModal(modal.ret)}
      {modal?.type === "approve" && renderApproveModal(modal.ret)}
      {modal?.type === "reject" && renderRejectModal(modal.ret)}
      {modal?.type === "refund" && renderRefundModal(modal.ret)}
      {modal?.type === "delivery" && renderDeliveryModal(modal.ret)}
    </div>
  );
}