import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Admin Users", path: "/admin-users" },
  { name: "Vendors", path: "/vendors" },
  { name: "Inventory", path: "/inventory" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
  { name: "Orders", path: "/orders" },
  { name: "Payments", path: "/payments" },
  { name: "Customers", path: "/customers" },
  { name: "Coupons", path: "/coupons" },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-black text-gray-300 h-screen fixed flex flex-col">
      
      {/* Logo */}
      <div className="p-6 text-xl font-bold text-white border-b border-gray-800">
        GLOBAL ADMIN
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;