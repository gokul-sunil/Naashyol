import RevenueChart from "../components/RevenueChart";
import OrdersChart from "../components/OrdersChart";
import ReferralChart from "../components/ReferralChart";

import {
  DollarSign,
  ShoppingBag,
  Store,
  Users,
  Gift,
  Clock,
  TrendingUp,
  TrendingDown
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-[32px] font-bold tracking-tight text-gray-900">
  Dashboard
</h1>
<p className="text-[15px] text-gray-500 mt-2 font-normal">
          Welcome back! Here's what's happening with your marketplace.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Revenue"
          value="$892,450"
          change="+15.3%"
          icon={DollarSign}
          iconBg="bg-orange-500"
        />

        <StatCard
          title="Total Orders"
          value="5,840"
          change="+12.5%"
          icon={ShoppingBag}
          iconBg="bg-blue-500"
        />

        <StatCard
          title="Total Vendors"
          value="248"
          change="+8.2%"
          icon={Store}
          iconBg="bg-green-500"
        />

        <StatCard
          title="Total Customers"
          value="12,450"
          change="+18.7%"
          icon={Users}
          iconBg="bg-purple-500"
        />

        <StatCard
          title="Referral Revenue"
          value="$45,680"
          change="+24.1%"
          icon={Gift}
          iconBg="bg-orange-400"
        />

        <StatCard
          title="Pending Approvals"
          value="23"
          change="-5.2%"
          negative
          icon={Clock}
          iconBg="bg-red-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper title="Revenue Overview" subtitle="Monthly revenue trend">
          <RevenueChart />
        </ChartWrapper>

        <ChartWrapper title="Orders Analytics" subtitle="Monthly order volume">
          <OrdersChart />
        </ChartWrapper>
      </div>

      <ChartWrapper
        title="Referral Growth"
        subtitle="Referral signups vs conversions"
      >
        <ReferralChart />
      </ChartWrapper>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentOrders />
        <TopVendors />
      </div>

      <Leaderboard />
    </div>
  );
};

export default Dashboard;

/* ================= STAT CARD ================= */

const StatCard = ({ title, value, change, negative, icon: Icon, iconBg }) => {
  return (
    <div
      className="
        bg-white rounded-xl p-6
  border border-gray-200
  flex justify-between items-start
  shadow-sm
        transition-all duration-300 ease-in-out
        hover:border-orange-500
        hover:ring-1
        hover:ring-orange-500/60
        cursor-pointer
      "
    >
      <div>
        <p className="text-[13px] text-gray-500 font-medium">
  {title}
</p>
<h2 className="text-[32px] font-bold mt-1 tracking-tight text-gray-900">
  {value}
</h2>
        <p
  className={`text-[13px] mt-2 flex items-center gap-1 font-medium ${
    negative ? "text-red-500" : "text-green-500"
  }`}
>
  {negative ? (
    <TrendingDown className="w-4 h-4" />
  ) : (
    <TrendingUp className="w-4 h-4" />
  )}

  {change}

  <span className="text-gray-500 ml-1">vs last month</span>
</p>
      </div>

      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}
      >
        <Icon className="w-6 h-6 text-white stroke-[1.8]" />
      </div>
    </div>
  );
};

/* ================= CHART WRAPPER ================= */

const ChartWrapper = ({ title, subtitle, children }) => (
  <div className="bg-white rounded-xl p-5 border">
<h3 className="text-[18px] font-semibold text-gray-900 mb-1">{title}</h3>
<p className="text-[13px] text-gray-500 mb-5">{subtitle}</p>
    <div className="w-full h-[260px]">{children}</div>
  </div>
);

/* ================= RECENT ORDERS ================= */

const RecentOrders = () => (
  <div className="bg-white rounded-xl p-5 border lg:col-span-2">
    <div className="flex justify-between mb-4">
      <h3 className="text-[18px] font-semibold text-gray-900">Recent Orders</h3>
      <button className="text-sm text-orange-500">View all</button>
    </div>

    <ul className="space-y-3">
      {orders.map((order) => (
        <li
          key={order.id}
          className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          {/* Left */}
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">{order.id}</p>

              {order.referral && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500 text-white">
                  Referral
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500">
              {order.customer} • {order.vendor}
            </p>
          </div>

          {/* Right */}
          <div className="text-right">
            <p className="font-semibold">${order.amount}</p>

           <span
  className={`text-xs px-3 py-1 rounded-full font-medium ${
    order.status === "completed"
      ? "bg-green-500 text-white"
      : "bg-gray-200 text-gray-700"
  }`}
>
  {order.status}
</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const orders = [
  {
    id: "ORD-2024-001",
    customer: "John Smith",
    vendor: "TechStore Pro",
    amount: "1249.99",
    status: "completed",
    referral: true,
  },
  {
    id: "ORD-2024-002",
    customer: "Sarah Johnson",
    vendor: "Fashion Hub",
    amount: "589.50",
    status: "processing",
  },
  {
    id: "ORD-2024-003",
    customer: "Mike Chen",
    vendor: "Home Essentials",
    amount: "2150.00",
    status: "completed",
    referral: true,
  },
  {
    id: "ORD-2024-004",
    customer: "Emily Davis",
    vendor: "Sports World",
    amount: "450.75",
    status: "pending",
  },
  {
    id: "ORD-2024-005",
    customer: "David Wilson",
    vendor: "TechStore Pro",
    amount: "899.99",
    status: "completed",
    referral: true,
  },
];
/* ================= TOP VENDORS ================= */

const TopVendors = () => (
  <div className="bg-white rounded-xl p-5 border">
    <h3 className="font-semibold mb-4">Top Vendors</h3>

    <ul className="space-y-4">
      {vendors.map((vendor) => (
        <li key={vendor.name} className="flex items-center justify-between">
          
          {/* Left */}
          <div className="flex items-center gap-3">
            
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm">
              {vendor.name.charAt(0)}
            </div>

            {/* Vendor Info */}
            <div>
              <p className="font-medium">{vendor.name}</p>
              <p className="text-sm text-gray-500">{vendor.revenue}</p>
            </div>

          </div>

          {/* Growth */}
          <span className="flex items-center gap-1 text-green-500 text-sm font-medium">
  <TrendingUp className="w-3.5 h-3.5" />
  {vendor.growth}
</span>

        </li>
      ))}
    </ul>
  </div>
);

const vendors = [
  { name: "TechStore Pro", revenue: "$125,000", growth: "15.5%" },
  { name: "Fashion Hub", revenue: "$98,500", growth: "12.3%" },
  { name: "Home Essentials", revenue: "$87,200", growth: "18.2%" },
  { name: "Sports World", revenue: "$76,800", growth: "9.8%" },
  { name: "Beauty Corner", revenue: "$64,300", growth: "14.1%" },
];

/* ================= LEADERBOARD ================= */

const Leaderboard = () => (
  <div className="bg-white rounded-xl p-5 border overflow-x-auto">
    <h3 className="text-[18px] font-semibold text-gray-900 mb-5">Top Referrers Leaderboard</h3>

    <table className="w-full text-sm">
      <thead className="text-gray-500 border-b">
        <tr>
          <th className="text-left py-2">Rank</th>
          <th className="text-left">Referrer</th>
          <th className="text-center">Referrals</th>
          <th className="text-center">Conversions</th>
          <th className="text-center">Conversion Rate</th>
          <th className="text-right">Rewards</th>
        </tr>
      </thead>

      <tbody>
        {leaders.map((leader, index) => (
          <tr key={leader.name} className="border-b last:border-none">
            
            {/* Rank */}
            <td className="py-4">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                ${
                  index === 0
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </div>
            </td>

            {/* Referrer */}
            <td>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                  {leader.initials}
                </div>
                <span className="font-medium">{leader.name}</span>
              </div>
            </td>

            {/* Referrals */}
            <td className="text-center">{leader.referrals}</td>

            {/* Conversions */}
            <td className="text-center">{leader.conversions}</td>

            {/* Conversion Rate */}
            <td className="text-center">
             <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
  {leader.rate}
</span>
            </td>

            {/* Rewards */}
            <td className="text-right text-orange-500 font-semibold">
              ${leader.rewards}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const leaders = [
  {
    name: "Alex Martinez",
    initials: "AM",
    referrals: 156,
    conversions: 128,
    rate: "82%",
    rewards: "3,840",
  },
  {
    name: "Jessica Lee",
    initials: "JL",
    referrals: 142,
    conversions: 115,
    rate: "81%",
    rewards: "3,450",
  },
  {
    name: "Chris Brown",
    initials: "CB",
    referrals: 138,
    conversions: 102,
    rate: "74%",
    rewards: "3,060",
  },
  {
    name: "Amanda White",
    initials: "AW",
    referrals: 125,
    conversions: 98,
    rate: "78%",
    rewards: "2,940",
  },
  {
    name: "Ryan Taylor",
    initials: "RT",
    referrals: 118,
    conversions: 89,
    rate: "75%",
    rewards: "2,670",
  },
];