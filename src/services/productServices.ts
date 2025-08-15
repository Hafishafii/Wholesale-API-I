// services/productServices.ts

import api from "../lib/api";

export const fetchProducts = async (
  filters: Record<string, string | number | (string | number)[] | undefined> = {},
  page = 1
) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v))); // convert to string
    } else if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  params.append("page", String(page));

  const { data } = await api.get(`/products/filter/?${params.toString()}`);
  return data;
};
