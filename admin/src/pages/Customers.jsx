

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit, Trash2, Ban, Eye } from "lucide-react";

const initialCustomers = [
  { id: 1, name: "Jessica Martinez", initials: "JM", email: "jessica.martinez@example.com", phone: "+1 (555) 123-4567", joined: "Jan 15, 2024", status: "enabled", orders: 45, lastOrder: "2 days ago", totalSpent: 12450, country: "United States", verified: true, recentOrders: [{ id: "#ORD-1234", date: "Feb 15, 2024", amount: 345.0, status: "Delivered" }, { id: "#ORD-1198", date: "Feb 10, 2024", amount: 189.5, status: "Delivered" }, { id: "#ORD-1165", date: "Feb 5, 2024", amount: 520.0, status: "In Transit" }] },
  { id: 2, name: "Robert Chen", initials: "RC", email: "robert.chen@example.com", phone: "+1 (555) 234-5678", joined: "Feb 20, 2024", status: "enabled", orders: 32, lastOrder: "1 hour ago", totalSpent: 8920.5, country: "Canada", verified: true, recentOrders: [{ id: "#ORD-1240", date: "Mar 1, 2024", amount: 210.0, status: "Delivered" }] },
  { id: 3, name: "Emma Thompson", initials: "ET", email: "emma.thompson@example.com", phone: "+44 20 7123 4567", joined: "Dec 10, 2023", status: "enabled", orders: 67, lastOrder: "5 days ago", totalSpent: 23100.75, country: "United Kingdom", verified: true, recentOrders: [{ id: "#ORD-1230", date: "Feb 25, 2024", amount: 780.0, status: "Delivered" }] },
  { id: 4, name: "Mohammed Al-Farsi", initials: "MA", email: "mohammed.alfarsi@example.com", phone: "+971 50 123 4567", joined: "Mar 5, 2024", status: "disabled", orders: 12, lastOrder: "30 days ago", totalSpent: 3250, country: "UAE", verified: false, recentOrders: [{ id: "#ORD-1100", date: "Jan 30, 2024", amount: 150.0, status: "Delivered" }] },
  { id: 5, name: "Sophia Garcia", initials: "SG", email: "sophia.garcia@example.com", phone: "+34 912 345 678", joined: "Nov 22, 2023", status: "enabled", orders: 54, lastOrder: "1 week ago", totalSpent: 15670.25, country: "Spain", verified: true, recentOrders: [{ id: "#ORD-1220", date: "Feb 22, 2024", amount: 560.0, status: "Delivered" }] },
  { id: 6, name: "James Wilson", initials: "JW", email: "james.wilson@example.com", phone: "+1 (555) 345-6789", joined: "Jan 8, 2024", status: "banned", orders: 8, lastOrder: "45 days ago", totalSpent: 1250, country: "United States", verified: false, recentOrders: [{ id: "#ORD-1050", date: "Jan 10, 2024", amount: 95.0, status: "Delivered" }] },
  { id: 7, name: "Priya Sharma", initials: "PS", email: "priya.sharma@example.com", phone: "+91 98765 43210", joined: "Apr 12, 2024", status: "enabled", orders: 28, lastOrder: "3 days ago", totalSpent: 7890, country: "India", verified: true, recentOrders: [{ id: "#ORD-1235", date: "Feb 28, 2024", amount: 420.0, status: "In Transit" }] },
  { id: 8, name: "Lucas Silva", initials: "LS", email: "lucas.silva@example.com", phone: "+55 11 98765 4321", joined: "Feb 28, 2024", status: "enabled", orders: 39, lastOrder: "12 hours ago", totalSpent: 10500.5, country: "Brazil", verified: true, recentOrders: [{ id: "#ORD-1238", date: "Mar 2, 2024", amount: 310.0, status: "Delivered" }] },
];

const orderStatusColors = { Delivered: "bg-green-500", "In Transit": "bg-orange-400", Pending: "bg-yellow-400" };
const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 hover:border-gray-300 bg-white text-gray-900 transition-colors";

/* ── injected CSS for the three-dots hover ── */
const threeDotCSS = `
  .three-dots-customers {
    padding: 8px;
    border-radius: 8px;
    color: #9ca3af;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, color 0.15s;
  }
  .three-dots-customers:hover {
    background: #fff7ed !important;
    color: #f97316 !important;
  }
  .three-dots-customers:hover svg {
    stroke: #f97316 !important;
  }
`;

function Avatar({ initials, size = "md" }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-16 h-16 text-xl" };
  return <div className={`${sizes[size]} rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shrink-0`}>{initials}</div>;
}

function ShieldVerified() {
  return (
    <svg className="w-5 h-5 text-green-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L4 5.5V11c0 4.97 3.4 9.63 8 10.93C16.6 20.63 20 15.97 20 11V5.5L12 2zm-1.5 13.5l-3.5-3.5 1.41-1.41L10.5 12.67l5.09-5.09 1.41 1.41-6.5 6.42z" />
    </svg>
  );
}

function VerifiedBadge({ small }) {
  return (
    <svg className={`${small ? "w-3.5 h-3.5" : "w-4 h-4"} text-green-500 shrink-0`} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function StatusBadge({ status }) {
  const colors = { enabled: "bg-green-500", disabled: "bg-gray-500", banned: "bg-red-500" };
  return <span className={`${colors[status]} text-white text-xs font-semibold px-3 py-1 rounded-full`}>{status}</span>;
}

function Toggle({ checked, onChange }) {
  return (
    <button onClick={onChange} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${checked ? "bg-orange-500" : "bg-gray-300"}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

function ViewDetailsModal({ customer, onClose, onEdit }) {
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-gray-50 rounded-2xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 pt-5 pb-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Customer Details</h2>
            <p className="text-sm text-gray-400 mt-0.5">Complete customer account information and history</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-200 transition-colors ml-3 mt-0.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
            <Avatar initials={customer.initials} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-base font-bold text-gray-900">{customer.name}</span>
                {customer.verified && <ShieldVerified />}
              </div>
              <p className="text-sm text-gray-400">{customer.email}</p>
            </div>
            <StatusBadge status={customer.status} />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4 px-1">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Phone Number</p>
              <p className="text-sm font-semibold text-gray-800">{customer.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Country</p>
              <p className="text-sm font-semibold text-gray-800">{customer.country}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Join Date</p>
              <p className="text-sm font-semibold text-gray-800">{customer.joined}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Last Order</p>
              <p className="text-sm font-semibold text-gray-800">{customer.lastOrder}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Total Orders</p>
              <p className="text-2xl font-extrabold text-gray-900">{customer.orders}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Total Spent</p>
              <p className="text-2xl font-extrabold text-orange-500">${customer.totalSpent.toLocaleString()}</p>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Recent Orders</h4>
            <div className="space-y-2">
              {customer.recentOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{order.id}</p>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800 mb-1">${order.amount.toFixed(2)}</p>
                    <span className={`${orderStatusColors[order.status]} text-white text-xs font-medium px-2.5 py-1 rounded-full`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-300 transition-all duration-150 active:scale-95"
            >
              Close
            </button>
            <button
              onClick={() => { onClose(); onEdit(customer); }}
              className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all duration-150 flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95"
            >
              <Edit className="w-4 h-4" /> Edit Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditCustomerModal({ customer, onClose, onSave }) {
  const [form, setForm] = useState({ name: customer.name, email: customer.email, phone: customer.phone, country: customer.country, verified: customer.verified });
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" style={{ maxHeight: "90vh" }} onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-100 flex items-start justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Edit Customer</h2>
            <p className="text-sm text-gray-500 mt-0.5">Update customer account information</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label><input value={form.name} onChange={set("name")} className={inputClass} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label><input value={form.email} onChange={set("email")} className={inputClass} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label><input value={form.phone} onChange={set("phone")} className={inputClass} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label><input value={form.country} onChange={set("country")} className={inputClass} /></div>
            <div className="flex items-center justify-between py-3">
              <label className="text-sm font-medium text-gray-700">Verified Account</label>
              <Toggle checked={form.verified} onChange={() => setForm({ ...form, verified: !form.verified })} />
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 shrink-0 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all active:scale-95">Cancel</button>
          <button onClick={() => { onSave({ ...customer, ...form }); onClose(); }} className="flex-1 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all shadow-sm active:scale-95">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function ActionMenu({ customer, onView, onEdit, onBan, onDelete }) {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const ref = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleOpen = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setOpenUpward(window.innerHeight - rect.bottom < 175);
    }
    setOpen((prev) => !prev);
  };

  const actions = [
    { icon: <Eye className="w-3.5 h-3.5" />, label: "View Details", fn: onView, cls: "text-gray-700 hover:text-gray-900" },
    { icon: <Edit className="w-3.5 h-3.5" />, label: "Edit Customer", fn: onEdit, cls: "text-gray-700 hover:text-gray-900" },
    { icon: <Ban className="w-3.5 h-3.5" />, label: "Ban Account", fn: onBan, cls: "text-orange-500 hover:text-orange-600" },
    { icon: <Trash2 className="w-3.5 h-3.5" />, label: "Delete Customer", fn: onDelete, cls: "text-red-500 hover:text-red-600" },
  ];

  return (
    <div className="relative" ref={ref}>
      {/* ── UPDATED: three-dots button with orange hover ── */}
      <button
        ref={btnRef}
        onClick={handleOpen}
        className="three-dots-customers"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      {open && (
        <div className={`absolute right-0 z-50 bg-white rounded-xl shadow-lg border border-gray-100 w-44 py-1 overflow-hidden ${openUpward ? "bottom-full mb-1.5" : "top-full mt-1.5"}`}>
          {actions.map(({ icon, label, fn, cls }) => (
            <button key={label} onClick={() => { fn(); setOpen(false); }} className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium hover:bg-gray-50 transition-colors ${cls}`}>
              {icon} {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filtered = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const statusMap = { "Active": "enabled", "Disabled": "disabled", "Banned": "banned" };
    const matchStatus = statusFilter === "All Status" || c.status === statusMap[statusFilter];
    return matchSearch && matchStatus;
  });

  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "enabled").length,
    disabled: customers.filter((c) => c.status === "disabled").length,
    banned: customers.filter((c) => c.status === "banned").length,
    verified: customers.filter((c) => c.verified).length,
    revenue: customers.reduce((s, c) => s + c.totalSpent, 0),
  };

  const handleSave = (u) => setCustomers(customers.map((c) => (c.id === u.id ? u : c)));
  const handleToggle = (id) => setCustomers(customers.map((c) => c.id === id ? { ...c, status: c.status === "enabled" ? "disabled" : "enabled" } : c));
  const handleBan = (id) => setCustomers(customers.map((c) => c.id === id ? { ...c, status: c.status === "banned" ? "enabled" : "banned" } : c));
  const handleDelete = (id) => setCustomers(customers.filter((c) => c.id !== id));

  const statCards = [
    { label: "Total Customers", value: stats.total, color: "text-gray-900" },
    { label: "Active", value: stats.active, color: "text-green-600" },
    { label: "Disabled", value: stats.disabled, color: "text-gray-500" },
    { label: "Banned", value: stats.banned, color: "text-red-500" },
    { label: "Verified", value: stats.verified, color: "text-gray-900" },
    { label: "Total Revenue", value: `$${stats.revenue.toLocaleString()}`, color: "text-orange-500" },
  ];

  const filterOptions = ["All Status", "Active", "Disabled", "Banned"];

  return (
    <>
      {/* ── inject the three-dots hover CSS ── */}
      <style>{threeDotCSS}</style>

      <div className="min-h-screen p-4 sm:p-6 lg:p-8" style={{ background: "#f3f4f6" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Customers</h1>
            <p className="text-gray-500 text-sm mt-1">Manage customer accounts and activity</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-5">
            {statCards.map(({ label, value, color }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm px-3 py-3 sm:px-4 sm:py-4 flex flex-col justify-between min-w-0">
                <p className="text-[11px] sm:text-xs text-gray-400 font-medium leading-tight truncate mb-1">{label}</p>
                <p className={`text-xl sm:text-2xl font-extrabold leading-none truncate ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Customer Accounts</h2>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all duration-150 min-w-[130px] justify-between">
                    <span>{statusFilter}</span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-1.5 z-20 bg-white rounded-xl shadow-xl border border-gray-100 w-44 py-1.5 overflow-hidden">
                      {filterOptions.map((opt) => (
                        <button key={opt} onClick={() => { setStatusFilter(opt); setDropdownOpen(false); }} className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors hover:bg-orange-50 hover:text-orange-600 ${statusFilter === opt ? "bg-orange-50 text-orange-600" : "text-gray-700"}`}>
                          {opt}
                          {statusFilter === opt && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative group">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-400 transition-colors duration-150 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <input type="text" placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 hover:border-gray-300 bg-white text-gray-700 placeholder-gray-400 transition-all duration-150 w-44 sm:w-56" />
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    {["Customer", "Contact", "Status", "Orders", "Total Spent", "Country", "Actions"].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar initials={c.initials} />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-gray-900 text-sm">{c.name}</span>
                              {c.verified && <VerifiedBadge />}
                            </div>
                            <p className="text-xs text-gray-400">Joined {c.joined}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4"><p className="text-sm text-gray-700">{c.email}</p><p className="text-xs text-gray-400">{c.phone}</p></td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Toggle checked={c.status === "enabled"} onChange={() => c.status !== "banned" && handleToggle(c.id)} />
                          <StatusBadge status={c.status} />
                        </div>
                      </td>
                      <td className="px-5 py-4"><p className="text-sm font-medium text-gray-800">{c.orders} orders</p><p className="text-xs text-gray-400">Last: {c.lastOrder}</p></td>
                      <td className="px-5 py-4"><p className="text-sm font-semibold text-gray-800">${c.totalSpent.toLocaleString()}</p></td>
                      <td className="px-5 py-4"><p className="text-sm text-gray-600">{c.country}</p></td>
                      <td className="px-5 py-4">
                        <ActionMenu customer={c} onView={() => setViewCustomer(c)} onEdit={() => setEditCustomer(c)} onBan={() => handleBan(c.id)} onDelete={() => handleDelete(c.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <p className="font-medium">No customers found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filter</p>
                </div>
              )}
            </div>

            <div className="lg:hidden divide-y divide-gray-100">
              {filtered.map((c) => (
                <div key={c.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={c.initials} />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-gray-900 text-sm">{c.name}</span>
                          {c.verified && <VerifiedBadge small />}
                        </div>
                        <p className="text-xs text-gray-400">{c.email}</p>
                      </div>
                    </div>
                    <ActionMenu customer={c} onView={() => setViewCustomer(c)} onEdit={() => setEditCustomer(c)} onBan={() => handleBan(c.id)} onDelete={() => handleDelete(c.id)} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 items-center">
                    <StatusBadge status={c.status} />
                    <span className="text-xs text-gray-500">{c.orders} orders</span>
                    <span className="text-xs font-semibold text-gray-700">${c.totalSpent.toLocaleString()}</span>
                    <span className="text-xs text-gray-400">{c.country}</span>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && <div className="text-center py-12 text-gray-400 text-sm">No customers found</div>}
            </div>
          </div>
        </div>

        {viewCustomer && <ViewDetailsModal customer={viewCustomer} onClose={() => setViewCustomer(null)} onEdit={(c) => setEditCustomer(c)} />}
        {editCustomer && <EditCustomerModal customer={editCustomer} onClose={() => setEditCustomer(null)} onSave={handleSave} />}
      </div>
    </>
  );
}