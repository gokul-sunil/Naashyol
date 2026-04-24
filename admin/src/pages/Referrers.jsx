import { useState, useEffect } from "react";

const referrersData = [
  { id: 1, name: "Alex Martinez", email: "alex@example.com", code: "ALEX2026", totalReferrals: 23, rewardsEarned: 115, availableCoupons: 5, lastReferral: "2/20/2026", status: "active" },
  { id: 2, name: "Jessica Lee", email: "jessica@example.com", code: "JESSICA2026", totalReferrals: 30, rewardsEarned: 300, availableCoupons: 12, lastReferral: "2/22/2026", status: "active" },
  { id: 3, name: "Chris Brown", email: "chris@example.com", code: "CHRIS2025", totalReferrals: 45, rewardsEarned: 225, availableCoupons: 8, lastReferral: "2/18/2026", status: "active" },
  { id: 4, name: "Sarah Johnson", email: "sarah@example.com", code: "SARAH2026", totalReferrals: 12, rewardsEarned: 60, availableCoupons: 3, lastReferral: "2/15/2026", status: "active" },
  { id: 5, name: "Michael Chen", email: "michael@example.com", code: "MICHAEL2025", totalReferrals: 0, rewardsEarned: 0, availableCoupons: 0, lastReferral: "-", status: "inactive" },
  { id: 6, name: "Emily Davis", email: "emily@example.com", code: "EMILY2026", totalReferrals: 18, rewardsEarned: 90, availableCoupons: 4, lastReferral: "2/21/2026", status: "active" },
];

const referralHistory = [
  { customer: "Jennifer Smith", email: "jennifer@example.com", orderId: "ORD-2024-458", orderValue: "$299.99", discount: "-$45.00", date: "2/20/2026", rewardStatus: "Rewarded" },
  { customer: "Mark Johnson", email: "mark@example.com", orderId: "ORD-2024-455", orderValue: "$189.50", discount: "-$28.43", date: "2/18/2026", rewardStatus: "Rewarded" },
  { customer: "Lisa Anderson", email: "lisa@example.com", orderId: "ORD-2024-449", orderValue: "$459.00", discount: "-$68.85", date: "2/15/2026", rewardStatus: "Pending" },
  { customer: "David Wilson", email: "david@example.com", orderId: "ORD-2024-442", orderValue: "$329.99", discount: "-$49.50", date: "2/10/2026", rewardStatus: "Rewarded" },
];

const earnedCoupons = [
  { code: "GEN-ALEX-001", type: "General Referral", typeColor: "#16a34a", value: "5%", status: "active", expires: "3/20/2026", usedDate: "-" },
  { code: "REF-ALEX-WBH001", type: "Product Referral", typeColor: "#ea580c", value: "$10", status: "used", expires: "3/15/2026", usedDate: "2/18/2026" },
  { code: "GEN-ALEX-002", type: "General Referral", typeColor: "#16a34a", value: "5%", status: "active", expires: "3/25/2026", usedDate: "-" },
];

/* ── useWindowWidth hook ── */
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return w;
}

/* ── SVG Icons ── */
const IcUsers = ({ s = 20, c = "currentColor" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const IcTrendUp = ({ s = 20, c = "currentColor" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>);
const IcGift = ({ s = 20, c = "currentColor" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>);
const IcUserMinus = ({ s = 20, c = "currentColor" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/></svg>);
const IcDollar = ({ s = 20, c = "currentColor" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>);
const IcCheckCircle = ({ s = 20, c = "currentColor" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const IcCopy = ({ s = 14, c = "currentColor" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>);
const IcExtLink = ({ s = 14, c = "currentColor" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>);
const IcArrowLeft = ({ s = 15, c = "currentColor" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>);
const IcSearch = ({ s = 16, c = "#9ca3af" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
const IcChevronDown = ({ s = 14, c = "#6b7280" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>);
const IcCheck = ({ s = 14, c = "#f59e0b" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
const IcCalendar = ({ s = 13, c = "#9ca3af" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
const IcMail = ({ s = 13, c = "#9ca3af" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>);
const IcPhone = ({ s = 13, c = "#9ca3af" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.36h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const IcTag = ({ s = 14, c = "#f59e0b" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>);
const IcPlus = ({ s = 15, c = "#fff" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
const IcX = ({ s = 17, c = "#9ca3af" }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);

const lbl = { display: "block", fontSize: "14px", fontWeight: "500", color: "#374151", marginBottom: "6px" };
const inp = { width: "100%", padding: "10px 13px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", color: "#374151", outline: "none", boxSizing: "border-box", background: "#fff" };

/* ── Custom Select ── */
function CustomSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(null);
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", padding: "10px 36px 10px 13px", border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px", color: "#374151", background: "#fff", outline: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box" }}>
        <span>{value}</span>
        <span style={{ pointerEvents: "none", display: "flex", flexShrink: 0 }}><IcChevronDown /></span>
      </button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 1099 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 1100, overflow: "hidden" }}>
            {options.map(opt => {
              const isSel = value === opt, isHov = hov === opt;
              return (
                <button key={opt} onClick={() => { onChange(opt); setOpen(false); }} onMouseEnter={() => setHov(opt)} onMouseLeave={() => setHov(null)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "11px 14px", border: "none", cursor: "pointer", fontSize: "14px", textAlign: "left", background: isSel || isHov ? "#fff7ed" : "#fff", color: isSel || isHov ? "#f59e0b" : "#374151", fontWeight: isSel ? "600" : "400", transition: "background 0.12s, color 0.12s" }}>
                  {opt}
                  {isSel && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Modal ── */
function GenerateCouponModal({ referrer, onClose }) {
  const [couponType, setCouponType] = useState("General Referral Reward");
  const [valueType, setValueType] = useState("Percentage (%)");
  const [value, setValue] = useState("5");
  const [expiry, setExpiry] = useState("30");
  const [notes, setNotes] = useState("");
  const [expiryFocused, setExpiryFocused] = useState(false);
  const isMobile = useWindowWidth() < 640;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: isMobile ? "16px 16px 0 0" : "14px", padding: isMobile ? "24px 20px" : "30px 32px", width: isMobile ? "100%" : "480px", maxWidth: "100%", boxShadow: "0 25px 60px rgba(0,0,0,0.16)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "22px" }}>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#111", margin: 0 }}>Generate Reward Coupon</h2>
            <p style={{ fontSize: "13px", color: "#6b7280", margin: "5px 0 0" }}>Create a new coupon reward for {referrer.name}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", display: "flex" }}><IcX /></button>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label style={lbl}>Coupon Type</label>
          <CustomSelect value={couponType} onChange={setCouponType} options={["General Referral Reward", "Product Referral Reward"]} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
          <div>
            <label style={lbl}>Value Type</label>
            <CustomSelect value={valueType} onChange={setValueType} options={["Percentage (%)", "Fixed Amount ($)"]} />
          </div>
          <div>
            <label style={lbl}>Value</label>
            <input type="text" value={value} onChange={e => setValue(e.target.value)} style={inp} />
          </div>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label style={lbl}>Expiry (Days)</label>
          <input type="number" value={expiry} onChange={e => setExpiry(e.target.value)} onFocus={() => setExpiryFocused(true)} onBlur={() => setExpiryFocused(false)}
            style={{ ...inp, border: `1px solid ${expiryFocused ? "#f59e0b" : "#e5e7eb"}`, boxShadow: expiryFocused ? "0 0 0 3px rgba(245,158,11,0.12)" : "none", transition: "border-color 0.15s, box-shadow 0.15s" }} />
        </div>
        <div style={{ marginBottom: "26px" }}>
          <label style={lbl}>Notes (Optional)</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Reward for referring 5 customers in February..." rows={3}
            style={{ ...inp, resize: "vertical", fontFamily: "inherit", lineHeight: "1.55" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={onClose} style={{ padding: "10px 22px", border: "1px solid #e5e7eb", borderRadius: "8px", background: "#fff", color: "#374151", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}>Cancel</button>
          <button style={{ padding: "10px 22px", border: "none", borderRadius: "8px", background: "#f59e0b", color: "#fff", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>Generate Coupon</button>
        </div>
      </div>
    </div>
  );
}

/* ── Order Detail data ── */
const orderDetails = {
  "ORD-2024-458": { id: "ORD-2024-458", date: "Feb 20, 2026", status: "Delivered", customer: "Jennifer Smith", email: "jennifer@example.com", items: [{ name: "Smart Watch Pro", qty: 1, price: "$299.99", img: "⌚" }], subtotal: "$299.99", tax: "$30.00", total: "$329.99", carrier: "UPS", tracking: "UPS9876543210", estDelivery: "2026-02-25" },
  "ORD-2024-455": { id: "ORD-2024-455", date: "Feb 18, 2026", status: "Shipped", customer: "Mark Johnson", email: "mark@example.com", items: [{ name: "Noise Cancelling Earbuds", qty: 1, price: "$189.50", img: "🎧" }], subtotal: "$189.50", tax: "$19.00", total: "$208.50", carrier: "DHL", tracking: "DHL1122334455", estDelivery: "2026-02-23" },
  "ORD-2024-449": { id: "ORD-2024-449", date: "Feb 17, 2026", status: "Shipped", customer: "John Smith", email: "john.smith@email.com", items: [{ name: "Wireless Bluetooth Headphones", qty: 1, price: "$129.99", img: "🎧" }], subtotal: "$1,249.99", tax: "$125.00", total: "$1,374.99", carrier: "FedEx", tracking: "FDX1234567890", estDelivery: "2026-02-21" },
  "ORD-2024-442": { id: "ORD-2024-442", date: "Feb 10, 2026", status: "Delivered", customer: "David Wilson", email: "david@example.com", items: [{ name: "Mechanical Keyboard", qty: 1, price: "$329.99", img: "⌨️" }], subtotal: "$329.99", tax: "$33.00", total: "$362.99", carrier: "USPS", tracking: "USPS5566778899", estDelivery: "2026-02-15" },
};

const statusColors = { Shipped: { bg: "#1d4ed8", color: "#dcfce7" }, Delivered: { bg: "#dcfce7", color: "#15803d" }, Pending: { bg: "#fef3c7", color: "#b45309" }, Cancelled: { bg: "#fee2e2", color: "#dc2626" } };

/* ── Order Detail Page ── */
function OrderDetail({ orderId, onBack }) {
  const isMobile = useWindowWidth() < 768;
  const order = orderDetails[orderId];
  if (!order) return null;
  const sc = statusColors[order.status] || { bg: "#f3f4f6", color: "#374151" };

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh", fontFamily: "'Segoe UI',-apple-system,sans-serif" }}>
      <div style={{ padding: isMobile ? "20px 16px" : "32px 36px" }}>
        {/* Back */}
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: "14px", padding: 0, marginBottom: "16px" }}>
          <IcArrowLeft /> Back to Orders
        </button>

        {/* Title row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: isMobile ? "24px" : "30px", fontWeight: "700", color: "#111", margin: "0 0 6px" }}>Order #{order.id}</h1>
            <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>Order placed on {order.date}</p>
          </div>
          <span style={{ display: "inline-block", padding: "6px 18px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", background: sc.bg, color: sc.color }}>{order.status}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: "20px", alignItems: "start" }}>
          {/* Left: Order Items */}
          <div style={{ background: "#fff", borderRadius: "13px", border: "1px solid #eef0f3", padding: isMobile ? "16px" : "24px 28px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#374151", margin: "0 0 20px" }}>Order Items</h3>
            {order.items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderBottom: i < order.items.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "10px", background: "#fef9c3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", flexShrink: 0 }}>{item.img}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", fontWeight: "600", color: "#111" }}>{item.name}</div>
                  <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "3px" }}>Quantity: {item.qty}</div>
                </div>
                <div style={{ fontSize: "16px", fontWeight: "700", color: "#111" }}>{item.price}</div>
              </div>
            ))}
          </div>

          {/* Right: Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Customer */}
            <div style={{ background: "#fff", borderRadius: "13px", border: "1px solid #eef0f3", padding: "22px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "14px" }}>
                <IcUsers s={17} c="#374151" />
                <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#374151", margin: 0 }}>Customer</h3>
              </div>
              <div style={{ fontSize: "15px", fontWeight: "600", color: "#111", marginBottom: "4px" }}>{order.customer}</div>
              <div style={{ fontSize: "13px", color: "#9ca3af" }}>{order.email}</div>
            </div>

            {/* Delivery */}
            <div style={{ background: "#fff", borderRadius: "13px", border: "1px solid #eef0f3", padding: "22px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                  <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#374151", margin: 0 }}>Delivery</h3>
                </div>
                <button style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: "13px", fontWeight: "500" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Edit
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "5px" }}>Status</div>
                  <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", background: sc.bg, color: sc.color }}>{order.status}</span>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>Carrier</div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#111" }}>{order.carrier}</div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>Tracking Number</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#f59e0b" }}>{order.tracking}</div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>Estimated Delivery</div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#111" }}>{order.estDelivery}</div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div style={{ background: "#fff", borderRadius: "13px", border: "1px solid #eef0f3", padding: "22px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "16px" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#374151", margin: 0 }}>Payment</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#6b7280" }}>
                  <span>Subtotal:</span><span style={{ color: "#111", fontWeight: "500" }}>{order.subtotal}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#6b7280" }}>
                  <span>Tax:</span><span style={{ color: "#111", fontWeight: "500" }}>{order.tax}</span>
                </div>
                <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "10px", display: "flex", justifyContent: "space-between", fontSize: "15px" }}>
                  <span style={{ fontWeight: "600", color: "#111" }}>Total:</span>
                  <span style={{ fontWeight: "700", color: "#f59e0b", fontSize: "16px" }}>{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Referrer Detail ── */
function ReferrerDetail({ referrer, onBack }) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const isMobile = useWindowWidth() < 768;
  const isTablet = useWindowWidth() < 1024;
  const initials = referrer.name.split(" ").map(n => n[0]).join("");

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referrer.code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  if (selectedOrder) return <OrderDetail orderId={selectedOrder} onBack={() => setSelectedOrder(null)} />;

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh", fontFamily: "'Segoe UI',-apple-system,sans-serif" }}>
      {showModal && <GenerateCouponModal referrer={referrer} onClose={() => setShowModal(false)} />}
      <div style={{ padding: isMobile ? "20px 16px" : "32px 36px" }}>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-start", gap: isMobile ? "16px" : "0", marginBottom: "24px" }}>
          <div>
            <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: "14px", padding: 0, marginBottom: "10px" }}>
              <IcArrowLeft /> Back to Referrers
            </button>
            <h1 style={{ fontSize: isMobile ? "28px" : "42px", fontWeight: "700", color: "#111", margin: 0, letterSpacing: "-0.5px" }}>{referrer.name}</h1>
            <p style={{ fontSize: "14px", color: "#9ca3af", margin: "5px 0 0" }}>Referrer details and performance tracking</p>
          </div>
          <button onClick={() => setShowModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "12px 18px", background: "#f59e0b", color: "#fff", border: "none", borderRadius: "9px", fontSize: "14px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap", alignSelf: isMobile ? "flex-start" : "center" }}>
            <IcPlus /> Generate Reward Coupon
          </button>
        </div>

        {/* Profile Card */}
        <div style={{ background: "#fff", borderRadius: "13px", padding: isMobile ? "20px 16px" : "30px 32px", marginBottom: "18px", border: "1px solid #eef0f3" }}>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? "20px" : "0" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "700", color: "#fff", flexShrink: 0 }}>{initials}</div>
              <div>
                <h2 style={{ fontSize: isMobile ? "18px" : "22px", fontWeight: "700", color: "#111", margin: "0 0 5px" }}>{referrer.name}</h2>
                <span style={{ display: "inline-block", background: "#10b981", color: "#fff", fontSize: "11px", fontWeight: "600", padding: "2px 10px", borderRadius: "20px", marginBottom: "10px" }}>active</span>
                <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "6px" : "24px", fontSize: "13px", color: "#6b7280", marginBottom: "6px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><IcMail s={13} />{referrer.email}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><IcPhone s={13} />+1 (555) 123-4567</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#6b7280" }}>
                  <IcCalendar s={13} />Joined 1/15/2026
                </div>
              </div>
            </div>
            {/* Referral Code */}
            <div style={{ alignSelf: isMobile ? "flex-start" : "auto" }}>
              <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "6px", fontWeight: "500" }}>Referral Code</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ border: "2px solid #f59e0b", borderRadius: "9px", padding: isMobile ? "8px 16px" : "12px 24px", fontSize: isMobile ? "16px" : "20px", fontWeight: "700", color: "#f59e0b", letterSpacing: "1.5px", background: "#fffbeb" }}>{referrer.code}</div>
                <button onClick={handleCopyCode} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "7px", padding: "8px 12px", cursor: "pointer", fontSize: "13px", color: copied ? "#16a34a" : "#374151", fontWeight: "500", transition: "color 0.2s", whiteSpace: "nowrap" }}>
                  {copied ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : <IcCopy c="#374151" s={14} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(3,1fr)" : "repeat(5,1fr)", gap: "12px", marginBottom: "18px" }}>
          {[
            { label: "Total Referrals", val: referrer.totalReferrals, icon: <IcUsers s={20} c="#4b9ce2" />, bg: "#eff6ff" },
            { label: "Conversion Rate", val: "100%", icon: <IcTrendUp s={20} c="#10b981" />, bg: "#ecfdf5" },
            { label: "Total Rewards", val: `$${referrer.rewardsEarned}`, icon: <IcDollar s={20} c="#f59e0b" />, bg: "#fffbeb" },
            { label: "Available Coupons", val: referrer.availableCoupons, icon: <IcGift s={20} c="#10b981" />, bg: "#ecfdf5", vc: "#10b981" },
            { label: "Used Coupons", val: 18, icon: <IcCheckCircle s={20} c="#4b9ce2" />, bg: "#eff6ff" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "16px 14px", border: "1px solid #eef0f3", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "10px" }}>{s.label}</div>
                <div style={{ fontSize: isMobile ? "22px" : "26px", fontWeight: "700", color: s.vc || "#111" }}>{s.val}</div>
              </div>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.icon}</div>
            </div>
          ))}
        </div>

        {/* Referral History */}
        <div style={{ background: "#fff", borderRadius: "13px", padding: isMobile ? "16px" : "22px 26px", marginBottom: "18px", border: "1px solid #eef0f3" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "16px" }}>Referral History</h3>
          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {referralHistory.map((row, i) => (
                <div key={i} style={{ border: "1px solid #f3f4f6", borderRadius: "10px", padding: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#111" }}>{row.customer}</div>
                      <div style={{ fontSize: "11px", color: "#9ca3af" }}>{row.email}</div>
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600", background: row.rewardStatus === "Rewarded" ? "#10b981" : "#f59e0b", color: "#fff" }}>
                      {row.rewardStatus === "Rewarded" ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> : <IcGift s={11} c="#fff" />}
                      {row.rewardStatus}
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "12px", color: "#6b7280" }}>
                    <div><span style={{ color: "#9ca3af" }}>Order: </span>{row.orderId}</div>
                    <div><span style={{ color: "#9ca3af" }}>Value: </span><span style={{ color: "#111", fontWeight: "600" }}>{row.orderValue}</span></div>
                    <div><span style={{ color: "#9ca3af" }}>Discount: </span><span style={{ color: "#ef4444", fontWeight: "600" }}>{row.discount}</span></div>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}><IcCalendar s={11} />{row.date}</div>
                  </div>
                  <button onClick={() => setSelectedOrder(row.orderId)} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "none", border: "1px solid #fde68a", borderRadius: "7px", padding: "6px 12px", cursor: "pointer", color: "#f59e0b", fontSize: "12px", fontWeight: "600", marginTop: "10px" }}>
                    <IcExtLink c="#f59e0b" s={13} /> View Order
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                    {["Customer", "Order ID", "Order Value", "Discount Given", "Date", "Reward Status", "Actions"].map(h => (
                      <th key={h} style={{ textAlign: "left", fontSize: "12px", color: "#9ca3af", fontWeight: "500", padding: "0 10px 11px" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {referralHistory.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < referralHistory.length - 1 ? "1px solid #f9fafb" : "none" }}>
                      <td style={{ padding: "13px 10px" }}>
                        <div style={{ fontSize: "13px", fontWeight: "500", color: "#111" }}>{row.customer}</div>
                        <div style={{ fontSize: "11px", color: "#9ca3af" }}>{row.email}</div>
                      </td>
                      <td style={{ padding: "13px 10px", fontSize: "13px", color: "#374151" }}>{row.orderId}</td>
                      <td style={{ padding: "13px 10px", fontSize: "13px", color: "#111", fontWeight: "500" }}>{row.orderValue}</td>
                      <td style={{ padding: "13px 10px", fontSize: "13px", color: "#ef4444", fontWeight: "500" }}>{row.discount}</td>
                      <td style={{ padding: "13px 10px" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6b7280" }}><IcCalendar />{row.date}</span></td>
                      <td style={{ padding: "13px 10px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "5px 13px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", background: row.rewardStatus === "Rewarded" ? "#10b981" : "#f59e0b", color: "#fff" }}>
                          {row.rewardStatus === "Rewarded" ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> : <IcGift s={12} c="#fff" />}
                          {row.rewardStatus}
                        </span>
                      </td>
                      <td style={{ padding: "13px 10px" }}><button onClick={() => setSelectedOrder(row.orderId)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}><IcExtLink c="#f59e0b" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Earned Coupons */}
        <div style={{ background: "#fff", borderRadius: "13px", padding: isMobile ? "16px" : "22px 26px", border: "1px solid #eef0f3" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "16px" }}>Earned Coupons</h3>
          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {earnedCoupons.map((c, i) => (
                <div key={i} style={{ border: "1px solid #f3f4f6", borderRadius: "10px", padding: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: "600", color: "#374151" }}><IcTag />{c.code}</span>
                    <span style={{ background: c.status === "active" ? "#10b981" : "#9ca3af", color: "#fff", fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px" }}>{c.status}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "12px", color: "#6b7280" }}>
                    <div><span style={{ background: c.typeColor, color: "#fff", fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px" }}>{c.type}</span></div>
                    <div><span style={{ color: "#9ca3af" }}>Value: </span><span style={{ color: "#111", fontWeight: "600" }}>{c.value}</span></div>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px" }}><IcCalendar s={11} />{c.expires}</div>
                    <div><span style={{ color: "#9ca3af" }}>Used: </span>{c.usedDate}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                    {["Coupon Code", "Type", "Value", "Status", "Expires", "Used Date"].map(h => (
                      <th key={h} style={{ textAlign: "left", fontSize: "12px", color: "#9ca3af", fontWeight: "500", padding: "0 10px 11px" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {earnedCoupons.map((c, i) => (
                    <tr key={i} style={{ borderBottom: i < earnedCoupons.length - 1 ? "1px solid #f9fafb" : "none" }}>
                      <td style={{ padding: "13px 10px" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "600", color: "#374151" }}><IcTag />{c.code}</span></td>
                      <td style={{ padding: "13px 10px" }}><span style={{ background: c.typeColor, color: "#fff", fontSize: "12px", fontWeight: "600", padding: "5px 13px", borderRadius: "20px", display: "inline-block" }}>{c.type}</span></td>
                      <td style={{ padding: "13px 10px", fontSize: "13px", fontWeight: "600", color: "#111" }}>{c.value}</td>
                      <td style={{ padding: "13px 10px" }}><span style={{ fontSize: "12px", fontWeight: "600", padding: "5px 13px", borderRadius: "20px", display: "inline-block", background: c.status === "active" ? "#10b981" : "#9ca3af", color: "#fff" }}>{c.status}</span></td>
                      <td style={{ padding: "13px 10px" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6b7280" }}><IcCalendar />{c.expires}</span></td>
                      <td style={{ padding: "13px 10px", fontSize: "12px", color: "#6b7280" }}>{c.usedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Dropdown Item ── */
function DropdownItem({ opt, selected, onClick }) {
  const [hovered, setHovered] = useState(false);
  const bg = selected || hovered ? "#fff7ed" : "#fff";
  const color = selected || hovered ? "#f59e0b" : "#374151";
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "11px 15px", background: bg, border: "none", cursor: "pointer", fontSize: "13px", color, fontWeight: selected ? "600" : "400", textAlign: "left", transition: "background 0.15s, color 0.15s" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
        {(hovered || selected) && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        )}
        {!hovered && !selected && <span style={{ width: "12px", display: "inline-block" }} />}
        {opt}
      </span>
      {selected && <IcCheck />}
    </button>
  );
}

/* ── Main Page ── */
export default function ReferrersPage() {
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedReferrer, setSelectedReferrer] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [toast, setToast] = useState(false);
  const isMobile = useWindowWidth() < 768;
  const isTablet = useWindowWidth() < 1024;

  if (selectedReferrer) return <ReferrerDetail referrer={selectedReferrer} onBack={() => setSelectedReferrer(null)} />;

  const filtered = referrersData.filter(r => {
    const ms = statusFilter === "All Status" || r.status === statusFilter.toLowerCase();
    const mq = r.name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase()) || r.code.toLowerCase().includes(search.toLowerCase());
    return ms && mq;
  });

  const handleCopy = code => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setToast(true);
      setTimeout(() => { setCopiedCode(null); setToast(false); }, 2000);
    });
  };

  return (
    <div style={{ background: "#f5f6fa", minHeight: "100vh", fontFamily: "'Segoe UI',-apple-system,sans-serif" }}>
      <div style={{ padding: isMobile ? "20px 16px" : "36px 40px" }}>

        {/* Title */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: isMobile ? "22px" : "24px", fontWeight: "700", color: "#111", margin: "0 0 3px" }}>Referrers</h1>
          <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>Manage customers and their auto-generated referral codes</p>
        </div>

        {/* Info card */}
        <div style={{ background: "#f0f7ff", border: "1px solid #dbeafe", borderRadius: "13px", padding: isMobile ? "16px" : "20px 24px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "12px" }}>
            <IcUsers s={18} c="#3b82f6" />
            <h2 style={{ fontSize: "14px", fontWeight: "700", color: "#2563eb", margin: 0 }}>Referrer Management</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {[
              "Every new customer automatically gets a unique referral code when they sign up on the ecommerce platform",
              "They share their code with friends → friends get a discount when using it",
              <span key="b"><strong>You generate and distribute coupon rewards</strong> to referrers for successful referrals</span>,
              "Track each referrer's performance and manually create their reward coupons",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", fontSize: "13px", color: "#374151" }}>
                <span style={{ color: "#10b981", fontWeight: "700", flexShrink: 0 }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: "12px", marginBottom: "20px" }}>
          {[
            { label: "Total Referrers", value: "6", sub: "5 active", subC: "#4b9ce2", icon: <IcUsers s={20} c="#4b9ce2" />, bg: "#eff6ff" },
            { label: "Total Referrals", value: "128", sub: "100% conversion", subC: "#10b981", icon: <IcTrendUp s={20} c="#f87171" />, bg: "#fff1f2" },
            { label: "Rewards Distributed", value: "$790.00", sub: "In coupon value", subC: "#6b7280", icon: <IcGift s={20} c="#10b981" />, bg: "#ecfdf5" },
            { label: "Avg. Referrals", value: "25.6", sub: "Per active user", subC: "#6b7280", icon: <IcUserMinus s={20} c="#f97316" />, bg: "#fff7ed" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "13px", padding: "16px 14px", border: "1px solid #eef0f3", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "10px" }}>{s.label}</div>
                <div style={{ fontSize: isMobile ? "22px" : "26px", fontWeight: "700", color: "#111", marginBottom: "3px" }}>{s.value}</div>
                <div style={{ fontSize: "11px", color: s.subC, fontWeight: "500" }}>{s.sub}</div>
              </div>
              <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.icon}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ background: "#fff", borderRadius: "13px", border: "1px solid #eef0f3", padding: isMobile ? "16px" : "22px 26px" }}>
          {/* Table Header */}
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", gap: "12px", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#111", margin: 0 }}>All Referrers</h3>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 13px", background: "#fff" }}>
                <IcSearch />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, or code..."
                  style={{ border: "none", outline: "none", fontSize: "13px", color: "#374151", width: isMobile ? "100%" : "200px", background: "transparent", minWidth: 0 }} />
              </div>
              <div style={{ position: "relative" }}>
                <button onClick={() => setShowDropdown(!showDropdown)}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", gap: "7px", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "8px 13px", background: "#fff", cursor: "pointer", fontSize: "13px", color: "#374151", fontWeight: "500", width: isMobile ? "100%" : "auto" }}>
                  {statusFilter} <IcChevronDown />
                </button>
                {showDropdown && (
                  <>
                    <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => setShowDropdown(false)} />
                    <div style={{ position: "absolute", top: "calc(100% + 5px)", right: 0, left: isMobile ? 0 : "auto", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", boxShadow: "0 8px 28px rgba(0,0,0,0.1)", zIndex: 100, minWidth: "152px", overflow: "hidden" }}>
                      {["All Status", "Active", "Inactive"].map(opt => (
                        <DropdownItem key={opt} opt={opt} selected={statusFilter === opt} onClick={() => { setStatusFilter(opt); setShowDropdown(false); }} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile: Cards / Desktop: Table */}
          {isMobile ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {filtered.map(r => (
                <div key={r.id} style={{ border: "1px solid #f3f4f6", borderRadius: "12px", padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: "700", color: "#111" }}>{r.name}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}><IcMail s={11} />{r.email}</div>
                    </div>
                    <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", background: r.status === "active" ? "#10b981" : "#6b7280", color: "#fff" }}>{r.status}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span style={{ background: "#fff1e6", color: "#f59e0b", fontWeight: "700", fontSize: "12px", padding: "3px 9px", borderRadius: "6px" }}>{r.code}</span>
                    <button onClick={() => handleCopy(r.code)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                      <IcCopy c={copiedCode === r.code ? "#10b981" : "#9ca3af"} s={14} />
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "13px" }}>
                    <div>
                      <div style={{ color: "#9ca3af", fontSize: "11px", marginBottom: "2px" }}>Total Referrals</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <span style={{ fontSize: "18px", fontWeight: "700", color: "#111" }}>{r.totalReferrals}</span>
                        {r.totalReferrals > 20 && <IcTrendUp s={13} c="#10b981" />}
                      </div>
                    </div>
                    <div>
                      <div style={{ color: "#9ca3af", fontSize: "11px", marginBottom: "2px" }}>Rewards Earned</div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#10b981" }}>${r.rewardsEarned.toFixed(2)}</div>
                    </div>
                    <div>
                      <div style={{ color: "#9ca3af", fontSize: "11px", marginBottom: "2px" }}>Coupons</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#374151" }}><IcGift s={13} c="#f59e0b" />{r.availableCoupons}</div>
                    </div>
                    <div>
                      <div style={{ color: "#9ca3af", fontSize: "11px", marginBottom: "2px" }}>Last Referral</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6b7280" }}><IcCalendar s={11} />{r.lastReferral}</div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedReferrer(r)} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "none", border: "1px solid #fde68a", borderRadius: "7px", padding: "7px 14px", cursor: "pointer", color: "#f59e0b", fontSize: "13px", fontWeight: "600", marginTop: "12px", width: "100%", justifyContent: "center" }}>
                    <IcExtLink c="#f59e0b" s={14} /> View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "750px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
                    {["Referrer", "Referral Code", "Total Referrals", "Rewards Earned", "Available Coupons", "Last Referral", "Status", "Actions"].map(h => (
                      <th key={h} style={{ textAlign: "left", fontSize: "13px", color: "#374151", fontWeight: "500", padding: "14px 12px", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => (
                    <tr key={r.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "16px 12px" }}>
                        <div style={{ fontSize: "15px", fontWeight: "600", color: "#111" }}>{r.name}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#9ca3af", marginTop: "3px" }}><IcMail s={12} />{r.email}</div>
                      </td>
                      <td style={{ padding: "16px 12px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ background: "#fff1e6", color: "#f59e0b", fontWeight: "700", fontSize: "13px", padding: "4px 10px", borderRadius: "6px", letterSpacing: "0.3px" }}>{r.code}</span>
                          <button onClick={() => handleCopy(r.code)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                            <IcCopy c={copiedCode === r.code ? "#10b981" : "#9ca3af"} s={15} />
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: "16px 12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ fontSize: "22px", fontWeight: "700", color: "#111" }}>{r.totalReferrals}</span>
                          {r.totalReferrals > 20 && <IcTrendUp s={16} c="#10b981" />}
                        </div>
                      </td>
                      <td style={{ padding: "16px 12px", fontSize: "14px", color: "#10b981", fontWeight: "600" }}>${r.rewardsEarned.toFixed(2)}</td>
                      <td style={{ padding: "16px 12px" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#374151" }}><IcGift s={15} c="#f59e0b" />{r.availableCoupons}</span></td>
                      <td style={{ padding: "16px 12px" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "13px", color: "#6b7280" }}><IcCalendar s={13} />{r.lastReferral}</span></td>
                      <td style={{ padding: "16px 12px" }}>
                        <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", background: r.status === "active" ? "#10b981" : "#6b7280", color: "#fff" }}>{r.status}</span>
                      </td>
                      <td style={{ padding: "16px 12px" }}>
                        <button onClick={() => setSelectedReferrer(r)} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "none", border: "none", cursor: "pointer", color: "#f59e0b", fontSize: "13px", fontWeight: "600" }}>
                          <IcExtLink c="#f59e0b" s={15} /> View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: "32px", right: "32px", display: "flex", alignItems: "center", gap: "10px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "13px 20px", boxShadow: "0 8px 28px rgba(0,0,0,0.13)", zIndex: 9999 }}>
          <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span style={{ fontSize: "14px", fontWeight: "500", color: "#111" }}>Referral code copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}