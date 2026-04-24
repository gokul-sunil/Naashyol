import React, { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Search,
  X,
  Eye,
  Edit,
  Shield,
  Trash2,
} from "lucide-react";

export default function AdminUsers() {
  const [showModal, setShowModal] = useState(false);
  const [require2FA, setRequire2FA] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const dropdownRefs = useRef({});

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      const openRef = dropdownRefs.current[openDropdown];
      if (openRef && !openRef.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const admins = [
    { name: "John Anderson",  email: "john.anderson@n4ashyol.com",  role: "Super Admin",       status: "active",   twoFA: true,  lastActive: "2 mins ago",  initials: "JA" },
    { name: "Sarah Chen",     email: "sarah.chen@n4ashyol.com",     role: "Admin",              status: "active",   twoFA: true,  lastActive: "1 hour ago",  initials: "SC" },
    { name: "Michael Torres", email: "michael.torres@n4ashyol.com", role: "Support Manager",    status: "active",   twoFA: false, lastActive: "5 mins ago",  initials: "MT" },
    { name: "Emily Watson",   email: "emily.watson@n4ashyol.com",   role: "Finance Manager",    status: "active",   twoFA: true,  lastActive: "30 mins ago", initials: "EW" },
    { name: "David Kim",      email: "david.kim@n4ashyol.com",      role: "Marketing Manager",  status: "inactive", twoFA: false, lastActive: "2 days ago",  initials: "DK" },
  ];

  const recentActivity = [
    { name: "John Anderson",  action: "Updated vendor verification status",  time: "2 minutes ago",  initials: "JA" },
    { name: "Sarah Chen",     action: "Approved product listing",            time: "15 minutes ago", initials: "SC" },
    { name: "Michael Torres", action: "Responded to support ticket #4521",   time: "1 hour ago",     initials: "MT" },
    { name: "Emily Watson",   action: "Generated financial report",          time: "2 hours ago",    initials: "EW" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Users</h1>
          <p className="text-gray-500 text-sm mt-1">Manage administrator accounts and permissions</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition w-full sm:w-auto"
        >
          + Add Admin
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Admins" value="5" />
        <StatCard title="Active Now" value="4" />
        <StatCard title="With 2FA" value="3" />
        <StatCard title="Super Admins" value="1" />
      </div>

      {/* TABLE — desktop, hidden on mobile */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Administrator Accounts</h2>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search admins..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-3 text-left">User</th>
                <th className="text-left">Role</th>
                <th className="text-left">Status</th>
                <th className="text-left">2FA</th>
                <th className="text-left">Last Active</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin, index) => (
                <tr key={index} className="border-b last:border-none hover:bg-gray-50 transition">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-orange-500 text-white flex items-center justify-center rounded-full text-sm font-semibold flex-shrink-0">
                        {admin.initials}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{admin.name}</p>
                        <p className="text-gray-400 text-xs">{admin.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">{admin.role}</span>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs ${admin.status === "active" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs ${admin.twoFA ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"}`}>
                      {admin.twoFA ? "Enabled" : "Disabled"}
                    </span>
                  </td>
                  <td className="text-gray-500">{admin.lastActive}</td>
                  <td className="relative">
                    <div ref={(el) => (dropdownRefs.current[index] = el)}>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="p-2 rounded-full hover:bg-gray-200"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                      {openDropdown === index && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50">
                          <button onClick={() => { setSelectedAdmin(admin); setOpenDropdown(null); }} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm">
                            <Eye size={14} /> View Details
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm">
                            <Edit size={14} /> Edit Permissions
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm">
                            <Shield size={14} /> Reset 2FA
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 w-full text-left text-sm">
                            <Trash2 size={14} /> Remove Admin
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards — shown only on small screens */}
        <div className="md:hidden space-y-4">
          {admins.map((admin, index) => (
            <div key={index} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
              {/* Top row: avatar + name + actions */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-full text-sm font-semibold flex-shrink-0">
                    {admin.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{admin.name}</p>
                    <p className="text-gray-400 text-xs">{admin.email}</p>
                  </div>
                </div>
                <div className="relative" ref={(el) => (dropdownRefs.current[`m-${index}`] = el)}>
                  <button
                    onClick={() => toggleDropdown(`m-${index}`)}
                    className="p-2 rounded-full hover:bg-gray-200"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                  {openDropdown === `m-${index}` && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50">
                      <button onClick={() => { setSelectedAdmin(admin); setOpenDropdown(null); }} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm">
                        <Eye size={14} /> View Details
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm">
                        <Edit size={14} /> Edit Permissions
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-sm">
                        <Shield size={14} /> Reset 2FA
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 w-full text-left text-sm">
                        <Trash2 size={14} /> Remove Admin
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Info rows */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-400 mb-1">Role</p>
                  <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">{admin.role}</span>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Status</p>
                  <span className={`px-2 py-0.5 rounded-full ${admin.status === "active" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"}`}>
                    {admin.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">2FA</p>
                  <span className={`px-2 py-0.5 rounded-full ${admin.twoFA ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"}`}>
                    {admin.twoFA ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Last Active</p>
                  <p className="text-gray-600">{admin.lastActive}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((item, index) => (
            <div key={index} className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="w-9 h-9 bg-gray-200 flex items-center justify-center rounded-full text-sm font-semibold text-gray-600 flex-shrink-0">
                {item.initials}
              </div>
              <div>
                <p className="text-sm text-gray-800">
                  <span className="font-medium">{item.name}</span> {item.action}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD ADMIN MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Add New Admin User</h2>
            <p className="text-gray-500 text-sm mt-1 mb-6">Create a new administrator account with specific permissions</p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" placeholder="Enter full name" className="w-full px-4 py-2.5 border border-orange-400 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" placeholder="Enter email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none">
                  <option>Select role</option>
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>Support Manager</option>
                  <option>Finance Manager</option>
                  <option>Marketing Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Temporary Password</label>
                <input type="password" placeholder="Enter password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm">Require 2FA</span>
                <button
                  type="button"
                  onClick={() => setRequire2FA(!require2FA)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition ${require2FA ? "bg-orange-500" : "bg-gray-300"}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${require2FA ? "translate-x-5" : ""}`} />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
              <button onClick={() => setShowModal(false)} className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100">
                Cancel
              </button>
              <button className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600">
                Create Admin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {selectedAdmin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedAdmin(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Admin Details</h2>
                <p className="text-sm text-gray-500 mt-1">View and manage admin user information</p>
              </div>
              <button onClick={() => setSelectedAdmin(null)} className="text-gray-400 hover:text-gray-600 text-2xl font-light leading-none">×</button>
            </div>

            <div className="space-y-5">
              {[
                { label: "Name", value: selectedAdmin.name },
                { label: "Email", value: selectedAdmin.email },
                { label: "Role", value: selectedAdmin.role },
                { label: "Status", value: selectedAdmin.status },
                { label: "Permissions", value: selectedAdmin.permissions ?? "all" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-sm font-semibold text-gray-900">{label}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button onClick={() => setSelectedAdmin(null)} className="w-full sm:w-auto px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm">
      <p className="text-gray-500 text-xs md:text-sm">{title}</p>
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-2">{value}</h3>
    </div>
  );
}