const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const base = BASE.replace(/\/$/, "");
  const pathNorm = path.startsWith("/") ? path : `/${path}`;
  const url = path.startsWith("http") ? path : `${base}${pathNorm}`;
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers, credentials: "include" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || res.statusText || "Request failed");
  return data as T;
}

// Auth
export const authApi = {
  register: (body: { name: string; email: string; password: string }) =>
    request<{ _id: string; name: string; email: string; role: string; token: string }>("/api/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body: { email: string; password: string }) =>
    request<{ _id: string; name: string; email: string; role: string; token: string }>("/api/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => request<{ _id: string; name: string; email: string; role: string }>("/api/auth/me"),
};

// Banners
export const bannersApi = {
  list: () => request<{ image: string; title?: string; subtitle?: string; link?: string; linkText?: string }[]>("/api/banners"),
};

// Categories (with subcategories)
export const categoriesApi = {
  list: () =>
    request<Array<{ _id: string; name: string; subCategories?: Array<any> }>>("/api/categories"),
};

// Attributes
export const attributesApi = {
  list: (category?: string) => 
    request<any[]>(`/api/attributes${category ? `?category=${category}` : ""}`),
};

// Products
export const productsApi = {
  list: (params?: { search?: string; category?: string; brand?: string; minPrice?: number; maxPrice?: number; sort?: string; page?: number; limit?: number }) => {
    const sp = new URLSearchParams();
    if (params?.search) sp.set("search", params.search);
    if (params?.category) sp.set("category", params.category);
    if (params?.brand) sp.set("brand", params.brand);
    if (params?.minPrice != null) sp.set("minPrice", String(params.minPrice));
    if (params?.maxPrice != null) sp.set("maxPrice", String(params.maxPrice));
    if (params?.sort) sp.set("sort", params.sort);
    if (params?.page) sp.set("page", String(params.page));
    if (params?.limit) sp.set("limit", String(params.limit));
    const q = sp.toString();
    return request<{ products: any[]; total: number; page: number; limit: number }>(`/api/products${q ? `?${q}` : ""}`);
  },
  byId: (id: string) => request<any>(`/api/products/${id}`),
  featured: (limit?: number) =>
    request<any[]>(`/api/products/featured${limit != null ? `?limit=${limit}` : ""}`),
  offers: (limit?: number) =>
    request<any[]>(`/api/products/offers${limit != null ? `?limit=${limit}` : ""}`),
};

// Cart
export const cartApi = {
  get: () =>
    request<{ items: Array<{ product: any; sku: string; quantity: number; productId: string; variant: any; price: number }>; subtotal: number; count: number }>("/api/cart"),
  add: (productId: string, sku: string, quantity?: number) =>
    request<{ message: string }>("/api/cart", {
      method: "POST",
      body: JSON.stringify({ productId, sku, quantity: quantity ?? 1 }),
    }),
  update: (productId: string, sku: string, quantity: number) =>
    request<{ message: string }>("/api/cart", {
      method: "PUT",
      body: JSON.stringify({ productId, sku, quantity }),
    }),
  remove: (productId: string, sku: string) =>
    request<{ message: string }>(`/api/cart/${productId}/${sku}`, { method: "DELETE" }),
};

// Vendor Stock
export const vendorStockApi = {
  submit: (body: { productId: string; sku: string; stockQuantity: number; vendorPrice: number }) =>
    request<any>("/api/vendor-stock", { method: "POST", body: JSON.stringify(body) }),
  select: (body: { productId: string; sku: string; vendorId: string }) =>
    request<any>("/api/vendor-stock/select", { method: "PUT", body: JSON.stringify(body) }),
  listForVariant: (productId: string, sku: string) =>
    request<any[]>(`/api/vendor-stock/${productId}/${sku}`),
};

// Referrals
export const referralsApi = {
  apply: (referralCode: string) =>
    request<{ message: string; referrer: string }>("/api/referrals/apply", { method: "POST", body: JSON.stringify({ referralCode }) }),
  stats: () =>
    request<{ referralCode: string; referralCount: number; walletBalance: number; referrals: any[] }>("/api/referrals/stats"),
};

// Reviews
export const reviewsApi = {
  create: (body: { productId: string; rating: number; comment: string; images?: string[] }) =>
    request<any>("/api/reviews", { method: "POST", body: JSON.stringify(body) }),
  listByProduct: (productId: string) =>
    request<any[]>(`/api/reviews/product/${productId}`),
  moderate: () => request<any[]>("/api/reviews/moderate"),
  approve: (id: string, isApproved: boolean) =>
    request<any>(`/api/reviews/${id}/approve`, { method: "PUT", body: JSON.stringify({ isApproved }) }),
};

// Support Tickets
export const supportTicketsApi = {
  create: (body: { subject: string; message: string; priority?: string }) =>
    request<any>("/api/support-tickets", { method: "POST", body: JSON.stringify(body) }),
  myTickets: () => request<any[]>("/api/support-tickets/my-tickets"),
  allTickets: () => request<any[]>("/api/support-tickets"),
  reply: (id: string, message: string, status?: string) =>
    request<any>(`/api/support-tickets/${id}/reply`, { method: "PUT", body: JSON.stringify({ message, status }) }),
};

// Notifications
export const notificationsApi = {
  list: () => request<any[]>("/api/notifications"),
  markRead: (id: string) =>
    request<any>(`/api/notifications/${id}/read`, { method: "PUT" }),
};

// Transactions
export const transactionsApi = {
  myTransactions: () => request<any[]>("/api/transactions"),
  allTransactions: () => request<any[]>("/api/transactions/admin"),
};

// Dashboard
export const dashboardApi = {
  admin: () => request<any>("/api/dashboard/admin"),
  vendor: () => request<any>("/api/dashboard/vendor"),
};

// Coupons
export const couponsApi = {
  validate: (code: string, subtotal: number) =>
    request<{ valid: boolean; discountAmount?: number; finalAmount?: number; message?: string }>(
      `/api/coupons/validate?code=${encodeURIComponent(code)}&subtotal=${subtotal}`
    ),
};

// Orders
export const ordersApi = {
  create: (body: { addressId?: string; address?: { fullName: string; phone: string; street: string; city: string; state: string; pincode: string }; couponCode?: string }) =>
    request<Record<string, unknown>>("/api/orders", { method: "POST", body: JSON.stringify(body) }),
  myOrders: () => request<unknown[]>("/api/orders"),
  byId: (id: string) => request<Record<string, unknown>>(`/api/orders/${id}`),
  cancel: (id: string) =>
    request<Record<string, unknown>>(`/api/orders/${id}/cancel`, { method: "PATCH" }),
};

// Addresses
export const addressesApi = {
  list: () => request<unknown[]>("/api/addresses"),
  add: (body: { fullName: string; phone: string; street: string; city: string; state: string; pincode: string; isDefault?: boolean }) =>
    request<unknown>("/api/addresses", { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: Partial<{ fullName: string; phone: string; street: string; city: string; state: string; pincode: string; isDefault: boolean }>) =>
    request<unknown>(`/api/addresses/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id: string) => request<unknown>(`/api/addresses/${id}`, { method: "DELETE" }),
};

// Wishlist
export const wishlistApi = {
  list: () => request<unknown[]>("/api/wishlist"),
  add: (productId: string) =>
    request<unknown[]>("/api/wishlist", { method: "POST", body: JSON.stringify({ productId }) }),
  remove: (productId: string) =>
    request<unknown[]>(`/api/wishlist/${productId}`, { method: "DELETE" }),
};
