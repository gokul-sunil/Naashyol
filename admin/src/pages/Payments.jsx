
import { useState, useRef, useEffect } from "react";
import { Search, Download, DollarSign, CreditCard, Check, TrendingUp, ChevronDown } from "lucide-react";

const paymentData = [
  { name: "TechVendor Inc", email: "tech@vendor.com", amount: "$12,450", orders: "45 orders", dueDate: "2026-02-20", status: "Pending" },
  { name: "Fashion Hub", email: "fashion@hub.com", amount: "$8,920", orders: "67 orders", dueDate: "2026-02-20", status: "Pending" },
  { name: "Home Essentials", email: "home@essentials.com", amount: "$6,780", orders: "34 orders", dueDate: "2026-02-20", status: "Approved" },
  { name: "Sports Pro", email: "sports@pro.com", amount: "$5,420", orders: "28 orders", dueDate: "2026-02-22", status: "Pending" },
  { name: "Beauty Bliss", email: "beauty@bliss.com", amount: "$3,890", orders: "19 orders", dueDate: "2026-02-15", status: "Paid" },
];

const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const openMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        buttonRef.current && !buttonRef.current.contains(e.target) &&
        menuRef.current && !menuRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    const handleScroll = () => setIsOpen(false);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <div className="relative w-full sm:min-w-[140px]">
      <button
        ref={buttonRef}
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-orange-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 flex-shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          style={menuStyle}
          className="bg-white border border-gray-200 rounded-lg shadow-xl"
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => { onChange(option); setIsOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg
                ${value === option
                  ? "bg-orange-50 text-orange-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
                }`}
            >
              <span>{option}</span>
              {value === option && (
                <Check size={14} className="text-orange-500 flex-shrink-0 ml-2" strokeWidth={2.5} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const statusOptions = ["All Status", "Pending", "Approved", "Paid"];

  const filtered = paymentData.filter((p) => {
    const matchesSearch = `${p.name} ${p.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    // ✅ CHANGED: bg-gray-50 replaced with inline style background #f3f4f6
    <div className="p-4 sm:p-6 lg:p-6 min-h-screen font-sans" style={{ background: "#f3f4f6" }}>
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Payments</h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5 sm:mt-1">
          Manage customer payments and payment processing
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Total Revenue</p>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">$37,460</h2>
            </div>
            <div className="bg-orange-500 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-sm flex items-center justify-center">
              <DollarSign size={18} className="text-white" strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Pending Payments</p>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">$26,790</h2>
              <span className="inline-flex items-center mt-1 sm:mt-2 text-xs text-orange-600 bg-orange-50 px-1.5 sm:px-2 py-0.5 rounded">
                3 customers
              </span>
            </div>
            <div className="bg-orange-100 p-2 sm:p-3 rounded-lg">
              <CreditCard size={18} className="text-orange-600" strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Paid This Month</p>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">$3,890</h2>
              <span className="inline-flex items-center mt-1 sm:mt-2 text-xs text-blue-600 bg-blue-50 px-1.5 sm:px-2 py-0.5 rounded">
                1 customer
              </span>
            </div>
            <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
              <Check size={18} className="text-blue-600" strokeWidth={2} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-0.5 sm:mb-1">Total Customers</p>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">5</h2>
              <span className="inline-flex items-center mt-1 sm:mt-2 text-xs text-green-600 bg-green-50 px-1.5 sm:px-2 py-0.5 rounded">
                Active
              </span>
            </div>
            <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
              <TrendingUp size={18} className="text-green-600" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200">

        {/* Toolbar */}
        <div className="p-3 sm:p-4 lg:p-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <h2 className="text-sm sm:text-base font-semibold text-gray-900">Customer Payments</h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="relative flex-1 w-full sm:min-w-[200px] lg:min-w-[240px]">
              <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div className="w-full sm:w-auto">
              <CustomDropdown options={statusOptions} value={statusFilter} onChange={setStatusFilter} />
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-all">
              <Download size={14} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-3 sm:px-4 lg:px-5 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-3 sm:px-4 lg:px-5 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-3 sm:px-4 lg:px-5 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-3 sm:px-4 lg:px-5 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-3 sm:px-4 lg:px-5 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 sm:px-4 lg:px-5 py-6 sm:py-8 text-center text-gray-500 text-xs sm:text-sm">
                    No matching customers found
                  </td>
                </tr>
              ) : (
                filtered.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4">
                      <div className="font-medium text-gray-900 text-xs sm:text-sm">{item.name}</div>
                      <div className="text-gray-500 text-xs mt-0.5 break-all">{item.email}</div>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4 font-medium text-gray-900 text-xs sm:text-sm">{item.amount}</td>
                    <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm">{item.orders}</td>
                    <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4 text-gray-600 text-xs sm:text-sm">{item.dueDate}</td>
                    <td className="px-3 sm:px-4 lg:px-5 py-3 sm:py-4">
                      <span
                        className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                          item.status === "Pending"
                            ? "bg-orange-50 text-orange-700"
                            : item.status === "Approved"
                            ? "bg-green-50 text-green-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}