import { useState, useRef, useEffect } from "react";

const initialCategories = [
  {
    id: 1, name: "Electronics", type: "Parent", slug: "electronics",
    description: "Electronic devices and accessories", products: 1245, status: "active", emoji: "📱",
    children: [
      { id: 11, name: "Smartphones", type: "Subcategory", slug: "smartphones", description: "Mobile phones and accessories", products: 456, status: "active", emoji: "📱" },
      { id: 12, name: "Laptops", type: "Subcategory", slug: "laptops", description: "Portable computers and accessories", products: 289, status: "active", emoji: "💻" },
    ],
  },
  {
    id: 2, name: "Fashion", type: "Parent", slug: "fashion",
    description: "Clothing and accessories", products: 2340, status: "active", emoji: "👔",
    children: [
      { id: 21, name: "Men's Clothing", type: "Subcategory", slug: "mens-clothing", description: "Clothing for men", products: 890, status: "active", emoji: "👔" },
      { id: 22, name: "Women's Clothing", type: "Subcategory", slug: "womens-clothing", description: "Clothing for women", products: 1240, status: "active", emoji: "👗" },
    ],
  },
  {
    id: 3, name: "Home & Garden", type: "Parent", slug: "home-garden",
    description: "Home improvement and garden supplies", products: 987, status: "active", emoji: "🏠",
    children: [
      { id: 31, name: "Furniture", type: "Subcategory", slug: "furniture", description: "Home and office furniture", products: 456, status: "active", emoji: "🪑" },
    ],
  },
  { id: 4, name: "Sports & Outdoors", type: "Parent", slug: "sports-outdoors", description: "Sports equipment and outdoor gear", products: 756, status: "active", emoji: "⚽", children: [] },
  { id: 5, name: "Books", type: "Parent", slug: "books", description: "Physical and digital books", products: 1890, status: "inactive", emoji: "📚", children: [] },
];

function useOutsideClick(ref, callback) {
  useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) callback(); }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, callback]);
}

function CustomDropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false));
  const selectedLabel = options.find((o) => o.value === value)?.label || value;
  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 border border-gray-200 rounded-lg pl-3 pr-2 py-2 text-sm text-gray-700 font-medium bg-white min-w-max hover:border-gray-300 transition-colors">
        <span>{selectedLabel}</span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden min-w-max">
          {options.map((opt) => {
            const sel = value === opt.value;
            return (
              <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setOpen(false); }}
                className="w-full flex items-center justify-between gap-8 px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors"
                style={sel ? { backgroundColor: "#FFF7ED" } : {}}>
                <span className={`font-medium ${sel ? "text-orange-500" : "text-gray-700"}`}>{opt.label}</span>
                {sel && <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ActionMenu({ item, onEdit, onToggleStatus, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)}
        className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden min-w-max">
          <button type="button" onClick={() => { onEdit?.(item); setOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="font-medium">Edit Category</span>
          </button>
          <button type="button" onClick={() => { onToggleStatus?.(item); setOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="font-medium">{item.status === "active" ? "Deactivate" : "Activate"}</span>
          </button>
          <div className="border-t border-gray-100 mx-3" />
          <button type="button" onClick={() => { onDelete?.(item); setOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left text-red-500 hover:bg-red-50 transition-colors">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="font-medium">Delete Category</span>
          </button>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${status === "active" ? "bg-emerald-500 text-white" : "bg-gray-500 text-white"}`}>
      {status}
    </span>
  );
}

function ParentBadge() {
  return <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: "#F97316" }}>Parent</span>;
}

function SubBadge() {
  return <span className="inline-block text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded-md">Subcategory</span>;
}

function ParentRow({ item, onEdit, onToggleStatus, onDelete }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
      <td className="py-4 px-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl flex-shrink-0">{item.emoji}</span>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
            <div className="mt-1"><ParentBadge /></div>
          </div>
        </div>
      </td>
      <td className="py-4 px-5 text-sm text-gray-500">{item.slug}</td>
      <td className="py-4 px-5 text-sm text-gray-500">{item.description}</td>
      <td className="py-4 px-5">
        <span className="border border-gray-200 rounded-md px-2.5 py-1 text-sm text-gray-600 font-medium">{item.products.toLocaleString()}</span>
      </td>
      <td className="py-4 px-5"><StatusBadge status={item.status} /></td>
      <td className="py-4 px-5"><ActionMenu item={item} onEdit={onEdit} onToggleStatus={onToggleStatus} onDelete={onDelete} /></td>
    </tr>
  );
}

function ChildRow({ item, onEdit, onToggleStatus, onDelete }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
      <td className="py-4 px-5">
        <div className="flex items-center gap-2 pl-5">
          <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-xl flex-shrink-0">{item.emoji}</span>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
            <div className="mt-1"><SubBadge /></div>
          </div>
        </div>
      </td>
      <td className="py-4 px-5 text-sm text-gray-500">{item.slug}</td>
      <td className="py-4 px-5 text-sm text-gray-500">{item.description}</td>
      <td className="py-4 px-5">
        <span className="border border-gray-200 rounded-md px-2.5 py-1 text-sm text-gray-600 font-medium">{item.products.toLocaleString()}</span>
      </td>
      <td className="py-4 px-5"><StatusBadge status={item.status} /></td>
      <td className="py-4 px-5"><ActionMenu item={item} onEdit={onEdit} onToggleStatus={onToggleStatus} onDelete={onDelete} /></td>
    </tr>
  );
}

function MobileCard({ item, isChild, onEdit, onToggleStatus, onDelete }) {
  return (
    <div className={`border-b border-gray-100 px-4 py-3.5 ${isChild ? "bg-gray-50/70" : "bg-white"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5 min-w-0">
          {isChild && (
            <svg className="w-3 h-3 text-gray-400 flex-shrink-0 mt-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          <span className="text-2xl flex-shrink-0">{item.emoji}</span>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</p>
            <div className="mt-1">{item.type === "Parent" ? <ParentBadge /> : <SubBadge />}</div>
            <p className="text-xs text-gray-400 mt-1.5 truncate">{item.slug}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 pt-0.5">
          <StatusBadge status={item.status} />
          <ActionMenu item={item} onEdit={onEdit} onToggleStatus={onToggleStatus} onDelete={onDelete} />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between pl-10">
        <p className="text-xs text-gray-400 flex-1 pr-4 line-clamp-1">{item.description}</p>
        <span className="border border-gray-200 rounded-md px-2 py-0.5 text-xs text-gray-600 font-medium flex-shrink-0">{item.products.toLocaleString()}</span>
      </div>
    </div>
  );
}

function ModalBase({ title, subtitle, onClose, children, footer }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-lg z-10 flex flex-col">
        <div className="flex items-start justify-between px-5 pt-5 pb-4 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none mt-0.5 ml-4">×</button>
        </div>
        <div className="border-t border-gray-100" />
        <div className="px-5 py-4 space-y-4 flex-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>{children}</div>
        <div className="border-t border-gray-100 flex-shrink-0" />
        <div className="flex items-center justify-end gap-3 px-5 py-4 flex-shrink-0">{footer}</div>
      </div>
    </div>
  );
}

function FormInput({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function ParentCategoryDropdown({ categories, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false));
  const selected = value === "" ? null : categories.find((c) => String(c.id) === String(value));
  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)}
        className="w-full border border-gray-200 focus:border-orange-400 rounded-lg px-3 py-2.5 text-sm bg-white flex items-center justify-between transition-colors">
        <span className="flex items-center gap-2">
          {selected ? <><span className="text-base">{selected.emoji}</span><span className="text-gray-700 font-medium">{selected.name}</span></> : <span className="text-gray-400">Select parent (optional)</span>}
        </span>
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          <button type="button" onClick={() => { onChange(""); setOpen(false); }}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-left"
            style={value === "" ? { backgroundColor: "#FFF7ED", color: "#F97316" } : { color: "#6B7280" }}>
            <span>🚫</span><span>None (Top Level)</span>
          </button>
          <div className="border-t border-gray-100 mx-3" />
          {categories.map((cat) => {
            const sel = String(value) === String(cat.id);
            return (
              <button key={cat.id} type="button" onClick={() => { onChange(cat.id); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-gray-50"
                style={sel ? { backgroundColor: "#FFF7ED" } : {}}>
                <span className="text-base">{cat.emoji}</span>
                <span className={`font-medium ${sel ? "text-orange-500" : "text-gray-700"}`}>{cat.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const inputCls = "w-full border border-gray-200 focus:border-orange-400 outline-none rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 transition-colors";
const selectCls = "w-full appearance-none border border-gray-200 focus:border-orange-400 outline-none rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white transition-colors";

// ── EMOJI INPUT: Fixed version ──
// Default emoji കാണിക്കും, type ചെയ്യുമ്പോൾ replace ആകും
function EmojiInput({ value, onChange }) {
  const [inputVal, setInputVal] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    const chars = [...val];
    if (chars.length === 0) {
      onChange("");
      return;
    }
    // Save only the last emoji/char to parent state
    onChange(chars[chars.length - 1]);
  };

  // After picking, clear input after short delay so next type replaces again
  const handleBlur = () => {
    setTimeout(() => setInputVal(""), 100);
  };

  return (
    <input
      type="text"
      className={inputCls}
      placeholder="📦"
      value={inputVal}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

function StatusDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false));
  const options = ["Active", "Inactive"];
  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)}
        className="w-full border border-gray-200 focus:border-orange-400 rounded-lg px-3 py-2.5 text-sm bg-white flex items-center justify-between transition-colors">
        <span className="text-gray-700 font-medium">{value}</span>
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: "#9CA3AF" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {options.map((opt) => {
            const sel = value === opt;
            const isHov = hovered === opt;
            return (
              <button key={opt} type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                onMouseEnter={() => setHovered(opt)}
                onMouseLeave={() => setHovered(null)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors"
                style={{ backgroundColor: isHov ? "#FFF7ED" : (sel && hovered === null) ? "#FFF7ED" : "" }}>
                <span className="font-medium" style={{ color: isHov ? "#F97316" : (sel && hovered === null) ? "#F97316" : "#374151" }}>{opt}</span>
                {sel && !isHov && hovered === null && (
                  <svg className="w-4 h-4" style={{ color: "#F97316" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isHov && (
                  <svg className="w-4 h-4" style={{ color: "#F97316" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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

function CategoryFormFields({ form, setForm, parentDropdown }) {
  return (
    <>
      <FormInput label="Category Name" required>
        <input type="text" className={inputCls} placeholder="Enter category name" value={form.name} autoFocus
          onChange={(e) => { const n = e.target.value; setForm(f => ({ ...f, name: n, slug: n.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"") })); }} />
      </FormInput>
      <FormInput label="Slug" required>
        <input type="text" className={inputCls} placeholder="category-slug" value={form.slug}
          onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))} />
      </FormInput>
      <FormInput label="Description">
        <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Enter category description" value={form.description}
          onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} />
      </FormInput>
      {parentDropdown && (
        <FormInput label="Parent Category">
          {parentDropdown}
        </FormInput>
      )}
      <FormInput label="Icon (Emoji)">
        <EmojiInput
          value={form.emoji}
          onChange={(v) => setForm(f => ({ ...f, emoji: v }))}
        />
      </FormInput>
      <FormInput label="Status">
        <StatusDropdown value={form.status} onChange={(v) => setForm(f => ({ ...f, status: v }))} />
      </FormInput>
    </>
  );
}

const OrangeBtn = ({ onClick, children }) => (
  <button onClick={onClick} className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-colors" style={{ backgroundColor: "#F97316" }}>{children}</button>
);
const GrayBtn = ({ onClick, children }) => (
  <button onClick={onClick} className="px-5 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">{children}</button>
);

function EditCategoryModal({ onClose, item }) {
  const [form, setForm] = useState({ name: item.name, slug: item.slug, description: item.description, emoji: item.emoji, status: item.status === "active" ? "Active" : "Inactive" });
  return (
    <ModalBase title="Edit Category" subtitle="Update category information" onClose={onClose}
      footer={<><GrayBtn onClick={onClose}>Cancel</GrayBtn><OrangeBtn onClick={onClose}>Save Changes</OrangeBtn></>}>
      <CategoryFormFields form={form} setForm={setForm} />
    </ModalBase>
  );
}

function AddCategoryModal({ onClose, categories }) {
  const [form, setForm] = useState({ name: "", slug: "", description: "", parent: "", emoji: "📦", status: "Active" });
  return (
    <ModalBase title="Add New Category" subtitle="Create a new product category or subcategory" onClose={onClose}
      footer={<><GrayBtn onClick={onClose}>Cancel</GrayBtn><OrangeBtn onClick={onClose}>Add Category</OrangeBtn></>}>
      <CategoryFormFields form={form} setForm={setForm}
        parentDropdown={
          <ParentCategoryDropdown categories={categories} value={form.parent} onChange={(v) => setForm(f => ({ ...f, parent: v }))} />
        }
      />
    </ModalBase>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [toast, setToast] = useState(null);

  const allItems = categories.flatMap((c) => [c, ...c.children]);
  const stats = [
    { label: "Total Categories", value: String(allItems.length), color: "text-gray-900" },
    { label: "Active", value: String(allItems.filter(i => i.status === "active").length), color: "text-emerald-500" },
    { label: "Inactive", value: String(allItems.filter(i => i.status === "inactive").length), color: "text-gray-900" },
    { label: "Parent Categories", value: String(categories.length), color: "text-gray-900" },
    { label: "Subcategories", value: String(categories.reduce((s, c) => s + c.children.length, 0)), color: "text-gray-900" },
    { label: "Total Products", value: allItems.reduce((s, i) => s + i.products, 0).toLocaleString(), color: "text-orange-500" },
  ];

  const statusOptions = [{ value: "All Status", label: "All Status" }, { value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }];
  const typeOptions = [{ value: "All Types", label: "All Types" }, { value: "Parent", label: "Parent Only" }, { value: "Subcategory", label: "Subcategories Only" }];

  const filtered = categories.filter((c) => {
    const s = search.toLowerCase();
    const match = c.name.toLowerCase().includes(s) || c.slug.toLowerCase().includes(s);
    const matchStatus = statusFilter === "All Status" || c.status === statusFilter;
    const matchType = typeFilter === "All Types" || c.type === typeFilter;
    return match && matchStatus && matchType;
  });

  const showToastMsg = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleToggleStatus = (item) => {
    const newStatus = item.status === "active" ? "inactive" : "active";
    setCategories(prev => prev.map(cat => {
      if (cat.id === item.id) return { ...cat, status: newStatus };
      return { ...cat, children: cat.children.map(ch => ch.id === item.id ? { ...ch, status: newStatus } : ch) };
    }));
    showToastMsg("Category status updated");
  };

  const handleDelete = (item) => {
    setCategories(prev => prev.filter(c => c.id !== item.id).map(c => ({ ...c, children: c.children.filter(ch => ch.id !== item.id) })));
  };

  const rowProps = { onEdit: setEditItem, onToggleStatus: handleToggleStatus, onDelete: handleDelete };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-xl whitespace-nowrap">
          <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </span>
          {toast}
        </div>
      )}

      {editItem && <EditCategoryModal item={editItem} onClose={() => setEditItem(null)} />}
      {showModal && <AddCategoryModal onClose={() => setShowModal(false)} categories={categories} />}

      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-sm text-gray-500 mt-1">Manage product categories and hierarchies</p>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 text-white text-sm font-semibold px-3.5 sm:px-4 py-2.5 rounded-lg transition-colors shadow-sm flex-shrink-0"
            style={{ backgroundColor: "#F97316" }}>
            <span className="text-base font-bold">+</span>
            <span>Add Category</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-500 mb-1.5 leading-snug">{s.label}</p>
              <p className={`text-2xl sm:text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Table card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="px-4 sm:px-5 py-3.5 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 className="text-base font-bold text-gray-900">All Categories</h2>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 sm:flex-none min-w-0">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                  <input type="text" placeholder="Search categories..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-2 border border-gray-200 focus:border-orange-400 outline-none rounded-lg text-sm text-gray-700 placeholder-gray-400 w-full sm:w-48 lg:w-52 transition-colors" />
                </div>
                <CustomDropdown value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
                <CustomDropdown value={typeFilter} onChange={setTypeFilter} options={typeOptions} />
              </div>
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3 px-5 text-left text-xs font-semibold text-gray-400 tracking-wide">Category</th>
                  <th className="py-3 px-5 text-left text-xs font-semibold text-gray-400 tracking-wide">Slug</th>
                  <th className="py-3 px-5 text-left text-xs font-semibold text-gray-400 tracking-wide">Description</th>
                  <th className="py-3 px-5 text-left text-xs font-semibold text-gray-400 tracking-wide">Products</th>
                  <th className="py-3 px-5 text-left text-xs font-semibold text-gray-400 tracking-wide">Status</th>
                  <th className="py-3 px-5 text-left text-xs font-semibold text-gray-400 tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((cat) => (
                  <>
                    <ParentRow key={cat.id} item={cat} {...rowProps} />
                    {cat.children.map((ch) => <ChildRow key={ch.id} item={ch} {...rowProps} />)}
                  </>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="py-16 text-center text-sm text-gray-400">No categories found</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {filtered.map((cat) => (
              <>
                <MobileCard key={cat.id} item={cat} isChild={false} {...rowProps} />
                {cat.children.map((ch) => <MobileCard key={ch.id} item={ch} isChild={true} {...rowProps} />)}
              </>
            ))}
            {filtered.length === 0 && <div className="py-16 text-center text-sm text-gray-400">No categories found</div>}
          </div>
        </div>
      </div>
    </div>
  );
}