// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });

// // Optional: attach token automatically later
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("adminToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default API;



// ─────────────────────────────────────────────
//  Base API configuration
// ─────────────────────────────────────────────
const BASE_URL = "http://localhost:5000/api";

/** Retrieve stored JWT */
export const getToken = () => localStorage.getItem("token");

/** Persist JWT after login */
export const setToken = (token) => localStorage.setItem("token", token);

/** Remove JWT (logout) */
export const clearToken = () => localStorage.removeItem("token");

/** Build headers, injecting Authorization when a token exists */
const buildHeaders = (extra = {}) => {
  const headers = { "Content-Type": "application/json", ...extra };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

/**
 * Core fetch wrapper.
 * Throws a normalised Error with a `.status` property on non-2xx responses.
 */
const request = async (method, path, body = undefined) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: buildHeaders(),
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const err = await res.json();
      message = err.message || message;
    } catch (_) {}
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }

  // 204 No Content
  if (res.status === 204) return null;
  return res.json();
};

// ─────────────────────────────────────────────
//  Auth
// ─────────────────────────────────────────────
export const authAPI = {
  login: (email, password) =>
    request("POST", "/auth/login", { email, password }),
  register: (data) => request("POST", "/auth/register", data),
};

// ─────────────────────────────────────────────
//  Products
// ─────────────────────────────────────────────
export const productsAPI = {
  /**
   * Fetch paginated / filtered products.
   * @param {Object} params  - { search, category, brand, minPrice, maxPrice, sort, page, limit }
   */
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== "" && v !== undefined && v !== null)
      )
    ).toString();
    return request("GET", `/products${qs ? `?${qs}` : ""}`);
  },

  getById: (id) => request("GET", `/products/${id}`),

  getFeatured: () => request("GET", "/products/featured"),

  getOffers: () => request("GET", "/products/offers"),

  create: (data) => request("POST", "/products", data),

  update: (id, data) => request("PUT", `/products/${id}`, data),

  /** Soft-delete */
  delete: (id) => request("DELETE", `/products/${id}`),
};