import React, { useState } from "react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", referrals: 150, conversions: 100, coupons: 110 },
  { month: "Feb", referrals: 180, conversions: 150, coupons: 140 },
  { month: "Mar", referrals: 160, conversions: 130, coupons: 130 },
  { month: "Apr", referrals: 210, conversions: 170, coupons: 180 },
  { month: "May", referrals: 240, conversions: 200, coupons: 210 },
  { month: "Jun", referrals: 280, conversions: 230, coupons: 260 },
];

const topReferrers = [
  { name: "Alex Martinez",  code: "ALEX2026",    referrals: 45, coupons: 45 },
  { name: "Jessica Lee",    code: "JESSICA2026", referrals: 38, coupons: 38 },
  { name: "Chris Brown",    code: "CHRIS2025",   referrals: 32, coupons: 32 },
  { name: "Emily Davis",    code: "EMILY2026",   referrals: 28, coupons: 28 },
  { name: "Michael Chen",   code: "MICHAEL2025", referrals: 24, coupons: 24 },
];

const styles = `
  .rs-page { background: #f8f9fb; min-height: 100vh; padding: 44px 56px; font-family: 'Segoe UI', sans-serif; box-sizing: border-box; }
  .rs-stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; margin-bottom: 30px; }
  .rs-charts { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 30px; }
  .rs-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .rs-referrer-stats { display: flex; gap: 46px; align-items: center; }
  .rs-referrer-row { display: flex; align-items: center; gap: 18px; padding: 17px 0; }

  @media (max-width: 1024px) {
    .rs-stats { grid-template-columns: repeat(3, 1fr); }
    .rs-charts { grid-template-columns: 1fr; }
  }

  @media (max-width: 768px) {
    .rs-page { padding: 24px 20px; }
    .rs-stats { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .rs-charts { grid-template-columns: 1fr; gap: 16px; }
    .rs-form-grid { grid-template-columns: 1fr; gap: 12px; }
    .rs-referrer-stats { gap: 20px; }
    .rs-referrer-row { flex-wrap: wrap; gap: 12px; }
  }

  @media (max-width: 480px) {
    .rs-page { padding: 16px 14px; }
    .rs-stats { grid-template-columns: 1fr 1fr; gap: 10px; }
    .rs-referrer-stats { gap: 14px; }
    .rs-referrer-stats p:first-child { font-size: 18px !important; }
  }
`;

function Toggle({ enabled, onToggle }) {
  return (
    <button onClick={onToggle} style={{
      width: 36, height: 20, borderRadius: 10,
      background: enabled ? "#f97316" : "#d1d5db",
      border: "none", cursor: "pointer", position: "relative",
      transition: "background 0.2s", flexShrink: 0,
    }}>
      <span style={{
        position: "absolute", top: 2,
        left: enabled ? 18 : 2,
        width: 16, height: 16, borderRadius: "50%",
        background: "#fff", transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "13px 17px", boxShadow: "0 4px 14px rgba(0,0,0,0.09)", minWidth: 195 }}>
        <p style={{ fontWeight: 700, fontSize: 16, color: "#1f2937", margin: "0 0 8px 0" }}>{label}</p>
        <p style={{ fontSize: 14, color: "#3b82f6", margin: "0 0 5px 0" }}>Total Referrals : {payload[0]?.value}</p>
        <p style={{ fontSize: 14, color: "#f97316", margin: 0 }}>Conversions : {payload[1]?.value}</p>
      </div>
    );
  }
  return null;
}

function CustomLegend() {
  return (
    <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
      {[{ color: "#3b82f6", label: "Total Referrals" }, { color: "#f97316", label: "Conversions" }].map(({ color, label }) => (
        <span key={label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16 }}>
          <span style={{ display: "inline-block", width: 34, height: 3, background: color, borderRadius: 2 }} />
          <span style={{ color }}>{label}</span>
        </span>
      ))}
    </div>
  );
}

function BarLegend() {
  return (
    <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 18 }}>
      <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16, color: "#374151" }}>
        <span style={{ display: "inline-block", width: 22, height: 22, background: "#10b981", borderRadius: 4 }} />
        Coupons Generated
      </span>
    </div>
  );
}

export default function ReferralSystem() {
  const [activeTab, setActiveTab] = useState("general");
  const [generalEnabled, setGeneralEnabled] = useState(true);
  const [productEnabled, setProductEnabled] = useState(false);

  return (
    <>
      <style>{styles}</style>
      <div className="rs-page">

        {/* PAGE HEADER */}
        <div style={{ marginBottom: 30 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Referral System</h1>
          <p style={{ color: "#6b7280", marginTop: 6, fontSize: 16 }}>Configure and monitor automated referral rewards</p>
        </div>

        {/* OVERVIEW BOX */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "26px 30px", marginBottom: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 15 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#3b82f6" />
              <path d="M19 15L19.8 17.2L22 18L19.8 18.8L19 21L18.2 18.8L16 18L18.2 17.2L19 15Z" fill="#3b82f6" opacity="0.5" />
            </svg>
            <h3 style={{ color: "#3b82f6", fontWeight: 700, fontSize: 17, margin: 0 }}>Referral System Overview</h3>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 13px 0", display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Auto-Generated Codes:", desc: "Customers automatically get unique referral codes when they register" },
              { label: "Customer Sharing:", desc: "Customers share their codes to bring in new customers who get discounts" },
              { label: "Admin-Controlled Rewards:", desc: "You manually create and distribute coupon rewards to referrers" },
              { label: "Product-Specific Coupons:", desc: "Configure special referral rewards for individual products" },
            ].map((item, i) => (
              <li key={i} style={{ fontSize: 14.5 }}>
                <span style={{ color: "#374151", fontWeight: 700 }}>✓ {item.label}</span>
                <span style={{ color: "#6b7280" }}> {item.desc}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 14.5, color: "#3b82f6", margin: 0, cursor: "pointer" }}>
            · Monitor referral activity and generate reward coupons for successful referrers
          </p>
        </div>

        {/* STATS */}
        <div className="rs-stats">
          <StatCard title="Total Referrals" value="1129" sub="+12% this month" subColor="#10b981"
            icon={<svg width="38" height="38" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="7" r="3" stroke="#3b82f6" strokeWidth="1.5" fill="none"/>
              <circle cx="16" cy="8" r="2.5" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.5"/>
              <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              <path d="M16 13c2.2 0 4 1.8 4 4" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
            </svg>}
          />
          <StatCard title="Active Referrers" value="156" sub="+8% this month" subColor="#10b981"
            icon={<svg width="38" height="38" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="10" width="4" height="10" rx="1" fill="#f97316" opacity="0.4"/>
              <rect x="10" y="6" width="4" height="14" rx="1" fill="#f97316" opacity="0.7"/>
              <rect x="16" y="2" width="4" height="18" rx="1" fill="#f97316"/>
            </svg>}
          />
          <StatCard title="Conversion Rate" value="87.5%" sub="Excellent" subColor="#10b981"
            icon={<svg width="38" height="38" viewBox="0 0 24 24" fill="none">
              <polyline points="3,17 8,12 12,14 17,7 21,9" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <polyline points="17,7 21,7 21,11" stroke="#10b981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
          />
          <StatCard title="Coupons Distributed" value="987" sub="Auto-generated" subColor="#6b7280"
            icon={<svg width="38" height="38" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#3b82f6" strokeWidth="1.5" fill="none"/>
              <path d="M9 12l2 2 4-4" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>}
          />
          <StatCard title="Coupon Value" value="$4935" sub="Total distributed" subColor="#6b7280"
            icon={<svg width="38" height="38" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5"/>
              <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#f59e0b">$</text>
            </svg>}
          />
        </div>

        {/* CHARTS */}
        <div className="rs-charts">
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: "26px 30px" }}>
            <h3 style={{ fontWeight: 700, color: "#1f2937", fontSize: 17, marginBottom: 20, marginTop: 0 }}>Referral Trends</h3>
            <ResponsiveContainer width="100%" height={285}>
              <LineChart data={data} margin={{ top: 5, right: 10, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 13, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 13, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="referrals" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4.5, fill: "#3b82f6" }} />
                <Line type="monotone" dataKey="conversions" stroke="#f97316" strokeWidth={2.5} dot={{ r: 4.5, fill: "#f97316" }} />
              </LineChart>
            </ResponsiveContainer>
            <CustomLegend />
          </div>

          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: "26px 30px" }}>
            <h3 style={{ fontWeight: 700, color: "#1f2937", fontSize: 17, marginBottom: 20, marginTop: 0 }}>Coupons Earned</h3>
            <ResponsiveContainer width="100%" height={285}>
              <BarChart data={data} margin={{ top: 5, right: 10, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 13, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 13, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 15, padding: "12px 16px" }} formatter={(value) => [value, "Coupons Generated"]} />
                <Bar dataKey="coupons" name="Coupons Generated" fill="#10b981" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <BarLegend />
          </div>
        </div>

        {/* REFERRAL CONFIGURATION */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: "30px", marginBottom: 30 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="#f97316" strokeWidth="1.5"/>
              <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <h3 style={{ fontWeight: 700, fontSize: 18, color: "#1f2937", margin: 0 }}>Referral Configuration</h3>
          </div>
          <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 22, marginTop: 5 }}>Configure automated reward rules for the ecommerce platform</p>

          {/* Tabs */}
          <div style={{ display: "inline-flex", marginBottom: 24, border: "1.5px solid #d1d5db", borderRadius: 20, overflow: "hidden", width: "fit-content" }}>
            {["general", "product"].map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "6px 18px", fontSize: 13,
                fontWeight: activeTab === tab ? 600 : 400,
                background: "#fff",
                border: "none",
                borderLeft: i === 1 ? "1.5px solid #d1d5db" : "none",
                color: activeTab === tab ? "#1f2937" : "#6b7280",
                cursor: "pointer",
              }}>
                {tab === "general" ? "General Referrals" : "Product Referrals"}
              </button>
            ))}
          </div>

          {activeTab === "general" ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 16, color: "#1f2937", margin: 0 }}>Enable General Referrals</p>
                  <p style={{ fontSize: 13.5, color: "#6b7280", margin: "4px 0 0 0" }}>Rewards for referring customers who make any purchase</p>
                </div>
                <Toggle enabled={generalEnabled} onToggle={() => setGeneralEnabled(!generalEnabled)} />
              </div>

              {generalEnabled && (
                <>
                  <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "20px 24px", marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 17 }}>
                      <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                        <circle cx="9" cy="7" r="3" stroke="#10b981" strokeWidth="1.5" fill="none"/>
                        <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        <circle cx="17" cy="9" r="2" stroke="#10b981" strokeWidth="1.5" fill="none"/>
                        <path d="M17 15c1.7 0 3 1.3 3 3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                      </svg>
                      <span style={{ color: "#10b981", fontWeight: 600, fontSize: 16 }}>Customer Discount (for people using the code)</span>
                    </div>
                    <div className="rs-form-grid">
                      <div>
                        <label style={{ fontSize: 13.5, color: "#374151", fontWeight: 500 }}>Discount Type</label>
                        <select style={{ width: "100%", border: "1px solid #d1fae5", borderRadius: 9, padding: "11px 14px", marginTop: 6, fontSize: 14.5, background: "#fff", color: "#1f2937" }}>
                          <option>Percentage (%)</option>
                          <option>Fixed Amount ($)</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: 13.5, color: "#374151", fontWeight: 500 }}>Discount Value</label>
                        <input style={{ width: "100%", border: "1px solid #d1fae5", borderRadius: 9, padding: "11px 14px", marginTop: 6, fontSize: 14.5, boxSizing: "border-box" }} defaultValue="15" type="number" min="0" />
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: "20px 24px", marginBottom: 26 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 17 }}>
                      <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="8" width="18" height="13" rx="2" stroke="#f97316" strokeWidth="1.5" fill="none"/>
                        <path d="M12 8V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        <path d="M12 8V6a3 3 0 0 1 3-3 3 3 0 0 1 3 3v2" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        <line x1="12" y1="13" x2="12" y2="17" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="10" y1="15" x2="14" y2="15" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <span style={{ color: "#f97316", fontWeight: 600, fontSize: 16 }}>Referrer Reward (coupon they earn per referral)</span>
                    </div>
                    <div className="rs-form-grid">
                      <div>
                        <label style={{ fontSize: 13.5, color: "#374151", fontWeight: 500 }}>Reward Type</label>
                        <select style={{ width: "100%", border: "1px solid #fed7aa", borderRadius: 9, padding: "11px 14px", marginTop: 6, fontSize: 14.5, background: "#fff", color: "#1f2937" }}>
                          <option>Percentage (%)</option>
                          <option>Fixed Amount ($)</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: 13.5, color: "#374151", fontWeight: 500 }}>Reward Value</label>
                        <input style={{ width: "100%", border: "1px solid #fed7aa", borderRadius: 9, padding: "11px 14px", marginTop: 6, fontSize: 14.5, boxSizing: "border-box" }} defaultValue="5" type="number" min="0" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={{ background: "#f97316", color: "#fff", border: "none", borderRadius: 10, padding: "8px 20px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                  Save General Settings
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 16, color: "#1f2937", margin: 0 }}>Enable Product-Specific Referrals</p>
                  <p style={{ fontSize: 13.5, color: "#6b7280", margin: "4px 0 0 0" }}>Rewards for referring customers who buy specific products</p>
                </div>
                <Toggle enabled={productEnabled} onToggle={() => setProductEnabled(!productEnabled)} />
              </div>

              {productEnabled && (
                <>
                  <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "20px 24px", marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 17 }}>
                      <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                        <circle cx="9" cy="7" r="3" stroke="#10b981" strokeWidth="1.5" fill="none"/>
                        <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        <circle cx="17" cy="9" r="2" stroke="#10b981" strokeWidth="1.5" fill="none"/>
                        <path d="M17 15c1.7 0 3 1.3 3 3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                      </svg>
                      <span style={{ color: "#10b981", fontWeight: 600, fontSize: 16 }}>Default Customer Discount (per product)</span>
                    </div>
                    <div className="rs-form-grid">
                      <div>
                        <label style={{ fontSize: 13.5, color: "#374151", fontWeight: 500 }}>Discount Type</label>
                        <select style={{ width: "100%", border: "1px solid #d1fae5", borderRadius: 9, padding: "11px 14px", marginTop: 6, fontSize: 14.5, background: "#fff", color: "#1f2937" }}>
                          <option>Percentage (%)</option>
                          <option>Fixed Amount ($)</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: 13.5, color: "#374151", fontWeight: 500 }}>Discount Value</label>
                        <input style={{ width: "100%", border: "1px solid #d1fae5", borderRadius: 9, padding: "11px 14px", marginTop: 6, fontSize: 14.5, boxSizing: "border-box" }} defaultValue="10" type="number" min="0" />
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: "20px 24px", marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 17 }}>
                      <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="8" width="18" height="13" rx="2" stroke="#f97316" strokeWidth="1.5" fill="none"/>
                        <path d="M12 8V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3v2" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        <path d="M12 8V6a3 3 0 0 1 3-3 3 3 0 0 1 3 3v2" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                        <line x1="12" y1="13" x2="12" y2="17" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="10" y1="15" x2="14" y2="15" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <span style={{ color: "#f97316", fontWeight: 600, fontSize: 16 }}>Default Referrer Reward (per product sale)</span>
                    </div>
                    <div className="rs-form-grid">
                      <div>
                        <label style={{ fontSize: 13.5, color: "#374151", fontWeight: 500 }}>Reward Type</label>
                        <select style={{ width: "100%", border: "1px solid #fed7aa", borderRadius: 9, padding: "11px 14px", marginTop: 6, fontSize: 14.5, background: "#fff", color: "#1f2937" }}>
                          <option>Fixed Amount ($)</option>
                          <option>Percentage (%)</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: 13.5, color: "#374151", fontWeight: 500 }}>Reward Value</label>
                        <input style={{ width: "100%", border: "1px solid #fed7aa", borderRadius: 9, padding: "11px 14px", marginTop: 6, fontSize: 14.5, boxSizing: "border-box" }} defaultValue="5" type="number" min="0" />
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "14px 18px", marginBottom: 26 }}>
                    <p style={{ fontSize: 13.5, color: "#374151", margin: 0 }}>
                      <span style={{ fontWeight: 700, color: "#1d4ed8" }}>Note:</span> These are default settings. You can configure specific rules for individual products on the{" "}
                      <span style={{ color: "#f97316", textDecoration: "underline", cursor: "pointer" }}>Products page</span>.
                    </p>
                  </div>
                </>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={{ background: "#f97316", color: "#fff", border: "none", borderRadius: 10, padding: "8px 20px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                  Save Product Settings
                </button>
              </div>
            </>
          )}
        </div>

        {/* TOP REFERRERS */}
        <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: "30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h3 style={{ fontWeight: 700, fontSize: 18, color: "#1f2937", margin: 0 }}>Top Referrers</h3>
            <span style={{ fontSize: 14.5, color: "#3b82f6", cursor: "pointer" }}>View All Referrers</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {topReferrers.map((user, index) => (
              <div key={index} className="rs-referrer-row" style={{ borderBottom: index < topReferrers.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#f97316", color: "#fff", fontWeight: 700, fontSize: 13.5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  #{index + 1}
                </div>
                <div style={{ flex: 1, minWidth: 100 }}>
                  <p style={{ fontWeight: 600, fontSize: 16, color: "#1f2937", margin: 0 }}>{user.name}</p>
                  <p style={{ fontSize: 12.5, color: "#9ca3af", margin: "3px 0 0 0", letterSpacing: 0.5 }}>{user.code}</p>
                </div>
                <div className="rs-referrer-stats">
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontWeight: 700, fontSize: 23, color: "#1f2937", margin: 0 }}>{user.referrals}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af", margin: "3px 0 0 0" }}>Referrals</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontWeight: 700, fontSize: 23, color: "#10b981", margin: 0 }}>{user.coupons}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af", margin: "3px 0 0 0" }}>Coupons</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontWeight: 700, fontSize: 23, color: "#3b82f6", margin: 0 }}>100%</p>
                    <p style={{ fontSize: 12, color: "#9ca3af", margin: "3px 0 0 0" }}>Conversion</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

function StatCard({ title, value, sub, icon, subColor }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: "20px 22px", display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ fontSize: 13.5, color: "#6b7280", margin: 0 }}>{title}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ fontSize: 30, fontWeight: 700, color: "#1f2937", margin: 0 }}>{value}</h2>
          {sub && <p style={{ fontSize: 12.5, color: subColor || "#6b7280", margin: "5px 0 0 0" }}>{sub}</p>}
        </div>
        <div style={{ marginTop: 2 }}>{icon}</div>
      </div>
    </div>
  );
}