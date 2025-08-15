import { useEffect, useState, useCallback } from "react";
import type { ProductFormData } from "../types";
import axios from "axios";
import type { AxiosResponse } from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://ktr-export-backend.onrender.com/api";

interface UseAdminProductsReturn {
  products: ProductFormData[];
  loading: boolean;
  total: number;
  page: number;
  loadMore: () => void;
  hasMore: boolean;
  reset: () => void;
}

type StockFilter = "ALL" | "LOW" | "HIGH" | "RECENT";

interface UseAdminProductsParams {
  filter: StockFilter;
  search: string;
}

const useAdminProducts = ({ filter, search }: UseAdminProductsParams): UseAdminProductsReturn => {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // To reset list when filter or search changes
  const reset = () => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  };

  // Fetch products based on page, filter, search
  const fetchProducts = useCallback(
    async (pageNum: number) => {
      if (!hasMore && pageNum !== 1) return; // no more pages to load

      setLoading(true);
      try {
        let endpoint = "";
        let params: any = { page: pageNum, page_size: 12 };

        // Determine endpoint and params based on filter/search
        if (search.trim()) {
          endpoint = `${API_BASE}/products/search/`;
          params.search = search.trim();
        } else if (filter !== "ALL") {
          endpoint = `${API_BASE}/products/filter/`;
          if (filter === "LOW") params.max_stock = 50;
          if (filter === "HIGH") params.min_stock = 100;
          if (filter === "RECENT") params.ordering = "-created_at";
        } else {
          endpoint = `${API_BASE}/products/`;
          if ((filter as string) === "RECENT") {
            params.ordering = "-created_at";
          }
        }

        // Auth token
        const token = localStorage.getItem("access_token");

        const res: AxiosResponse<any> = await axios.get(endpoint, {
          params,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const newProducts: ProductFormData[] = res.data.results || [];
        const count: number = res.data.count || 0;
        const nextPageExists: boolean = !!res.data.next;

        if (pageNum === 1) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => [...prev, ...newProducts]);
        }
        setTotal(count);
        setHasMore(nextPageExists);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    },
    [filter, search, hasMore]
  );

  // Load more function for infinite scroll
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  // Fetch products when page/filter/search changes
  useEffect(() => {
    fetchProducts(page);
  }, [fetchProducts, page]);

  // Reset list on filter/search change
  useEffect(() => {
    reset();
  }, [filter, search]);

  return { products, loading, total, page, loadMore, hasMore, reset };
};

export default useAdminProducts;
