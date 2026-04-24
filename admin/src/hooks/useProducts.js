import { useState, useEffect, useCallback, useRef } from "react";
import { productsAPI } from "../services/api";

// ─────────────────────────────────────────────
//  useProducts  –  list with search / filter / pagination
// ─────────────────────────────────────────────
export function useProducts(initialParams = {}) {
  const [products, setProducts]   = useState([]);
  const [total, setTotal]         = useState(0);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);
  const [params, setParams]       = useState({
    page: 1,
    limit: 20,
    sort: "-createdAt",
    ...initialParams,
  });

  const abortRef = useRef(null);

  const fetch = useCallback(async (overrideParams) => {
    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const p = overrideParams ?? params;
      const data = await productsAPI.getAll(p);
      if (!controller.signal.aborted) {
        setProducts(data.products ?? []);
        setTotal(data.total ?? 0);
      }
    } catch (err) {
      if (!controller.signal.aborted) setError(err.message);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [params]);

  // Re-fetch whenever params change
  useEffect(() => { fetch(); }, [params]);

  const updateParams = useCallback((updates) => {
    setParams((prev) => ({ ...prev, ...updates, page: 1 }));
  }, []);

  const goToPage = useCallback((page) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  return { products, total, loading, error, params, updateParams, goToPage, refetch: fetch };
}

// ─────────────────────────────────────────────
//  useProduct  –  single product by id
// ─────────────────────────────────────────────
export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productsAPI.getById(id);
        if (!cancelled) setProduct(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [id]);

  return { product, loading, error };
}

// ─────────────────────────────────────────────
//  useProductMutations  –  create / update / delete
// ─────────────────────────────────────────────
export function useProductMutations({ onSuccess } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const run = async (fn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      onSuccess?.(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createProduct : (data)     => run(() => productsAPI.create(data)),
    updateProduct : (id, data) => run(() => productsAPI.update(id, data)),
    deleteProduct : (id)       => run(() => productsAPI.delete(id)),
  };
}