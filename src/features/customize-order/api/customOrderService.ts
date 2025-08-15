import api from "../../../lib/api";
import type { CustomOrderResponse } from "../types";

export const createCustomOrder = async (payload: any): Promise<CustomOrderResponse> => {
  const endpoints = ["/orders/custom-orders/"];


  for (const endpoint of endpoints) {
    try {
      const response = await api.post(endpoint, payload); // ✅ No Content-Type override


      if (response.data?.results && Array.isArray(response.data.results)) {
        continue;
      }

      return response.data;
    } catch (error: any) {
      continue;
    }
  }

  throw new Error("All endpoints failed. The API might be down or the endpoint structure has changed.");
};
