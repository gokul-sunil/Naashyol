
import { useState, useRef, useEffect } from "react";
import {
  BarChart3, Download, Calendar, TrendingUp, TrendingDown,
  DollarSign, ShoppingCart, Users, Store, Filter, FileText, Eye,
  ChevronDown, Check, Box,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, Legend,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 45000 }, { month: "Feb", revenue: 51000 },
  { month: "Mar", revenue: 47000 }, { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 74000 }, { month: "Jun", revenue: 68000 },
];

const ordersAvgData = [
  { month: "Jan", orders: 240, avg: 185 },
  { month: "Feb", orders: 275, avg: 190 },
  { month: "Mar", orders: 245, avg: 188 },
  { month: "Apr", orders: 280, avg: 195 },
  { month: "May", orders: 370, avg: 200 },
  { month: "Jun", orders: 300, avg: 198 },
];

const categoryData = [
  { name: "Electronics", value: 42, color: "#F97316" },
  { name: "Fashion", value: 28, color: "#3B82F6" },
  { name: "Home & Living", value: 15, color: "#22C55E" },
  { name: "Sports", value: 10, color: "#8B5CF6" },
  { name: "Other", value: 5, color: "#F59E0B" },
];

const monthlySalesData = [
  { month: "Jan", Revenue: 45000, Orders: 260 },
  { month: "Feb", Revenue: 51000, Orders: 270 },
  { month: "Mar", Revenue: 47000, Orders: 265 },
  { month: "Apr", Revenue: 61000, Orders: 290 },
  { month: "May", Revenue: 74000, Orders: 335 },
  { month: "Jun", Revenue: 68000, Orders: 320 },
];

const categoryRevenue = [
  {
    name: "Electronics", pct: "42% of sales", revenue: "$1,25,000",
    iconBg: "bg-orange-100", iconColor: "text-orange-500", Icon: Box,
  },
  {
    name: "Fashion", pct: "28% of sales", revenue: "$85,000",
    iconBg: "bg-blue-100", iconColor: "text-blue-500", Icon: Box,
  },
  {
    name: "Home & Living", pct: "15% of sales", revenue: "$45,000",
    iconBg: "bg-green-100", iconColor: "text-green-500", Icon: Box,
  },
  {
    name: "Sports", pct: "10% of sales", revenue: "$30,000",
    iconBg: "bg-yellow-100", iconColor: "text-yellow-500", Icon: Box,
  },
  {
    name: "Other", pct: "5% of sales", revenue: "$15,000",
    iconBg: "bg-purple-100", iconColor: "text-purple-500", Icon: Box,
  },
];

const vendors = [
  { rank: 1, name: "TechVendor Pro", revenue: "$45,000", orders: 234, products: 45, rating: 4.8, commission: "$6,750" },
  { rank: 2, name: "Fashion Hub", revenue: "$38,000", orders: 198, products: 67, rating: 4.6, commission: "$5,700" },
  { rank: 3, name: "Home Essentials", revenue: "$32,000", orders: 156, products: 52, rating: 4.7, commission: "$4,800" },
  { rank: 4, name: "Sports World", revenue: "$28,000", orders: 142, products: 38, rating: 4.5, commission: "$4,200" },
  { rank: 5, name: "Beauty Store", revenue: "$25,000", orders: 128, products: 41, rating: 4.9, commission: "$3,750" },
];

const topProducts = [
  { rank: 1, name: "Apple iPhone 15 Pro Max", category: "Electronics", unitsSold: 156, revenue: "$1,55,844", stock: 23, stockColor: "bg-green-500" },
  { rank: 2, name: "Samsung Galaxy S24 Ultra", category: "Electronics", unitsSold: 134, revenue: "$1,33,866", stock: 18, stockColor: "bg-red-500" },
  { rank: 3, name: "Nike Air Max 2024", category: "Fashion", unitsSold: 245, revenue: "$36,750", stock: 67, stockColor: "bg-green-500" },
  { rank: 4, name: "Sony WH-1000XM5", category: "Electronics", unitsSold: 198, revenue: "$59,400", stock: 45, stockColor: "bg-green-500" },
  { rank: 5, name: "Dyson V15 Vacuum", category: "Home & Living", unitsSold: 89, revenue: "$53,400", stock: 12, stockColor: "bg-red-500" },
];

const dateOptions = ["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Month", "Last Month", "This Year", "Custom Range"];
const reportOptions = ["Sales Report", "Products Report", "Vendors Report", "Customers Report", "Inventory Report"];

function Dropdown({ open, setOpen, value, setValue, options, icon: Icon }) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setOpen]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Icon size={14} className="text-gray-500" />
        <span className="hidden sm:inline">{value}</span>
        <span className="sm:hidden text-xs">{value.length > 10 ? value.slice(0, 10) + "…" : value}</span>
        <ChevronDown size={14} className="text-gray-500" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[180px] py-1">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { setValue(opt); setOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${opt === value ? "text-orange-500 font-medium" : "text-gray-700"}`}
            >
              {opt}
              {opt === value && <Check size={14} className="text-orange-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, change, positive, icon: Icon, iconBg }) {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100 shadow-sm flex-1 min-w-0">
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500 mb-1 truncate">{label}</p>
        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{value}</p>
        <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${positive ? "text-green-500" : "text-red-500"}`}>
          {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          <span>{change}</span>
        </div>
      </div>
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ml-2 ${iconBg}`}>
        <Icon size={18} className="text-white" />
      </div>
    </div>
  );
}

const CustomLegend = ({ payload }) => (
  <div className="flex items-center justify-center gap-6 mt-2">
    {payload.map((entry) => (
      <div key={entry.value} className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-full border-2"
          style={{ borderColor: entry.color, backgroundColor: "white" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full mx-auto mt-0.5"
            style={{ backgroundColor: entry.color }}
          />
        </div>
        <span className="text-xs sm:text-sm font-medium" style={{ color: entry.color }}>
          {entry.value === "orders" ? "Orders" : "Avg Order Value ($)"}
        </span>
      </div>
    ))}
  </div>
);

export default function ReportsDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [dateOpen, setDateOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [dateValue, setDateValue] = useState("Last 30 Days");
  const [reportValue, setReportValue] = useState("Sales Report");

  const tabs = ["Overview", "Sales Analysis", "Vendor Performance", "Top Products"];

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#f3f4f6" }}>
      <div className="max-w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-sm text-gray-500 mt-0.5">Generate analytics reports</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors self-start sm:self-auto whitespace-nowrap">
            <Download size={15} />
            Export Report
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Filter size={15} />
            <span>Filters:</span>
          </div>
          <Dropdown open={dateOpen} setOpen={setDateOpen} value={dateValue} setValue={setDateValue} options={dateOptions} icon={Calendar} />
          <Dropdown open={reportOpen} setOpen={setReportOpen} value={reportValue} setValue={setReportValue} options={reportOptions} icon={FileText} />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-5">
          <StatCard label="Total Revenue" value="$347,000" change="+12.5%" positive icon={DollarSign} iconBg="bg-orange-500" />
          <StatCard label="Total Orders" value="1,998" change="+8.2%" positive icon={ShoppingCart} iconBg="bg-blue-500" />
          <StatCard label="Active Customers" value="8,456" change="+15.3%" positive icon={Users} iconBg="bg-green-500" />
          <StatCard label="Avg Order Value" value="$192.60" change="-2.4%" positive={false} icon={BarChart3} iconBg="bg-orange-400" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 sm:mb-5 bg-white border border-gray-200 rounded-xl p-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                activeTab === tab
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === "Overview" && (
          <div className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">

              {/* Revenue Trend */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
                <h3 className="font-bold text-gray-900 mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#F97316" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2} fill="url(#revGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Sales by Category */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
                <h3 className="font-bold text-gray-900 mb-4">Sales by Category</h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <PieChart width={180} height={180}>
                    <Pie data={categoryData} cx={85} cy={85} outerRadius={80} dataKey="value" paddingAngle={2}>
                      {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v, n) => [`${v}%`, n]} />
                  </PieChart>
                  <div className="space-y-2">
                    {categoryData.map((c) => (
                      <div key={c.name} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                        <span className="text-gray-600 text-xs sm:text-sm">{c.name} {c.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Orders & AOV */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
              <h3 className="font-bold text-gray-900 mb-4">Orders & Average Order Value</h3>
              <div className="h-[260px] sm:h-[300px] lg:h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ordersAvgData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} dy={8} />
                    <YAxis
                      yAxisId="left"
                      domain={[0, 380]}
                      ticks={[0, 95, 190, 285, 380]}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      axisLine={false}
                      tickLine={false}
                      width={35}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      domain={[0, 200]}
                      ticks={[0, 50, 100, 150, 200]}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                      axisLine={false}
                      tickLine={false}
                      width={35}
                    />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }} />
                    <Legend content={<CustomLegend />} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="orders"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "white", stroke: "#3B82F6", strokeWidth: 2 }}
                      activeDot={{ r: 5 }}
                      name="orders"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="avg"
                      stroke="#F97316"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "white", stroke: "#F97316", strokeWidth: 2 }}
                      activeDot={{ r: 5 }}
                      name="avg"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* ── SALES ANALYSIS ── */}
        {activeTab === "Sales Analysis" && (
          <div className="space-y-4 sm:space-y-5">

            {/* Monthly Sales Breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
              <h3 className="font-bold text-gray-900 mb-4">Monthly Sales Breakdown</h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Revenue" fill="#F97316" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Orders" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Category Revenue — white cards with Box cube icons */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
              <h3 className="font-bold text-gray-900 mb-4">Category Revenue</h3>
              <div className="space-y-3">
                {categoryRevenue.map(({ name, pct, revenue, iconBg, iconColor, Icon }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between p-3 sm:p-4 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={20} className={iconColor} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">{name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{pct}</p>
                      </div>
                    </div>
                    <span className="font-bold text-orange-500 text-base sm:text-xl whitespace-nowrap ml-2">
                      {revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── VENDOR PERFORMANCE ── */}
        {activeTab === "Vendor Performance" && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
            <h3 className="font-bold text-gray-900 mb-5">Top Vendor Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                    <th className="pb-3 font-medium">Rank</th>
                    <th className="pb-3 font-medium">Vendor Name</th>
                    <th className="pb-3 font-medium">Revenue</th>
                    <th className="pb-3 font-medium">Orders</th>
                    <th className="pb-3 font-medium">Products</th>
                    <th className="pb-3 font-medium">Rating</th>
                    <th className="pb-3 font-medium">Commission</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((v) => (
                    <tr key={v.rank} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 sm:py-4">
                        <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold ${v.rank === 1 ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                          {v.rank}
                        </span>
                      </td>
                      <td className="py-3 sm:py-4">
                        <div className="flex items-center gap-2">
                          <Store size={14} className="text-gray-400 flex-shrink-0" />
                          <span className="font-medium text-gray-800 text-sm">{v.name}</span>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 text-orange-500 font-semibold text-sm">{v.revenue}</td>
                      <td className="py-3 sm:py-4 text-sm text-gray-600">{v.orders}</td>
                      <td className="py-3 sm:py-4 text-sm text-gray-600">{v.products}</td>
                      <td className="py-3 sm:py-4">
                        <span className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full w-fit whitespace-nowrap">
                          ⭐ {v.rating}
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 text-blue-500 font-semibold text-sm">{v.commission}</td>
                      <td className="py-3 sm:py-4">
                        <button className="flex items-center gap-1 text-gray-500 text-sm hover:text-orange-500 transition-colors">
                          <Eye size={13} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TOP PRODUCTS ── */}
        {activeTab === "Top Products" && (
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
            <h3 className="font-bold text-gray-900 mb-5">Top Selling Products</h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[580px]">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                    <th className="pb-3 font-medium">Rank</th>
                    <th className="pb-3 font-medium">Product Name</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Units Sold</th>
                    <th className="pb-3 font-medium">Revenue</th>
                    <th className="pb-3 font-medium">Stock</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((p) => (
                    <tr key={p.rank} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 sm:py-4">
                        <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold ${p.rank === 1 ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"}`}>
                          {p.rank}
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 font-semibold text-gray-800 text-sm">{p.name}</td>
                      <td className="py-3 sm:py-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 whitespace-nowrap">{p.category}</span>
                      </td>
                      <td className="py-3 sm:py-4 text-sm text-gray-600">{p.unitsSold}</td>
                      <td className="py-3 sm:py-4 text-orange-500 font-semibold text-sm">{p.revenue}</td>
                      <td className="py-3 sm:py-4">
                        <span className={`${p.stockColor} text-white text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 sm:py-4">
                        <button className="flex items-center gap-1 text-gray-500 text-sm hover:text-orange-500 transition-colors">
                          <Eye size={13} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}