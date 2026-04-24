// "use client";
// import { useState, useRef, useEffect } from "react";
// import {
//   Search, Download, Plus, MoreVertical, Package, X, Upload,
//   Eye, Pencil, Trash2, Star, ShoppingCart, DollarSign,
//   TrendingUp, Copy, Edit2, ChevronLeft,
//   Heart, Share2, ShoppingBag, CheckCircle, XCircle, Check, ChevronDown,
//   Tag, Store, BarChart2, Box, MessageSquare,
// } from "lucide-react";

// const globalCSS = `
//   *, *::before, *::after { box-sizing: border-box; }

//   ::-webkit-scrollbar { width: 5px; height: 5px; }
//   ::-webkit-scrollbar-track { background: #f1f5f9; }
//   ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }

//   .page-wrap::-webkit-scrollbar { display: none !important; }
//   .page-wrap { scrollbar-width: none !important; }

//   .tabs-bar::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
//   .tabs-bar { scrollbar-width: none !important; -ms-overflow-style: none !important; background: #fff; }

//   .prog-fill { transition: width 0.4s ease; }

//   .modal-input, .modal-select, .modal-textarea {
//     transition: border-color .15s, box-shadow .15s;
//   }
//   .modal-input:hover, .modal-select:hover, .modal-textarea:hover {
//     border-color: #fdba74 !important;
//   }
//   .modal-input:focus, .modal-select:focus, .modal-textarea:focus {
//     border-color: #f97316 !important;
//     box-shadow: 0 0 0 3px rgba(249,115,22,0.15) !important;
//     outline: none !important;
//   }

//   .add-modal-input, .add-modal-select, .add-modal-textarea {
//     transition: border-color .15s, box-shadow .15s;
//     border: 1px solid #d1d5db !important;
//   }
//   .add-modal-input:hover, .add-modal-select:hover, .add-modal-textarea:hover {
//     border-color: #fdba74 !important;
//   }
//   .add-modal-input:focus, .add-modal-select:focus, .add-modal-textarea:focus {
//     border-color: #f97316 !important;
//     box-shadow: 0 0 0 3px rgba(249,115,22,0.15) !important;
//     outline: none !important;
//   }

//   .search-input { transition: border-color .15s, box-shadow .15s; }
//   .search-input:focus {
//     border-color: #f97316 !important;
//     box-shadow: 0 0 0 3px rgba(249,115,22,0.15) !important;
//     outline: none !important;
//   }
//   .search-input:hover { border-color: #fdba74 !important; }

//   .custom-dd-btn { transition: border-color .15s, box-shadow .15s; }
//   .custom-dd-btn:hover { border-color: #fdba74 !important; }
//   .custom-dd-btn.open {
//     border-color: #f97316 !important;
//     box-shadow: 0 0 0 3px rgba(249,115,22,0.15) !important;
//   }

//   .qty-btn:hover { background: #f3f4f6 !important; }
//   .preview-add-btn:hover { background: #ea6c0a !important; }
//   .preview-icon-btn:hover { background: #f3f4f6 !important; }

//   .three-dots-btn {
//     background: none;
//     border: none;
//     cursor: pointer;
//     color: #9ca3af;
//     padding: 4px 6px;
//     border-radius: 6px;
//     display: flex;
//     font-family: inherit;
//     transition: background .15s, color .15s;
//   }
//   .three-dots-btn:hover {
//     background: #fff7ed !important;
//     color: #f97316 !important;
//   }
//   .three-dots-btn:hover svg {
//     stroke: #f97316 !important;
//   }

//   .export-btn {
//     display: flex;
//     align-items: center;
//     gap: 7px;
//     padding: 9px 18px;
//     border: 1.5px solid #d1d5db;
//     border-radius: 9px;
//     background: #fff;
//     font-size: 13px;
//     font-weight: 500;
//     color: #374151;
//     cursor: pointer;
//     font-family: inherit;
//     transition: border-color .18s, color .18s, background .18s, box-shadow .18s;
//   }
//   .export-btn:hover {
//     border-color: #f97316 !important;
//     color: #f97316 !important;
//     background: #fff7ed !important;
//     box-shadow: 0 0 0 3px rgba(249,115,22,0.10) !important;
//   }
//   .export-btn:hover svg {
//     stroke: #f97316 !important;
//   }
//   .export-btn:active {
//     background: #ffedd5 !important;
//     border-color: #ea580c !important;
//     color: #ea580c !important;
//   }

//   /* ── Responsive breakpoints ── */

//   @media (max-width: 479px) {
//     .page-wrap                { padding: 12px !important; }
//     .page-header              { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
//     .page-header-actions      { width: 100% !important; display: flex !important; justify-content: flex-end !important; }
//     .kpi-list-grid            { grid-template-columns: 1fr 1fr !important; gap: 8px !important; margin-bottom: 14px !important; }
//     .kpi-list-grid > div      { padding: 12px !important; }
//     .kpi-list-val             { font-size: 1.3rem !important; }
//     .toolbar-row              { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
//     .filters-wrap             { flex-direction: column !important; gap: 8px !important; width: 100% !important; }
//     .filters-wrap > *         { width: 100% !important; min-width: unset !important; }
//     .search-input-wrap        { width: 100% !important; }
//     .search-input             { width: 100% !important; }
//     .table-scroll             { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; }
//     table.prod-table          { min-width: 580px !important; }
//     .detail-topbar            { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
//     .topbar-right             { width: 100% !important; display: flex !important; justify-content: flex-end !important; gap: 8px !important; }
//     .hero-card                { flex-direction: column !important; gap: 14px !important; }
//     .hero-img                 { width: 100% !important; height: 200px !important; object-fit: cover !important; border-radius: 12px !important; }
//     .hero-meta-grid           { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
//     .kpi-detail-grid          { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
//     .kpi-card                 { padding: 12px !important; }
//     .kpi-card-val             { font-size: 1.4rem !important; }
//     .tabs-bar                 { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; }
//     .tabs-bar::-webkit-scrollbar { display: none !important; }
//     .referral-scroll          { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; }
//     .referral-scroll table    { min-width: 580px !important; }
//     .modal-grid               { grid-template-columns: 1fr !important; }
//     .preview-layout           { flex-direction: column !important; }
//     .preview-img              { width: 100% !important; height: 200px !important; }
//     .add-product-modal        { max-height: 95vh !important; overflow-y: auto !important; }
//   }

//   @media (min-width: 480px) and (max-width: 639px) {
//     .page-wrap                { padding: 14px !important; }
//     .page-header              { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
//     .kpi-list-grid            { grid-template-columns: 1fr 1fr !important; gap: 10px !important; margin-bottom: 16px !important; }
//     .kpi-list-grid > div      { padding: 14px !important; }
//     .kpi-list-val             { font-size: 1.4rem !important; }
//     .toolbar-row              { flex-direction: column !important; gap: 10px !important; }
//     .filters-wrap             { flex-direction: column !important; gap: 8px !important; width: 100% !important; }
//     .filters-wrap > *         { width: 100% !important; }
//     .table-scroll             { overflow-x: auto !important; }
//     table.prod-table          { min-width: 600px !important; }
//     .detail-topbar            { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
//     .topbar-right             { width: 100% !important; display: flex !important; justify-content: flex-end !important; gap: 8px !important; }
//     .hero-card                { flex-direction: column !important; gap: 16px !important; }
//     .hero-img                 { width: 100% !important; height: 200px !important; object-fit: cover !important; border-radius: 12px !important; }
//     .hero-meta-grid           { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
//     .kpi-detail-grid          { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
//     .kpi-card                 { padding: 14px !important; }
//     .kpi-card-val             { font-size: 1.5rem !important; }
//     .tabs-bar                 { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; }
//     .tabs-bar::-webkit-scrollbar { display: none !important; }
//     .referral-scroll          { overflow-x: auto !important; }
//     .referral-scroll table    { min-width: 580px !important; }
//     .modal-grid               { grid-template-columns: 1fr !important; }
//     .preview-layout           { flex-direction: column !important; }
//     .preview-img              { width: 100% !important; height: 220px !important; }
//   }

//   @media (min-width: 640px) and (max-width: 767px) {
//     .page-wrap                { padding: 18px !important; }
//     .page-header              { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
//     .kpi-list-grid            { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
//     .kpi-detail-grid          { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
//     .hero-meta-grid           { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
//     .hero-card                { flex-direction: column !important; gap: 16px !important; }
//     .hero-img                 { width: 100% !important; height: 220px !important; }
//     .table-scroll             { overflow-x: auto !important; }
//     table.prod-table          { min-width: 640px !important; }
//     .referral-scroll          { overflow-x: auto !important; }
//     .referral-scroll table    { min-width: 600px !important; }
//     .modal-grid               { grid-template-columns: 1fr !important; }
//     .detail-topbar            { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
//     .topbar-right             { width: 100% !important; display: flex !important; justify-content: flex-end !important; gap: 8px !important; }
//     .tabs-bar                 { overflow-x: auto !important; }
//     .tabs-bar::-webkit-scrollbar { display: none !important; }
//   }

//   @media (min-width: 768px) and (max-width: 1023px) {
//     .page-wrap                { padding: 22px !important; }
//     .kpi-list-grid            { grid-template-columns: 1fr 1fr !important; gap: 14px !important; }
//     .kpi-detail-grid          { grid-template-columns: 1fr 1fr !important; gap: 14px !important; }
//     .hero-meta-grid           { grid-template-columns: 1fr 1fr !important; gap: 14px !important; }
//     .table-scroll             { overflow-x: auto !important; }
//     table.prod-table          { min-width: 700px !important; }
//     .referral-scroll          { overflow-x: auto !important; }
//     .referral-scroll table    { min-width: 600px !important; }
//     .tabs-bar                 { overflow-x: auto !important; }
//     .tabs-bar::-webkit-scrollbar { display: none !important; }
//   }

//   @media (min-width: 1024px) {
//     .kpi-detail-grid          { grid-template-columns: repeat(4, 1fr) !important; }
//     .kpi-list-grid            { grid-template-columns: repeat(4, 1fr) !important; }
//     .hero-meta-grid           { grid-template-columns: repeat(4, 1fr) !important; }
//     table.prod-table          { min-width: unset !important; }
//   }
// `;

// function CustomDropdown({ value, onChange, options, minWidth = 150 }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [menuStyle, setMenuStyle] = useState({});
//   const btnRef = useRef(null);
//   const menuRef = useRef(null);

//   const openMenu = () => {
//     if (btnRef.current) {
//       const r = btnRef.current.getBoundingClientRect();
//       setMenuStyle({ position: "fixed", top: r.bottom + 4, left: r.left, minWidth: r.width, zIndex: 99999 });
//     }
//     setIsOpen(true);
//   };

//   useEffect(() => {
//     const close = (e) => {
//       if (btnRef.current && !btnRef.current.contains(e.target) && menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
//     };
//     const onScroll = () => setIsOpen(false);
//     document.addEventListener("mousedown", close);
//     window.addEventListener("scroll", onScroll, true);
//     return () => { document.removeEventListener("mousedown", close); window.removeEventListener("scroll", onScroll, true); };
//   }, []);

//   return (
//     <div style={{ position: "relative", display: "inline-block" }}>
//       <button
//         ref={btnRef}
//         className={`custom-dd-btn${isOpen ? " open" : ""}`}
//         onClick={() => isOpen ? setIsOpen(false) : openMenu()}
//         style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "8px 14px", border: "1px solid #d1d5db", borderRadius: 8, background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer", fontFamily: "inherit", minWidth, whiteSpace: "nowrap" }}
//       >
//         <span>{value}</span>
//         <ChevronDown size={15} color="#9ca3af" style={{ transition: "transform .2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }} />
//       </button>
//       {isOpen && (
//         <div ref={menuRef} style={{ ...menuStyle, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, boxShadow: "0 10px 30px rgba(0,0,0,0.12)", padding: "4px 0", overflow: "hidden" }}>
//           {options.map((opt) => {
//             const selected = value === opt;
//             return (
//               <button
//                 key={opt}
//                 onClick={() => { onChange(opt); setIsOpen(false); }}
//                 style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "9px 16px", background: selected ? "#fff7ed" : "#fff", border: "none", cursor: "pointer", fontSize: 13, fontFamily: "inherit", color: selected ? "#f97316" : "#374151", fontWeight: selected ? 600 : 400, textAlign: "left", transition: "background .12s" }}
//                 onMouseEnter={e => { if (!selected) e.currentTarget.style.background = "#f9fafb"; }}
//                 onMouseLeave={e => { if (!selected) e.currentTarget.style.background = "#fff"; }}
//               >
//                 <span>{opt}</span>
//                 {selected && <Check size={14} color="#f97316" strokeWidth={2.5} />}
//               </button>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// const FIXED_DETAIL = {
//   totalSales: 1247, totalRevenue: 162100, productViews: 8934, rating: 4.8, reviewCount: 432,
//   salesGrowth: "+18.2%", revenueGrowth: "+22.5%", viewsGrowth: "+12.8%",
//   referralCoupons: [
//     { code: "ALEX2026", referrer: "Alex Martinez", email: "alex@example.com", discountType: "Percentage (%)", discountPrefix: "%", discountValue: "15%", discountRaw: "15", rewardType: "Percentage (%)", rewardValue: "5", used: 23, total: 50, expiry: "31/12/2026", expiryRaw: "2026-12-31", status: "active" },
//     { code: "JESSICA2026", referrer: "Jessica Lee", email: "jessica@example.com", discountType: "Fixed Amount ($)", discountPrefix: "$", discountValue: "$20", discountRaw: "20", rewardType: "Fixed Amount ($)", rewardValue: "10", used: 30, total: 30, expiry: "30/6/2026", expiryRaw: "2026-06-30", status: "exhausted" },
//     { code: "CHRIS2025", referrer: "Chris Brown", email: "chris@example.com", discountType: "Percentage (%)", discountPrefix: "%", discountValue: "10%", discountRaw: "10", rewardType: "Percentage (%)", rewardValue: "3", used: 45, total: 100, expiry: "31/12/2025", expiryRaw: "2025-12-31", status: "expired" },
//   ],
// };

// const productsData = [
//   { id: 1, name: "Wireless Bluetooth Headphones", sku: "WBH-2024-001", category: "Electronics", vendor: "TechStore Pro", price: 129.99, originalPrice: 155.99, stock: 245, status: "approved", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&q=80", description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals." },
//   { id: 2, name: "Premium Leather Jacket", sku: "PLJ-2024-002", category: "Fashion", vendor: "Fashion Hub", price: 299.99, originalPrice: 349.99, stock: 45, status: "approved", image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=300&h=300&fit=crop&q=80", description: "Genuine leather jacket with premium stitching and timeless design." },
//   { id: 3, name: "Smart Home Security Camera", sku: "SHSC-2024-003", category: "Home & Garden", vendor: "Home Essentials", price: 89.99, originalPrice: 109.99, stock: 156, status: "approved", image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=300&h=300&fit=crop&q=80", description: "1080p smart security camera with night vision and motion detection." },
//   { id: 4, name: "Professional Running Shoes", sku: "PRS-2024-004", category: "Sports", vendor: "Sports World", price: 149.99, originalPrice: 179.99, stock: 0, status: "out-of-stock", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&q=80", description: "Professional-grade running shoes with superior cushioning." },
//   { id: 5, name: "Organic Face Cream", sku: "OFC-2024-005", category: "Beauty", vendor: "Beauty Corner", price: 45.99, originalPrice: 59.99, stock: 320, status: "approved", image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=300&h=300&fit=crop&q=80", description: "100% organic face cream with natural botanical ingredients." },
//   { id: 6, name: "Gaming Laptop 15.6 inch", sku: "GL-2024-006", category: "Electronics", vendor: "TechStore Pro", price: 1299.99, originalPrice: 1499.99, stock: 28, status: "pending", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=300&fit=crop&q=80", description: "High-performance gaming laptop featuring RTX 4070, 32GB DDR5 RAM." },
// ];

// const categorySpecs = {
//   "Electronics": [
//     { key: "storage", label: "Storage", options: ["Select Storage","64GB","128GB","256GB","512GB","1TB","2TB"] },
//     { key: "ram", label: "RAM", options: ["Select RAM","4GB","8GB","16GB","32GB","64GB"] },
//     { key: "connectivity", label: "Connectivity", options: ["Select Connectivity","WiFi","Bluetooth","WiFi + Bluetooth","Wired","5G"] },
//   ],
//   "Fashion": [
//     { key: "size", label: "Size", options: ["Select Size","XS","S","M","L","XL","XXL"] },
//     { key: "material", label: "Material", options: ["Select Material","Cotton","Polyester","Leather","Wool","Silk","Denim"] },
//     { key: "color", label: "Color", options: ["Select Color","Black","White","Red","Blue","Brown","Grey"] },
//   ],
//   "Sports": [
//     { key: "size", label: "Size", options: ["Select Size","UK 6","UK 7","UK 8","UK 9","UK 10","UK 11","UK 12"] },
//     { key: "surface", label: "Surface Type", options: ["Select Surface","Road","Trail","Track","Indoor","All-terrain"] },
//     { key: "gender", label: "Gender", options: ["Select Gender","Men","Women","Unisex","Kids"] },
//   ],
//   "Beauty": [
//     { key: "skinType", label: "Skin Type", options: ["Select Skin Type","Normal","Oily","Dry","Combination","Sensitive","All Types"] },
//     { key: "volume", label: "Volume", options: ["Select Volume","30ml","50ml","100ml","150ml","200ml"] },
//     { key: "ingredients", label: "Key Ingredient", options: ["Select Ingredient","Retinol","Vitamin C","Hyaluronic Acid","Niacinamide","Salicylic Acid"] },
//   ],
//   "Home & Garden": [
//     { key: "power", label: "Power Source", options: ["Select Power","Battery","Wired (USB)","Wired (AC)","Solar"] },
//     { key: "connectivity", label: "Connectivity", options: ["Select Connectivity","WiFi","Bluetooth","Zigbee","Z-Wave","No Smart"] },
//     { key: "resolution", label: "Resolution", options: ["Select Resolution","720p","1080p","2K","4K"] },
//   ],
// };

// const productStatusBadge = (s) => {
//   if (s === "approved")     return { bg: "#10b981", label: "approved" };
//   if (s === "pending")      return { bg: "#f59e0b", label: "pending" };
//   if (s === "out-of-stock") return { bg: "#374151", label: "out-of-stock" };
//   return { bg: "#9ca3af", label: s };
// };
// const couponStatusStyle = (s) => {
//   if (s === "active")    return { bg: "#10b981", color: "#fff" };
//   if (s === "exhausted") return { bg: "#ef4444", color: "#fff" };
//   if (s === "expired")   return { bg: "#6b7280", color: "#fff" };
//   return { bg: "#e5e7eb", color: "#374151" };
// };
// const formatRevenue = (n) => n >= 1000 ? `$${(n/1000).toFixed(1)}k` : `$${n}`;

// function CustomerPreviewModal({ product, onClose }) {
//   const [qty, setQty] = useState(1);
//   const isInStock = product.stock > 0;
//   const rating = 4.8; const reviewCount = 127;
//   return (
//     <div style={{ position:"fixed",inset:0,zIndex:99999,background:"rgba(0,0,0,0.55)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 16px" }}>
//       <div style={{ width:"100%",maxWidth:660,background:"#fff",borderRadius:20,boxShadow:"0 32px 80px rgba(0,0,0,0.28)",overflow:"hidden",position:"relative",maxHeight:"95vh",overflowY:"auto" }}>
//         <button onClick={onClose} style={{ position:"absolute",top:14,right:14,zIndex:10,width:34,height:34,borderRadius:"50%",background:"#f3f4f6",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#374151" }}><X size={16}/></button>
//         <div className="preview-layout" style={{ display:"flex",gap:0 }}>
//           <div className="preview-img" style={{ width:260,minWidth:260,height:340,background:"#f8f8f8",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
//             <img src={product.image} alt={product.name} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
//           </div>
//           <div style={{ flex:1,padding:"28px 28px 24px",display:"flex",flexDirection:"column",gap:0 }}>
//             <span style={{ display:"inline-block",fontSize:11,fontWeight:600,color:"#6b7280",border:"1px solid #e5e7eb",borderRadius:6,padding:"3px 10px",marginBottom:10,width:"fit-content" }}>{product.category}</span>
//             <h2 style={{ margin:"0 0 12px",fontSize:22,fontWeight:700,color:"#111827",lineHeight:1.25,paddingRight:30 }}>{product.name}</h2>
//             <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:14 }}>
//               <div style={{ display:"flex",gap:2 }}>{[1,2,3,4,5].map(s=><Star key={s} size={16} fill={s<=Math.floor(rating)?"#f97316":"#e5e7eb"} color={s<=Math.ceil(rating)?"#f97316":"#e5e7eb"}/>)}</div>
//               <span style={{ fontSize:13,color:"#6b7280" }}>({rating} / {reviewCount} reviews)</span>
//             </div>
//             <div style={{ display:"flex",alignItems:"baseline",gap:10,marginBottom:14 }}>
//               <span style={{ fontSize:32,fontWeight:800,color:"#111827" }}>${product.price.toFixed(2)}</span>
//               {product.originalPrice&&<span style={{ fontSize:18,color:"#9ca3af",textDecoration:"line-through" }}>${product.originalPrice.toFixed(2)}</span>}
//             </div>
//             <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:18,fontSize:13,fontWeight:500,color:isInStock?"#10b981":"#ef4444" }}>
//               <div style={{ width:7,height:7,borderRadius:"50%",background:isInStock?"#10b981":"#ef4444" }}/>
//               {isInStock?`In Stock (${product.stock} available)`:"Out of Stock"}
//             </div>
//             <div style={{ marginBottom:18 }}>
//               <p style={{ fontSize:13,fontWeight:600,color:"#374151",margin:"0 0 8px" }}>Quantity</p>
//               <div style={{ display:"flex",alignItems:"center" }}>
//                 <button className="qty-btn" onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ width:38,height:38,borderRadius:"8px 0 0 8px",border:"1px solid #e5e7eb",background:"#fff",fontSize:18,cursor:"pointer",color:"#374151",display:"flex",alignItems:"center",justifyContent:"center" }}>−</button>
//                 <div style={{ width:52,height:38,border:"1px solid #e5e7eb",borderLeft:"none",borderRight:"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:600,color:"#111827" }}>{qty}</div>
//                 <button className="qty-btn" onClick={()=>setQty(q=>q+1)} style={{ width:38,height:38,borderRadius:"0 8px 8px 0",border:"1px solid #e5e7eb",background:"#fff",fontSize:18,cursor:"pointer",color:"#374151",display:"flex",alignItems:"center",justifyContent:"center" }}>+</button>
//               </div>
//             </div>
//             <div style={{ display:"flex",gap:10,marginBottom:20 }}>
//               <button className="preview-add-btn" disabled={!isInStock} style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"12px 20px",borderRadius:10,background:isInStock?"#f97316":"#e5e7eb",border:"none",cursor:isInStock?"pointer":"not-allowed",fontSize:14,fontWeight:700,color:isInStock?"#fff":"#9ca3af" }}><ShoppingBag size={16}/> Add to Cart</button>
//               <button className="preview-icon-btn" style={{ width:44,height:44,borderRadius:10,border:"1px solid #e5e7eb",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#6b7280",flexShrink:0 }}><Heart size={17}/></button>
//               <button className="preview-icon-btn" style={{ width:44,height:44,borderRadius:10,border:"1px solid #e5e7eb",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#6b7280",flexShrink:0 }}><Share2 size={17}/></button>
//             </div>
//             <div style={{ display:"flex",gap:16,paddingTop:16,borderTop:"1px solid #f3f4f6" }}>
//               {[{icon:"🚚",label:"Free Shipping"},{icon:"🛡",label:"2 Year Warranty"},{icon:"↩️",label:"30 Day Returns"}].map(b=>(
//                 <div key={b.label} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4,flex:1 }}>
//                   <span style={{ fontSize:18 }}>{b.icon}</span>
//                   <span style={{ fontSize:11,color:"#9ca3af",textAlign:"center",fontWeight:500 }}>{b.label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div style={{ background:"#f3f4f6",borderTop:"1px solid #e5e7eb",padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12 }}>
//           <div style={{ display:"flex",alignItems:"center",gap:10 }}>
//             <span style={{ background:"#f97316",color:"#fff",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:9999 }}>Preview Mode</span>
//             <span style={{ fontSize:13,color:"#6b7280" }}>This is how customers will see your product</span>
//           </div>
//           <button onClick={onClose} style={{ padding:"8px 18px",borderRadius:8,border:"1.5px solid #f97316",background:"#fff",color:"#f97316",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}>Close Preview</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function EditReferralCouponModal({ coupon, onClose }) {
//   const [form, setForm] = useState({ couponCode:coupon.code, referrerName:coupon.referrer, referrerCode:coupon.code, discountType:coupon.discountType||"Percentage (%)", discountValue:coupon.discountRaw||"15", rewardType:coupon.rewardType||"Percentage (%)", rewardValue:coupon.rewardValue||"5", usageLimit:coupon.total.toString(), expiryDate:coupon.expiryRaw||"" });
//   const handleChange = (e) => setForm(p=>({...p,[e.target.name]:e.target.value}));
//   const S = { width:"100%",borderRadius:8,border:"1px solid #e5e7eb",padding:"10px 14px",fontSize:14,outline:"none",fontFamily:"inherit",color:"#111827",background:"#fff" };
//   const L = { display:"block",fontSize:13,fontWeight:500,color:"#374151",marginBottom:6 };
//   return (
//     <div style={{ position:"fixed",inset:0,zIndex:20000,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",padding:"40px 16px" }}>
//       <div style={{ width:"100%",maxWidth:560,background:"#fff",borderRadius:20,boxShadow:"0 24px 64px rgba(0,0,0,0.22)",overflow:"hidden" }}>
//         <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:"22px 26px 18px",borderBottom:"1px solid #f3f4f6" }}>
//           <div><h2 style={{ margin:0,fontSize:20,fontWeight:700,color:"#111827" }}>Edit Referral Coupon</h2><p style={{ margin:"4px 0 0",fontSize:13,color:"#9ca3af" }}>Update coupon settings for {coupon.code}</p></div>
//           <button onClick={onClose} style={{ background:"#f3f4f6",border:"none",cursor:"pointer",width:32,height:32,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#6b7280" }}><X size={16}/></button>
//         </div>
//         <div style={{ padding:"22px 26px",display:"flex",flexDirection:"column",gap:18 }}>
//           <div><label style={L}>Coupon Code</label><input name="couponCode" value={form.couponCode} onChange={handleChange} className="modal-input" style={{ ...S,background:"#f3f4f6",color:"#6b7280" }} readOnly/></div>
//           <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
//             <div><label style={L}>Referrer Name</label><input name="referrerName" value={form.referrerName} onChange={handleChange} className="modal-input" style={S}/></div>
//             <div><label style={L}>Referrer Code</label><input name="referrerCode" value={form.referrerCode} onChange={handleChange} className="modal-input" style={S}/></div>
//           </div>
//           <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
//             <div><label style={L}>Discount Type <span style={{ color:"#ef4444" }}>*</span></label><select name="discountType" value={form.discountType} onChange={handleChange} className="modal-select" style={{ ...S,appearance:"none",cursor:"pointer" }}><option>Percentage (%)</option><option>Fixed Amount ($)</option></select></div>
//             <div><label style={L}>Discount Value <span style={{ color:"#ef4444" }}>*</span></label><input name="discountValue" value={form.discountValue} onChange={handleChange} type="number" className="modal-input" style={S}/></div>
//           </div>
//           <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
//             <div><label style={L}>Reward Type <span style={{ color:"#ef4444" }}>*</span></label><select name="rewardType" value={form.rewardType} onChange={handleChange} className="modal-select" style={{ ...S,appearance:"none",cursor:"pointer" }}><option>Percentage (%)</option><option>Fixed Amount ($)</option></select></div>
//             <div><label style={L}>Reward Value <span style={{ color:"#ef4444" }}>*</span></label><input name="rewardValue" value={form.rewardValue} onChange={handleChange} type="number" className="modal-input" style={S}/></div>
//           </div>
//           <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
//             <div><label style={L}>Usage Limit <span style={{ color:"#ef4444" }}>*</span></label><input name="usageLimit" value={form.usageLimit} onChange={handleChange} type="number" className="modal-input" style={S}/><p style={{ margin:"5px 0 0",fontSize:12,color:"#9ca3af" }}>Current usage: {coupon.used}</p></div>
//             <div><label style={L}>Expiry Date <span style={{ color:"#ef4444" }}>*</span></label><input name="expiryDate" value={form.expiryDate} onChange={handleChange} type="date" className="modal-input" style={{ ...S,color:form.expiryDate?"#111827":"#9ca3af" }}/></div>
//           </div>
//         </div>
//         <div style={{ display:"flex",alignItems:"center",justifyContent:"flex-end",gap:10,padding:"16px 26px",borderTop:"1px solid #f3f4f6",background:"#f3f4f6" }}>
//           <button onClick={onClose} style={{ padding:"9px 22px",borderRadius:9,border:"1px solid #d1d5db",background:"#fff",fontSize:14,fontWeight:500,color:"#374151",cursor:"pointer",fontFamily:"inherit" }}>Cancel</button>
//           <button onClick={onClose} style={{ padding:"9px 22px",borderRadius:9,border:"none",background:"#f97316",fontSize:14,fontWeight:600,color:"#fff",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:7 }}><Pencil size={14}/> Update Coupon</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function EditProductPage({ product, onBack, onSave }) {
//   const [form, setForm] = useState({ name:product.name,sku:product.sku,category:product.category,vendor:product.vendor,price:product.price.toString(),stock:product.stock.toString(),status:product.status==="approved"?"Approved":product.status==="pending"?"Pending":"Out of Stock",description:product.description });
//   const [specs, setSpecs] = useState({});
//   const [images, setImages] = useState([product.image]);
//   const fileInputRef = useRef(null);
//   const handleChange = (e) => setForm(p=>({...p,[e.target.name]:e.target.value}));
//   const handleSpecChange = (key,val) => setSpecs(p=>({...p,[key]:val}));
//   const handleFileChange = (e) => { const urls=Array.from(e.target.files||[]).map(f=>URL.createObjectURL(f)); setImages(prev=>[...prev,...urls]); };
//   const removeImage = (idx) => setImages(prev=>prev.filter((_,i)=>i!==idx));
//   const currentSpecs = categorySpecs[form.category]||[];

//   const iS = { width:"100%",borderRadius:8,border:"1px solid #d1d5db",padding:"8px 12px",fontSize:13,outline:"none",fontFamily:"inherit",color:"#111827",background:"#fff" };
//   const lS = { display:"block",fontSize:12,fontWeight:500,color:"#4b5563",marginBottom:4 };

//   return (
//     <div style={{ position:"fixed",inset:0,zIndex:10000,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",padding:"40px 16px" }}>
//       <div style={{ width:"100%",maxWidth:640,background:"#fff",borderRadius:18,boxShadow:"0 20px 60px rgba(0,0,0,0.25)",overflow:"hidden" }}>
//         <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 24px",borderBottom:"1px solid #e5e7eb" }}>
//           <h2 style={{ margin:0,fontSize:16,fontWeight:700,color:"#111827" }}>Edit Product</h2>
//           <button onClick={onBack} style={{ background:"none",border:"none",cursor:"pointer",color:"#9ca3af",display:"flex",padding:0 }}><X size={20}/></button>
//         </div>
//         <div style={{ padding:"20px 24px",maxHeight:"72vh",overflowY:"auto" }}>
//           <p style={{ margin:"0 0 16px",fontSize:13,fontWeight:600,color:"#374151" }}>Basic Information</p>
//           <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
//             <div><label style={lS}>Product Name <span style={{ color:"#ef4444" }}>*</span></label><input name="name" value={form.name} onChange={handleChange} className="modal-input" style={iS}/></div>
//             <div><label style={lS}>SKU <span style={{ color:"#ef4444" }}>*</span></label><input name="sku" value={form.sku} onChange={handleChange} className="modal-input" style={{ ...iS,fontFamily:"monospace" }}/></div>
//           </div>
//           <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
//             <div><label style={lS}>Category <span style={{ color:"#ef4444" }}>*</span></label><select name="category" value={form.category} onChange={handleChange} className="modal-select" style={{ ...iS,appearance:"none",cursor:"pointer" }}><option value="">Select category</option><option>Electronics</option><option>Fashion</option><option>Home &amp; Garden</option><option>Sports</option><option>Beauty</option></select></div>
//             <div><label style={lS}>Vendor</label><input name="vendor" value={form.vendor} onChange={handleChange} className="modal-input" style={iS}/></div>
//           </div>
//           <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
//             <div><label style={lS}>Price ($) <span style={{ color:"#ef4444" }}>*</span></label><input name="price" value={form.price} onChange={handleChange} type="number" className="modal-input" style={iS}/></div>
//             <div><label style={lS}>Stock Quantity</label><input name="stock" value={form.stock} onChange={handleChange} type="number" className="modal-input" style={iS}/></div>
//           </div>
//           <div style={{ marginBottom:16 }}><label style={lS}>Status</label><select name="status" value={form.status} onChange={handleChange} className="modal-select" style={{ ...iS,appearance:"none",cursor:"pointer" }}><option>Pending</option><option>Approved</option><option>Out of Stock</option></select></div>
//           <div style={{ marginBottom:16 }}><label style={lS}>Description</label><textarea name="description" value={form.description} onChange={handleChange} rows={3} className="modal-textarea" style={{ ...iS,resize:"none" }}/></div>
//           <div style={{ marginBottom:currentSpecs.length>0?16:0 }}>
//             <p style={{ ...lS,marginBottom:8,fontWeight:600 }}>Product Images</p>
//             <label style={{ display:"flex",alignItems:"center",gap:12,cursor:"pointer",marginBottom:12 }}>
//               <div style={{ display:"flex",alignItems:"center",gap:6,padding:"8px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:13,color:"#374151",background:"#fff" }}><Upload size={14}/> Add More Images</div>
//               <span style={{ fontSize:13,color:"#9ca3af" }}>{images.length} image(s)</span>
//               <input type="file" multiple accept="image/*" style={{ display:"none" }} ref={fileInputRef} onChange={handleFileChange}/>
//             </label>
//             <div style={{ display:"flex",flexWrap:"wrap",gap:10 }}>
//               {images.map((src,idx)=>(
//                 <div key={idx} style={{ position:"relative",width:90,height:90,borderRadius:10,overflow:"hidden",border:idx===0?"2px solid #f97316":"2px solid #e5e7eb" }}>
//                   <img src={src} alt={`img-${idx}`} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
//                   {idx===0&&<div style={{ position:"absolute",top:5,left:5,background:"#f97316",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:9999 }}>Primary</div>}
//                   {images.length>1&&<button onClick={()=>removeImage(idx)} style={{ position:"absolute",top:3,right:3,width:18,height:18,borderRadius:"50%",background:"rgba(0,0,0,0.55)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}><X size={10} color="#fff"/></button>}
//                 </div>
//               ))}
//             </div>
//           </div>
//           {currentSpecs.length>0&&(
//             <div>
//               <p style={{ ...lS,marginBottom:4,fontWeight:600,fontSize:13 }}>Product Specifications</p>
//               <p style={{ fontSize:12,color:"#9ca3af",margin:"0 0 12px" }}>Add specific details for this product category</p>
//               <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
//                 {currentSpecs.map(spec=>(
//                   <div key={spec.key}>
//                     <label style={lS}>{spec.label}</label>
//                     <select value={specs[spec.key]||""} onChange={e=>handleSpecChange(spec.key,e.target.value)} className="modal-select" style={{ ...iS,appearance:"none",cursor:"pointer" }}>
//                       {spec.options.map(opt=><option key={opt} value={opt===spec.options[0]?"":opt}>{opt}</option>)}
//                     </select>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//         <div style={{ display:"flex",alignItems:"center",justifyContent:"flex-end",gap:10,padding:"16px 24px",borderTop:"1px solid #e5e7eb",background:"#f3f4f6" }}>
//           <button onClick={onBack} style={{ padding:"8px 20px",borderRadius:8,border:"1px solid #d1d5db",background:"#fff",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",fontFamily:"inherit" }}>Cancel</button>
//           <button onClick={()=>onSave(form)} style={{ padding:"8px 20px",borderRadius:8,border:"none",background:"#f97316",fontSize:13,fontWeight:600,color:"#fff",cursor:"pointer",fontFamily:"inherit" }}>Save Changes</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CreateReferralCouponModal({ product, onClose }) {
//   const [form, setForm] = useState({ referrerName:"",referrerCode:"",couponCode:"REF-ALEX-WBH001",discountType:"Percentage (%)",discountValue:"15",rewardType:"Percentage (%)",rewardValue:"5",usageLimit:"50",expiryDate:"" });
//   const handleChange = (e) => setForm(p=>({...p,[e.target.name]:e.target.value}));
//   const generateCode = () => { if(!form.referrerCode)return; setForm(p=>({...p,couponCode:`REF-${form.referrerCode.toUpperCase()}-${product.sku.split("-")[0]}001`})); };
//   const S = { width:"100%",borderRadius:8,border:"1px solid #d1d5db",padding:"9px 12px",fontSize:13,outline:"none",fontFamily:"inherit",color:"#111827",background:"#fff" };
//   const L = { display:"block",fontSize:12,fontWeight:500,color:"#374151",marginBottom:5 };
//   return (
//     <div style={{ position:"fixed",inset:0,zIndex:20000,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"flex-start",justifyContent:"center",overflowY:"auto",padding:"40px 16px" }}>
//       <div style={{ width:"100%",maxWidth:580,background:"#fff",borderRadius:18,boxShadow:"0 24px 64px rgba(0,0,0,0.28)",overflow:"hidden" }}>
//         <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 24px",borderBottom:"1px solid #e5e7eb" }}>
//           <div><h2 style={{ margin:0,fontSize:16,fontWeight:700,color:"#111827" }}>Create Referral Coupon</h2><p style={{ margin:"3px 0 0",fontSize:12,color:"#9ca3af" }}>Create a new referral coupon for {product.name}</p></div>
//           <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"#9ca3af",display:"flex",padding:0 }}><X size={20}/></button>
//         </div>
//         <div style={{ padding:"22px 24px",maxHeight:"75vh",overflowY:"auto",display:"flex",flexDirection:"column",gap:18 }}>
//           <div style={{ background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:12,padding:"16px 18px" }}>
//             <p style={{ margin:"0 0 10px",fontSize:13,fontWeight:700,color:"#1e40af",display:"flex",alignItems:"center",gap:8 }}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
//               How Referral Codes Work
//             </p>
//             <ul style={{ margin:0,paddingLeft:0,listStyle:"none",fontSize:13,color:"#374151",lineHeight:1.7 }}>
//               <li style={{ marginBottom:6 }}>• Each referrer gets ONE auto-generated unique code (e.g., ALEX2026)</li>
//               <li style={{ marginBottom:6 }}>• When customers use the code → they get an immediate discount</li>
//               <li>• The referrer earns a coupon reward for each successful referral</li>
//             </ul>
//           </div>
//           <div style={{ background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:12,padding:"14px 18px" }}>
//             <p style={{ margin:"0 0 8px",fontSize:11,fontWeight:600,color:"#9ca3af",letterSpacing:"0.04em",textTransform:"uppercase" }}>Product</p>
//             <div style={{ display:"flex",alignItems:"center",gap:10 }}>
//               <div style={{ width:32,height:32,borderRadius:8,background:"#fff7ed",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Package size={16} color="#f97316"/></div>
//               <p style={{ margin:0,fontSize:14,fontWeight:700,color:"#111827" }}>{product.name}</p>
//             </div>
//           </div>
//           <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
//             <div><label style={L}>Referrer Name <span style={{ color:"#ef4444" }}>*</span></label><input name="referrerName" value={form.referrerName} onChange={handleChange} placeholder="e.g., Alex Martinez" className="modal-input" style={S}/></div>
//             <div><label style={L}>Referrer Code <span style={{ color:"#ef4444" }}>*</span></label><input name="referrerCode" value={form.referrerCode} onChange={handleChange} placeholder="e.g., ALEX2026" className="modal-input" style={S}/></div>
//           </div>
//           <div>
//             <label style={L}>Coupon Code <span style={{ color:"#ef4444" }}>*</span></label>
//             <div style={{ display:"flex",gap:10 }}>
//               <input name="couponCode" value={form.couponCode} onChange={handleChange} className="modal-input" style={{ ...S,flex:1 }}/>
//               <button onClick={generateCode} style={{ padding:"9px 16px",borderRadius:8,border:"1px solid #d1d5db",background:"#fff",fontSize:13,fontWeight:500,color:"#6b7280",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",flexShrink:0 }}>Generate</button>
//             </div>
//             <p style={{ margin:"5px 0 0",fontSize:11,color:"#10b981" }}>Auto-generate requires referrer code to be filled</p>
//           </div>
//           <div style={{ background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:12,padding:"16px 18px" }}>
//             <p style={{ margin:"0 0 14px",fontSize:13,fontWeight:700,color:"#16a34a" }}>Customer Discount <span style={{ fontWeight:400 }}>(for people using the code)</span></p>
//             <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
//               <div>
//                 <label style={L}>Discount Type <span style={{ color:"#ef4444" }}>*</span></label>
//                 <div style={{ position:"relative" }}>
//                   <select name="discountType" value={form.discountType} onChange={handleChange} className="modal-select" style={{ ...S,appearance:"none",cursor:"pointer",paddingRight:32 }}><option>Percentage (%)</option><option>Fixed Amount ($)</option></select>
//                   <ChevronDown size={14} color="#9ca3af" style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
//                 </div>
//               </div>
//               <div><label style={L}>Discount Value <span style={{ color:"#ef4444" }}>*</span></label><input name="discountValue" value={form.discountValue} onChange={handleChange} type="number" className="modal-input" style={S}/></div>
//             </div>
//           </div>
//           <div style={{ background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:12,padding:"16px 18px" }}>
//             <p style={{ margin:"0 0 14px",fontSize:13,fontWeight:700,color:"#ea580c" }}>Referrer Reward <span style={{ fontWeight:400 }}>(coupon they earn per successful referral)</span></p>
//             <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
//               <div>
//                 <label style={L}>Reward Type <span style={{ color:"#ef4444" }}>*</span></label>
//                 <div style={{ position:"relative" }}>
//                   <select name="rewardType" value={form.rewardType} onChange={handleChange} className="modal-select" style={{ ...S,appearance:"none",cursor:"pointer",paddingRight:32 }}><option>Percentage (%)</option><option>Fixed Amount ($)</option></select>
//                   <ChevronDown size={14} color="#9ca3af" style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
//                 </div>
//               </div>
//               <div><label style={L}>Reward Value <span style={{ color:"#ef4444" }}>*</span></label><input name="rewardValue" value={form.rewardValue} onChange={handleChange} type="number" className="modal-input" style={S}/></div>
//             </div>
//           </div>
//           <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
//             <div>
//               <label style={L}>Usage Limit <span style={{ color:"#ef4444" }}>*</span></label>
//               <input name="usageLimit" value={form.usageLimit} onChange={handleChange} type="number" className="modal-input" style={S}/>
//               <p style={{ margin:"5px 0 0",fontSize:11,color:"#9ca3af" }}>Maximum number of times this coupon can be used</p>
//             </div>
//             <div>
//               <label style={L}>Expiry Date <span style={{ color:"#ef4444" }}>*</span></label>
//               <input name="expiryDate" value={form.expiryDate} onChange={handleChange} type="date" className="modal-input" style={{ ...S,color:form.expiryDate?"#111827":"#9ca3af" }}/>
//             </div>
//           </div>
//         </div>
//         <div style={{ display:"flex",alignItems:"center",justifyContent:"flex-end",gap:10,padding:"16px 24px",borderTop:"1px solid #e5e7eb",background:"#f3f4f6" }}>
//           <button onClick={onClose} style={{ padding:"9px 22px",borderRadius:8,border:"1px solid #d1d5db",background:"#fff",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",fontFamily:"inherit" }}>Cancel</button>
//           <button onClick={onClose} style={{ padding:"9px 22px",borderRadius:8,border:"none",background:"#f97316",fontSize:13,fontWeight:600,color:"#fff",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6 }}><Plus size={14}/> Create Coupon</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ProductDetailsPage({ product, onBack }) {
//   const [activeTab, setActiveTab] = useState("referral");
//   const [showCreateCoupon, setShowCreateCoupon] = useState(false);
//   const [editingCoupon, setEditingCoupon] = useState(null);

//   // ── CHANGE 1: Reviews tab now uses Star icon ──
//   const tabs = [
//     { id: "referral",  Icon: Tag,      label: "Referral Coupons" },
//     { id: "analytics", Icon: BarChart2, label: "Analytics" },
//     { id: "inventory", Icon: Box,       label: "Inventory" },
//     { id: "reviews",   Icon: Star,      label: "Reviews" },
//   ];

//   const badge = productStatusBadge(product.status);
//   const d = FIXED_DETAIL;
//   const btnBase = { display:"flex",alignItems:"center",gap:6,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit" };

//   return (
//     <div className="page-wrap" style={{ background:"#f3f4f6",padding:"28px 32px" }}>
//       <div className="detail-topbar" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20 }}>
//         <button onClick={onBack} style={{ ...btnBase,fontSize:13,color:"#6b7280",fontWeight:500,padding:0 }}><ChevronLeft size={16}/> Back to Products</button>
//         <div className="topbar-right" style={{ display:"flex",gap:10 }}>
//           <button style={{ ...btnBase,padding:"7px 16px",fontSize:13,fontWeight:500,color:"#374151",border:"1px solid #d1d5db",borderRadius:8,background:"#fff" }}><Edit2 size={14} color="#374151"/> Edit Product</button>
//           <button style={{ ...btnBase,padding:"7px 16px",fontSize:13,fontWeight:500,color:"#ef4444",border:"1px solid #fca5a5",borderRadius:8,background:"#fff" }}><Trash2 size={14} color="#ef4444"/> Delete</button>
//         </div>
//       </div>

//       <div style={{ marginBottom:20 }}>
//         <h1 style={{ fontSize:22,fontWeight:700,color:"#111827",margin:0 }}>Product Details</h1>
//         <p style={{ fontSize:13,color:"#9ca3af",margin:"4px 0 0" }}>Manage product information and settings</p>
//       </div>

//       <div style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:14,padding:24,marginBottom:18,boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}>
//         <div className="hero-card" style={{ display:"flex",gap:24 }}>
//           <img className="hero-img" src={product.image} alt={product.name} style={{ width:130,height:130,borderRadius:12,objectFit:"cover",flexShrink:0 }}/>
//           <div style={{ flex:1,minWidth:0 }}>
//             <h2 style={{ fontSize:20,fontWeight:700,color:"#111827",margin:"0 0 10px" }}>{product.name}</h2>
//             <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:12 }}>
//               <span style={{ background:"#f97316",color:"#fff",fontSize:11,fontWeight:700,fontFamily:"monospace",padding:"3px 10px",borderRadius:9999 }}>{product.sku}</span>
//               <span style={{ background:badge.bg,color:"#fff",fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:9999 }}>{badge.label}</span>
//             </div>
//             <p style={{ fontSize:13,color:"#6b7280",lineHeight:1.65,margin:"0 0 20px" }}>{product.description}</p>
//             <div className="hero-meta-grid" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16 }}>
//               <div>
//                 <div style={{ display:"flex",alignItems:"center",gap:5,marginBottom:6 }}><Tag size={13} color="#9ca3af" strokeWidth={1.8}/><span style={{ fontSize:12,color:"#9ca3af",fontWeight:400 }}>Category</span></div>
//                 <p style={{ margin:0,fontSize:15,fontWeight:700,color:"#111827" }}>{product.category}</p>
//               </div>
//               <div>
//                 <div style={{ display:"flex",alignItems:"center",gap:5,marginBottom:6 }}><Store size={13} color="#9ca3af" strokeWidth={1.8}/><span style={{ fontSize:12,color:"#9ca3af",fontWeight:400 }}>Vendor</span></div>
//                 <p style={{ margin:0,fontSize:15,fontWeight:700,color:"#111827" }}>{product.vendor}</p>
//               </div>
//               <div>
//                 <div style={{ display:"flex",alignItems:"center",gap:5,marginBottom:6 }}><DollarSign size={13} color="#9ca3af" strokeWidth={1.8}/><span style={{ fontSize:12,color:"#9ca3af",fontWeight:400 }}>Price</span></div>
//                 <p style={{ margin:0,fontSize:15,fontWeight:700,color:"#10b981" }}>
//                   <span style={{ display:"inline-flex",alignItems:"center",gap:3 }}><DollarSign size={14} color="#10b981" strokeWidth={2}/>${product.price.toFixed(2)}</span>
//                 </p>
//               </div>
//               <div>
//                 <div style={{ display:"flex",alignItems:"center",gap:5,marginBottom:6 }}><Box size={13} color="#9ca3af" strokeWidth={1.8}/><span style={{ fontSize:12,color:"#9ca3af",fontWeight:400 }}>Stock</span></div>
//                 <p style={{ margin:0,fontSize:15,fontWeight:700,color:"#111827" }}>
//                   <span style={{ display:"inline-flex",alignItems:"center",gap:3 }}><Box size={14} color="#6b7280" strokeWidth={2}/>{product.stock}</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="kpi-detail-grid" style={{ display:"grid",gap:16,marginBottom:18 }}>
//         {[
//           { label:"Total Sales",val:d.totalSales.toLocaleString(),growth:d.salesGrowth,bg:"#f97316",Icon:ShoppingCart },
//           { label:"Total Revenue",val:formatRevenue(d.totalRevenue),growth:d.revenueGrowth,bg:"#10b981",Icon:DollarSign },
//           { label:"Product Views",val:d.productViews.toLocaleString(),growth:d.viewsGrowth,bg:"#3b82f6",Icon:Eye },
//           { label:"Rating",val:d.rating,growth:`${d.reviewCount} reviews`,bg:"#f59e0b",Icon:Star,star:true },
//         ].map(k=>(
//           <div key={k.label} className="kpi-card" style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:14,padding:"20px 22px",boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}>
//             <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between" }}>
//               <div>
//                 <p style={{ margin:"0 0 6px",fontSize:13,color:"#6b7280" }}>{k.label}</p>
//                 <p className="kpi-card-val" style={{ margin:"0 0 6px",fontSize:30,fontWeight:800,color:"#111827",lineHeight:1 }}>{k.val}</p>
//                 <div style={{ display:"flex",alignItems:"center",gap:4,fontSize:12,color:k.star?"#f59e0b":"#10b981" }}>
//                   {k.star?<Star size={12} fill="#f59e0b" color="#f59e0b"/>:<TrendingUp size={12}/>}{k.growth}
//                 </div>
//               </div>
//               <div style={{ width:44,height:44,borderRadius:12,background:k.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
//                 <k.Icon size={20} color="#fff" fill={k.star?"#fff":"none"}/>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:14,boxShadow:"0 1px 3px rgba(0,0,0,0.05)",overflow:"hidden" }}>
//         <div className="tabs-bar" style={{ borderBottom:"1px solid #e5e7eb",paddingLeft:24,paddingRight:24,overflowX:"auto",borderRadius:"14px 14px 0 0" }}>
//           <div style={{ display:"flex",minWidth:"max-content" }}>
//             {tabs.map(t=>{
//               const active = activeTab===t.id;
//               return (
//                 <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{ display:"flex",alignItems:"center",gap:7,padding:"14px 16px",fontSize:13,fontWeight:active?600:500,background:"none",border:"none",cursor:"pointer",borderBottom:active?"2px solid #f97316":"2px solid transparent",color:active?"#f97316":"#6b7280",marginBottom:-1,whiteSpace:"nowrap",fontFamily:"inherit",transition:"color .15s" }}>
//                   <t.Icon size={15} color={active?"#f97316":"#6b7280"}/>
//                   {t.label}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         <div style={{ padding:24 }}>
//           {activeTab==="referral"&&(
//             <>
//               <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:20 }}>
//                 <div><h3 style={{ fontSize:16,fontWeight:700,color:"#111827",margin:"0 0 4px" }}>Referral Discount Configuration</h3><p style={{ fontSize:13,color:"#9ca3af",margin:0 }}>Configure discount rules for referral codes used on {product.name}</p></div>
//                 <button style={{ display:"flex",alignItems:"center",gap:6,padding:"8px 18px",background:"#f97316",color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit" }} onClick={()=>setShowCreateCoupon(true)}><Plus size={14}/> Add Rule</button>
//               </div>
//               <div className="referral-scroll" style={{ border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden" }}>
//                 <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
//                   <thead><tr style={{ background:"#f3f4f6",borderBottom:"1px solid #e5e7eb" }}>{["COUPON CODE","REFERRER","DISCOUNT","USAGE","EXPIRY","STATUS","ACTIONS"].map(h=><th key={h} style={{ padding:"10px 16px",textAlign:"left",fontSize:11,fontWeight:700,color:"#9ca3af",letterSpacing:"0.05em",whiteSpace:"nowrap" }}>{h}</th>)}</tr></thead>
//                   <tbody>
//                     {d.referralCoupons.map((c,i)=>{
//                       const cs=couponStatusStyle(c.status); const pct=Math.min(100,(c.used/c.total)*100); const last=i===d.referralCoupons.length-1;
//                       return (
//                         <tr key={c.code} style={{ borderBottom:last?"none":"1px solid #f3f4f6",background:"#fff" }}>
//                           <td style={{ padding:"14px 16px",whiteSpace:"nowrap" }}><div style={{ display:"flex",alignItems:"center",gap:8 }}><span style={{ fontFamily:"monospace",fontWeight:700,fontSize:12,color:"#111827" }}>{c.code}</span><button style={{ background:"none",border:"none",cursor:"pointer",color:"#d1d5db",padding:0,display:"flex" }}><Copy size={12}/></button></div></td>
//                           <td style={{ padding:"14px 16px" }}><p style={{ margin:0,fontWeight:600,color:"#111827",fontSize:13 }}>{c.referrer}</p><p style={{ margin:0,fontSize:11,color:"#9ca3af" }}>{c.email}</p></td>
//                           <td style={{ padding:"14px 16px",whiteSpace:"nowrap" }}><span style={{ fontWeight:700,color:"#f97316",fontSize:13,display:"flex",alignItems:"center",gap:4 }}><span style={{ fontSize:12 }}>{c.discountPrefix}</span>{c.discountValue}</span></td>
//                           <td style={{ padding:"14px 16px" }}><span style={{ fontSize:13,fontWeight:600,color:"#374151" }}>{c.used}/{c.total}</span><div style={{ width:90,height:4,background:"#e5e7eb",borderRadius:9999,marginTop:5 }}><div className="prog-fill" style={{ width:`${pct}%`,height:4,background:"#f97316",borderRadius:9999 }}/></div></td>
//                           <td style={{ padding:"14px 16px",whiteSpace:"nowrap" }}><div style={{ display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#6b7280" }}><span>🗓</span>{c.expiry}</div></td>
//                           <td style={{ padding:"14px 16px" }}><span style={{ background:cs.bg,color:cs.color,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:9999,display:"inline-block" }}>{c.status}</span></td>
//                           <td style={{ padding:"14px 16px" }}><div style={{ display:"flex",alignItems:"center",gap:10 }}><button onClick={()=>setEditingCoupon(c)} style={{ background:"none",border:"none",cursor:"pointer",color:"#6b7280",padding:0,display:"flex" }}><Edit2 size={14}/></button><button style={{ background:"none",border:"none",cursor:"pointer",color:"#ef4444",padding:0,display:"flex" }}><Trash2 size={14}/></button></div></td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           )}
//           {activeTab==="analytics"&&<div style={{ padding:"48px 0",textAlign:"center",color:"#9ca3af",fontSize:14 }}>Analytics charts coming soon.</div>}
//           {activeTab==="inventory"&&<div style={{ padding:"48px 0",textAlign:"center",color:"#9ca3af",fontSize:14 }}>Inventory details coming soon.</div>}
//           {activeTab==="reviews"&&<div style={{ padding:"48px 0",textAlign:"center",color:"#9ca3af",fontSize:14 }}>Customer reviews coming soon.</div>}
//         </div>
//       </div>

//       {showCreateCoupon&&<CreateReferralCouponModal product={product} onClose={()=>setShowCreateCoupon(false)}/>}
//       {editingCoupon&&<EditReferralCouponModal coupon={editingCoupon} onClose={()=>setEditingCoupon(null)}/>}
//     </div>
//   );
// }

// export default function Products() {
//   const [search, setSearch]                   = useState("");
//   const [categoryFilter, setCategoryFilter]   = useState("All Categories");
//   const [statusFilter, setStatusFilter]       = useState("All Status");
//   const [showModal, setShowModal]             = useState(false);
//   const [form, setForm]                       = useState({ name:"",sku:"PRD-2024-001",category:"",vendor:"",price:"",stock:"",paidAmount:"",status:"Pending",description:"" });
//   const [imageCount, setImageCount]           = useState(0);
//   const [openMenuId, setOpenMenuId]           = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [editingProduct, setEditingProduct]   = useState(null);
//   const [previewProduct, setPreviewProduct]   = useState(null);
//   const menuRef = useRef(null);

//   useEffect(() => {
//     const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenuId(null); };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const categoryOptions = ["All Categories","Electronics","Fashion","Home & Garden","Sports","Beauty"];
//   const statusOptions   = ["All Status","Approved","Pending","Rejected","Out of Stock"];
//   const statusMap = { "All Status":null,"Approved":"approved","Pending":"pending","Rejected":"rejected","Out of Stock":"out-of-stock" };

//   const filtered = productsData.filter((p) => {
//     const ms = statusMap[statusFilter];
//     return p.name.toLowerCase().includes(search.toLowerCase()) && (categoryFilter==="All Categories"||p.category===categoryFilter) && (ms===null||p.status===ms);
//   });

//   const hasFilters = categoryFilter!=="All Categories"||statusFilter!=="All Status"||search!=="";

//   const totalProducts  = productsData.length;
//   const activeListings = productsData.filter(p=>p.status==="approved").length;
//   const pendingCount   = productsData.filter(p=>p.status==="pending").length;
//   const outOfStock     = productsData.filter(p=>p.stock===0).length;

//   const statusPillStyle = (s) => {
//     if (s==="approved")     return { background:"#10b981",color:"#fff" };
//     if (s==="pending")      return { background:"#f59e0b",color:"#fff" };
//     if (s==="out-of-stock") return { background:"#374151",color:"#fff" };
//     return { background:"#e5e7eb",color:"#6b7280" };
//   };
//   const stockStyle = (n) => {
//     if (n===0) return { color:"#ef4444",fontWeight:700 };
//     if (n<50)  return { color:"#f97316",fontWeight:700 };
//     return { color:"#10b981",fontWeight:700 };
//   };

//   const handleChange     = (e) => setForm(p=>({...p,[e.target.name]:e.target.value}));
//   const handleFileChange = (e) => setImageCount(e.target.files?.length||0);
//   const handleClose      = () => { setShowModal(false); setForm({ name:"",sku:"PRD-2024-001",category:"",vendor:"",price:"",stock:"",paidAmount:"",status:"Pending",description:"" }); setImageCount(0); };

//   const addInputStyle = { width:"100%",borderRadius:8,border:"1px solid #d1d5db",padding:"8px 12px",fontSize:13,outline:"none",fontFamily:"inherit",background:"#fff",color:"#374151" };
//   const labelStyle = { display:"block",fontSize:12,fontWeight:500,color:"#4b5563",marginBottom:4 };
//   const menuItem = (color="#374151") => ({ display:"flex",width:"100%",alignItems:"center",gap:9,padding:"9px 14px",fontSize:12,color,background:"none",border:"none",cursor:"pointer",textAlign:"left",fontFamily:"inherit" });

//   return (
//     <>
//       <style>{globalCSS}</style>
//       <div className="page-wrap min-h-screen" style={{ background:"#f3f4f6",padding:selectedProduct?0:"28px 32px" }}>

//         {previewProduct&&<CustomerPreviewModal product={previewProduct} onClose={()=>setPreviewProduct(null)}/>}

//         {showModal&&(
//           <div style={{ position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"center" }}>
//             <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.4)" }} onClick={handleClose}/>
//             <div className="add-product-modal" style={{ position:"relative",zIndex:10,width:"100%",maxWidth:640,margin:"0 16px",background:"#fff",borderRadius:18,boxShadow:"0 20px 60px rgba(0,0,0,0.2)",overflow:"hidden" }}>
//               <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 24px",borderBottom:"1px solid #e5e7eb" }}>
//                 <h2 style={{ margin:0,fontSize:16,fontWeight:700,color:"#111827" }}>Add New Product</h2>
//                 <button onClick={handleClose} style={{ background:"none",border:"none",cursor:"pointer",color:"#9ca3af",display:"flex" }}><X size={20}/></button>
//               </div>
//               <div style={{ padding:"20px 24px",maxHeight:"72vh",overflowY:"auto" }}>
//                 <p style={{ margin:"0 0 16px",fontSize:13,fontWeight:600,color:"#374151" }}>Basic Information</p>
//                 <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
//                   <div><label style={labelStyle}>Product Name <span style={{ color:"#ef4444" }}>*</span></label><input name="name" value={form.name} onChange={handleChange} placeholder="Enter product name" className="add-modal-input" style={addInputStyle}/></div>
//                   <div><label style={labelStyle}>SKU <span style={{ color:"#ef4444" }}>*</span></label><input name="sku" value={form.sku} onChange={handleChange} placeholder="PRD-2024-001" className="add-modal-input" style={addInputStyle}/></div>
//                 </div>
//                 <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
//                   <div><label style={labelStyle}>Category <span style={{ color:"#ef4444" }}>*</span></label><select name="category" value={form.category} onChange={handleChange} className="add-modal-select" style={{ ...addInputStyle,appearance:"none",cursor:"pointer" }}><option value="">Select category</option><option>Electronics</option><option>Fashion</option><option>Home &amp; Garden</option><option>Sports</option><option>Beauty</option></select></div>
//                   <div><label style={labelStyle}>Vendor</label><input name="vendor" value={form.vendor} onChange={handleChange} placeholder="Vendor name" className="add-modal-input" style={addInputStyle}/></div>
//                 </div>
//                 <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
//                   <div><label style={labelStyle}>Price ($) <span style={{ color:"#ef4444" }}>*</span></label><input name="price" value={form.price} onChange={handleChange} type="number" placeholder="0.00" className="add-modal-input" style={addInputStyle}/></div>
//                   <div><label style={labelStyle}>Stock Quantity</label><input name="stock" value={form.stock} onChange={handleChange} type="number" placeholder="0" className="add-modal-input" style={addInputStyle}/></div>
//                 </div>
//                 <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
//                   <div><label style={labelStyle}>Paid Amount ($)</label><input name="paidAmount" value={form.paidAmount} onChange={handleChange} type="number" placeholder="e.g., 30.00" className="add-modal-input" style={addInputStyle}/></div>
//                   <div><label style={labelStyle}>Status</label><select name="status" value={form.status} onChange={handleChange} className="add-modal-select" style={{ ...addInputStyle,appearance:"none",cursor:"pointer" }}><option>Pending</option><option>Approved</option><option>Out of Stock</option></select></div>
//                 </div>
//                 <div style={{ marginBottom:16 }}><label style={labelStyle}>Description</label><textarea name="description" value={form.description} onChange={handleChange} placeholder="Enter product description" rows={3} className="add-modal-textarea" style={{ ...addInputStyle,resize:"none" }}/></div>
//                 <div>
//                   <p style={{ ...labelStyle,marginBottom:8,fontWeight:600 }}>Product Images</p>
//                   <label style={{ display:"flex",alignItems:"center",gap:12,cursor:"pointer" }}>
//                     <div style={{ display:"flex",alignItems:"center",gap:6,padding:"8px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:13,color:"#374151",background:"#fff" }}><Upload size={14}/> Upload Images</div>
//                     <span style={{ fontSize:13,color:"#9ca3af" }}>{imageCount>0?`${imageCount} image(s) uploaded`:"0 image(s) uploaded"}</span>
//                     <input type="file" multiple accept="image/*" style={{ display:"none" }} onChange={handleFileChange}/>
//                   </label>
//                 </div>
//               </div>
//               <div style={{ display:"flex",alignItems:"center",justifyContent:"flex-end",gap:10,padding:"16px 24px",borderTop:"1px solid #e5e7eb",background:"#f3f4f6" }}>
//                 <button onClick={handleClose} style={{ padding:"8px 20px",borderRadius:8,border:"1px solid #d1d5db",background:"#fff",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",fontFamily:"inherit" }}>Cancel</button>
//                 <button onClick={handleClose} style={{ padding:"8px 20px",borderRadius:8,border:"none",background:"#f97316",fontSize:13,fontWeight:600,color:"#fff",cursor:"pointer",fontFamily:"inherit" }}>Add Product</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {!selectedProduct&&(
//           <div className="page-header" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:28 }}>
//             <div>
//               <h1 style={{ margin:0,fontSize:26,fontWeight:700,color:"#111827" }}>Products</h1>
//               <p style={{ margin:"4px 0 0",fontSize:13,color:"#9ca3af" }}>Manage product listings and inventory</p>
//             </div>
//             <div className="page-header-actions" style={{ display:"flex",gap:10 }}>
//               <button className="export-btn"><Download size={15}/> Export</button>
//               <button onClick={()=>setShowModal(true)} style={{ display:"flex",alignItems:"center",gap:7,padding:"9px 20px",border:"none",borderRadius:9,background:"#f97316",fontSize:13,fontWeight:600,color:"#fff",cursor:"pointer",fontFamily:"inherit" }}><Plus size={15}/> Add Product</button>
//             </div>
//           </div>
//         )}

//         {!selectedProduct&&(
//           <>
//             <div className="kpi-list-grid" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24 }}>
//               <div style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:14,padding:"20px 22px",boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}><div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between" }}><div><p style={{ margin:"0 0 6px",fontSize:13,color:"#6b7280" }}>Total Products</p><p className="kpi-list-val" style={{ margin:0,fontSize:35,fontWeight:700,color:"#111827" }}>{totalProducts}</p></div><div style={{ width:44,height:44,borderRadius:12,background:"#f97316",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><Package size={20} color="#fff"/></div></div></div>
//               <div style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:14,padding:"20px 22px",boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}><p style={{ margin:"0 0 6px",fontSize:13,color:"#6b7280" }}>Active Listings</p><p className="kpi-list-val" style={{ margin:0,fontSize:35,fontWeight:700,color:"#10b981" }}>{activeListings}</p></div>
//               <div style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:14,padding:"20px 22px",boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}><p style={{ margin:"0 0 6px",fontSize:13,color:"#6b7280" }}>Pending Approval</p><p className="kpi-list-val" style={{ margin:"0 0 8px",fontSize:35,fontWeight:700,color:"#f97316" }}>{pendingCount}</p>{pendingCount>0&&<span style={{ background:"#f97316",color:"#fff",fontSize:11,fontWeight:600,padding:"2px 10px",borderRadius:9999,display:"inline-block" }}>Action Needed</span>}</div>
//               <div style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:14,padding:"20px 22px",boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}><p style={{ margin:"0 0 6px",fontSize:13,color:"#6b7280" }}>Out of Stock</p><p className="kpi-list-val" style={{ margin:0,fontSize:35,fontWeight:700,color:"#ef4444" }}>{outOfStock}</p></div>
//             </div>

//             <div style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:14,boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}>
//               <div style={{ padding:"16px 24px",borderBottom:"1px solid #e5e7eb" }}>
//                 <div className="toolbar-row" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:12 }}>
//                   <h2 style={{ margin:0,fontSize:15,fontWeight:600,color:"#111827",whiteSpace:"nowrap" }}>
//                     All Products{hasFilters&&<span style={{ marginLeft:8,fontSize:13,fontWeight:400,color:"#f97316" }}>({filtered.length} result{filtered.length!==1?"s":""})</span>}
//                   </h2>
//                   <div className="filters-wrap" style={{ display:"flex",flexWrap:"wrap",gap:10,alignItems:"center" }}>
//                     <div className="search-input-wrap" style={{ position:"relative" }}>
//                       <Search size={15} style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af",pointerEvents:"none" }}/>
//                       <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." className="search-input" style={{ paddingLeft:32,paddingRight:14,paddingTop:8,paddingBottom:8,border:"1px solid #d1d5db",borderRadius:8,fontSize:13,width:210,fontFamily:"inherit",background:"#fff",color:"#374151" }}/>
//                     </div>
//                     <CustomDropdown value={categoryFilter} onChange={setCategoryFilter} options={categoryOptions} minWidth={160}/>
//                     <CustomDropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} minWidth={140}/>
//                   </div>
//                 </div>
//               </div>

//               <div className="table-scroll" style={{ overflowX:"auto" }}>
//                 <table className="prod-table" style={{ width:"100%",borderCollapse:"collapse",tableLayout:"fixed" }}>
//                   <colgroup>
//                     <col style={{ width:"28%" }}/><col style={{ width:"14%" }}/><col style={{ width:"12%" }}/><col style={{ width:"13%" }}/><col style={{ width:"9%" }}/><col style={{ width:"7%" }}/><col style={{ width:"11%" }}/><col style={{ width:"6%" }}/>
//                   </colgroup>
//                   <thead>
//                     <tr style={{ borderBottom:"1px solid #e5e7eb" }}>
//                       {["Product","SKU","Category","Vendor","Price","Stock","Status","Actions"].map(h=>(
//                         <th key={h} style={{ padding:"12px 12px",textAlign:"left",fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:"0.05em" }}>{h}</th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filtered.map((product)=>{
//                       const ps=statusPillStyle(product.status); const sc=stockStyle(product.stock); const isPending=product.status==="pending";
//                       return (
//                         <tr key={product.id} style={{ borderBottom:"1px solid #f3f4f6",transition:"background .12s" }} onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"} onMouseLeave={e=>e.currentTarget.style.background=""}>
//                           <td style={{ padding:"14px 12px" }}><div style={{ display:"flex",alignItems:"center",gap:12 }}><img src={product.image} alt={product.name} style={{ width:46,height:46,borderRadius:10,objectFit:"cover",flexShrink:0 }}/><span style={{ fontSize:16,fontWeight:600,color:"#111827",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{product.name}</span></div></td>
//                           <td style={{ padding:"14px 12px" }}><span style={{ background:"#f1f5f9",borderRadius:6,padding:"2px 8px",fontFamily:"monospace",fontSize:11,color:"#64748b" }}>{product.sku}</span></td>
//                           <td style={{ padding:"14px 12px",fontSize:15,color:"#6b7280",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{product.category}</td>
//                           <td style={{ padding:"14px 12px",fontSize:15,color:"#6b7280",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{product.vendor}</td>
//                           <td style={{ padding:"14px 12px",fontSize:14,fontWeight:400,color:"#374151",whiteSpace:"nowrap" }}>${product.price.toLocaleString("en-US",{ minimumFractionDigits:2 })}</td>
//                           <td style={{ padding:"14px 12px" }}><span style={{ fontSize:14,...sc }}>{product.stock}</span></td>
//                           <td style={{ padding:"14px 12px" }}><span style={{ ...ps,borderRadius:9999,padding:"3px 12px",fontSize:11,fontWeight:600,display:"inline-flex",alignItems:"center" }}>{product.status}</span></td>
//                           <td style={{ padding:"14px 12px" }}>
//                             <div style={{ position:"relative" }} ref={openMenuId===product.id?menuRef:null}>
//                               {/* ── CHANGE 2: three-dots button now has orange hover via CSS class ── */}
//                               <button
//                                 className="three-dots-btn"
//                                 onClick={()=>setOpenMenuId(openMenuId===product.id?null:product.id)}
//                               >
//                                 <MoreVertical size={16}/>
//                               </button>
//                               {openMenuId===product.id&&(
//                                 <div style={{ position:"absolute",right:0,zIndex:30,width:172,background:"#fff",border:"1px solid #e5e7eb",borderRadius:12,boxShadow:"0 10px 30px rgba(0,0,0,.12)",padding:"4px 0",...(product.id>=5?{ bottom:34 }:{ top:34 }) }}>
//                                   <button onClick={()=>{ setOpenMenuId(null); setPreviewProduct(product); }} onMouseEnter={e=>e.currentTarget.style.background="#f3f4f6"} onMouseLeave={e=>e.currentTarget.style.background=""} style={menuItem()}><Eye size={13} color="#9ca3af"/> Customer Preview</button>
//                                   <button onClick={()=>{ setOpenMenuId(null); setSelectedProduct(product); }} onMouseEnter={e=>e.currentTarget.style.background="#f3f4f6"} onMouseLeave={e=>e.currentTarget.style.background=""} style={menuItem()}><Eye size={13} color="#9ca3af"/> View Details</button>
//                                   <button onClick={()=>{ setOpenMenuId(null); setEditingProduct(product); }} onMouseEnter={e=>e.currentTarget.style.background="#f3f4f6"} onMouseLeave={e=>e.currentTarget.style.background=""} style={menuItem()}><Pencil size={13} color="#9ca3af"/> Edit Product</button>
//                                   {isPending&&(
//                                     <>
//                                       <button onClick={()=>setOpenMenuId(null)} onMouseEnter={e=>e.currentTarget.style.background="#f0fdf4"} onMouseLeave={e=>e.currentTarget.style.background=""} style={menuItem("#16a34a")}><CheckCircle size={13} color="#16a34a"/> Approve</button>
//                                       <button onClick={()=>setOpenMenuId(null)} onMouseEnter={e=>e.currentTarget.style.background="#fef2f2"} onMouseLeave={e=>e.currentTarget.style.background=""} style={menuItem("#dc2626")}><XCircle size={13} color="#dc2626"/> Reject</button>
//                                     </>
//                                   )}
//                                   <div style={{ height:1,background:"#f1f5f9",margin:"4px 0" }}/>
//                                   <button onClick={()=>setOpenMenuId(null)} onMouseEnter={e=>e.currentTarget.style.background="#fef2f2"} onMouseLeave={e=>e.currentTarget.style.background=""} style={menuItem("#ef4444")}><Trash2 size={13} color="#f87171"/> Delete</button>
//                                 </div>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>

//               {filtered.length===0&&(
//                 <div style={{ textAlign:"center",padding:"56px 0",color:"#9ca3af",fontSize:13 }}>
//                   No products found.
//                 </div>
//               )}
//             </div>
//           </>
//         )}

//         {selectedProduct&&(
//           <ProductDetailsPage
//             product={selectedProduct}
//             onBack={()=>setSelectedProduct(null)}
//           />
//         )}
//       </div>

//       {editingProduct&&(
//         <>
//           <style>{globalCSS}</style>
//           <EditProductPage
//             product={editingProduct}
//             onBack={()=>setEditingProduct(null)}
//             onSave={()=>setEditingProduct(null)}
//           />
//         </>
//       )}
//     </>
//   );
// }

"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Search, Download, Plus, MoreVertical, Package, X, Upload,
  Eye, Pencil, Trash2, Star, ShoppingCart, DollarSign,
  TrendingUp, Copy, Edit2, ChevronLeft,
  Heart, Share2, ShoppingBag, CheckCircle, XCircle, Check, ChevronDown,
  Tag, Store, BarChart2, Box, AlertCircle, Loader2,
} from "lucide-react";
import { useProducts, useProduct, useProductMutations } from "../hooks/useProducts";
import { productsAPI } from "../services/api";

// ─────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────
const productStatusBadge = (s) => {
  if (s === "approved")     return { bg: "#10b981", label: "approved" };
  if (s === "pending")      return { bg: "#f59e0b", label: "pending" };
  if (s === "out-of-stock") return { bg: "#374151", label: "out-of-stock" };
  return { bg: "#9ca3af", label: s ?? "unknown" };
};

const couponStatusStyle = (s) => {
  if (s === "Active")   return { bg: "#10b981", color: "#fff" };
  if (s === "Used")     return { bg: "#ef4444", color: "#fff" };
  if (s === "Expired")  return { bg: "#6b7280", color: "#fff" };
  return { bg: "#e5e7eb", color: "#374151" };
};

const formatRevenue = (n) =>
  n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;

/** Normalise backend product shape → UI-friendly shape */
const normalise = (p) => ({
  ...p,
  id        : p._id,
  name      : p.title,
  sku       : p.variants?.[0]?.sku ?? p._id,
  category  : p.category?.name ?? p.category ?? "—",
  vendor    : p.variants?.[0]?.currentVendor?.storeName ?? p.brand ?? "—",
  price     : p.variants?.[0]?.sellingPrice ?? 0,
  originalPrice: null,
  stock     : p.variants?.reduce((sum, v) => sum + (v.currentStock ?? 0), 0) ?? 0,
  status    : p.isActive
    ? (p.variants?.some(v => v.currentStock > 0) ? "approved" : "out-of-stock")
    : "pending",
  image     : p.images?.[0] ?? "https://placehold.co/300x300?text=No+Image",
  description: p.description ?? "",
  referralCoupons: p.referralCoupons ?? [],
});

// ─────────────────────────────────────────────────
//  Inline CSS
// ─────────────────────────────────────────────────
const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #f1f5f9; }
  ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  .page-wrap::-webkit-scrollbar { display: none !important; }
  .page-wrap { scrollbar-width: none !important; }
  .tabs-bar::-webkit-scrollbar { display:none!important; width:0!important; height:0!important; }
  .tabs-bar { scrollbar-width:none!important; -ms-overflow-style:none!important; background:#fff; }
  .prog-fill { transition: width 0.4s ease; }

  .modal-input:focus,.modal-select:focus,.modal-textarea:focus,
  .add-modal-input:focus,.add-modal-select:focus,.add-modal-textarea:focus,
  .search-input:focus {
    border-color:#f97316!important;
    box-shadow:0 0 0 3px rgba(249,115,22,0.15)!important;
    outline:none!important;
  }
  .modal-input:hover,.modal-select:hover,.modal-textarea:hover,
  .add-modal-input:hover,.add-modal-select:hover,.add-modal-textarea:hover,
  .search-input:hover { border-color:#fdba74!important; }

  .custom-dd-btn:hover { border-color:#fdba74!important; }
  .custom-dd-btn.open  { border-color:#f97316!important; box-shadow:0 0 0 3px rgba(249,115,22,0.15)!important; }

  .three-dots-btn { background:none; border:none; cursor:pointer; color:#9ca3af; padding:4px 6px; border-radius:6px; display:flex; font-family:inherit; transition:background .15s,color .15s; }
  .three-dots-btn:hover { background:#fff7ed!important; color:#f97316!important; }
  .three-dots-btn:hover svg { stroke:#f97316!important; }

  .export-btn { display:flex; align-items:center; gap:7px; padding:9px 18px; border:1.5px solid #d1d5db; border-radius:9px; background:#fff; font-size:13px; font-weight:500; color:#374151; cursor:pointer; font-family:inherit; transition:border-color .18s,color .18s,background .18s,box-shadow .18s; }
  .export-btn:hover { border-color:#f97316!important; color:#f97316!important; background:#fff7ed!important; box-shadow:0 0 0 3px rgba(249,115,22,0.10)!important; }

  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.8s linear infinite; }

  @media (max-width:767px) {
    .page-wrap                { padding:14px!important; }
    .page-header              { flex-direction:column!important; align-items:flex-start!important; gap:10px!important; }
    .kpi-list-grid            { grid-template-columns:1fr 1fr!important; gap:10px!important; margin-bottom:14px!important; }
    .toolbar-row              { flex-direction:column!important; gap:10px!important; }
    .filters-wrap             { flex-direction:column!important; gap:8px!important; width:100%!important; }
    .filters-wrap > *         { width:100%!important; }
    .table-scroll             { overflow-x:auto!important; }
    table.prod-table          { min-width:620px!important; }
    .detail-topbar            { flex-direction:column!important; align-items:flex-start!important; gap:10px!important; }
    .hero-card                { flex-direction:column!important; }
    .hero-meta-grid           { grid-template-columns:1fr 1fr!important; }
    .kpi-detail-grid          { grid-template-columns:1fr 1fr!important; }
    .modal-grid               { grid-template-columns:1fr!important; }
    .preview-layout           { flex-direction:column!important; }
    .preview-img              { width:100%!important; height:200px!important; }
  }
  @media (min-width:1024px) {
    .kpi-detail-grid  { grid-template-columns:repeat(4,1fr)!important; }
    .kpi-list-grid    { grid-template-columns:repeat(4,1fr)!important; }
    .hero-meta-grid   { grid-template-columns:repeat(4,1fr)!important; }
    table.prod-table  { min-width:unset!important; }
  }
`;

// ─────────────────────────────────────────────────
//  Shared sub-components
// ─────────────────────────────────────────────────
function Spinner({ size = 18, color = "#f97316" }) {
  return <Loader2 size={size} color={color} className="spin" />;
}

function ErrorBanner({ message, onRetry }) {
  return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",background:"#fef2f2",border:"1px solid #fca5a5",borderRadius:12,marginBottom:20,gap:12 }}>
      <div style={{ display:"flex",alignItems:"center",gap:8,fontSize:13,color:"#dc2626" }}>
        <AlertCircle size={16}/> {message}
      </div>
      {onRetry && (
        <button onClick={onRetry} style={{ fontSize:12,fontWeight:600,color:"#dc2626",background:"none",border:"1px solid #fca5a5",borderRadius:7,padding:"5px 12px",cursor:"pointer",fontFamily:"inherit" }}>Retry</button>
      )}
    </div>
  );
}

function CustomDropdown({ value, onChange, options, minWidth = 150 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const openMenu = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setMenuStyle({ position:"fixed",top:r.bottom+4,left:r.left,minWidth:r.width,zIndex:99999 });
    }
    setIsOpen(true);
  };

  useEffect(() => {
    const close = (e) => {
      if (btnRef.current && !btnRef.current.contains(e.target) && menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", close);
    window.addEventListener("scroll", () => setIsOpen(false), true);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div style={{ position:"relative",display:"inline-block" }}>
      <button ref={btnRef} className={`custom-dd-btn${isOpen?" open":""}`} onClick={() => isOpen ? setIsOpen(false) : openMenu()} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,padding:"8px 14px",border:"1px solid #d1d5db",borderRadius:8,background:"#fff",fontSize:13,color:"#374151",cursor:"pointer",fontFamily:"inherit",minWidth,whiteSpace:"nowrap" }}>
        <span>{value}</span>
        <ChevronDown size={15} color="#9ca3af" style={{ transition:"transform .2s",transform:isOpen?"rotate(180deg)":"rotate(0deg)",flexShrink:0 }}/>
      </button>
      {isOpen && (
        <div ref={menuRef} style={{ ...menuStyle,background:"#fff",border:"1px solid #e5e7eb",borderRadius:10,boxShadow:"0 10px 30px rgba(0,0,0,0.12)",padding:"4px 0",overflow:"hidden" }}>
          {options.map((opt) => {
            const selected = value === opt;
            return (
              <button key={opt} onClick={() => { onChange(opt); setIsOpen(false); }} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"9px 16px",background:selected?"#fff7ed":"#fff",border:"none",cursor:"pointer",fontSize:13,fontFamily:"inherit",color:selected?"#f97316":"#374151",fontWeight:selected?600:400,textAlign:"left" }} onMouseEnter={e => { if (!selected) e.currentTarget.style.background="#f9fafb"; }} onMouseLeave={e => { if (!selected) e.currentTarget.style.background="#fff"; }}>
                <span>{opt}</span>
                {selected && <Check size={14} color="#f97316" strokeWidth={2.5}/>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────
//  Product Details Page (real data via useProduct)
// ─────────────────────────────────────────────────
function ProductDetailsPage({ productId, rawProduct, onBack }) {
  const { product: fetched, loading, error } = useProduct(productId);
  const product = fetched ? normalise(fetched) : rawProduct;
  const [activeTab, setActiveTab] = useState("referral");
  const [showCreateCoupon, setShowCreateCoupon] = useState(false);

  const tabs = [
    { id:"referral",  Icon:Tag,      label:"Referral Coupons" },
    { id:"analytics", Icon:BarChart2, label:"Analytics" },
    { id:"inventory", Icon:Box,       label:"Inventory" },
    { id:"reviews",   Icon:Star,      label:"Reviews" },
  ];

  if (loading) return (
    <div style={{ display:"flex",justifyContent:"center",alignItems:"center",height:300 }}>
      <Spinner size={32}/>
    </div>
  );
  if (error) return <ErrorBanner message={error} onRetry={() => window.location.reload()}/>;
  if (!product) return null;

  const badge = productStatusBadge(product.status);

  return (
    <div className="page-wrap" style={{ background:"#f3f4f6",padding:"28px 32px" }}>
      {/* Top bar */}
      <div className="detail-topbar" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20 }}>
        <button onClick={onBack} style={{ display:"flex",alignItems:"center",gap:6,fontSize:13,color:"#6b7280",fontWeight:500,background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:"inherit" }}>
          <ChevronLeft size={16}/> Back to Products
        </button>
        <div className="topbar-right" style={{ display:"flex",gap:10 }}>
          <button style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 16px",fontSize:13,fontWeight:500,color:"#374151",border:"1px solid #d1d5db",borderRadius:8,background:"#fff",cursor:"pointer",fontFamily:"inherit" }}><Edit2 size={14}/> Edit Product</button>
          <button style={{ display:"flex",alignItems:"center",gap:6,padding:"7px 16px",fontSize:13,fontWeight:500,color:"#ef4444",border:"1px solid #fca5a5",borderRadius:8,background:"#fff",cursor:"pointer",fontFamily:"inherit" }}><Trash2 size={14}/> Delete</button>
        </div>
      </div>

      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontSize:22,fontWeight:700,color:"#111827",margin:0 }}>Product Details</h1>
        <p style={{ fontSize:13,color:"#9ca3af",margin:"4px 0 0" }}>Manage product information and settings</p>
      </div>

      {/* Hero card */}
      <div style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:14,padding:24,marginBottom:18,boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}>
        <div className="hero-card" style={{ display:"flex",gap:24 }}>
          <img src={product.image} alt={product.name} style={{ width:130,height:130,borderRadius:12,objectFit:"cover",flexShrink:0 }}/>
          <div style={{ flex:1,minWidth:0 }}>
            <h2 style={{ fontSize:20,fontWeight:700,color:"#111827",margin:"0 0 10px" }}>{product.name}</h2>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:12 }}>
              <span style={{ background:"#f97316",color:"#fff",fontSize:11,fontWeight:700,fontFamily:"monospace",padding:"3px 10px",borderRadius:9999 }}>{product.sku}</span>
              <span style={{ background:badge.bg,color:"#fff",fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:9999 }}>{badge.label}</span>
            </div>
            <p style={{ fontSize:13,color:"#6b7280",lineHeight:1.65,margin:"0 0 20px" }}>{product.description}</p>
            <div className="hero-meta-grid" style={{ display:"grid",gap:16 }}>
              {[
                { Icon:Tag,      label:"Category", val:product.category },
                { Icon:Store,    label:"Vendor",   val:product.vendor },
                { Icon:DollarSign, label:"Price",  val:`$${product.price.toFixed(2)}` },
                { Icon:Box,      label:"Stock",    val:product.stock },
              ].map(m => (
                <div key={m.label}>
                  <div style={{ display:"flex",alignItems:"center",gap:5,marginBottom:6 }}><m.Icon size={13} color="#9ca3af" strokeWidth={1.8}/><span style={{ fontSize:12,color:"#9ca3af" }}>{m.label}</span></div>
                  <p style={{ margin:0,fontSize:15,fontWeight:700,color:"#111827" }}>{m.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:14,boxShadow:"0 1px 3px rgba(0,0,0,0.05)",overflow:"hidden" }}>
        <div className="tabs-bar" style={{ borderBottom:"1px solid #e5e7eb",paddingLeft:24,paddingRight:24,overflowX:"auto" }}>
          <div style={{ display:"flex",minWidth:"max-content" }}>
            {tabs.map(t => {
              const active = activeTab === t.id;
              return (
                <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ display:"flex",alignItems:"center",gap:7,padding:"14px 16px",fontSize:13,fontWeight:active?600:500,background:"none",border:"none",cursor:"pointer",borderBottom:active?"2px solid #f97316":"2px solid transparent",color:active?"#f97316":"#6b7280",marginBottom:-1,whiteSpace:"nowrap",fontFamily:"inherit" }}>
                  <t.Icon size={15} color={active?"#f97316":"#6b7280"}/>
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ padding:24 }}>
          {activeTab === "referral" && (
            <>
              <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:20 }}>
                <div>
                  <h3 style={{ fontSize:16,fontWeight:700,color:"#111827",margin:"0 0 4px" }}>Referral Coupons</h3>
                  <p style={{ fontSize:13,color:"#9ca3af",margin:0 }}>Active referral codes for {product.name}</p>
                </div>
                <button onClick={() => setShowCreateCoupon(true)} style={{ display:"flex",alignItems:"center",gap:6,padding:"8px 18px",background:"#f97316",color:"#fff",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit" }}><Plus size={14}/> Add Rule</button>
              </div>
              {product.referralCoupons.length === 0 ? (
                <div style={{ textAlign:"center",padding:"40px 0",color:"#9ca3af",fontSize:13 }}>No referral coupons yet.</div>
              ) : (
                <div style={{ border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden" }}>
                  <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
                    <thead><tr style={{ background:"#f3f4f6" }}>{["COUPON CODE","REFERRER","DISCOUNT","USAGE","EXPIRY","STATUS","ACTIONS"].map(h=><th key={h} style={{ padding:"10px 16px",textAlign:"left",fontSize:11,fontWeight:700,color:"#9ca3af",letterSpacing:"0.05em",whiteSpace:"nowrap" }}>{h}</th>)}</tr></thead>
                    <tbody>
                      {product.referralCoupons.map((c, i) => {
                        const cs = couponStatusStyle(c.status);
                        const pct = Math.min(100, (c.used / (c.total || 1)) * 100);
                        return (
                          <tr key={c.code || i} style={{ borderBottom:i<product.referralCoupons.length-1?"1px solid #f3f4f6":"none" }}>
                            <td style={{ padding:"14px 16px" }}><div style={{ display:"flex",alignItems:"center",gap:8 }}><span style={{ fontFamily:"monospace",fontWeight:700,fontSize:12,color:"#111827" }}>{c.code}</span><button style={{ background:"none",border:"none",cursor:"pointer",color:"#d1d5db",padding:0,display:"flex" }}><Copy size={12}/></button></div></td>
                            <td style={{ padding:"14px 16px" }}><p style={{ margin:0,fontWeight:600,color:"#111827",fontSize:13 }}>{c.email}</p></td>
                            <td style={{ padding:"14px 16px",whiteSpace:"nowrap" }}><span style={{ fontWeight:700,color:"#f97316",fontSize:13 }}>{c.discountPrefix}{c.discountValue}</span></td>
                            <td style={{ padding:"14px 16px" }}><span style={{ fontSize:13,fontWeight:600,color:"#374151" }}>{c.used}/{c.total}</span><div style={{ width:90,height:4,background:"#e5e7eb",borderRadius:9999,marginTop:5 }}><div className="prog-fill" style={{ width:`${pct}%`,height:4,background:"#f97316",borderRadius:9999 }}/></div></td>
                            <td style={{ padding:"14px 16px",fontSize:12,color:"#6b7280",whiteSpace:"nowrap" }}>{c.expiry ? new Date(c.expiry).toLocaleDateString() : "—"}</td>
                            <td style={{ padding:"14px 16px" }}><span style={{ background:cs.bg,color:cs.color,fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:9999 }}>{c.status}</span></td>
                            <td style={{ padding:"14px 16px" }}><div style={{ display:"flex",gap:10 }}><button style={{ background:"none",border:"none",cursor:"pointer",color:"#6b7280",padding:0,display:"flex" }}><Edit2 size={14}/></button><button style={{ background:"none",border:"none",cursor:"pointer",color:"#ef4444",padding:0,display:"flex" }}><Trash2 size={14}/></button></div></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
          {activeTab === "analytics" && <div style={{ padding:"48px 0",textAlign:"center",color:"#9ca3af",fontSize:14 }}>Analytics charts coming soon.</div>}
          {activeTab === "inventory" && (
            <div>
              <h3 style={{ fontSize:15,fontWeight:700,color:"#111827",margin:"0 0 16px" }}>Variants & Stock</h3>
              {(fetched?.variants ?? []).length === 0 ? (
                <div style={{ textAlign:"center",padding:"32px 0",color:"#9ca3af",fontSize:13 }}>No variants found.</div>
              ) : (
                <div style={{ border:"1px solid #e5e7eb",borderRadius:10,overflow:"hidden" }}>
                  <table style={{ width:"100%",borderCollapse:"collapse",fontSize:13 }}>
                    <thead><tr style={{ background:"#f3f4f6" }}>{["SKU","ATTRIBUTES","PRICE","STOCK","STATUS"].map(h=><th key={h} style={{ padding:"10px 16px",textAlign:"left",fontSize:11,fontWeight:700,color:"#9ca3af",letterSpacing:"0.05em" }}>{h}</th>)}</tr></thead>
                    <tbody>
                      {(fetched?.variants ?? []).map((v, i) => (
                        <tr key={v._id || i} style={{ borderBottom:i<(fetched?.variants?.length-1)?"1px solid #f3f4f6":"none" }}>
                          <td style={{ padding:"12px 16px",fontFamily:"monospace",fontSize:11,color:"#64748b" }}>{v.sku}</td>
                          <td style={{ padding:"12px 16px",fontSize:12,color:"#374151" }}>{v.attributes?.map(a=>`${a.name}: ${a.value}`).join(", ") || "—"}</td>
                          <td style={{ padding:"12px 16px",fontWeight:600,color:"#374151" }}>${v.sellingPrice?.toFixed(2)}</td>
                          <td style={{ padding:"12px 16px",fontWeight:700,color:v.currentStock===0?"#ef4444":v.currentStock<10?"#f97316":"#10b981" }}>{v.currentStock ?? 0}</td>
                          <td style={{ padding:"12px 16px" }}><span style={{ background:v.isActive?"#d1fae5":"#fee2e2",color:v.isActive?"#065f46":"#991b1b",fontSize:11,fontWeight:600,padding:"2px 10px",borderRadius:9999 }}>{v.isActive?"Active":"Inactive"}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          {activeTab === "reviews" && <div style={{ padding:"48px 0",textAlign:"center",color:"#9ca3af",fontSize:14 }}>Customer reviews coming soon.</div>}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
//  Add / Edit Product Modal
// ─────────────────────────────────────────────────
function ProductFormModal({ product, onClose, onSuccess }) {
  const isEdit = !!product;
  const { createProduct, updateProduct, loading, error } = useProductMutations({ onSuccess });

  const [form, setForm] = useState({
    title       : product?.name      ?? "",
    brand       : product?.vendor    ?? "",
    category    : product?.category  ?? "",
    description : product?.description ?? "",
    price       : product?.price?.toString() ?? "",
    stock       : product?.stock?.toString() ?? "",
    paidAmount  : product?.paidAmount?.toString() ?? "",
    status      : product?.status === "approved" ? "Approved" : product?.status === "pending" ? "Pending" : "Out of Stock",
  });
  const [imageCount, setImageCount] = useState(0);

  const handleChange  = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleFiles   = (e) => setImageCount(e.target.files?.length ?? 0);

  const handleSubmit  = async () => {
    const payload = {
      title       : form.title,
      brand       : form.brand,
      description : form.description,
      paidAmount  : Number(form.paidAmount) || 0,
      isActive    : form.status !== "Out of Stock",
      // NOTE: variants & category require their IDs in a real flow.
      // This form sends flat data; adapt to your variant/category structure as needed.
    };
    try {
      if (isEdit) {
        await updateProduct(product.id, payload);
      } else {
        await createProduct(payload);
      }
    } catch (_) { /* error shown inline */ }
  };

  const iS = { width:"100%",borderRadius:8,border:"1px solid #d1d5db",padding:"8px 12px",fontSize:13,outline:"none",fontFamily:"inherit",background:"#fff",color:"#374151" };
  const lS = { display:"block",fontSize:12,fontWeight:500,color:"#4b5563",marginBottom:4 };

  return (
    <div style={{ position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"center" }}>
      <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.4)" }} onClick={onClose}/>
      <div style={{ position:"relative",zIndex:10,width:"100%",maxWidth:640,margin:"0 16px",background:"#fff",borderRadius:18,boxShadow:"0 20px 60px rgba(0,0,0,0.2)",overflow:"hidden" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 24px",borderBottom:"1px solid #e5e7eb" }}>
          <h2 style={{ margin:0,fontSize:16,fontWeight:700,color:"#111827" }}>{isEdit ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onClose} style={{ background:"none",border:"none",cursor:"pointer",color:"#9ca3af",display:"flex" }}><X size={20}/></button>
        </div>

        <div style={{ padding:"20px 24px",maxHeight:"72vh",overflowY:"auto" }}>
          {error && <ErrorBanner message={error}/>}

          <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
            <div><label style={lS}>Product Name <span style={{ color:"#ef4444" }}>*</span></label><input name="title" value={form.title} onChange={handleChange} placeholder="Enter product name" className="add-modal-input" style={iS}/></div>
            <div><label style={lS}>Brand / Vendor <span style={{ color:"#ef4444" }}>*</span></label><input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand name" className="add-modal-input" style={iS}/></div>
          </div>
          <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
            <div>
              <label style={lS}>Category <span style={{ color:"#ef4444" }}>*</span></label>
              <select name="category" value={form.category} onChange={handleChange} className="add-modal-select" style={{ ...iS,appearance:"none",cursor:"pointer" }}>
                <option value="">Select category</option>
                <option>Electronics</option><option>Fashion</option>
                <option>Home &amp; Garden</option><option>Sports</option><option>Beauty</option>
              </select>
            </div>
            <div><label style={lS}>Status</label><select name="status" value={form.status} onChange={handleChange} className="add-modal-select" style={{ ...iS,appearance:"none",cursor:"pointer" }}><option>Pending</option><option>Approved</option><option>Out of Stock</option></select></div>
          </div>
          <div className="modal-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16 }}>
            <div><label style={lS}>Price ($) <span style={{ color:"#ef4444" }}>*</span></label><input name="price" value={form.price} onChange={handleChange} type="number" placeholder="0.00" className="add-modal-input" style={iS}/></div>
            <div><label style={lS}>Stock Quantity</label><input name="stock" value={form.stock} onChange={handleChange} type="number" placeholder="0" className="add-modal-input" style={iS}/></div>
          </div>
          <div style={{ marginBottom:16 }}><label style={lS}>Paid Amount ($)</label><input name="paidAmount" value={form.paidAmount} onChange={handleChange} type="number" placeholder="0.00" className="add-modal-input" style={iS}/></div>
          <div style={{ marginBottom:16 }}><label style={lS}>Description</label><textarea name="description" value={form.description} onChange={handleChange} rows={3} className="add-modal-textarea" style={{ ...iS,resize:"none" }}/></div>
          <div>
            <p style={{ ...lS,fontWeight:600,marginBottom:8 }}>Product Images</p>
            <label style={{ display:"flex",alignItems:"center",gap:12,cursor:"pointer" }}>
              <div style={{ display:"flex",alignItems:"center",gap:6,padding:"8px 14px",border:"1px solid #d1d5db",borderRadius:8,fontSize:13,color:"#374151" }}><Upload size={14}/> Upload Images</div>
              <span style={{ fontSize:13,color:"#9ca3af" }}>{imageCount > 0 ? `${imageCount} image(s) selected` : "No images selected"}</span>
              <input type="file" multiple accept="image/*" style={{ display:"none" }} onChange={handleFiles}/>
            </label>
          </div>
        </div>

        <div style={{ display:"flex",alignItems:"center",justifyContent:"flex-end",gap:10,padding:"16px 24px",borderTop:"1px solid #e5e7eb",background:"#f3f4f6" }}>
          <button onClick={onClose} style={{ padding:"8px 20px",borderRadius:8,border:"1px solid #d1d5db",background:"#fff",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",fontFamily:"inherit" }}>Cancel</button>
          <button onClick={handleSubmit} disabled={loading} style={{ padding:"8px 20px",borderRadius:8,border:"none",background:loading?"#fdba74":"#f97316",fontSize:13,fontWeight:600,color:"#fff",cursor:loading?"not-allowed":"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6 }}>
            {loading && <Spinner size={14} color="#fff"/>}
            {isEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
//  Delete Confirmation Modal
// ─────────────────────────────────────────────────
function DeleteModal({ product, onClose, onConfirm, loading }) {
  return (
    <div style={{ position:"fixed",inset:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"center" }}>
      <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.45)" }} onClick={onClose}/>
      <div style={{ position:"relative",zIndex:10,width:"100%",maxWidth:400,margin:"0 16px",background:"#fff",borderRadius:16,boxShadow:"0 20px 60px rgba(0,0,0,0.2)",padding:"28px 28px 20px",textAlign:"center" }}>
        <div style={{ width:52,height:52,borderRadius:"50%",background:"#fef2f2",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px" }}><Trash2 size={22} color="#ef4444"/></div>
        <h3 style={{ margin:"0 0 8px",fontSize:16,fontWeight:700,color:"#111827" }}>Delete Product?</h3>
        <p style={{ margin:"0 0 24px",fontSize:13,color:"#6b7280" }}>This will soft-delete <strong>{product.name}</strong> and hide it from the store.</p>
        <div style={{ display:"flex",gap:10,justifyContent:"center" }}>
          <button onClick={onClose} style={{ padding:"9px 22px",borderRadius:9,border:"1px solid #d1d5db",background:"#fff",fontSize:13,fontWeight:500,color:"#374151",cursor:"pointer",fontFamily:"inherit" }}>Cancel</button>
          <button onClick={onConfirm} disabled={loading} style={{ padding:"9px 22px",borderRadius:9,border:"none",background:loading?"#fca5a5":"#ef4444",fontSize:13,fontWeight:600,color:"#fff",cursor:loading?"not-allowed":"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6 }}>
            {loading && <Spinner size={14} color="#fff"/>} Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
//  Main Products Page
// ─────────────────────────────────────────────────
export default function Products() {
  // ── State ──
  const [search, setSearch]             = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedProduct, setSelectedProduct] = useState(null); // { id, raw }
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct]   = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [openMenuId, setOpenMenuId]           = useState(null);
  const menuRef = useRef(null);

  // ── API hooks ──
  const { products: raw, total, loading, error, params, updateParams, goToPage, refetch } = useProducts();
  const { deleteProduct, loading: deleteLoading } = useProductMutations({ onSuccess: () => { setDeletingProduct(null); refetch(); } });

  // Normalise backend → UI shape
  const products = raw.map(normalise);

  // ── Derived filter values applied CLIENT-SIDE for instant UX ──
  const statusMap = { "All Status":null,"Approved":"approved","Pending":"pending","Out of Stock":"out-of-stock" };
  const filtered = products.filter(p => {
    const ms = statusMap[statusFilter];
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === "All Categories" || p.category === categoryFilter) &&
      (ms === null || p.status === ms)
    );
  });

  // ── Stats ──
  const activeListings = products.filter(p => p.status === "approved").length;
  const pendingCount   = products.filter(p => p.status === "pending").length;
  const outOfStock     = products.filter(p => p.stock === 0).length;

  // Close context menu on outside click
  useEffect(() => {
    const h = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenuId(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // ── Debounce search → push to API ──
  useEffect(() => {
    const t = setTimeout(() => updateParams({ search }), 350);
    return () => clearTimeout(t);
  }, [search]);

  const statusPillStyle = (s) => {
    if (s === "approved")     return { background:"#10b981",color:"#fff" };
    if (s === "pending")      return { background:"#f59e0b",color:"#fff" };
    if (s === "out-of-stock") return { background:"#374151",color:"#fff" };
    return { background:"#e5e7eb",color:"#6b7280" };
  };
  const stockStyle = (n) => {
    if (n === 0) return { color:"#ef4444",fontWeight:700 };
    if (n < 50)  return { color:"#f97316",fontWeight:700 };
    return { color:"#10b981",fontWeight:700 };
  };

  const menuItem = (color = "#374151") => ({
    display:"flex",width:"100%",alignItems:"center",gap:9,padding:"9px 14px",fontSize:12,color,background:"none",border:"none",cursor:"pointer",textAlign:"left",fontFamily:"inherit",
  });

  const categoryOptions = ["All Categories","Electronics","Fashion","Home & Garden","Sports","Beauty"];
  const statusOptions   = ["All Status","Approved","Pending","Out of Stock"];

  // ── If viewing a product detail ──
  if (selectedProduct) {
    return (
      <>
        <style>{globalCSS}</style>
        <ProductDetailsPage
          productId={selectedProduct.id}
          rawProduct={selectedProduct.raw}
          onBack={() => setSelectedProduct(null)}
        />
      </>
    );
  }

  return (
    <>
      <style>{globalCSS}</style>
      <div className="page-wrap" style={{ background:"#f3f4f6",minHeight:"100vh",padding:"28px 32px" }}>

        {/* Modals */}
        {showAddModal && (
          <ProductFormModal
            onClose={() => setShowAddModal(false)}
            onSuccess={() => { setShowAddModal(false); refetch(); }}
          />
        )}
        {editingProduct && (
          <ProductFormModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSuccess={() => { setEditingProduct(null); refetch(); }}
          />
        )}
        {deletingProduct && (
          <DeleteModal
            product={deletingProduct}
            loading={deleteLoading}
            onClose={() => setDeletingProduct(null)}
            onConfirm={() => deleteProduct(deletingProduct.id)}
          />
        )}

        {/* Header */}
        <div className="page-header" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:28 }}>
          <div>
            <h1 style={{ margin:0,fontSize:26,fontWeight:700,color:"#111827" }}>Products</h1>
            <p style={{ margin:"4px 0 0",fontSize:13,color:"#9ca3af" }}>Manage product listings and inventory</p>
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <button className="export-btn"><Download size={15}/> Export</button>
            <button onClick={() => setShowAddModal(true)} style={{ display:"flex",alignItems:"center",gap:7,padding:"9px 20px",border:"none",borderRadius:9,background:"#f97316",fontSize:13,fontWeight:600,color:"#fff",cursor:"pointer",fontFamily:"inherit" }}><Plus size={15}/> Add Product</button>
          </div>
        </div>

        {/* Error banner */}
        {error && <ErrorBanner message={error} onRetry={refetch}/>}

        {/* KPI cards */}
        <div className="kpi-list-grid" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24 }}>
          {[
            { label:"Total Products",  val:loading?"—":total,            icon:<Package size={20} color="#fff"/>,         bg:"#f97316",  valColor:"#111827" },
            { label:"Active Listings", val:loading?"—":activeListings,   icon:<CheckCircle size={20} color="#fff"/>,     bg:"#10b981",  valColor:"#10b981" },
            { label:"Pending Approval",val:loading?"—":pendingCount,     icon:<AlertCircle size={20} color="#fff"/>,     bg:"#f59e0b",  valColor:"#f97316" },
            { label:"Out of Stock",    val:loading?"—":outOfStock,       icon:<XCircle size={20} color="#fff"/>,         bg:"#ef4444",  valColor:"#ef4444" },
          ].map(k => (
            <div key={k.label} style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:14,padding:"20px 22px",boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}>
              <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between" }}>
                <div>
                  <p style={{ margin:"0 0 6px",fontSize:13,color:"#6b7280" }}>{k.label}</p>
                  <p style={{ margin:0,fontSize:35,fontWeight:700,color:k.valColor,lineHeight:1 }}>
                    {loading ? <Spinner/> : k.val}
                  </p>
                </div>
                <div style={{ width:44,height:44,borderRadius:12,background:k.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>{k.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:14,boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}>
          {/* Toolbar */}
          <div style={{ padding:"16px 24px",borderBottom:"1px solid #e5e7eb" }}>
            <div className="toolbar-row" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:12 }}>
              <h2 style={{ margin:0,fontSize:15,fontWeight:600,color:"#111827",whiteSpace:"nowrap" }}>
                All Products
                <span style={{ marginLeft:8,fontSize:13,fontWeight:400,color:"#f97316" }}>({filtered.length} of {total})</span>
              </h2>
              <div className="filters-wrap" style={{ display:"flex",flexWrap:"wrap",gap:10,alignItems:"center" }}>
                <div style={{ position:"relative" }}>
                  <Search size={15} style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9ca3af",pointerEvents:"none" }}/>
                  <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="search-input" style={{ paddingLeft:32,paddingRight:14,paddingTop:8,paddingBottom:8,border:"1px solid #d1d5db",borderRadius:8,fontSize:13,width:210,fontFamily:"inherit",background:"#fff",color:"#374151" }}/>
                </div>
                <CustomDropdown value={categoryFilter} onChange={setCategoryFilter} options={categoryOptions} minWidth={160}/>
                <CustomDropdown value={statusFilter}   onChange={setStatusFilter}   options={statusOptions}   minWidth={140}/>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="table-scroll" style={{ overflowX:"auto" }}>
            <table className="prod-table" style={{ width:"100%",borderCollapse:"collapse",tableLayout:"fixed" }}>
              <colgroup>
                <col style={{ width:"28%" }}/><col style={{ width:"14%" }}/><col style={{ width:"12%" }}/><col style={{ width:"13%" }}/><col style={{ width:"9%" }}/><col style={{ width:"7%" }}/><col style={{ width:"11%" }}/><col style={{ width:"6%" }}/>
              </colgroup>
              <thead>
                <tr style={{ borderBottom:"1px solid #e5e7eb" }}>
                  {["Product","SKU","Category","Vendor","Price","Stock","Status","Actions"].map(h => (
                    <th key={h} style={{ padding:"12px 12px",textAlign:"left",fontSize:11,fontWeight:700,color:"#9ca3af",textTransform:"uppercase",letterSpacing:"0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr><td colSpan={8} style={{ textAlign:"center",padding:"48px 0" }}><Spinner size={24}/></td></tr>
                )}
                {!loading && filtered.map((product) => {
                  const ps = statusPillStyle(product.status);
                  const sc = stockStyle(product.stock);
                  const isPending = product.status === "pending";
                  return (
                    <tr key={product.id} style={{ borderBottom:"1px solid #f3f4f6",transition:"background .12s" }} onMouseEnter={e => e.currentTarget.style.background="#f9fafb"} onMouseLeave={e => e.currentTarget.style.background=""}>
                      <td style={{ padding:"14px 12px" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                          <img src={product.image} alt={product.name} style={{ width:46,height:46,borderRadius:10,objectFit:"cover",flexShrink:0 }}/>
                          <span style={{ fontSize:14,fontWeight:600,color:"#111827",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{product.name}</span>
                        </div>
                      </td>
                      <td style={{ padding:"14px 12px" }}><span style={{ background:"#f1f5f9",borderRadius:6,padding:"2px 8px",fontFamily:"monospace",fontSize:11,color:"#64748b" }}>{product.sku}</span></td>
                      <td style={{ padding:"14px 12px",fontSize:13,color:"#6b7280",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{product.category}</td>
                      <td style={{ padding:"14px 12px",fontSize:13,color:"#6b7280",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{product.vendor}</td>
                      <td style={{ padding:"14px 12px",fontSize:14,fontWeight:400,color:"#374151",whiteSpace:"nowrap" }}>${product.price.toLocaleString("en-US",{ minimumFractionDigits:2 })}</td>
                      <td style={{ padding:"14px 12px" }}><span style={{ fontSize:14,...sc }}>{product.stock}</span></td>
                      <td style={{ padding:"14px 12px" }}><span style={{ ...ps,borderRadius:9999,padding:"3px 12px",fontSize:11,fontWeight:600,display:"inline-flex",alignItems:"center" }}>{product.status}</span></td>
                      <td style={{ padding:"14px 12px" }}>
                        <div style={{ position:"relative" }} ref={openMenuId === product.id ? menuRef : null}>
                          <button className="three-dots-btn" onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}>
                            <MoreVertical size={16}/>
                          </button>
                          {openMenuId === product.id && (
                            <div style={{ position:"absolute",right:0,zIndex:30,width:172,background:"#fff",border:"1px solid #e5e7eb",borderRadius:12,boxShadow:"0 10px 30px rgba(0,0,0,.12)",padding:"4px 0",...(product.id && products.indexOf(product) >= products.length - 2 ? { bottom:34 } : { top:34 }) }}>
                              <button onClick={() => { setOpenMenuId(null); setSelectedProduct({ id:product.id, raw:product }); }} onMouseEnter={e => e.currentTarget.style.background="#f3f4f6"} onMouseLeave={e => e.currentTarget.style.background=""} style={menuItem()}><Eye size={13} color="#9ca3af"/> View Details</button>
                              <button onClick={() => { setOpenMenuId(null); setEditingProduct(product); }} onMouseEnter={e => e.currentTarget.style.background="#f3f4f6"} onMouseLeave={e => e.currentTarget.style.background=""} style={menuItem()}><Pencil size={13} color="#9ca3af"/> Edit Product</button>
                              {isPending && (
                                <>
                                  <button onClick={() => setOpenMenuId(null)} onMouseEnter={e => e.currentTarget.style.background="#f0fdf4"} onMouseLeave={e => e.currentTarget.style.background=""} style={menuItem("#16a34a")}><CheckCircle size={13} color="#16a34a"/> Approve</button>
                                  <button onClick={() => setOpenMenuId(null)} onMouseEnter={e => e.currentTarget.style.background="#fef2f2"} onMouseLeave={e => e.currentTarget.style.background=""} style={menuItem("#dc2626")}><XCircle size={13} color="#dc2626"/> Reject</button>
                                </>
                              )}
                              <div style={{ height:1,background:"#f1f5f9",margin:"4px 0" }}/>
                              <button onClick={() => { setOpenMenuId(null); setDeletingProduct(product); }} onMouseEnter={e => e.currentTarget.style.background="#fef2f2"} onMouseLeave={e => e.currentTarget.style.background=""} style={menuItem("#ef4444")}><Trash2 size={13} color="#f87171"/> Delete</button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!loading && filtered.length === 0 && (
                  <tr><td colSpan={8} style={{ textAlign:"center",padding:"56px 0",color:"#9ca3af",fontSize:13 }}>No products found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {total > params.limit && (
            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 24px",borderTop:"1px solid #e5e7eb",fontSize:13,color:"#6b7280" }}>
              <span>Showing {((params.page - 1) * params.limit) + 1}–{Math.min(params.page * params.limit, total)} of {total}</span>
              <div style={{ display:"flex",gap:8 }}>
                <button onClick={() => goToPage(params.page - 1)} disabled={params.page <= 1} style={{ padding:"6px 14px",borderRadius:7,border:"1px solid #d1d5db",background:"#fff",fontSize:13,cursor:params.page<=1?"not-allowed":"pointer",color:params.page<=1?"#d1d5db":"#374151",fontFamily:"inherit" }}>← Prev</button>
                <button onClick={() => goToPage(params.page + 1)} disabled={params.page * params.limit >= total} style={{ padding:"6px 14px",borderRadius:7,border:"1px solid #d1d5db",background:"#fff",fontSize:13,cursor:params.page*params.limit>=total?"not-allowed":"pointer",color:params.page*params.limit>=total?"#d1d5db":"#374151",fontFamily:"inherit" }}>Next →</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}