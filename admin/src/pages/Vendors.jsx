import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorDetail from "./VendorDetail";
import { TrendingUp, Download, Pencil, Star, 
  Package, 
  DollarSign, 
  Phone, 
  Calendar, 
  MapPin, 
  Mail , CheckCircle, AlertCircle ,Eye, Trash2, Plus, CreditCard} from "lucide-react";
  import { Search } from "lucide-react";


const initialVendors = [
  { id: 1, name: "TechStore Pro", owner: "Robert Johnson", email: "robert@techstorepro.com", products: 156, status: "verified", sales: 125000 },
  { id: 2, name: "Fashion Hub", owner: "Lisa Martinez", email: "lisa@fashionhub.com", products: 234, status: "verified", sales: 98500 },
  { id: 3, name: "Home Essentials", owner: "James Wilson", email: "james@homeessentials.com", products: 189, status: "verified", sales: 87200 },
  { id: 4, name: "Sports World", owner: "Maria Garcia", email: "maria@sportsworld.com", products: 145, status: "unverified", sales: 76800 },
  { id: 5, name: "Beauty Corner", owner: "Emma Thompson", email: "emma@beautycorner.com", products: 298, status: "verified", sales: 64300 },
  { id: 6, name: "Kids Paradise", owner: "Michael Brown", email: "michael@sportsworld.com", products: 167, status: "verified", sales: 52100 },
  { id: 7, name: "Book Haven", owner: "Sarah Anderson", email: "sarah@bookhaven.com", products: 45, status: "unverified", sales: 0 },
];

const AMBER = "#d97706";
const GREEN = "#16a34a";
const RED = "#dc2626";

function Avatar({ name }) {
  return (
    <div style={{
      width: 44, height: 44, borderRadius: "50%", background: AMBER,
      color: "#fff", fontWeight: 400, fontSize: 18,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
    }}>
      {name.charAt(0)}
    </div>
  );
}

function StatusBadge({ status }) {
  const isVerified = status === "verified";
  const isUnverified = status === "unverified";

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 14px",
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 600,
    whiteSpace: "nowrap"
  };

  if (isVerified) {
    return (
      <span style={{
        ...baseStyle,
        background: "#10b981",
        color: "#fff"
      }}>
        <span style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: "2px solid #fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10
        }}>
          ✓
        </span>
        Verified
      </span>
    );
  }

  if (isUnverified) {
    return (
      <span style={{
        ...baseStyle,
        background: "#fff",
        color: "#f97316",
        border: "1.5px solid #f97316"
      }}>
        <span style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          border: "1.5px solid #f97316",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10
        }}>
          ×
        </span>
        Unverified
      </span>
    );
  }

  return null;
}

function MenuItem({ icon, label, onClick, color = "#374151" }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "11px 16px",
        background: hover ? "#f3f4f6" : "none",  // little better hover
        border: "none",
        textAlign: "left",
        cursor: "pointer",
        fontSize: 14,
        color,
        fontFamily: "inherit",
        fontWeight: 600   // 🔥 changed here
      }}
    >
      <span style={{ fontSize: 15, opacity: 0.7 }}>
        {icon}
      </span>
      {label}
    </button>
  );
}

const inp = {
  width: "100%", boxSizing: "border-box", border: "1px solid #e5e7eb",
  borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none",
  fontFamily: "inherit", background: "#fff"
};
const lbl = { display: "block", marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#374151" };
const overlay = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
};
const modalBox = {
  background: "#fff", borderRadius: 16, padding: 32,
  width: "100%", maxWidth: 580, boxShadow: "0 24px 60px rgba(0,0,0,0.18)"
};

export default function VendorDashboard() {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState(initialVendors);
  const [showAdd, setShowAdd] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [detailId, setDetailId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [form, setForm] = useState({ storeName: "", ownerName: "", email: "", phone: "", license: "", address: "" });

  const totalVendors = vendors.length;
  const activeVendors = vendors.filter(v => v.status === "verified").length;
  const pendingCount = vendors.filter(v => v.status === "pending").length;
  const activeRate = ((activeVendors / totalVendors) * 100).toFixed(1);

  const filtered = vendors.filter(v => {
    const q = search.toLowerCase();
    const matchSearch = v.name.toLowerCase().includes(q) || v.owner.toLowerCase().includes(q) || v.email.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All Status" || v.status === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const handleAdd = () => {
    if (!form.storeName || !form.ownerName || !form.email) return;
    setVendors([...vendors, {
      id: Date.now(), name: form.storeName, owner: form.ownerName,
      email: form.email, phone: form.phone, license: form.license,
      address: form.address, products: 0, status: "pending", sales: 0
    }]);
    setForm({ storeName: "", ownerName: "", email: "", phone: "", license: "", address: "" });
    setShowAdd(false);
  };

  const handleAction = (action, id) => {
    setOpenMenu(null);
    if (action === "view") { setDetailId(id); return; }
    if (action === "unverify") setVendors(vendors.map(v => v.id === id ? { ...v, status: "pending" } : v));
    if (action === "verify") setVendors(vendors.map(v => v.id === id ? { ...v, status: "verified" } : v));
    if (action === "suspend") setVendors(vendors.map(v => v.id === id ? { ...v, status: "suspended" } : v));
  };

  const detailVendor = vendors.find(v => v.id === detailId);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f5f5f5", minHeight: "100vh", padding: "32px 40px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1
  style={{
    margin: 0,
    fontSize: 40,          // bigger
    fontWeight: 500,       // extra bold
    color: "#000",         // pure black
    letterSpacing: "-0.5px"
  }}
>
  Vendors
</h1>

<p
  style={{
    margin: "8px 0 0",
    color: "#6b7280",
    fontSize: 16
  }}
>
  Manage vendor accounts and store verification
</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontWeight: 500, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
            ↓ Export
          </button>
          <button onClick={() => setShowAdd(true)} style={{ background: AMBER, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
            + Add Vendor
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 28 }}>
        <div style={{ background: "#fff", borderRadius: 16, padding: "24px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <p style={{ margin: "0 0 10px", fontSize: 14, color: "#6b7280" }}>Total Vendors</p>
          <p style={{ margin: "0 0 8px", fontSize: 42, fontWeight: 500, color: "#111", lineHeight: 1 }}>{248}</p>
          <p style={{ margin: 0, fontSize: 13, color: GREEN, fontWeight: 500 }}>+8.2% this month</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 16, padding: "24px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <p style={{ margin: "0 0 10px", fontSize: 14, color: "#6b7280" }}>Active Vendors</p>
          <p style={{ margin: "0 0 8px", fontSize: 42, fontWeight: 500, color: "#111", lineHeight: 1 }}>{235}</p>
          <p style={{ margin: 0, fontSize: 13, color: GREEN, fontWeight: 500 }}>94.8% active rate</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 16, padding: "24px 28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <p style={{ margin: "0 0 10px", fontSize: 14, color: "#6b7280" }}>Pending Verification</p>
          <p style={{ margin: "0 0 8px", fontSize: 42, fontWeight: 500, color: "#111", lineHeight: 1 }}>{8}</p>
          <span style={{ background: AMBER, color: "#fff", padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>Requires Action</span>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "visible" }}>
        <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f3f4f6" }}>
          <h2 style={{ 
  margin: 0, 
  fontSize: 18, 
  fontWeight: 600, 
  color: "#111827" 
}}>
  All Vendors
</h2>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <span
  style={{
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    display: "flex",
    alignItems: "center"
  }}
>
  <Search size={18} strokeWidth={1.5} />
</span>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search vendors..."
                style={{ ...inp, width: 220, paddingLeft: 36 }} />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              style={{ ...inp, width: 140, cursor: "pointer" }}>
              {["All Status", "Verified", "Pending", "Suspended"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Store Name", "Owner", "Status", "Total Sales", "Actions"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "14px 24px", fontSize: 13, color: "#9ca3af", fontWeight: 600, borderBottom: "1px solid #f3f4f6" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(v => (
              <tr
                key={v.id}
                style={{ borderBottom: "1px solid #f9fafb", cursor: "pointer" }}
                onClick={() => navigate(`/vendorsdetails/${v.id}`, { state: { vendor: v } })}
                onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <Avatar name={v.name} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>{v.name}</div>
                      <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>{v.products} products</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "16px 24px" }}>
                  <div style={{ fontWeight: 500, fontSize: 15, color: "#374151" }}>{v.owner}</div>
                  <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 2 }}>{v.email}</div>
                </td>
                <td style={{ padding: "16px 24px" }}><StatusBadge status={v.status} /></td>
                <td style={{ padding: "16px 24px", fontWeight: 700, fontSize: 16, color: "#111" }}>${v.sales.toLocaleString()}</td>
                <td style={{ padding: "16px 24px", position: "relative" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      setOpenMenu(openMenu === v.id ? null : v.id);
                    }}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#9ca3af", padding: "4px 10px", borderRadius: 6 }}>
                    ⋮
                  </button>
                  {openMenu === v.id && (
                    <div style={{
                      position: "absolute", right: 20, top: 52,
                      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)", zIndex: 300, minWidth: 195, overflow: "hidden"
                    }}>
                     <MenuItem
  icon="👁"
  label="View Details"
  onClick={(e) => {
  e.stopPropagation();
  navigate(`/vendorsdetails/${v.id}`, { state: { vendor: v } });
}}
/>
                      {v.status === "verified"
                        ? <MenuItem icon="✓" label="Unverify Vendor" onClick={(e) => { e.stopPropagation(); handleAction("unverify", v.id); }} />
                        : <MenuItem icon="✓" label="Verify Vendor" onClick={(e) => { e.stopPropagation(); handleAction("verify", v.id); }} />}
                      {v.status !== "suspended" &&
                        <MenuItem icon="✕" label="Suspend Account" onClick={(e) => { e.stopPropagation(); handleAction("suspend", v.id); }} color={RED} />}
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: "center", padding: 48, color: "#9ca3af" }}>No vendors found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {openMenu && <div style={{ position: "fixed", inset: 0, zIndex: 200 }} onClick={() => setOpenMenu(null)} />}

      {/* Add Vendor Modal */}
      {showAdd && (
        <div style={overlay} onClick={() => setShowAdd(false)}>
          <div style={modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#111" }}>Add New Vendor</h2>
                <p style={{ margin: "6px 0 0", color: "#9ca3af", fontSize: 14 }}>Create a new vendor account and store profile</p>
              </div>
              <button onClick={() => setShowAdd(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9ca3af" }}>✕</button>
            </div>
            <div style={{ borderTop: "1px solid #f3f4f6", margin: "20px 0" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
              <div>
                <label style={lbl}>Store Name *</label>
                <input value={form.storeName} onChange={e => setForm({ ...form, storeName: e.target.value })}
                  placeholder="Enter store name"
                  style={{ ...inp, borderColor: form.storeName ? AMBER : "#e5e7eb", boxShadow: form.storeName ? `0 0 0 3px rgba(217,119,6,0.12)` : "none" }} />
              </div>
              <div>
                <label style={lbl}>Owner Name *</label>
                <input value={form.ownerName} onChange={e => setForm({ ...form, ownerName: e.target.value })}
                  placeholder="Enter owner name" style={inp} />
              </div>
              <div>
                <label style={lbl}>Email Address *</label>
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter email" style={inp} />
              </div>
              <div>
                <label style={lbl}>Phone Number</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="Enter phone number" style={inp} />
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={lbl}>Business License Number</label>
              <input value={form.license} onChange={e => setForm({ ...form, license: e.target.value })}
                placeholder="Enter license number" style={inp} />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={lbl}>Business Address</label>
              <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
                placeholder="Enter business address" style={inp} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button onClick={() => setShowAdd(false)}
                style={{ padding: "11px 28px", border: "1px solid #e5e7eb", borderRadius: 10, background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 15 }}>
                Cancel
              </button>
              <button onClick={handleAdd}
                style={{
                  padding: "11px 28px", background: AMBER, color: "#fff", border: "none",
                  borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 15,
                  opacity: (!form.storeName || !form.ownerName || !form.email) ? 0.55 : 1
                }}>
                Add Vendor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Detail Modal */}
      {detailVendor && (
        <div style={overlay} onClick={() => setDetailId(null)}>
          <div style={{ ...modalBox, maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Vendor Details</h2>
              <button onClick={() => setDetailId(null)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#9ca3af" }}>✕</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#f9fafb", borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <Avatar name={detailVendor.name} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{detailVendor.name}</div>
                <div style={{ marginTop: 6 }}><StatusBadge status={detailVendor.status} /></div>
              </div>
            </div>
            {[
              ["Owner", detailVendor.owner],
              ["Email", detailVendor.email],
              ["Products", detailVendor.products],
              ["Total Sales", `$${detailVendor.sales.toLocaleString()}`],
              ...(detailVendor.phone ? [["Phone", detailVendor.phone]] : []),
              ...(detailVendor.license ? [["License No.", detailVendor.license]] : []),
              ...(detailVendor.address ? [["Address", detailVendor.address]] : []),
            ].map(([k, val]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
                <span style={{ color: "#6b7280", fontSize: 14 }}>{k}</span>
                <span style={{ fontWeight: 600, color: "#111", fontSize: 14 }}>{val}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <button onClick={() => setDetailId(null)}
                style={{ padding: "11px 28px", background: AMBER, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}