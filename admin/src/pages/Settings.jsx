import { useState, useRef, useEffect } from "react";

function CustomSelect({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative", minWidth: 200 }}>
      {label && <div style={{ fontSize: 16, color: "#888", marginBottom: 8 }}>{label}</div>}
      <div onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        border: "1px solid #e0e0e0", borderRadius: 11, padding: "14px 18px",
        background: "#fff", cursor: "pointer", fontSize: 16, color: "#333", userSelect: "none"
      }}>
        <span>{value}</span>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: "#fff", border: "1px solid #e8e8e8", borderRadius: 12,
          boxShadow: "0 8px 24px rgba(0,0,0,0.10)", zIndex: 999, overflow: "hidden"
        }}>
          {options.map(opt => (
            <div key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                padding: "14px 20px", fontSize: 16, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: value === opt ? "#fff8ee" : "#fff",
                color: value === opt ? "#e07b00" : "#333",
                fontWeight: value === opt ? 600 : 400, transition: "background 0.15s"
              }}
              onMouseEnter={e => { if (value !== opt) e.currentTarget.style.background = "#f7f7f7"; }}
              onMouseLeave={e => { if (value !== opt) e.currentTarget.style.background = "#fff"; }}
            >
              <span>{opt}</span>
              {value === opt && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e07b00" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <div onClick={() => onChange(!checked)} style={{
      width: 54, height: 30, borderRadius: 15, cursor: "pointer",
      background: checked ? "#f5a623" : "#d0d0d0",
      position: "relative", transition: "background 0.2s", flexShrink: 0
    }}>
      <div style={{
        position: "absolute", top: 3, left: checked ? 27 : 3,
        width: 24, height: 24, borderRadius: "50%", background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.18)", transition: "left 0.2s"
      }} />
    </div>
  );
}

function Badge({ label, color }) {
  const colors = {
    active: { bg: "#e6f9f0", text: "#1a9e5a" },
    inactive: { bg: "#f3f3f3", text: "#999" },
    sandbox: { bg: "#fff3e0", text: "#e07b00" },
  };
  const c = colors[color] || colors.active;
  return (
    <span style={{
      background: c.bg, color: c.text, borderRadius: 20,
      padding: "5px 16px", fontSize: 14, fontWeight: 600
    }}>{label}</span>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #f0f0f0", borderRadius: 18,
      padding: "36px 40px", marginBottom: 26, ...style
    }}>{children}</div>
  );
}

function SectionTitle({ title, btn }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
      <span style={{ fontWeight: 700, fontSize: 21 }}>{title}</span>
      {btn}
    </div>
  );
}

function OrangeBtn({ children, small, onClick, icon }) {
  return (
    <button onClick={onClick} style={{
      background: "#f5a623", color: "#fff", border: "none", borderRadius: 10,
      padding: small ? "11px 22px" : "15px 30px", fontSize: small ? 15 : 16,
      fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
      boxShadow: "0 2px 8px rgba(245,166,35,0.15)"
    }}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

function OutlineBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "#fff", color: "#555", border: "1px solid #ddd", borderRadius: 10,
      padding: "15px 30px", fontSize: 16, fontWeight: 500, cursor: "pointer"
    }}>
      {children}
    </button>
  );
}

function InputField({ label, value, onChange, placeholder = "" }) {
  return (
    <div>
      {label && <div style={{ fontSize: 15, color: "#888", marginBottom: 8 }}>{label}</div>}
      <input
        value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: "100%", border: "1px solid #e0e0e0", borderRadius: 11,
          padding: "14px 18px", fontSize: 16, color: "#333", outline: "none",
          boxSizing: "border-box", background: "#fff"
        }}
      />
    </div>
  );
}

function PasswordField({ label, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      {label && <div style={{ fontSize: 15, color: "#888", marginBottom: 8 }}>{label}</div>}
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"} value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: "100%", border: "1px solid #e0e0e0", borderRadius: 11,
            padding: "14px 52px 14px 18px", fontSize: 16, color: "#333", outline: "none",
            boxSizing: "border-box", background: "#fff"
          }}
        />
        <button type="button" onClick={() => setShow(!show)} style={{
          position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 0
        }}>
          {show
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
            : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          }
        </button>
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ borderTop: "1px solid #f3f3f3", margin: "18px 0" }} />;
}

function ApiKeyItem({ api, onDelete }) {
  const [visible, setVisible] = useState(false);
  const maskedKey = api.key.slice(0, 18) + "•••••••••••";

  return (
    <div style={{
      border: "1px solid #efefef", borderRadius: 14,
      padding: "22px 24px", marginBottom: 16
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>{api.name}</span>
            <span style={{
              background: api.status === "active" ? "#22c55e" : api.status === "sandbox" ? "#fff3e0" : "#f3f3f3",
              color: api.status === "active" ? "#fff" : api.status === "sandbox" ? "#e07b00" : "#999",
              borderRadius: 20, padding: "4px 15px", fontSize: 14, fontWeight: 600
            }}>
              {api.status === "active" ? "active" : api.status === "sandbox" ? "sandbox" : "inactive"}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{
              fontFamily: "monospace", fontSize: 14, color: "#555",
              background: "#f9f9f9", borderRadius: 8, padding: "7px 14px"
            }}>
              {visible ? api.key : maskedKey}
            </span>
            <button onClick={() => setVisible(!visible)} style={{
              background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 3, display: "flex"
            }}>
              {visible
                ? <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              }
            </button>
            <button onClick={() => navigator.clipboard?.writeText(api.key)} style={{
              background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 3, display: "flex"
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
          </div>

          <div style={{ fontSize: 14, color: "#bbb" }}>
            Created: {api.date} &nbsp;•&nbsp; Last used: {api.last}
          </div>
        </div>

        <button onClick={() => onDelete(api.name)} style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "1px solid #fee2e2", background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "#ef4444", flexShrink: 0, marginLeft: 22
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4h6v2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [platformName, setPlatformName] = useState("NAADIYOL");
  const [supportEmail, setSupportEmail] = useState("support@naadiyol.com");
  const [currency, setCurrency] = useState("USD - US Dollar");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("UTC");
  const [maintenance, setMaintenance] = useState(false);

  const [smtpHost, setSmtpHost] = useState("smtp.gmail.com");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("noreply@naadiyol.com");
  const [smtpPass, setSmtpPass] = useState("secretpassword");
  const [encryption, setEncryption] = useState("TLS");

  const [stripeOn, setStripeOn] = useState(true);
  const [paypalOn, setPaypalOn] = useState(true);
  const [codOn, setCodOn] = useState(false);

  const [twoFA, setTwoFA] = useState(true);
  const [gdpr, setGdpr] = useState(true);
  const [passExpiry, setPassExpiry] = useState("90");
  const [sessionTimeout, setSessionTimeout] = useState("20");
  const [ipWhitelist, setIpWhitelist] = useState("192.168.1.1\n10.0.0.1");

  const [apiKeys, setApiKeys] = useState([
    { name: "Production API", status: "active", key: "sk_n4ash_live_4Ts8dR_k4nb8Mate9r8rf3eq1", date: "2026-01-15", last: "2026-02-17" },
    { name: "Mobile App API", status: "active", key: "sk_n4ash_live_8Kp3xQ_4ep4gn1Mter4vrnd4j", date: "2026-02-01", last: "2026-02-16" },
    { name: "Testing API", status: "sandbox", key: "sk_n4ash_test_2Bn7vL_bNt_MeN1p4t_3qn1d3", date: "2025-10-20", last: "2026-01-10" },
  ]);

  const deleteApiKey = (name) => setApiKeys(prev => prev.filter(k => k.name !== name));

  const thStyle = { fontSize: 15, color: "#aaa", fontWeight: 600, paddingBottom: 14, textAlign: "left" };
  const tdStyle = { fontSize: 16, color: "#444", padding: "16px 0" };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fa", fontFamily: "'DM Sans','Segoe UI',sans-serif", padding: "52px 0" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 40px" }}>

        <div style={{ marginBottom: 36 }}>
          <div style={{ fontWeight: 800, fontSize: 34, color: "#1a1a1a" }}>Settings</div>
          <div style={{ fontSize: 16, color: "#aaa" }}>Manage platform settings</div>
        </div>

        {/* General Settings */}
        <Card>
          <div style={{ fontWeight: 700, fontSize: 21, marginBottom: 26 }}>General Settings</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            <InputField label="Platform Name" value={platformName} onChange={setPlatformName} />
            <InputField label="Support Email" value={supportEmail} onChange={setSupportEmail} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 24 }}>
            <CustomSelect label="Currency" value={currency} onChange={setCurrency} options={["USD - US Dollar","EUR - Euro","GBP - British Pound","JPY - Japanese Yen","AUD - Australian Dollar"]} />
            <CustomSelect label="Language" value={language} onChange={setLanguage} options={["English","Spanish","French","German","Japanese"]} />
            <CustomSelect label="Timezone" value={timezone} onChange={setTimezone} options={["UTC","Eastern Time (US)","Pacific Time (US)","London","Tokyo"]} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fafafa", borderRadius: 11, padding: "18px 22px", marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Maintenance Mode</div>
              <div style={{ fontSize: 15, color: "#aaa" }}>Put the platform in maintenance mode</div>
            </div>
            <Toggle checked={maintenance} onChange={setMaintenance} />
          </div>
          <OrangeBtn>Save Settings</OrangeBtn>
        </Card>

        {/* Tax Configuration */}
        <Card>
          <SectionTitle title="Tax Configuration" btn={<OrangeBtn small icon="+">Add Tax Rate</OrangeBtn>} />
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>{["Country","State/Region","Tax Rate","Status","Actions"].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {[
                { country: "United States", state: "California", rate: "7.25%" },
                { country: "United States", state: "New York", rate: "8.52%" },
                { country: "United Kingdom", state: "All", rate: "20%" },
              ].map((row, i) => (
                <tr key={i} style={{ borderTop: "1px solid #f3f3f3" }}>
                  <td style={tdStyle}>{row.country}</td>
                  <td style={tdStyle}>{row.state}</td>
                  <td style={tdStyle}>{row.rate}</td>
                  <td style={tdStyle}><Badge label="Active" color="active" /></td>
                  <td style={tdStyle}>
                    <span style={{ color: "#f5a623", fontSize: 15, cursor: "pointer", marginRight: 16 }}>Edit</span>
                    <span style={{ color: "#e05c5c", fontSize: 15, cursor: "pointer" }}>🗑</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Shipping Zones */}
        <Card>
          <SectionTitle title="Shipping Zones" btn={<OrangeBtn small icon="+">Add Shipping Zone</OrangeBtn>} />
          {[
            { name: "United States", tag: "Active", countries: "US", flat: "$9.00", free: "$50" },
            { name: "Europe", tag: "Active", countries: "DE, FR, NL, IT, ES", flat: "$15.00", free: "$75" },
            { name: "Rest of World", tag: "Active", countries: "—", flat: "$25.00", free: "$100" },
          ].map((z, i) => (
            <div key={i}>
              {i > 0 && <Divider />}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 16 }}>{z.name}</span>
                    <Badge label={z.tag} color="active" />
                  </div>
                  <div style={{ fontSize: 15, color: "#aaa" }}>Countries: {z.countries}</div>
                  <div style={{ fontSize: 15, color: "#555", marginTop: 5 }}>
                    Flat Rate: <b>{z.flat}</b> &nbsp; Free Shipping Over: <b>{z.free}</b>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  <span style={{ color: "#f5a623", fontSize: 15, cursor: "pointer" }}>Edit</span>
                  <span style={{ color: "#e05c5c", fontSize: 15, cursor: "pointer" }}>🗑</span>
                </div>
              </div>
            </div>
          ))}
        </Card>

        {/* Email SMTP Settings */}
        <Card>
          <div style={{ fontWeight: 700, fontSize: 21, marginBottom: 26 }}>Email (SMTP) Settings</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            <InputField label="SMTP Host *" value={smtpHost} onChange={setSmtpHost} />
            <InputField label="SMTP Port *" value={smtpPort} onChange={setSmtpPort} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <InputField label="SMTP Username *" value={smtpUser} onChange={setSmtpUser} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <PasswordField label="SMTP Password *" value={smtpPass} onChange={setSmtpPass} />
          </div>
          <div style={{ marginBottom: 30 }}>
            <CustomSelect label="Encryption" value={encryption} onChange={setEncryption} options={["TLS","SSL","None"]} />
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <OrangeBtn>Save Settings</OrangeBtn>
            <OutlineBtn>✉ Send Test Email</OutlineBtn>
          </div>
        </Card>

        {/* Payment Gateway */}
        <Card>
          <div style={{ fontWeight: 700, fontSize: 21, marginBottom: 26 }}>Payment Gateway Configuration</div>
          {[
            { label: "Stripe", sub: "Accept credit/debit cards", bg: "#6772e5", letter: "S", checked: stripeOn, setChecked: setStripeOn, k1Label: "Publishable Key", k1: "pk_live_••••••••••••••••••••••", k2Label: "Secret Key", k2: "sk_live_secret" },
            { label: "PayPal", sub: "Accept PayPal payments", bg: "#003087", letter: "P", checked: paypalOn, setChecked: setPaypalOn, k1Label: "Client ID", k1: "paypal_client_id_here", k2Label: "Secret", k2: "paypal_secret_here" },
          ].map((gw, i) => (
            <div key={i} style={{ border: "1px solid #f0f0f0", borderRadius: 13, padding: 26, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 12, background: gw.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 19 }}>{gw.letter}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{gw.label}</div>
                    <div style={{ fontSize: 14, color: "#aaa" }}>{gw.sub}</div>
                  </div>
                </div>
                <Toggle checked={gw.checked} onChange={gw.setChecked} />
              </div>
              <div style={{ display: "grid", gap: 18 }}>
                <InputField label={gw.k1Label} value={gw.k1} onChange={() => {}} />
                <PasswordField label={gw.k2Label} value={gw.k2} onChange={() => {}} />
              </div>
            </div>
          ))}
          <div style={{ border: "1px solid #f0f0f0", borderRadius: 13, padding: 26, marginBottom: 30 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: "#4caf50", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 19 }}>$</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>Cash on Delivery</div>
                  <div style={{ fontSize: 14, color: "#aaa" }}>Payment on delivery</div>
                </div>
              </div>
              <Toggle checked={codOn} onChange={setCodOn} />
            </div>
          </div>
          <OrangeBtn>Save Settings</OrangeBtn>
        </Card>

        {/* API Keys */}
        <Card>
          <SectionTitle title="API Keys" btn={<OrangeBtn small icon="+">Generate New Key</OrangeBtn>} />
          {apiKeys.map((api) => (
            <ApiKeyItem key={api.name} api={api} onDelete={deleteApiKey} />
          ))}
        </Card>

        {/* Security & GDPR */}
        <Card>
          <div style={{ fontWeight: 700, fontSize: 21, marginBottom: 26 }}>Security & GDPR</div>
          {[
            { title: "Two-Factor Authentication", sub: "Require 2FA for admin accounts", val: twoFA, set: setTwoFA },
            { title: "GDPR Compliance", sub: "Enable GDPR data protection features", val: gdpr, set: setGdpr },
          ].map((item, i) => (
            <div key={i}>
              {i > 0 && <Divider />}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{item.title}</div>
                  <div style={{ fontSize: 15, color: "#aaa" }}>{item.sub}</div>
                </div>
                <Toggle checked={item.val} onChange={item.set} />
              </div>
            </div>
          ))}
          <Divider />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            <InputField label="Password Expiry (days)" value={passExpiry} onChange={setPassExpiry} />
            <InputField label="Session Timeout (minutes)" value={sessionTimeout} onChange={setSessionTimeout} />
          </div>
          <div style={{ marginBottom: 30 }}>
            <div style={{ fontSize: 15, color: "#888", marginBottom: 8 }}>IP Whitelist (one per line)</div>
            <textarea value={ipWhitelist} onChange={e => setIpWhitelist(e.target.value)} rows={3} style={{
              width: "100%", border: "1px solid #e0e0e0", borderRadius: 11,
              padding: "14px 18px", fontSize: 16, color: "#333", outline: "none",
              boxSizing: "border-box", resize: "vertical", fontFamily: "inherit"
            }} />
            <div style={{ fontSize: 14, color: "#bbb" }}>Only allow admin access from these IP addresses</div>
          </div>
          <OrangeBtn>Save Security Settings</OrangeBtn>
        </Card>

        {/* Audit Logs */}
        <Card>
          <div style={{ fontWeight: 700, fontSize: 21, marginBottom: 26 }}>Audit Logs</div>
          {[
            { action: "Admin login", user: "admin@naadiyol.com", ip: "192.168.1.1", time: "2026-02-17 14:52:16" },
            { action: "Product updated", user: "vendor@example.com", ip: "10.0.2.9", time: "2026-02-17 11:15:41" },
            { action: "Settings changed", user: "admin@policy.com", ip: "192.168.1.162", time: "2026-02-17 12:06:23" },
          ].map((log, i) => (
            <div key={i}>
              {i > 0 && <Divider />}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 500 }}>{log.action} by <span style={{ color: "#f5a623" }}>{log.user}</span></div>
                  <div style={{ fontSize: 14, color: "#bbb" }}>IP: {log.ip}</div>
                </div>
                <div style={{ fontSize: 14, color: "#bbb", whiteSpace: "nowrap" }}>{log.time}</div>
              </div>
            </div>
          ))}
        </Card>

      </div>
    </div>
  );
}