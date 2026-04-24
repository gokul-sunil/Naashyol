import { useState } from "react";
import {
  ArrowLeft, User, Truck, CreditCard, Package, Pencil, X, Check, ChevronDown
} from "lucide-react";

/* ══════════════════════════════════════
   STYLES
══════════════════════════════════════ */
const STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .od-page {
    font-family: 'Segoe UI', system-ui, sans-serif;
    background: #f5f5f5;
    min-height: 100vh;
    padding: 0;
  }

  /* ── top nav bar ── */
  .od-nav {
    background: #f5f5f5;
    padding: 16px 32px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
  }
  .od-back {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 14px; color: #374151; background: none; border: none;
    cursor: pointer; font-family: inherit; font-weight: 500;
  }
  .od-back:hover { color: #111; }

  /* ── body ── */
  .od-body { padding: 28px 32px; }

  /* ── header ── */
  .od-header {
    display: flex; justify-content: space-between;
    align-items: flex-start; margin-bottom: 24px;
  }
  .od-title { font-size: 30px; font-weight: 800; color: #111; letter-spacing: -0.5px; }
  .od-date  { font-size: 14px; color: #6b7280; margin-top: 5px; }

  /* ── delivery status badge in header ── */
  .od-status-badge {
    display: inline-flex; align-items: center;
    padding: 6px 16px; border-radius: 20px;
    font-size: 13px; font-weight: 700; white-space: nowrap;
    margin-top: 4px;
  }
  .od-badge-shipped    { background: #3b82f6; color: #fff; }
  .od-badge-delivered  { background: #10b981; color: #fff; }
  .od-badge-processing { background: #f97316; color: #fff; }
  .od-badge-pending    { background: #f97316; color: #fff; }
  .od-badge-cancelled  { background: #6b7280; color: #fff; }

  /* ── 2-col layout ── */
  .od-grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 20px;
    align-items: start;
  }

  /* ── cards ── */
  .od-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    overflow: hidden;
  }
  .od-card-hdr {
    display: flex; justify-content: space-between; align-items: center;
    padding: 18px 22px; border-bottom: 1px solid #f0f0f0;
  }
  .od-card-hdr-left { display: flex; align-items: center; gap: 10px; }
  .od-card-hdr-title { font-size: 15px; font-weight: 700; color: #111; }
  .od-card-body { padding: 8px 22px 16px; }

  /* ══════════════════════════════════════
     ORDER ITEMS
  ══════════════════════════════════════ */
  .od-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid #f3f4f6;
  }
  .od-item:last-child { border-bottom: none; }

  .od-item-thumb {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    flex-shrink: 0;
    border: 1px solid #e5e7eb;
  }

  .od-item-info { flex: 1; min-width: 0; }
  .od-item-name {
    font-size: 14px; font-weight: 600; color: #111;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .od-item-qty  { font-size: 13px; color: #9ca3af; margin-top: 3px; }
  .od-item-price {
    font-size: 15px; font-weight: 700; color: #111;
    flex-shrink: 0; margin-left: 8px;
  }

  /* ── customer card ── */
  .od-cust-name  { font-size: 15px; font-weight: 700; color: #111; }

  /* ── delivery card ── */
  .od-edit-btn {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; color: #374151; background: none;
    border: 1px solid #e5e7eb; border-radius: 8px;
    padding: 6px 12px; cursor: pointer; font-family: inherit; font-weight: 500;
  }
  .od-edit-btn:hover { background: #f3f4f6; }

  /* ── Image 2 style: stacked delivery rows ── */
  .od-del-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 0;
    border-bottom: 1px solid #f3f4f6;
  }
  .od-del-row:last-child { border-bottom: none; }
  .od-del-label { font-size: 13px; color: #9ca3af; }
  .od-del-value { font-size: 14px; font-weight: 700; color: #111; }
  .od-del-tracking { font-size: 14px; font-weight: 700; color: #f97316; }

  /* delivery status mini badge */
  .od-del-badge {
    display: inline-flex; align-items: center;
    padding: 4px 14px; border-radius: 20px;
    font-size: 12px; font-weight: 700;
    align-self: flex-start;
  }

  /* ── payment card ── */
  .od-pay-row {
    display: flex; justify-content: space-between;
    align-items: center; padding: 8px 0;
  }
  .od-pay-total {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px 0 0; border-top: 1px solid #f0f0f0; margin-top: 8px;
  }

  /* ══════════════════════════════════════
     UPDATE DELIVERY MODAL
  ══════════════════════════════════════ */
  .od-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.45);
    display: flex; align-items: center; justify-content: center;
    z-index: 100; padding: 16px;
  }
  .od-modal {
    background: #fff; border-radius: 20px; padding: 32px;
    width: 100%; max-width: 500px;
    box-shadow: 0 24px 60px rgba(0,0,0,0.18);
    max-height: 90vh; overflow-y: auto;
  }
  .od-modal-hdr  { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px; }
  .od-modal-title{ font-size: 22px; font-weight: 800; color: #111; line-height: 1.2; }
  .od-modal-div  { border: none; border-top: 1px solid #f0f0f0; margin: 18px 0; }
  .od-modal-body { display: flex; flex-direction: column; gap: 16px; }
  .od-modal-foot { display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; }
  .od-lbl { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #374151; }

  .od-inp {
    width: 100%; border: 1px solid #e5e7eb; border-radius: 10px;
    padding: 11px 14px; font-size: 14px; outline: none;
    font-family: inherit; background: #fff; color: #111;
  }
  .od-inp:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.1); }

  .od-date-wrap { position: relative; }
  .od-date-inp {
    width: 100%; border: 1px solid #e5e7eb; border-radius: 10px;
    padding: 11px 44px 11px 14px; font-size: 14px; outline: none;
    font-family: inherit; background: #fff; color: #111;
  }
  .od-date-inp:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.1); }
  .od-date-icon {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    color: #9ca3af; display: flex; align-items: center; pointer-events: none;
  }

  .od-sel-wrap { position: relative; }
  .od-sel-btn {
    width: 100%; border: 1px solid #e5e7eb; border-radius: 10px;
    padding: 11px 44px 11px 14px; font-size: 14px;
    font-family: inherit; background: #fff; color: #111;
    cursor: pointer; text-align: left; outline: none;
    display: flex; justify-content: space-between; align-items: center;
  }
  .od-sel-btn:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.1); }
  .od-sel-chevron { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; display: flex; }
  .od-sel-menu {
    position: absolute; left: 0; right: 0; top: calc(100% + 5px);
    background: #fff; border: 1px solid #e5e7eb; border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1); z-index: 200; padding: 5px;
  }
  .od-sel-opt {
    display: flex; align-items: center; justify-content: space-between;
    padding: 9px 14px; border-radius: 8px; cursor: pointer;
    font-size: 14px; color: #374151;
  }
  .od-sel-opt:hover { background: #fff7ed; }
  .od-sel-opt.sel  { background: #fff7ed; font-weight: 600; color: #111; }
  .od-sel-check { color: #f97316; display: flex; align-items: center; }

  .od-btn-cancel {
    background: #fff; border: 1px solid #e5e7eb; border-radius: 10px;
    padding: 10px 22px; cursor: pointer; font-weight: 600;
    font-size: 14px; font-family: inherit; color: #374151;
  }
  .od-btn-cancel:hover { background: #f9fafb; }
  .od-btn-save {
    background: #f97316; color: #fff; border: none; border-radius: 10px;
    padding: 10px 22px; cursor: pointer; font-weight: 700;
    font-size: 14px; font-family: inherit;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .od-btn-save:hover { background: #ea6a0a; }
  .od-cls {
    background: none; border: none; cursor: pointer; color: #9ca3af;
    padding: 2px; display: inline-flex; flex-shrink: 0; margin-left: 8px;
  }
  .od-cls:hover { color: #374151; }

  /* ══ RESPONSIVE ══ */
  @media(max-width: 900px) {
    .od-grid { grid-template-columns: 1fr; }
  }
  @media(max-width: 600px) {
    .od-nav   { padding: 12px 16px; }
    .od-body  { padding: 14px; }
    .od-title { font-size: 22px; }
    .od-header { flex-wrap: wrap; gap: 8px; }
    .od-card-hdr { padding: 14px 16px; }
    .od-card-body { padding: 6px 16px 14px; }
    .od-item { gap: 12px; padding: 14px 0; }
    .od-item-thumb { width: 50px; height: 50px; font-size: 22px; }
    .od-item-name { font-size: 13px; }
    .od-modal { padding: 20px; }
    .od-modal-title { font-size: 19px; }
    .od-modal-foot { flex-direction: column; }
    .od-modal-foot .od-btn-cancel,
    .od-modal-foot .od-btn-save { width: 100%; justify-content: center; }
  }
`;

/* ── SelectField ── */
function SelectField({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <label className="od-lbl">{label}</label>
      <div className="od-sel-wrap">
        <button className="od-sel-btn" onClick={() => setOpen(o => !o)} type="button">
          <span>{value}</span>
        </button>
        <span className="od-sel-chevron"><ChevronDown size={16} /></span>
        {open && (
          <div className="od-sel-menu">
            {options.map(opt => (
              <div key={opt}
                className={`od-sel-opt ${value === opt ? "sel" : ""}`}
                onClick={() => { onChange(opt); setOpen(false); }}>
                <span>{opt}</span>
                {value === opt && <span className="od-sel-check"><Check size={14} /></span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── DeliveryBadge ── */
function DeliveryBadge({ status }) {
  const cls = {
    Shipped:    "od-del-badge od-badge-shipped",
    Delivered:  "od-del-badge od-badge-delivered",
    Processing: "od-del-badge od-badge-processing",
    Pending:    "od-del-badge od-badge-pending",
    Cancelled:  "od-del-badge od-badge-cancelled",
  };
  return <span className={cls[status] || "od-del-badge"}>{status}</span>;
}

/* ── UpdateDeliveryModal ── */
function UpdateDeliveryModal({ order, onClose, onSave }) {
  const [form, setForm] = useState({
    status:            order.tracking.status || "Pending",
    carrier:           order.tracking.carrier || "",
    trackingNo:        order.tracking.trackingNo || "",
    estimatedDelivery: order.tracking.estimatedDelivery || "",
  });
  const s = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="od-overlay" onClick={onClose}>
      <div className="od-modal" onClick={e => e.stopPropagation()}>
        <div className="od-modal-hdr">
          <div>
            <div className="od-modal-title">Update Delivery Information</div>
            <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 6 }}>
              Update delivery status and tracking details for this order
            </div>
          </div>
          <button className="od-cls" onClick={onClose}><X size={20} /></button>
        </div>
        <hr className="od-modal-div" />
        <div className="od-modal-body">
          <SelectField
            label="Delivery Status *"
            value={form.status}
            onChange={v => s("status", v)}
            options={["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]}
          />
          <SelectField
            label="Carrier"
            value={form.carrier || "Select carrier"}
            onChange={v => s("carrier", v)}
            options={["FedEx", "UPS", "DHL", "USPS", "Other"]}
          />
          <div>
            <label className="od-lbl">Tracking Number</label>
            <input value={form.trackingNo}
              onChange={e => s("trackingNo", e.target.value)}
              placeholder="FDX1234567890"
              className="od-inp" />
          </div>
          <div>
            <label className="od-lbl">Estimated Delivery</label>
            <div className="od-date-wrap">
              <input value={form.estimatedDelivery}
                onChange={e => s("estimatedDelivery", e.target.value)}
                placeholder="DD/MM/YYYY"
                className="od-date-inp" />
              <span className="od-date-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="od-modal-foot">
          <button className="od-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="od-btn-save" onClick={() => { onSave(form); onClose(); }}>
            <Check size={15} /> Update Delivery
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ORDER DETAIL PAGE
══════════════════════════════════════ */
export default function OrderDetail({ order: orderProp, onBack }) {

  const demo = {
    id: "ORD-2024-001",
    customer: "John Smith",
    email: "john.smith@email.com",
    date: "Feb 17, 2026",
    delivery: "shipped",
    amount: 129.99,
    tax: 13.00,
    products: [
      { name: "Wireless Bluetooth Headphones", qty: 1, price: 129.99, img: "🎧" },
    ],
    tracking: {
      status: "Shipped",
      carrier: "FedEx",
      trackingNo: "FDX1234567890",
      estimatedDelivery: "2026-02-21",
    },
  };

  const [order, setOrder]     = useState(orderProp || demo);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (data) => {
    setOrder(prev => ({
      ...prev,
      delivery: data.status.toLowerCase(),
      tracking: { ...prev.tracking, ...data },
    }));
  };

  const headerBadgeCls = {
    shipped:    "od-status-badge od-badge-shipped",
    delivered:  "od-status-badge od-badge-delivered",
    processing: "od-status-badge od-badge-processing",
    pending:    "od-status-badge od-badge-pending",
    cancelled:  "od-status-badge od-badge-cancelled",
  }[order.delivery] || "od-status-badge";

  const subtotal = order.products.reduce((sum, p) => sum + p.price * p.qty, 0);
  const tax      = order.tax || 0;
  const total    = subtotal + tax;

  return (
    <div className="od-page">
      <style>{STYLES}</style>

      {/* ── NAV ── */}
      <div className="od-nav">
        <button className="od-back" onClick={onBack || (() => window.history.back())}>
          <ArrowLeft size={16} /> Back to Orders
        </button>
      </div>

      <div className="od-body">
        {/* ── PAGE HEADER ── */}
        <div className="od-header">
          <div>
            <h1 className="od-title">Order #{order.id}</h1>
            <p className="od-date">Order placed on {order.date}</p>
          </div>
         <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
  Shipped
</span>
        </div>

        {/* ── 2-COL GRID ── */}
        <div className="od-grid">

          {/* ── LEFT — Order Items ── */}
          <div className="od-card">
            <div className="od-card-hdr">
              <div className="od-card-hdr-left">
                <Package size={17} color="#6b7280" />
                <span className="od-card-hdr-title">Order Items</span>
              </div>
            </div>
            <div className="od-card-body">
              {order.products.map((p, i) => (
                <div key={i} className="od-item">
                  <div className="od-item-thumb">{p.img}</div>
                  <div className="od-item-info">
                    <div className="od-item-name">{p.name}</div>
                    <div className="od-item-qty">Quantity: {p.qty}</div>
                  </div>
                  <div className="od-item-price">${p.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT col ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Customer */}
            <div className="od-card">
              <div className="od-card-hdr">
                <div className="od-card-hdr-left">
                  <User size={17} color="#6b7280" />
                  <span className="od-card-hdr-title">Customer</span>
                </div>
              </div>
              <div className="od-card-body">
                <div className="od-cust-name">{order.customer}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{order.email}</div>
              </div>
            </div>

            {/* Delivery  */}
            <div className="od-card">
              <div className="od-card-hdr">
                <div className="od-card-hdr-left">
                  <Truck size={17} color="#6b7280" />
                  <span className="od-card-hdr-title">Delivery</span>
                </div>
                <button className="od-edit-btn" onClick={() => setShowModal(true)}>
                  <Pencil size={13} /> Edit
                </button>
              </div>
              <div className="od-card-body">
                {/* Status — badge below label */}
                <div className="od-del-row">
                  <span className="od-del-label">Status</span>
                  <DeliveryBadge status={order.tracking.status = "Shipped"} />
                </div>
                {/* Carrier */}
                <div className="od-del-row">
                  <span className="od-del-label">Carrier</span>
                  <span className="od-del-value">{order.tracking.carrier || "—"}</span>
                </div>
                {/* Tracking Number */}
                <div className="od-del-row">
                  <span className="od-del-label">Tracking Number</span>
                  <span className="od-del-tracking">{order.tracking.trackingNo || "—"}</span>
                </div>
                {/* Estimated Delivery */}
                <div className="od-del-row">
                  <span className="od-del-label">Estimated Delivery</span>
                  <span className="od-del-value">{order.tracking.estimatedDelivery || "—"}</span>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="od-card">
              <div className="od-card-hdr">
                <div className="od-card-hdr-left">
                  <CreditCard size={17} color="#6b7280" />
                  <span className="od-card-hdr-title">Payment</span>
                </div>
              </div>
              <div className="od-card-body">
                <div className="od-pay-row">
                  <span style={{ fontSize: 14, color: "#6b7280" }}>Subtotal:</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>
  $1249.99
</span>
                </div>
                <div className="od-pay-row">
                  <span style={{ fontSize: 14, color: "#6b7280" }}>Tax:</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>
  $125.00
</span>
                </div>
                <div className="od-pay-total">
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>Total:</span>
                 <span style={{ fontSize: 18, fontWeight: 800, color: "#f97316" }}>
  $1374.99
</span>
                </div>
              </div>
            </div>

          </div>{/* end right col */}
        </div>{/* end grid */}
      </div>{/* end body */}

      {/* ── MODAL ── */}
      {showModal && (
        <UpdateDeliveryModal
          order={order}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}