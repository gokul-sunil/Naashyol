import { useState } from "react";
import { Package } from "lucide-react";

const coupons = [
  { code: "REF-ALEX-WBH001", type: "Product Referral", discount: "5%", earnedBy: "Alex Martinez", details: "Wireless Bluetooth Headphones", detailIcon: "box", usage: "0 / 1", expiry: "12/31/2026", status: "active" },
  { code: "REF-ALEX-WBH002", type: "Product Referral", discount: "5%", earnedBy: "Alex Martinez", details: "Wireless Bluetooth Headphones", detailIcon: "box", usage: "1 / 1", expiry: "12/31/2026", status: "used" },
  { code: "REF-JESSICA-SM001", type: "Product Referral", discount: "$10", earnedBy: "Jessica Lee", details: "Smart Watch Pro", detailIcon: "box", usage: "0 / 1", expiry: "6/30/2026", status: "active" },
  { code: "GEN-ALEX-001", type: "General Referral", discount: "10%", earnedBy: "Alex Martinez", details: "Code: ALEX2026", detailIcon: "tag", usage: "0 / 1", expiry: "12/31/2026", status: "active" },
  { code: "GEN-CHRIS-001", type: "General Referral", discount: "$15", earnedBy: "Chris Brown", details: "Code: CHRIS2025", detailIcon: "tag", usage: "0 / 1", expiry: "12/31/2026", status: "active" },
  { code: "WELCOME20", type: "Promotional", discount: "20%", earnedBy: "", details: "Welcome discount for new customers", detailIcon: "", usage: "456 / 1000", expiry: "12/31/2026", status: "active" },
  { code: "SUMMER25", type: "Promotional", discount: "25%", earnedBy: "", details: "Summer sale 25% off", detailIcon: "", usage: "342 / 500", expiry: "6/30/2026", status: "active" },
];

const tabs = ["All Coupons", "Product Referral", "General Referral", "Promotional"];
const statusOptions = ["All Status", "Active", "Used", "Expired"];
const typeMap = { "All Coupons": null, "Product Referral": "Product Referral", "General Referral": "General Referral", "Promotional": "Promotional" };

const TicketStatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/>
    <line x1="12" y1="7" x2="12" y2="17" strokeDasharray="3 3"/>
  </svg>
);
const GiftStatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12"/>
    <rect x="2" y="7" width="20" height="5"/>
    <line x1="12" y1="22" x2="12" y2="7"/>
    <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
    <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
  </svg>
);
const TrendStatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);
const EmptyTicketIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a1 1 0 011-1h18a1 1 0 011 1v1.5a1.5 1.5 0 000 3V15a1 1 0 01-1 1H3a1 1 0 01-1-1v-1.5a1.5 1.5 0 000-3V9z"/>
    <line x1="9" y1="8" x2="9" y2="16" strokeDasharray="2 2"/>
  </svg>
);
const BoxRowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const TagRowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{cursor:"pointer",flexShrink:0}}>
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{cursor:"pointer"}}>
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
);

const TypeBadge = ({ type }) => {
  const colors = { "Product Referral":"#f97316", "General Referral":"#22c55e", "Promotional":"#3b82f6" };
  return (
    <span style={{ background:colors[type]||"#ccc", color:"#fff", borderRadius:20, padding:"4px 13px", fontSize:12, fontWeight:600, whiteSpace:"nowrap", display:"inline-block" }}>
      {type}
    </span>
  );
};
const StatusBadge = ({ status }) => {
  const colors = { active:"#22c55e", used:"#3b82f6", expired:"#ef4444" };
  return (
    <span style={{ background:colors[status]||"#ccc", color:"#fff", borderRadius:20, padding:"4px 14px", fontSize:12, fontWeight:600, display:"inline-block" }}>
      {status}
    </span>
  );
};

const stats = [
  { label:"Total Coupons", value:7, sub:"6 active", subColor:"#f97316", Icon:TicketStatIcon, iconBg:"#e8f1ff" },
  { label:"Product Referral", value:3, sub:"Product-specific", subColor:"#6b7280", Icon:Package, iconBg:"#fde8d2" },
  { label:"General Referral", value:2, sub:"Universal rewards", subColor:"#6b7280", Icon:GiftStatIcon, iconBg:"#dff5e7" },
  { label:"Promotional", value:2, sub:"Admin-created", subColor:"#6b7280", Icon:TrendStatIcon, iconBg:"#e8f1ff" },
];

export default function CouponsPage() {
  const [activeTab, setActiveTab]         = useState("All Coupons");
  const [statusFilter, setStatusFilter]   = useState(null); // ← null = no selection (All Status)
  const [showDrop, setShowDrop]           = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue]     = useState("");
  const [hoveredRow, setHoveredRow]       = useState(null);
  const [hoveredOpt, setHoveredOpt]       = useState(null);

  const filtered = coupons.filter(c => {
    const byType   = typeMap[activeTab] === null || c.type === typeMap[activeTab];
    // null = All Status = no filter
    const byStatus = !statusFilter || c.status === statusFilter.toLowerCase();
    const bySearch = !searchValue ||
      c.code.toLowerCase().includes(searchValue.toLowerCase()) ||
      c.earnedBy.toLowerCase().includes(searchValue.toLowerCase()) ||
      c.details.toLowerCase().includes(searchValue.toLowerCase());
    return byType && byStatus && bySearch;
  });

  return (
    <div style={{ minHeight:"100vh", background:"#f9fafb", fontFamily:"'Segoe UI', system-ui, sans-serif", padding:"32px 40px", maxWidth:"1200px", margin:"0 auto" }}>

      <h1 style={{ fontSize:28, fontWeight:700, color:"#111827", margin:"0 0 6px", letterSpacing:"-0.3px" }}>Coupons</h1>
      <p style={{ fontSize:14, color:"#9ca3af", margin:"0 0 28px" }}>Manage all coupons including referral rewards and promotional codes</p>

      {/* Info box */}
      <div style={{ background:"#eef5ff", border:"1px solid #c7d7fe", borderRadius:14, padding:"20px 24px", marginBottom:28 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/>
            <line x1="12" y1="22" x2="12" y2="7"/>
            <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/>
            <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
          </svg>
          <span style={{ color:"#2563eb", fontWeight:700, fontSize:15 }}>Coupon Management System</span>
        </div>
        {[
          ["Product Referral Coupons:", "You create and assign these to referrers who successfully refer customers to buy specific products"],
          ["General Referral Coupons:", "You generate and distribute these to referrers for bringing in new customers"],
          ["Promotional Coupons:", "Manually created by you for marketing campaigns and special offers"],
          [null, "All coupons are admin-controlled and can be assigned to specific customers for their future purchases"],
        ].map(([bold, text], i) => (
          <div key={i} style={{ display:"flex", gap:8, fontSize:13.5, color:"#374151", marginBottom:i<3?6:0, lineHeight:1.5 }}>
            <span style={{ color:"#2563eb", flexShrink:0, marginTop:1 }}>✓</span>
            <span>{bold ? <><strong style={{ fontWeight:600 }}>{bold}</strong> {text}</> : text}</span>
          </div>
        ))}
      </div>

      {/* Stat cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,minmax(0,1fr))", gap:20, marginBottom:28 }} className="stats-grid">
        {stats.map(({ label, value, sub, subColor, Icon, iconBg }) => (
          <div key={label} style={{ background:"#fff", borderRadius:16, padding:"22px 22px 20px", boxShadow:"0 1px 3px rgba(0,0,0,0.08)", border:"1px solid #f0f0f0" }}>
            <div style={{ fontSize:13.5, color:"#6b7280", marginBottom:20 }}>{label}</div>
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:38, fontWeight:700, color:"#111827", lineHeight:1, marginBottom:6 }}>{value}</div>
                <div style={{ fontSize:12.5, color:subColor }}>{sub}</div>
              </div>
              <div style={{ width:48, height:48, borderRadius:12, background:iconBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon size={22} color="#f97316" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main card */}
      <div style={{ background:"#fff", borderRadius:18, boxShadow:"0 1px 3px rgba(0,0,0,0.08)", border:"1px solid #f3f4f6", padding:"24px 24px 8px" }}>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:12 }}>
          <h2 style={{ fontSize:18, fontWeight:700, color:"#111827", margin:0 }}>All Coupons</h2>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>

            {/* Search */}
            <div style={{ position:"relative" }}>
              <svg style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}
                   width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={()  => setSearchFocused(false)}
                placeholder="Search coupons..."
                style={{
                  padding:"9px 14px 9px 36px",
                  border: searchFocused ? "2px solid #f97316" : "1.5px solid #e5e7eb",
                  borderRadius:9, fontSize:13.5, outline:"none", width:210,
                  transition:"border-color 0.18s", background:"#fff", boxSizing:"border-box", color:"#374151",
                }}
              />
            </div>

            {/* Status dropdown */}
            <div style={{ position:"relative" }}>
              <button
                onClick={() => setShowDrop(v => !v)}
                style={{
                  display:"flex", alignItems:"center", justifyContent:"space-between", gap:10,
                  padding:"9px 14px", minWidth:140,
                  border:"1.5px solid #e5e7eb", borderRadius:9,
                  background:"#fff", fontSize:13.5, cursor:"pointer",
                  color:"#374151", fontWeight:400, whiteSpace:"nowrap", outline:"none",
                }}
              >
                {/* show selected label or default */}
                <span>{statusFilter || "All Status"}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="#9ca3af" strokeWidth="2.2" strokeLinecap="round"
                  style={{ flexShrink:0, transition:"transform 0.2s", transform: showDrop?"rotate(180deg)":"rotate(0deg)" }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {showDrop && (
                <div style={{
                  position:"absolute", right:0, top:"calc(100% + 6px)",
                  background:"#fff", borderRadius:12,
                  boxShadow:"0 8px 28px rgba(0,0,0,0.13)",
                  minWidth:160, zIndex:200,
                  border:"1px solid #f0f0f0",
                  padding:"4px 0", overflow:"hidden",
                }}>
                  {statusOptions.map(opt => {
                    // "All Status" item is selected when statusFilter is null
                    // other items selected when statusFilter === opt
                    const isSelected = opt === "All Status" ? statusFilter === null : statusFilter === opt;
                    const isHovered  = hoveredOpt === opt;

                    const bg    = isSelected || isHovered ? "#fff7ed" : "#fff";
                    const color = isSelected || isHovered ? "#f97316" : "#374151";
                    const fw    = isSelected || isHovered ? 600 : 400;

                    return (
                      <div
                        key={opt}
                        onClick={() => {
                          // "All Status" click → reset to null
                          setStatusFilter(opt === "All Status" ? null : opt);
                          setShowDrop(false);
                        }}
                        onMouseEnter={() => setHoveredOpt(opt)}
                        onMouseLeave={() => setHoveredOpt(null)}
                        style={{
                          padding:"11px 18px", fontSize:13.5, cursor:"pointer",
                          display:"flex", alignItems:"center", justifyContent:"space-between", gap:8,
                          background: bg, color: color, fontWeight: fw,
                          transition:"background 0.1s, color 0.1s",
                        }}
                      >
                        <span>{opt}</span>
                        {isSelected && (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                            stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding:"6px 16px", borderRadius:999,
              border: activeTab===tab ? "1.5px solid #d1d5db" : "1.5px solid #e5e7eb",
              background: activeTab===tab ? "#f3f4f6" : "#fff",
              color:"#374151", fontSize:13.5,
              fontWeight: activeTab===tab ? 600 : 400,
              cursor:"pointer", transition:"all 0.15s",
            }}>{tab}</button>
          ))}
        </div>

        {/* Table */}
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:700 }}>
            <thead>
              <tr style={{ borderBottom:"1px solid #e5e7eb", background:"#f9fafb" }}>
                {["Coupon Code","Type","Discount","Earned By / Details","Usage","Expiry","Status","Actions"].map(h => (
                  <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:13, color:"#6b7280", fontWeight:600, whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding:"56px 0", textAlign:"center" }}>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
                      <EmptyTicketIcon/>
                      <span style={{ fontSize:14, color:"#9ca3af" }}>No coupons found</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.map((c, i) => (
                <tr key={c.code}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{ borderBottom:"1px solid #f9fafb", background:hoveredRow===i?"#f9fafb":"#fff", transition:"background 0.1s" }}>
                  <td style={{ padding:"16px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <span style={{ fontWeight:600, fontSize:13.5, letterSpacing:"0.3px", color:"#111827" }}>{c.code}</span>
                      <CopyIcon/>
                    </div>
                  </td>
                  <td style={{ padding:"16px 16px" }}><TypeBadge type={c.type}/></td>
                  <td style={{ padding:"16px 16px", fontSize:14, fontWeight:600, color:"#f59e0b" }}>{c.discount}</td>
                  <td style={{ padding:"16px 16px" }}>
                    {c.earnedBy ? (
                      <>
                        <div style={{ fontSize:13.5, fontWeight:600, color:"#111827" }}>{c.earnedBy}</div>
                        <div style={{ fontSize:12.5, color:"#9ca3af", display:"flex", alignItems:"center", gap:4, marginTop:3 }}>
                          {c.detailIcon==="box" ? <BoxRowIcon/> : <TagRowIcon/>}
                          {c.details}
                        </div>
                      </>
                    ) : (
                      <span style={{ fontSize:13.5, color:"#6b7280" }}>{c.details}</span>
                    )}
                  </td>
                  <td style={{ padding:"16px 16px", fontSize:13.5, color:"#374151", fontWeight:c.usage.startsWith("0")?400:700 }}>{c.usage}</td>
                  <td style={{ padding:"16px 16px", fontSize:13.5, color:"#6b7280", whiteSpace:"nowrap" }}>{c.expiry}</td>
                  <td style={{ padding:"16px 16px" }}><StatusBadge status={c.status}/></td>
                  <td style={{ padding:"16px 16px" }}><TrashIcon/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showDrop && <div onClick={() => setShowDrop(false)} style={{ position:"fixed", inset:0, zIndex:199 }}/>}

      <style>{`
        @media (max-width:900px) { .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width:480px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </div>
  );
}