import { useState, useEffect, useRef } from "react";
import {
  Star, Trash2, Eye, EyeOff, CheckCircle, XCircle,
  Filter, Search, ThumbsUp, Calendar, Package,
  Bell, ChevronDown, X, ThumbsUp as ThumbsUpIcon,
  MessageSquare,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────────── */
const initialReviews = [
  {
    id: 1, name: "Sarah Johnson", initials: "SJ", email: "sarah.j@email.com",
    verified: true, status: "approved", product: "Apple iPhone 15 Pro Max",
    productId: "PRD-001", date: "2026-02-15", rating: 5,
    title: "Amazing phone with incredible camera!",
    body: "This is by far the best phone I've ever owned. The camera quality is outstanding, and the performance is smooth. Battery life easily lasts all day. Highly recommend!",
    helpful: 24, color: "#F97316",
  },
  {
    id: 2, name: "Mike Wilson", initials: "MW", email: "mike.w@email.com",
    verified: true, status: "approved", product: "Samsung Galaxy S24 Ultra",
    productId: "PRD-002", date: "2026-02-14", rating: 4,
    title: "Great device but expensive",
    body: "The phone is fantastic with excellent display and performance. However, the price point is quite high. Overall, satisfied with the purchase.",
    helpful: 18, color: "#F97316",
  },
  {
    id: 3, name: "John Smith", initials: "JS", email: "john.s@email.com",
    verified: false, status: "pending", product: "Sony WH-1000XM5 Headphones",
    productId: "PRD-003", date: "2026-02-17", rating: 5,
    title: "Best noise cancelling headphones!",
    body: "Incredible sound quality and the noise cancellation is phenomenal. Very comfortable for long listening sessions.",
    helpful: 0, color: "#6B7280",
  },
  {
    id: 4, name: "Emily Davis", initials: "ED", email: "emily.d@email.com",
    verified: true, status: "pending", product: "MacBook Pro 16 M3",
    productId: "PRD-004", date: "2026-02-17", rating: 3,
    title: "Good but has issues",
    body: "The performance is great, but I've experienced some heating issues during intensive tasks. Expected better for the price.",
    helpful: 0, color: "#3B82F6",
  },
  {
    id: 5, name: "David Brown", initials: "DB", email: "david.b@email.com",
    verified: false, status: "disabled", product: "Apple iPhone 15 Pro Max",
    productId: "PRD-001", date: "2026-02-13", rating: 2,
    title: "Disappointed with battery life",
    body: "The phone is good overall, but battery life doesn't meet expectations. Needs charging multiple times a day with moderate use.",
    helpful: 5, color: "#8B5CF6",
  },
  {
    id: 6, name: "Lisa Anderson", initials: "LA", email: "lisa.a@email.com",
    verified: true, status: "approved", product: "Nike Air Max 2024",
    productId: "PRD-005", date: "2026-02-16", rating: 5,
    title: "Most comfortable shoes ever!",
    body: "Perfect fit and incredibly comfortable. Great for running and everyday wear. The quality is excellent!",
    helpful: 12, color: "#10B981",
  },
];

/* ─── Small reusable components ─────────────────────────────────────── */
function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= rating ? "text-orange-400 fill-orange-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}.0</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    approved: "bg-green-100 text-green-700",
    pending:  "bg-orange-100 text-orange-600",
    disabled: "bg-red-100 text-red-600",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${map[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function Avatar({ initials, color, size = 38 }) {
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: color, fontSize: Math.round(size * 0.32) }}
    >
      {initials}
    </div>
  );
}

/* ─── Modal ─────────────────────────────────────────────────────────── */
function ReviewDetailModal({ review, onClose, onAction }) {
  if (!review) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <div className="p-6">
          {/* Close */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer">
            <X size={20} />
          </button>

          <h2 className="text-xl font-bold text-gray-900 m-0">Review Details</h2>
          <p className="text-sm text-gray-500 mt-1 mb-5">Full review information and moderation actions</p>

          {/* Reviewer */}
          <div className="flex gap-3 mb-5 flex-wrap">
            <Avatar initials={review.initials} color={review.color} size={48} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-gray-900">{review.name}</span>
                {review.verified && (
                  <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                    <CheckCircle size={10} /> Verified Purchase
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5 mb-1.5">{review.email}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <StatusBadge status={review.status} />
                <span className="text-xs text-gray-400">Posted on {review.date}</span>
              </div>
            </div>
          </div>

          {/* Content box */}
          <div className="border border-gray-100 rounded-xl p-4 bg-gray-50 mb-5">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Package size={13} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{review.product}</span>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded font-mono">{review.productId}</span>
            </div>
            <StarRating rating={review.rating} size={15} />
            <h3 className="text-sm font-bold text-gray-900 mt-2 mb-1">{review.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed m-0">{review.body}</p>
            {review.helpful > 0 && (
              <div className="flex items-center gap-1.5 mt-3 text-orange-500 text-xs">
                <ThumbsUp size={13} />
                <span>{review.helpful} people found this review helpful</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap justify-end">
            <button
              onClick={() => { onAction(review.id, "delete"); onClose(); }}
              className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 cursor-pointer bg-transparent"
            >
              <Trash2 size={13} /> Delete
            </button>
            <button
              onClick={() => { onAction(review.id, review.status === "disabled" ? "enable" : "disable"); onClose(); }}
              className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer bg-transparent"
            >
              <EyeOff size={13} /> {review.status === "disabled" ? "Enable Review" : "Disable Review"}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 cursor-pointer bg-transparent"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page — NO sidebar, content only ──────────────────────────── */
export default function ReviewsPage() {
  const [reviews, setReviews]         = useState(initialReviews);
  const [search, setSearch]           = useState("");
  const [filter, setFilter]           = useState("All Reviews");
  const [filterOpen, setFilterOpen]   = useState(false);
  const [selectedReview, setSelected] = useState(null);
  const [width, setWidth]             = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const filterRef = useRef(null);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const filterOptions = ["All Reviews", "Pending", "Approved", "Disabled"];

  const filtered = reviews.filter((r) => {
    const matchFilter = filter === "All Reviews" || r.status === filter.toLowerCase();
    const q = search.toLowerCase();
    return matchFilter && (
      r.name.toLowerCase().includes(q) ||
      r.product.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q)
    );
  });

  const totalReviews = reviews.length;
  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const avgRating    = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  function handleAction(id, action) {
    setReviews((prev) =>
      prev
        .map((r) => {
          if (r.id !== id) return r;
          if (action === "approve")                        return { ...r, status: "approved" };
          if (action === "reject" || action === "disable") return { ...r, status: "disabled" };
          if (action === "enable")                         return { ...r, status: "approved" };
          return r;
        })
        .filter((r) => action === "delete" ? r.id !== id : true)
    );
  }

  return (
    /* This div fills whatever space the parent layout gives it */
    <div className="flex-1 overflow-y-auto bg-gray-50 min-h-screen">
      <div className={`mx-auto ${isMobile ? "p-3" : "p-6"}`} style={{ maxWidth: 1200 }}>

        {/* Page title */}
        <h1 className="text-2xl font-extrabold text-gray-900 m-0">Reviews</h1>
        <p className="text-sm text-gray-500 mt-1 mb-5">Moderate product reviews</p>

        {/* ── Stats ── */}
        <div
          className="grid gap-4 mb-5"
          style={{ gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3, 1fr)" }}
        >
          {[
            { label: "Total Reviews",      value: totalReviews },
            { label: "Pending Moderation", value: pendingCount, badge: "Needs Review" },
            { label: "Average Rating",     value: avgRating },
          ].map(({ label, value, badge }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm text-gray-500 m-0">{label}</p>
              <p className="text-4xl font-extrabold text-gray-900 mt-1 mb-0">{value}</p>
              {badge && (
                <span className="inline-block mt-2.5 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* ── Review Moderation ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">

          {/* Header row */}
          <div
            className={`flex ${isMobile ? "flex-col" : "flex-row items-center"} justify-between gap-3 mb-4`}
          >
            <h2 className="text-base font-bold text-gray-900 m-0">Review Moderation</h2>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search reviews..."
                  className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-orange-400"
                  style={{ width: isMobile ? "100%" : 185 }}
                />
              </div>

              {/* Filter dropdown */}
              <div ref={filterRef} className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-700 bg-white cursor-pointer hover:bg-gray-50"
                >
                  <Filter size={12} /> {filter} <ChevronDown size={11} />
                </button>
                {filterOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-20 w-40 overflow-hidden">
                    {filterOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setFilter(opt); setFilterOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between border-none cursor-pointer
                          ${filter === opt ? "bg-orange-50 text-orange-500 font-semibold" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                      >
                        {opt}
                        {filter === opt && <CheckCircle size={12} className="text-orange-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Review list */}
          <div className="space-y-2.5">
            {filtered.map((review) => (
              <div
                key={review.id}
                className="border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md transition-shadow"
              >
                <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-3`}>

                  {/* Left: info */}
                  <div className="flex gap-2.5 flex-1 min-w-0">
                    <Avatar initials={review.initials} color={review.color} size={38} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-bold text-gray-900">{review.name}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                            <CheckCircle size={9} /> Verified
                          </span>
                        )}
                        <StatusBadge status={review.status} />
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 mb-1">{review.email}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1"><Package size={10} /> {review.product}</span>
                        <span className="flex items-center gap-1"><Calendar size={10} /> {review.date}</span>
                      </div>
                      <div className="mt-1"><StarRating rating={review.rating} size={13} /></div>
                      <p className="text-sm font-semibold text-gray-800 mt-1 mb-0.5">{review.title}</p>
                      <p className="text-xs text-gray-500 m-0 line-clamp-2">{review.body}</p>
                      {review.helpful > 0 && (
                        <div className="flex items-center gap-1 mt-1.5 text-gray-400 text-xs">
                          <ThumbsUp size={11} /> {review.helpful} people found this helpful
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: action buttons */}
                  <div
                    className="flex items-center gap-1.5 flex-wrap flex-shrink-0"
                    style={{ marginTop: isMobile ? 8 : 0, paddingLeft: isMobile ? 48 : 0 }}
                  >
                    <button
                      onClick={() => setSelected(review)}
                      className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer bg-transparent"
                    >
                      <Eye size={12} /> View
                    </button>

                    {review.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAction(review.id, "approve")}
                          className="flex items-center gap-1 text-xs text-green-600 border border-green-300 px-2.5 py-1.5 rounded-lg hover:bg-green-50 cursor-pointer bg-transparent"
                        >
                          <CheckCircle size={12} /> Approve
                        </button>
                        <button
                          onClick={() => handleAction(review.id, "reject")}
                          className="flex items-center gap-1 text-xs text-red-500 border border-red-300 px-2.5 py-1.5 rounded-lg hover:bg-red-50 cursor-pointer bg-transparent"
                        >
                          <XCircle size={12} /> Reject
                        </button>
                      </>
                    )}

                    {review.status === "approved" && (
                      <button
                        onClick={() => handleAction(review.id, "disable")}
                        className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer bg-transparent"
                      >
                        <EyeOff size={12} /> Disable
                      </button>
                    )}

                    {review.status === "disabled" && (
                      <button
                        onClick={() => handleAction(review.id, "enable")}
                        className="flex items-center gap-1 text-xs text-green-600 border border-green-300 px-2.5 py-1.5 rounded-lg hover:bg-green-50 cursor-pointer bg-transparent"
                      >
                        <Eye size={12} /> Enable
                      </button>
                    )}

                    <button
                      onClick={() => handleAction(review.id, "delete")}
                      className="text-red-400 hover:text-red-600 border-none bg-transparent cursor-pointer p-1.5 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-14 text-gray-400">
                <MessageSquare size={30} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No reviews found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedReview && (
        <ReviewDetailModal
          review={selectedReview}
          onClose={() => setSelected(null)}
          onAction={handleAction}
        />
      )}
    </div>
  );
}