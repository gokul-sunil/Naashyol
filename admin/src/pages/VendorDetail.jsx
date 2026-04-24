import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TrendingUp, Download, Pencil, Star, Package, DollarSign,
  Phone, Calendar, MapPin, Mail, CheckCircle, AlertCircle,
  Eye, Trash2, Plus, CreditCard, Upload, FileText, Menu, X
} from "lucide-react";

/* ─────────────────────────── static data ─────────────────────────── */
const initialProducts = [
  { id: 1, name: "Wireless Bluetooth Headphones", sku: "WBH-001", category: "Electronics", price: 89.99, stock: 45, sold: 234, total: "$21,057.66", hasPay: false, paidAmount: 0 },
  { id: 2, name: "Smart Watch Series 5",          sku: "SWS-005", category: "Electronics", price: 299.99, stock: 23, sold: 156, total: "$46,798.44", hasPay: true,  paidAmount: 10000 },
  { id: 3, name: "USB-C Fast Charger",             sku: "UFC-020", category: "Accessories", price: 24.99,  stock: 120, sold: 567, total: "$14,169.33", hasPay: false, paidAmount: 0 },
  { id: 4, name: "Laptop Stand Aluminum",          sku: "LSA-102", category: "Accessories", price: 45.00,  stock: 0,   sold: 89,  total: "$4,005.00",  hasPay: true,  paidAmount: 0 },
  { id: 5, name: "4K Webcam Pro",                  sku: "WCP-450", category: "Electronics", price: 129.99, stock: 18,  sold: 145, total: "$18,848.55", hasPay: true,  paidAmount: 5000 },
];

const paymentHistory = [
  { id: "TXN-2026-02-001", date: "2026-02-20", total: "$12,450.00", paid: "$12,450.00", balance: "-",        method: "Bank Transfer", orders: 45, status: "Paid" },
  { id: "TXN-2026-02-002", date: "2026-02-15", total: "$8,920.50",  paid: "$8,920.50",  balance: "-",        method: "Bank Transfer", orders: 38, status: "Paid" },
  { id: "TXN-2026-02-003", date: "2026-02-10", total: "$6,780.25",  paid: "$4,000.00",  balance: "$2,780.25",method: "Bank Transfer", orders: 29, status: "Partially Paid" },
  { id: "TXN-2026-02-004", date: "2026-02-05", total: "$5,420.00",  paid: "$0.00",      balance: "$5,420.00",method: "Bank Transfer", orders: 22, status: "Pending" },
];

const businessDocuments = [
  { name: "Business_License_2025.pdf",    category: "License", type: "PDF", size: "2.4 MB", date: "2025-01-15" },
  { name: "Tax_Certificate.pdf",          category: "Tax",     type: "PDF", size: "1.2 MB", date: "2025-01-16" },
  { name: "Bank_Statement_Jan2025.pdf",   category: "Banking", type: "PDF", size: "3.8 MB", date: "2026-01-20" },
];

const categoryColors = {
  License: { bg: "#dbeafe", color: "#1d4ed8" },
  Tax:     { bg: "#fef9c3", color: "#a16207" },
  Banking: { bg: "#fce7f3", color: "#be185d" },
};
const statusStyle = {
  "Paid":           { bg: "#dcfce7", color: "#15803d" },
  "Partially Paid": { bg: "#ffedd5", color: "#c2410c" },
  "Pending":        { bg: "#fee2e2", color: "#b91c1c" },
};

/* ─────────────────────────── Mobile Responsive CSS ─────────────────────────── */
const STYLES = `
  *{box-sizing:border-box;margin:0;padding:0;}
  .vd2-page{font-family:'Segoe UI',system-ui,sans-serif;background:#f8f8f8;min-height:100vh;}

  /* nav */
  .vd2-nav{background:#fff;border-bottom:1px solid #e5e7eb;padding:12px 24px;
    display:flex;align-items:center;justify-content:space-between;
    position:sticky;top:0;z-index:10;flex-wrap:wrap;gap:10px;}
  .vd2-nav-actions{display:flex;gap:10px;flex-wrap:wrap;}

  /* body */
  .vd2-body{max-width:1080px;margin:0 auto;padding:24px;display:flex;flex-direction:column;gap:20px;}

  /* vendor card */
  .vd2-info-meta{display:grid;grid-template-columns:1fr 1fr;gap:4px 32px;}
  .vd2-info-stats{display:flex;align-items:center;gap:20px;flex-wrap:wrap;}

  /* stat grid */
  .vd2-stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}

  /* tabs */
  .vd2-tabs{display:flex;gap:4px;background:#fff;border-radius:12px;
    border:1px solid #e5e7eb;padding:4px;width:fit-content;flex-wrap:wrap;}

  /* table wrapper — horizontal scroll on mobile */
  .vd2-tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:0 -20px;padding:0 20px;}
  .vd2-tbl{width:100%;border-collapse:collapse;min-width:600px;}
  .vd2-th{text-align:left;padding:12px 16px;font-size:12px;color:#9ca3af;font-weight:600;border-bottom:1px solid #f3f4f6;}
  .vd2-td{padding:14px 16px;font-size:13px;}
  .vd2-tr{border-bottom:1px solid #f9fafb;}
  .vd2-tr:last-child{border-bottom:none;}
  .vd2-tr:hover{background:#fafafa;}

  /* business grid */
  .vd2-biz-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}

  /* modal */
  .vd2-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.4);
    display:flex;align-items:center;justify-content:center;z-index:1000;padding:16px;}
  .vd2-modal{background:#fff;border-radius:20px;padding:28px;width:100%;
    max-width:500px;box-shadow:0 24px 60px rgba(0,0,0,0.18);
    max-height:90vh;overflow-y:auto;}
  .vd2-modal-sm{max-width:380px;}
  .vd2-modal-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

  /* form */
  .vd2-inp{width:100%;border:1px solid #e5e7eb;border-radius:10px;
    padding:12px 14px;font-size:14px;outline:none;font-family:inherit;background:#fff;}
  .vd2-inp:focus{border-color:#f97316;box-shadow:0 0 0 3px rgba(249,115,22,0.15);}
  .vd2-inp-hi{border-color:#f97316;box-shadow:0 0 0 3px rgba(249,115,22,0.15);}
  .vd2-inp-disabled{background:#f9fafb;color:#6b7280;cursor:default;}
  .vd2-lbl{display:block;margin-bottom:5px;font-size:13px;font-weight:600;color:#374151;}
  .vd2-select{width:100%;border:1px solid #e5e7eb;border-radius:10px;
    padding:12px 14px;font-size:14px;outline:none;font-family:inherit;
    background:#fff;cursor:pointer;}
  .vd2-select:focus{border-color:#f97316;box-shadow:0 0 0 3px rgba(249,115,22,0.15);}

  /* btn */
  .vd2-btn-ghost{background:#fff;border:1px solid #e5e7eb;border-radius:10px;
    padding:10px 16px;cursor:pointer;font-weight:500;font-size:13px;
    display:flex;align-items:center;gap:6px;font-family:inherit;color:#374151;}
  .vd2-btn-ghost:hover{background:#f9fafb;}
  .vd2-btn-primary{background:#f97316;color:#fff;border:none;border-radius:10px;
    padding:10px 16px;cursor:pointer;font-weight:700;font-size:13px;
    display:flex;align-items:center;gap:6px;font-family:inherit;}
  .vd2-btn-primary:hover{background:#ea6a0a;}
  .vd2-btn-cancel{background:#fff;border:1px solid #e5e7eb;border-radius:10px;
    padding:12px 20px;cursor:pointer;font-weight:600;font-size:14px;font-family:inherit;}
  .vd2-btn-cancel:hover{background:#f9fafb;}
  .vd2-btn-save{background:#f97316;color:#fff;border:none;border-radius:10px;
    padding:12px 20px;cursor:pointer;font-weight:700;font-size:14px;font-family:inherit;}
  .vd2-btn-save:hover{background:#ea6a0a;}
  .vd2-btn-save:disabled{opacity:0.5;cursor:not-allowed;}

  /* Mobile Action Menu */
  .vd2-mobile-menu-btn{display:none;}
  .vd2-mobile-action-menu{display:none;}

  /* ═══════════ MOBILE FIRST RESPONSIVE ═══════════ */
  @media(max-width:768px){
    .vd2-nav{padding:12px 16px;}
    .vd2-nav-actions{width:100%;}
    .vd2-nav-actions button{flex:1;justify-content:center;}
    .vd2-body{padding:16px;}
    
    /* Vendor Info */
    .vd2-info-meta{grid-template-columns:1fr;gap:8px;}
    .vd2-info-stats{gap:12px;}
    .vd2-info-stats span{display:none;}
    
    /* Stat Cards */
    .vd2-stat-grid{grid-template-columns:1fr;gap:12px;}
    
    /* Tabs */
    .vd2-tabs{width:100%;}
    .vd2-tabs button{flex:1;text-align:center;padding:10px 8px;font-size:12px;}
    
    /* Business Grid */
    .vd2-biz-grid{grid-template-columns:1fr;gap:16px;}
    
    /* Modals */
    .vd2-modal{padding:20px;max-height:85vh;}
    .vd2-modal-grid{grid-template-columns:1fr;gap:12px;}
    .vd2-modal-footer{flex-direction:column;}
    .vd2-modal-footer button{width:100%;}
    
    /* Vendor Hero */
    .vd2-vendor-hero{flex-direction:column;align-items:flex-start !important;}
    .vd2-vendor-hero > div:first-child{margin-bottom:8px;}
    
    /* Mobile Action Menu - Show on Mobile */
    .vd2-mobile-menu-btn{
      display:flex;
      position:fixed;
      bottom:20px;
      right:20px;
      width:56px;
      height:56px;
      border-radius:28px;
      background:#f97316;
      color:#fff;
      border:none;
      align-items:center;
      justify-content:center;
      box-shadow:0 4px 12px rgba(249,115,22,0.4);
      z-index:100;
      cursor:pointer;
    }
    
    .vd2-mobile-action-menu{
      display:block;
      position:fixed;
      bottom:90px;
      right:20px;
      background:#fff;
      border-radius:16px;
      box-shadow:0 4px 20px rgba(0,0,0,0.15);
      padding:8px;
      z-index:101;
      min-width:200px;
    }
    
    .vd2-mobile-action-menu button{
      display:flex;
      align-items:center;
      gap:12px;
      width:100%;
      padding:14px 16px;
      border:none;
      background:none;
      text-align:left;
      font-size:14px;
      font-weight:500;
      color:#374151;
      border-radius:10px;
      cursor:pointer;
    }
    
    .vd2-mobile-action-menu button:hover,
    .vd2-mobile-action-menu button:active{
      background:#f3f4f6;
    }
    
    .vd2-mobile-action-menu hr{
      margin:8px 0;
      border:none;
      border-top:1px solid #e5e7eb;
    }

    /* Hide desktop actions on mobile */
    .vd2-desktop-actions{display:none !important;}
  }

  @media(min-width:480px) and (max-width:768px){
    .vd2-stat-grid{grid-template-columns:1fr 1fr;}
  }

  @media(min-width:769px){
    .vd2-mobile-menu-btn{display:none !important;}
    .vd2-mobile-action-menu{display:none !important;}
  }
`;

/* ─────────────────────────── helpers ─────────────────────────── */
function Badge({ label, bg, color, border }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", padding: "4px 12px",
      borderRadius: 20, fontSize: 11, fontWeight: 600,
      background: bg, color, border: border ? `1px solid ${color}` : "none",
      whiteSpace: "nowrap"
    }}>{label}</span>
  );
}

function IconBtn({ icon, color, onClick, title }) {
  return (
    <button title={title} onClick={onClick}
      style={{ background: "none", border: "none", cursor: "pointer", color: color || "#9ca3af", padding: "8px", display: "flex", alignItems: "center", borderRadius: 6 }}
      onMouseEnter={e => e.currentTarget.style.background = "#f3f4f6"}
      onMouseLeave={e => e.currentTarget.style.background = "none"}>
      {icon}
    </button>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="vd2-lbl">{label}</label>
      {children}
    </div>
  );
}

/* ─────────────────────────── Modals ─────────────────────────── */

/** Image 1 — Edit Product modal */
function EditProductModal({ product, vendorName, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product.name, sku: product.sku, category: product.category,
    price: product.price, stock: product.stock,
    paidAmount: product.paidAmount || "", description: product.description || ""
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.name && form.sku && form.category && form.price !== "" && form.stock !== "";

  return (
    <div className="vd2-overlay" onClick={onClose}>
      <div className="vd2-modal" onClick={e => e.stopPropagation()}>
        {/* header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#111" }}>Edit Product</h2>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "#9ca3af" }}>Edit product details for {vendorName}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9ca3af", padding: "4px 8px" }}>✕</button>
        </div>
        <div style={{ borderTop: "1px solid #f3f4f6", margin: "16px 0" }} />

        {/* body */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <FormField label="Product Name *">
            <input value={form.name} onChange={e => set("name", e.target.value)}
              placeholder="Enter product name"
              className={`vd2-inp ${form.name ? "vd2-inp-hi" : ""}`} />
          </FormField>

          <div className="vd2-modal-grid">
            <FormField label="SKU *">
              <input value={form.sku} onChange={e => set("sku", e.target.value)}
                placeholder="e.g., WBH-001" className="vd2-inp" />
            </FormField>
            <FormField label="Category *">
              <select value={form.category} onChange={e => set("category", e.target.value)} className="vd2-select">
                <option value="">Select category</option>
                <option>Electronics</option><option>Accessories</option><option>Clothing</option><option>Other</option>
              </select>
            </FormField>
          </div>

          <div className="vd2-modal-grid">
            <FormField label="Price ($) *">
              <input value={form.price} onChange={e => set("price", e.target.value)}
                placeholder="e.g., 89.99" type="number" className="vd2-inp" />
            </FormField>
            <FormField label="Stock *">
              <input value={form.stock} onChange={e => set("stock", e.target.value)}
                placeholder="e.g., 100" type="number" className="vd2-inp" />
            </FormField>
          </div>

          <FormField label="Paid Amount ($)">
            <input value={form.paidAmount} onChange={e => set("paidAmount", e.target.value)}
              placeholder="e.g., 30.00" type="number" className="vd2-inp" />
          </FormField>

          <FormField label="Product Description">
            <textarea value={form.description} onChange={e => set("description", e.target.value)}
              placeholder="Enter product description (optional)" rows={3}
              className="vd2-inp" style={{ resize: "none" }} />
          </FormField>
        </div>

        {/* footer */}
        <div className="vd2-modal-footer" style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
          <button className="vd2-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="vd2-btn-save" disabled={!valid}
            onClick={() => { onSave({ ...product, ...form, price: parseFloat(form.price), stock: parseInt(form.stock) }); onClose(); }}>
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}

/** Image 2 — Add Payment modal */
function AddPaymentModal({ product, onClose, onSave }) {
  const totalAmount = (product.price * product.sold);
  const balance = totalAmount - (product.paidAmount || 0);
  const [payAmt, setPayAmt] = useState("");

  return (
    <div className="vd2-overlay" onClick={onClose}>
      <div className="vd2-modal vd2-modal-sm" onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#111" }}>Add Payment</h2>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "#9ca3af" }}>Add payment for "{product.name}"</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9ca3af", padding: "4px 8px" }}>✕</button>
        </div>
        <div style={{ borderTop: "1px solid #f3f4f6", margin: "16px 0" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <FormField label="Product Name">
            <input value={product.name} disabled className="vd2-inp vd2-inp-disabled" />
          </FormField>
          
          <div className="vd2-modal-grid">
            <FormField label="Paid Amount">
              <input value={`$${(product.paidAmount || 0).toFixed(2)}`} disabled className="vd2-inp vd2-inp-disabled" />
            </FormField>
            <FormField label="Balance">
              <input value={`$${balance.toFixed(2)}`} disabled className="vd2-inp vd2-inp-disabled" />
            </FormField>
          </div>
          
          <FormField label="Payment Amount *">
            <input value={payAmt} onChange={e => setPayAmt(e.target.value)}
              placeholder="Enter payment amount" type="number"
              className={`vd2-inp ${payAmt ? "vd2-inp-hi" : ""}`} />
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#9ca3af" }}>Enter the amount to pay for this product</p>
          </FormField>
        </div>

        <div className="vd2-modal-footer" style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
          <button className="vd2-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="vd2-btn-save" disabled={!payAmt}
            onClick={() => {
              const amt = parseFloat(payAmt);
              onSave({ ...product, paidAmount: (product.paidAmount || 0) + amt, hasPay: true });
              onClose();
            }}>
            Add Payment
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Main Component ─────────────────────────── */
export default function VendorDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const vendorData = location.state?.vendor;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const vendor = {
    name:         vendorData?.name    || "TechStore Pro",
    initial:      vendorData?.name?.charAt(0) || "T",
    owner:        vendorData?.owner   || "Robert Johnson",
    email:        vendorData?.email   || "robert@techstorepro.com",
    phone:        vendorData?.phone   || "+1 (555) 123-4567",
    address:      vendorData?.address || "123 Business St, San Francisco, CA 94103",
    joined:       "2025-01-15",
    rating:       4.8,
    reviews:      245,
    products:     vendorData?.products || 156,
    totalSales:   vendorData?.sales ? `$${vendorData.sales.toLocaleString()}` : "$125,000",
    verified:     vendorData?.status === "verified",
    status:       vendorData?.status  || "active",
  };

  const [activeTab,       setActiveTab]       = useState("products");
  const [vendorStatus,    setVendorStatus]     = useState(vendor.status);
  const [products,        setProducts]         = useState(initialProducts);
  const [docs,            setDocs]             = useState(businessDocuments);

  // modal states
  const [showStatusModal,  setShowStatusModal]  = useState(false);
  const [showAddProduct,   setShowAddProduct]   = useState(false);
  const [showEditProduct,  setShowEditProduct]  = useState(false);
  const [showPayment,      setShowPayment]      = useState(false);
  const [showUploadDoc,    setShowUploadDoc]    = useState(false);
  const [selectedProduct,  setSelectedProduct]  = useState(null);
  const [selectedStatus,   setSelectedStatus]   = useState(vendorStatus);
  const [uploadFile,       setUploadFile]       = useState(null);
  const [uploadCategory,   setUploadCategory]   = useState("");
  const [newProduct,       setNewProduct]       = useState({ name:"",sku:"",category:"",price:"",stock:"",paidAmount:"",description:"" });

  // handlers
  const handleUpdateStatus = () => { setVendorStatus(selectedStatus); setShowStatusModal(false); };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.sku || !newProduct.category || !newProduct.price || !newProduct.stock) return;
    setProducts(prev => [...prev, {
      id: Date.now(), name: newProduct.name, sku: newProduct.sku, category: newProduct.category,
      price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock),
      sold: 0, total: "$0.00", hasPay: false, paidAmount: 0,
    }]);
    setNewProduct({ name:"",sku:"",category:"",price:"",stock:"",paidAmount:"",description:"" });
    setShowAddProduct(false);
  };

  const handleEditSave = (updated) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handlePaymentSave = (updated) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleUpload = () => {
    if (!uploadFile || !uploadCategory) return;
    setDocs(prev => [...prev, {
      name: uploadFile.name, category: uploadCategory, type: "PDF",
      size: `${(uploadFile.size/1024/1024).toFixed(1)} MB`,
      date: new Date().toISOString().slice(0,10),
    }]);
    setUploadFile(null); setUploadCategory(""); setShowUploadDoc(false);
  };

  const activeCount   = products.filter(p => p.stock > 0).length;
  const inactiveCount = products.filter(p => p.stock === 0).length;

  const statusBadgeStyle = {
    verified:  { bg:"#10b981", color:"#fff" },
    active:    { bg:"#10b981", color:"#fff" },
    pending:   { bg:"#f59e0b", color:"#fff" },
    suspended: { bg:"#ef4444", color:"#fff" },
  }[vendorStatus] || { bg:"#9ca3af", color:"#fff" };

  return (
    <div className="vd2-page">
      <style>{STYLES}</style>

      {/* ── Top Nav ── */}
      <div className="vd2-nav">
        <button className="vd2-btn-ghost" onClick={() => navigate("/vendors")}>
          ← Back
        </button>
        <div className="vd2-nav-actions vd2-desktop-actions">
          <button className="vd2-btn-ghost" onClick={() => { setSelectedStatus(vendorStatus); setShowStatusModal(true); }}>
            <TrendingUp size={15} /> Change Status
          </button>
          <button className="vd2-btn-ghost"><Download size={15} /> Export</button>
          <button className="vd2-btn-primary"><Pencil size={15} /> Edit</button>
        </div>
      </div>

      {/* Mobile Action Button */}
      <button className="vd2-mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Action Menu */}
      {isMobileMenuOpen && (
        <div className="vd2-mobile-action-menu">
          <button onClick={() => { setSelectedStatus(vendorStatus); setShowStatusModal(true); setIsMobileMenuOpen(false); }}>
            <TrendingUp size={18} color="#f97316" /> Change Status
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); }}>
            <Download size={18} color="#6b7280" /> Export Report
          </button>
          <hr />
          <button onClick={() => { setShowAddProduct(true); setIsMobileMenuOpen(false); }}>
            <Plus size={18} color="#f97316" /> Add Product
          </button>
          <button onClick={() => { setShowUploadDoc(true); setIsMobileMenuOpen(false); }}>
            <Upload size={18} color="#f97316" /> Upload Document
          </button>
        </div>
      )}

      <div className="vd2-body">

        {/* ── Vendor Info Card ── */}
        <div style={{ background:"#fff", borderRadius:18, border:"1px solid #f0f0f0", boxShadow:"0 1px 6px rgba(0,0,0,0.06)", padding:"20px" }}>
          <div className="vd2-vendor-hero" style={{ display:"flex", alignItems:"flex-start", gap:18 }}>
            <div style={{ width:60, height:60, borderRadius:"50%", background:"#f97316", color:"#fff", fontSize:24, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              {vendor.initial}
            </div>
            <div style={{ flex:1, width:"100%" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:8 }}>
                <h1 style={{ margin:0, fontSize:22, fontWeight:800, color:"#111" }}>{vendor.name}</h1>
                {vendor.verified && <Badge label="✓ Verified" bg="#10b981" color="#fff" />}
                <Badge label={vendorStatus === "verified" ? "active" : vendorStatus} bg={statusBadgeStyle.bg} color={statusBadgeStyle.color} />
              </div>
              <p style={{ margin:"0 0 12px", fontSize:13, color:"#6b7280" }}>Owner: {vendor.owner}</p>
              <div className="vd2-info-meta">
                <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#4b5563", padding:"4px 0" }}><Mail size={14}/>{vendor.email}</div>
                <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#4b5563", padding:"4px 0" }}><Phone size={14}/>{vendor.phone}</div>
                <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#4b5563", padding:"4px 0" }}><MapPin size={14}/>{vendor.address}</div>
                <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#4b5563", padding:"4px 0" }}><Calendar size={14}/>Joined: {vendor.joined}</div>
              </div>
              <div className="vd2-info-stats" style={{ marginTop:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13 }}><Star size={14} style={{color:"#f59e0b"}}/><span><strong>{vendor.rating}</strong> ({vendor.reviews} reviews)</span></div>
                <span style={{color:"#e5e7eb"}}>|</span>
                <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13 }}><Package size={14}/><strong>{vendor.products} Products</strong></div>
                <span style={{color:"#e5e7eb"}}>|</span>
                <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13 }}><DollarSign size={14}/><strong>{vendor.totalSales} Sales</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="vd2-stat-grid">
          {[
            { label:"Total Revenue", value:"$104,878.98", sub:"From 1,191 sales", subColor:"#16a34a",
              icon:<DollarSign size={22} color="#fff"/>, iconBg:"#f97316" },
            { label:"Paid Amount", value:"$21,370.50", sub:<Badge label="2 payments" bg="#dcfce7" color="#15803d"/>,
              icon:<CheckCircle size={22} color="#16a34a"/>, iconBg:"#dcfce7" },
            { label:"Partially Paid", value:"$6,780.25", sub:<Badge label="1 pending" bg="#ffedd5" color="#c2410c"/>,
              icon:<AlertCircle size={22} color="#d97706"/>, iconBg:"#fef9c3" },
          ].map(c => (
            <div key={c.label} style={{ background:"#fff", borderRadius:18, border:"1px solid #f0f0f0", boxShadow:"0 1px 6px rgba(0,0,0,0.06)", padding:"20px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <p style={{ margin:"0 0 6px", fontSize:13, color:"#6b7280" }}>{c.label}</p>
                <p style={{ margin:"0 0 8px", fontSize:26, fontWeight:800, color:"#111", lineHeight:1 }}>{c.value}</p>
                {typeof c.sub === "string"
                  ? <p style={{ margin:0, fontSize:12, color:c.subColor, fontWeight:500 }}>{c.sub}</p>
                  : c.sub}
              </div>
              <div style={{ width:46, height:46, borderRadius:14, background:c.iconBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                {c.icon}
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="vd2-tabs">
          {[
            { key:"products", label:`Products (${products.length})` },
            { key:"payment",  label:`Payments (${paymentHistory.length})` },
            { key:"business", label:"Business" },
          ].map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              style={{
                padding:"10px 16px", fontSize:13, borderRadius:8, border:"none", cursor:"pointer",
                fontFamily:"inherit", transition:"all 0.15s",
                background: activeTab===t.key ? "#f3f4f6" : "transparent",
                fontWeight: activeTab===t.key ? 700 : 400,
                color: activeTab===t.key ? "#111" : "#6b7280",
                whiteSpace:"nowrap"
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ══════════ PRODUCTS TAB ══════════ */}
        {activeTab === "products" && (
          <div style={{ background:"#fff", borderRadius:18, border:"1px solid #f0f0f0", boxShadow:"0 1px 6px rgba(0,0,0,0.06)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #f3f4f6", flexWrap:"wrap", gap:10 }}>
              <h2 style={{ margin:0, fontSize:16, fontWeight:700, color:"#111" }}>Products</h2>
              <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                <Badge label={`${activeCount} Active`}   bg="#dcfce7" color="#15803d" />
                <Badge label={`${inactiveCount} Inactive`} bg="#f3f4f6" color="#4b5563" />
                <button className="vd2-btn-primary" onClick={() => setShowAddProduct(true)}>
                  <Plus size={15} /> Add
                </button>
              </div>
            </div>
            <div className="vd2-tbl-wrap">
              <table className="vd2-tbl">
                <thead>
                  <tr>
                    {["Product","SKU","Category","Price","Stock","Sold","Total","Actions"].map(h=>(
                      <th key={h} className="vd2-th">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="vd2-tr">
                      <td className="vd2-td" style={{ fontWeight:600, color:"#111" }}>{p.name}</td>
                      <td className="vd2-td" style={{ color:"#9ca3af" }}>{p.sku}</td>
                      <td className="vd2-td">
                        <Badge label={p.category}
                          bg={p.category==="Electronics"?"#eff6ff":"#f5f3ff"}
                          color={p.category==="Electronics"?"#1d4ed8":"#6d28d9"} />
                      </td>
                      <td className="vd2-td" style={{ fontWeight:600 }}>${p.price.toFixed(2)}</td>
                      <td className="vd2-td" style={{ fontWeight:700, color:p.stock===0?"#ef4444":"#111" }}>{p.stock}</td>
                      <td className="vd2-td">{p.sold}</td>
                      <td className="vd2-td" style={{ fontWeight:600, color:"#16a34a" }}>{p.total}</td>
                      <td className="vd2-td">
                        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                          <IconBtn icon={<Eye size={16}/>} />
                          <IconBtn icon={<Pencil size={16}/>} title="Edit Product"
                            onClick={() => { setSelectedProduct(p); setShowEditProduct(true); }} />
                          {p.hasPay && (
                            <IconBtn icon={<DollarSign size={16}/>} color="#f97316" title="Add Payment"
                              onClick={() => { setSelectedProduct(p); setShowPayment(true); }} />
                          )}
                          <IconBtn icon={<Trash2 size={16}/>} color="#ef4444"
                            onClick={() => setProducts(prev => prev.filter(x => x.id !== p.id))} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════ PAYMENT HISTORY TAB ══════════ */}
        {activeTab === "payment" && (
          <div style={{ background:"#fff", borderRadius:18, border:"1px solid #f0f0f0", boxShadow:"0 1px 6px rgba(0,0,0,0.06)" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #f3f4f6", flexWrap:"wrap", gap:10 }}>
              <h2 style={{ margin:0, fontSize:16, fontWeight:700, color:"#111" }}>Payment History</h2>
              <button className="vd2-btn-ghost"><Download size={14}/> Export</button>
            </div>
            <div className="vd2-tbl-wrap">
              <table className="vd2-tbl">
                <thead>
                  <tr>
                    {["Transaction","Date","Total","Paid","Balance","Method","Orders","Status","Actions"].map(h=>(
                      <th key={h} className="vd2-th">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map(t => (
                    <tr key={t.id} className="vd2-tr">
                      <td className="vd2-td" style={{ color:"#6b7280", fontSize:12 }}>{t.id}</td>
                      <td className="vd2-td">{t.date}</td>
                      <td className="vd2-td" style={{ fontWeight:600 }}>{t.total}</td>
                      <td className="vd2-td" style={{ fontWeight:600, color:"#16a34a" }}>{t.paid}</td>
                      <td className="vd2-td" style={{ color: t.balance!=="-"?"#f97316":"#9ca3af" }}>{t.balance}</td>
                      <td className="vd2-td">
                        <div style={{ display:"flex", alignItems:"center", gap:4, color:"#4b5563" }}>
                          <CreditCard size={14} style={{color:"#9ca3af"}}/>{t.method}
                        </div>
                      </td>
                      <td className="vd2-td">{t.orders}</td>
                      <td className="vd2-td">
                        <Badge label={t.status}
                          bg={statusStyle[t.status]?.bg||"#f3f4f6"}
                          color={statusStyle[t.status]?.color||"#374151"} />
                      </td>
                      <td className="vd2-td">
                        <div style={{ display:"flex", gap:4 }}>
                          <IconBtn icon={<Download size={15}/>} />
                          <IconBtn icon={<Eye size={15}/>} />
                          {t.status!=="Paid" && <IconBtn icon={<Plus size={15}/>} color="#f97316"/>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════ BUSINESS DETAILS TAB ══════════ */}
        {activeTab === "business" && (
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            <div className="vd2-biz-grid">
              {/* Business Info */}
              <div style={{ background:"#fff", borderRadius:18, border:"1px solid #e5e7eb", overflow:"hidden" }}>
                <div style={{ padding:"16px 20px", borderBottom:"1px solid #e5e7eb" }}>
                  <h3 style={{ margin:0, fontSize:16, fontWeight:700 }}>Business Info</h3>
                </div>
                <div style={{ padding:"20px", display:"flex", flexDirection:"column", gap:16 }}>
                  {[
                    ["Business License","BL-2025-0012345"],
                    ["Tax ID","TAX-123456789"],
                    ["Business Address", vendor.address],
                    ["Registration Date", vendor.joined],
                  ].map(([k,v])=>(
                    <div key={k}>
                      <p style={{ margin:"0 0 4px", fontSize:12, color:"#6b7280" }}>{k}</p>
                      <p style={{ margin:0, fontSize:14, fontWeight:600, color:"#111" }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Payment Info */}
              <div style={{ background:"#fff", borderRadius:18, border:"1px solid #e5e7eb", overflow:"hidden" }}>
                <div style={{ padding:"16px 20px", borderBottom:"1px solid #e5e7eb" }}>
                  <h3 style={{ margin:0, fontSize:16, fontWeight:700 }}>Payment Info</h3>
                </div>
                <div style={{ padding:"20px", display:"flex", flexDirection:"column", gap:16 }}>
                  {[
                    ["Payment Method","Bank Transfer"],
                    ["Bank Account","**** **** **** 4532"],
                  ].map(([k,v])=>(
                    <div key={k}>
                      <p style={{ margin:"0 0 4px", fontSize:12, color:"#6b7280" }}>{k}</p>
                      <p style={{ margin:0, fontSize:14, fontWeight:600, color:"#111" }}>{v}</p>
                    </div>
                  ))}
                  <div>
                    <p style={{ margin:"0 0 4px", fontSize:12, color:"#6b7280" }}>Total Paid</p>
                    <p style={{ margin:0, fontSize:24, fontWeight:800, color:"#16a34a" }}>$21,370.50</p>
                  </div>
                  <div>
                    <p style={{ margin:"0 0 4px", fontSize:12, color:"#6b7280" }}>Outstanding Balance</p>
                    <p style={{ margin:0, fontSize:24, fontWeight:800, color:"#f97316" }}>$12,200.25</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div style={{ background:"#fff", borderRadius:18, border:"1px solid #f0f0f0", boxShadow:"0 1px 6px rgba(0,0,0,0.06)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #f3f4f6", flexWrap:"wrap", gap:10 }}>
                <div>
                  <h3 style={{ margin:0, fontSize:16, fontWeight:700 }}>Documents</h3>
                  <p style={{ margin:"4px 0 0", fontSize:12, color:"#9ca3af" }}>Upload business documents</p>
                </div>
                <button className="vd2-btn-primary" onClick={() => setShowUploadDoc(true)}>
                  <Upload size={15}/> Upload
                </button>
              </div>
              <div className="vd2-tbl-wrap">
                <table className="vd2-tbl">
                  <thead>
                    <tr>{["Document","Category","Type","Size","Date","Actions"].map(h=><th key={h} className="vd2-th">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {docs.map((d,i)=>(
                      <tr key={i} className="vd2-tr">
                        <td className="vd2-td">
                          <div style={{ display:"flex", alignItems:"center", gap:8, color:"#374151" }}>
                            <FileText size={15} style={{color:"#9ca3af", flexShrink:0}}/>{d.name}
                          </div>
                        </td>
                        <td className="vd2-td">
                          <Badge label={d.category}
                            bg={categoryColors[d.category]?.bg||"#f3f4f6"}
                            color={categoryColors[d.category]?.color||"#374151"} />
                        </td>
                        <td className="vd2-td">
                          <span style={{ background:"#f3f4f6", color:"#374151", fontSize:11, padding:"4px 10px", borderRadius:6, fontWeight:600 }}>{d.type}</span>
                        </td>
                        <td className="vd2-td" style={{ color:"#6b7280" }}>{d.size}</td>
                        <td className="vd2-td" style={{ color:"#6b7280" }}>{d.date}</td>
                        <td className="vd2-td">
                          <div style={{ display:"flex", gap:4 }}>
                            <IconBtn icon={<Download size={15}/>}/>
                            <IconBtn icon={<Trash2 size={15}/>} color="#ef4444"/>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ══════════ MODALS ══════════ */}

      {/* Edit Product Modal */}
      {showEditProduct && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          vendorName={vendor.name}
          onClose={() => setShowEditProduct(false)}
          onSave={handleEditSave}
        />
      )}

      {/* Add Payment Modal */}
      {showPayment && selectedProduct && (
        <AddPaymentModal
          product={selectedProduct}
          onClose={() => setShowPayment(false)}
          onSave={handlePaymentSave}
        />
      )}

      {/* Change Status Modal */}
      {showStatusModal && (
        <div className="vd2-overlay" onClick={() => setShowStatusModal(false)}>
          <div className="vd2-modal vd2-modal-sm" onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <div style={{ flex:1 }}>
                <h2 style={{ margin:0, fontSize:18, fontWeight:800, color:"#111" }}>Change Status</h2>
                <p style={{ margin:"6px 0 0", fontSize:13, color:"#9ca3af" }}>Update status for {vendor.name}</p>
              </div>
              <button onClick={() => setShowStatusModal(false)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#9ca3af", padding:"4px 8px" }}>✕</button>
            </div>
            <div style={{ borderTop:"1px solid #f3f4f6", margin:"16px 0" }} />
            <div style={{ marginBottom:16 }}>
              <label className="vd2-lbl">Select Status</label>
              <select value={selectedStatus} onChange={e=>setSelectedStatus(e.target.value)} className="vd2-select">
                <option value="active">🟢 Active</option>
                <option value="pending">🟡 Pending</option>
                <option value="suspended">🔴 Suspended</option>
              </select>
            </div>
            <div style={{ background:"#f9fafb", borderRadius:10, padding:"14px", marginBottom:20, fontSize:13, color:"#4b5563" }}>
              <strong>Note:</strong> Changing vendor status affects their ability to manage products and receive payments.
            </div>
            <div className="vd2-modal-footer" style={{ display:"flex", justifyContent:"flex-end", gap:12 }}>
              <button className="vd2-btn-cancel" onClick={() => setShowStatusModal(false)}>Cancel</button>
              <button className="vd2-btn-save" onClick={handleUpdateStatus}>Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="vd2-overlay" onClick={() => setShowAddProduct(false)}>
          <div className="vd2-modal" onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <div style={{ flex:1 }}>
                <h2 style={{ margin:0, fontSize:18, fontWeight:800, color:"#111" }}>Add Product</h2>
                <p style={{ margin:"6px 0 0", fontSize:13, color:"#9ca3af" }}>Add product to {vendor.name}</p>
              </div>
              <button onClick={() => setShowAddProduct(false)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#9ca3af", padding:"4px 8px" }}>✕</button>
            </div>
            <div style={{ borderTop:"1px solid #f3f4f6", margin:"16px 0" }} />
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <FormField label="Product Name *">
                <input value={newProduct.name} onChange={e=>setNewProduct({...newProduct,name:e.target.value})}
                  placeholder="Enter product name" className={`vd2-inp ${newProduct.name?"vd2-inp-hi":""}`} />
              </FormField>
              <div className="vd2-modal-grid">
                <FormField label="SKU *">
                  <input value={newProduct.sku} onChange={e=>setNewProduct({...newProduct,sku:e.target.value})}
                    placeholder="e.g., WBH-001" className="vd2-inp" />
                </FormField>
                <FormField label="Category *">
                  <select value={newProduct.category} onChange={e=>setNewProduct({...newProduct,category:e.target.value})} className="vd2-select">
                    <option value="">Select category</option>
                    <option>Electronics</option><option>Accessories</option><option>Clothing</option><option>Other</option>
                  </select>
                </FormField>
              </div>
              <div className="vd2-modal-grid">
                <FormField label="Price ($) *">
                  <input value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:e.target.value})}
                    placeholder="89.99" type="number" className="vd2-inp" />
                </FormField>
                <FormField label="Stock *">
                  <input value={newProduct.stock} onChange={e=>setNewProduct({...newProduct,stock:e.target.value})}
                    placeholder="100" type="number" className="vd2-inp" />
                </FormField>
              </div>
              <FormField label="Paid Amount ($)">
                <input value={newProduct.paidAmount} onChange={e=>setNewProduct({...newProduct,paidAmount:e.target.value})}
                  placeholder="30.00" type="number" className="vd2-inp" />
              </FormField>
              <FormField label="Description">
                <textarea value={newProduct.description} onChange={e=>setNewProduct({...newProduct,description:e.target.value})}
                  placeholder="Enter product description (optional)" rows={3}
                  className="vd2-inp" style={{ resize:"none" }} />
              </FormField>
            </div>
            <div className="vd2-modal-footer" style={{ display:"flex", justifyContent:"flex-end", gap:12, marginTop:20 }}>
              <button className="vd2-btn-cancel" onClick={() => setShowAddProduct(false)}>Cancel</button>
              <button className="vd2-btn-save"
                disabled={!newProduct.name||!newProduct.sku||!newProduct.category||!newProduct.price||!newProduct.stock}
                onClick={handleAddProduct}>Add Product</button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {showUploadDoc && (
        <div className="vd2-overlay" onClick={() => setShowUploadDoc(false)}>
          <div className="vd2-modal vd2-modal-sm" onClick={e=>e.stopPropagation()}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <div style={{ flex:1 }}>
                <h2 style={{ margin:0, fontSize:18, fontWeight:800, color:"#111" }}>Upload Document</h2>
                <p style={{ margin:"6px 0 0", fontSize:13, color:"#9ca3af" }}>Upload document for {vendor.name}</p>
              </div>
              <button onClick={() => setShowUploadDoc(false)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#9ca3af", padding:"4px 8px" }}>✕</button>
            </div>
            <div style={{ borderTop:"1px solid #f3f4f6", margin:"16px 0" }} />
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <FormField label="Select File *">
                <input type="file" onChange={e=>setUploadFile(e.target.files[0])}
                  className="vd2-inp" style={{ padding:"10px" }} />
              </FormField>
              <FormField label="Document Category *">
                <select value={uploadCategory} onChange={e=>setUploadCategory(e.target.value)} className="vd2-select">
                  <option value="">Select category</option>
                  <option value="License">License</option>
                  <option value="Tax">Tax</option>
                  <option value="Banking">Banking</option>
                  <option value="Other">Other</option>
                </select>
              </FormField>
            </div>
            <div className="vd2-modal-footer" style={{ display:"flex", justifyContent:"flex-end", gap:12, marginTop:24 }}>
              <button className="vd2-btn-cancel" onClick={() => setShowUploadDoc(false)}>Cancel</button>
              <button className="vd2-btn-save" disabled={!uploadFile||!uploadCategory} onClick={handleUpload}>Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}