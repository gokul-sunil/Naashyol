import { useState, useMemo, useRef, useEffect } from "react";

const priorityConfig = {
  URGENT: { bg: "bg-red-500", text: "text-white" },
  HIGH: { bg: "bg-orange-400", text: "text-white" },
  MEDIUM: { bg: "bg-blue-500", text: "text-white" },
  LOW: { bg: "bg-gray-500", text: "text-white" },
};

function PriorityBadge({ priority }) {
  const cfg = priorityConfig[priority] || priorityConfig.LOW;
  return (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold tracking-wide ${cfg.bg} ${cfg.text}`}>
      {priority}
    </span>
  );
}

function StatusBadge({ status }) {
  if (status === "Open") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500 text-white">
        <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5A.75.75 0 0012 9z" />
        </svg>
        Open
      </span>
    );
  }
  if (status === "Pending") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-400 text-white">
        <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm.75 5.25a.75.75 0 00-1.5 0V12c0 .199.079.39.22.53l3 3a.75.75 0 101.06-1.06l-2.78-2.78V7.25z" />
        </svg>
        Pending
      </span>
    );
  }
  if (status === "Resolved") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500 text-white">
        <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />
        </svg>
        Resolved
      </span>
    );
  }
  if (status === "Closed") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-500 text-white">
        <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.47 8.47a.75.75 0 011.06 0L12 10.94l2.47-2.47a.75.75 0 111.06 1.06L13.06 12l2.47 2.47a.75.75 0 11-1.06 1.06L12 13.06l-2.47 2.47a.75.75 0 01-1.06-1.06L10.94 12 8.47 9.53a.75.75 0 010-1.06z" />
        </svg>
        Closed
      </span>
    );
  }
  return null;
}

function CustomDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative flex-1 sm:flex-none" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 pl-3 pr-3 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer sm:min-w-[120px] justify-between"
      >
        <span className="truncate">{value}</span>
        <svg className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-30 bg-white border border-gray-100 rounded-xl shadow-xl py-1.5 min-w-[140px]">
          {options.map((opt) => {
            const isSelected = value === opt;
            return (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-3 transition-colors
                  ${isSelected ? "bg-orange-50 text-orange-500 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
              >
                <span>{opt}</span>
                {isSelected && (
                  <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const initialTickets = [
  {
    id: "TKT-10245", priority: "URGENT", status: "Open",
    title: "Order not received - Tracking shows delivered",
    customer: "Sarah Johnson", email: "sarah.j@email.com",
    category: "Shipping", date: "2026-02-17 09:15", assignedTo: "Mike Wilson",
    conversation: [
      { sender: "Sarah Johnson", role: "Customer", initials: "SJ", color: "bg-blue-500", time: "2026-02-17 09:15", message: "Hi, my order #ORD-2024 shows as delivered but I haven't received it. The tracking says it was left at my doorstep but nothing is there. Can you help?" },
      { sender: "Mike Wilson", role: "Support Agent", initials: "MW", color: "bg-orange-400", time: "2026-02-17 09:45", message: "Hi Sarah, I'm sorry to hear about this issue. I've checked your order and will immediately contact the shipping carrier to investigate. I'll update you within 2 hours." },
    ],
  },
  {
    id: "TKT-10244", priority: "HIGH", status: "Pending",
    title: "Wrong item received in my order",
    customer: "John Smith", email: "john.smith@email.com",
    category: "Order Issue", date: "2026-02-16 15:30", assignedTo: "Emily Davis",
    conversation: [
      { sender: "John Smith", role: "Customer", initials: "JS", color: "bg-green-500", time: "2026-02-16 15:30", message: "I ordered a blue shirt (size M) but received a red one (size L). Order #ORD-2023. Please help me get the correct item." },
      { sender: "Emily Davis", role: "Support Agent", initials: "ED", color: "bg-orange-400", time: "2026-02-16 16:00", message: "Hi John, I sincerely apologize for this mix-up. I've initiated a return label and expedited shipping for the correct one. You'll receive it within 2 business days." },
    ],
  },
  {
    id: "TKT-10243", priority: "MEDIUM", status: "Open",
    title: "Refund not received after return",
    customer: "Emma Wilson", email: "emma.w@email.com",
    category: "Refund", date: "2026-02-16 11:20", assignedTo: "Mike Wilson",
    conversation: [
      { sender: "Emma Wilson", role: "Customer", initials: "EW", color: "bg-purple-500", time: "2026-02-16 11:20", message: "I returned my order 10 days ago and still haven't received my refund. The return was confirmed delivered. Can you check the status?" },
    ],
  },
  {
    id: "TKT-10242", priority: "HIGH", status: "Pending",
    title: "Product quality issue - Defective item",
    customer: "Michael Brown", email: "m.brown@email.com",
    category: "Product Quality", date: "2026-02-15 14:10", assignedTo: "Emily Davis",
    conversation: [
      { sender: "Michael Brown", role: "Customer", initials: "MB", color: "bg-red-400", time: "2026-02-15 14:10", message: "The product I received is defective. The zipper broke on the first use. I want a replacement or full refund." },
      { sender: "Emily Davis", role: "Support Agent", initials: "ED", color: "bg-orange-400", time: "2026-02-15 15:00", message: "Hi Michael, I'm very sorry about this. Could you please send us photos of the defect? We'll arrange a replacement immediately." },
    ],
  },
  {
    id: "TKT-10241", priority: "LOW", status: "Closed",
    title: "Account access issue - Password reset not working",
    customer: "Lisa Anderson", email: "lisa.a@email.com",
    category: "Account", date: "2026-02-15 10:05", assignedTo: "Mike Wilson",
    conversation: [
      { sender: "Lisa Anderson", role: "Customer", initials: "LA", color: "bg-teal-500", time: "2026-02-15 10:05", message: "I'm unable to reset my password. I'm not receiving the reset email. I've checked my spam folder too." },
      { sender: "Mike Wilson", role: "Support Agent", initials: "MW", color: "bg-orange-400", time: "2026-02-15 10:30", message: "Hi Lisa, I've manually triggered a password reset to your registered email. Please check within 5 minutes." },
    ],
  },
  {
    id: "TKT-10240", priority: "LOW", status: "Closed",
    title: "Question about product specifications",
    customer: "David Chen", email: "d.chen@email.com",
    category: "Product Info", date: "2026-02-14 16:45", assignedTo: "Emily Davis",
    conversation: [
      { sender: "David Chen", role: "Customer", initials: "DC", color: "bg-indigo-500", time: "2026-02-14 16:45", message: "Can you tell me the exact dimensions and material composition of the leather wallet? Is it genuine or synthetic leather?" },
      { sender: "Emily Davis", role: "Support Agent", initials: "ED", color: "bg-orange-400", time: "2026-02-14 17:00", message: "Hi David! The wallet is genuine leather (full-grain cowhide). Dimensions: 4.5\" x 3.5\" x 0.4\". It has 8 card slots and 2 bill compartments." },
    ],
  },
];

const statusMenuOptions = ["Mark as Open", "Mark as Pending", "Mark as Resolved", "Mark as Closed"];

function TicketModal({ ticket, onClose }) {
  const [reply, setReply] = useState("");
  const hasText = reply.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-xl sm:mx-4 max-h-[92vh] flex flex-col">
        <div className="overflow-y-auto flex-1 p-4 sm:p-8">
          <div className="flex justify-center mb-3 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-gray-200" />
          </div>
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Ticket Details</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">View and respond to customer support ticket</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors ml-4 mt-1 p-1 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-bold text-gray-800 text-sm sm:text-base tracking-wide">{ticket.id}</span>
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>
          <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-4 leading-snug">{ticket.title}</h3>
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 mb-5">
            <div>
              <p className="text-xs text-gray-400 mb-1">Customer:</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">{ticket.customer}</p>
              <p className="text-xs text-gray-500 truncate">{ticket.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Assigned To:</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">{ticket.assignedTo}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Category:</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">{ticket.category}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Created:</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">{ticket.date}</p>
            </div>
          </div>
          <div className="border-t border-gray-100 mb-4" />
          <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-3">Conversation History</h4>
          <div className="space-y-3 mb-5">
            {ticket.conversation.map((msg, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-3 sm:p-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${msg.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {msg.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                      <span className="text-xs sm:text-sm font-semibold text-gray-900">{msg.sender}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${msg.role === "Customer" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"}`}>
                        {msg.role}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">{msg.time}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-3">Reply to Customer</h4>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your response here..."
            rows={4}
            className="w-full px-3 sm:px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none mb-3"
          />
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors flex-shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              Attach File
            </button>
            <button
              onClick={() => { if (hasText) setReply(""); }}
              disabled={!hasText}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-white text-xs sm:text-sm font-semibold transition-all flex-shrink-0
                ${hasText ? "bg-orange-400 hover:bg-orange-500 cursor-pointer" : "bg-orange-200 cursor-not-allowed"}`}
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketRow({ ticket, onView, onStatusChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-b-0 py-4 px-4 sm:py-5 sm:px-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
          <span className="font-bold text-gray-700 text-xs sm:text-sm tracking-wide whitespace-nowrap">{ticket.id}</span>
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge status={ticket.status} />
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={onView} className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-600 font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View
          </button>
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-100 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="12" cy="19" r="1.5" />
              </svg>
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-9 z-20 bg-white border border-gray-100 rounded-xl shadow-xl py-1.5 w-44">
                  {statusMenuOptions.map((option) => {
                    const statusLabel = option.replace("Mark as ", "");
                    const isCurrent = ticket.status === statusLabel;
                    return (
                      <button
                        key={option}
                        onClick={() => { onStatusChange(ticket.id, statusLabel); setMenuOpen(false); }}
                        disabled={isCurrent}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-2 transition-colors
                          ${isCurrent ? "text-gray-300 cursor-not-allowed bg-gray-50" : "text-gray-700 hover:bg-gray-50"}`}
                      >
                        {option}
                        {isCurrent && (
                          <svg className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="text-sm sm:text-base font-semibold text-gray-900 mb-2 leading-snug">{ticket.title}</p>
      <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-xs text-gray-400 mb-1.5">
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="truncate max-w-[80px] sm:max-w-none">{ticket.customer}</span>
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>
          {ticket.category}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          {ticket.date}
        </span>
      </div>
      <p className="text-xs text-gray-400">Assigned to: <span className="font-semibold text-gray-700">{ticket.assignedTo}</span></p>
    </div>
  );
}

export default function Support() {
  const [tickets, setTickets] = useState(initialTickets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priority");
  const [selectedTicket, setSelectedTicket] = useState(null);

  const stats = useMemo(() => ({
    openCount: tickets.filter((t) => t.status === "Open").length,
    pendingCount: tickets.filter((t) => t.status === "Pending").length,
    resolvedCount: tickets.filter((t) => t.status === "Resolved").length,
  }), [tickets]);

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets((prev) => prev.map((t) => t.id === ticketId ? { ...t, status: newStatus } : t));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const filtered = tickets.filter((t) => {
    const matchSearch = search === "" || t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All Status" || t.status === statusFilter;
    const matchPriority = priorityFilter === "All Priority" || t.priority === priorityFilter.toUpperCase();
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      {selectedTicket && <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />}

      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Support</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage customer support tickets</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white rounded-2xl px-4 sm:px-5 py-3 sm:py-5" style={{ boxShadow: "0 1px 8px 0 rgba(0,0,0,0.06)" }}>
          <p className="text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2 font-normal">Open Tickets</p>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-900">{stats.openCount}</p>
        </div>
        <div className="bg-white rounded-2xl px-4 sm:px-5 py-3 sm:py-5" style={{ boxShadow: "0 1px 8px 0 rgba(0,0,0,0.06)" }}>
          <p className="text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2 font-normal">Pending Response</p>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-900">{stats.pendingCount}</p>
          {stats.pendingCount > 0 && (
            <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-semibold bg-orange-400 text-white">Urgent</span>
          )}
        </div>
        <div className="bg-white rounded-2xl px-4 sm:px-5 py-3 sm:py-5" style={{ boxShadow: "0 1px 8px 0 rgba(0,0,0,0.06)" }}>
          <p className="text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2 font-normal">Resolved Today</p>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-900">{stats.resolvedCount}</p>
        </div>
        <div className="bg-white rounded-2xl px-4 sm:px-5 py-3 sm:py-5" style={{ boxShadow: "0 1px 8px 0 rgba(0,0,0,0.06)" }}>
          <p className="text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2 font-normal">Avg Response Time</p>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-900">2.4h</p>
        </div>
      </div>

      {/* Tickets Panel */}
      <div className="bg-white rounded-2xl" style={{ boxShadow: "0 1px 8px 0 rgba(0,0,0,0.06)" }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 flex-shrink-0">Support Tickets</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-44">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
              />
            </div>
            <div className="flex items-center gap-2">
              <CustomDropdown
                value={statusFilter}
                onChange={setStatusFilter}
                options={["All Status", "Open", "Pending", "Resolved", "Closed"]}
              />
              <CustomDropdown
                value={priorityFilter}
                onChange={setPriorityFilter}
                options={["All Priority", "Urgent", "High", "Medium", "Low"]}
              />
            </div>
          </div>
        </div>
        <div>
          {filtered.length > 0 ? (
            filtered.map((ticket) => (
              <TicketRow
                key={ticket.id}
                ticket={ticket}
                onView={() => setSelectedTicket(ticket)}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="text-center py-16 text-gray-300">
              <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-sm">No tickets found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}