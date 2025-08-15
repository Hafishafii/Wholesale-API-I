import api from "../../../lib/api";
import type { Address } from "../../../types/address";

export const getAllAddressesAPI = async (): Promise<Address[]> => {
  const { data } = await api.get("/orders/addresses/");
  return Array.isArray(data) ? data : (data.results || []);
};

export const saveAddressAPI = async (address: Omit<Address, "id" | "user">): Promise<Address> => {
  const { data } = await api.post("/orders/addresses/", address);
  return data;
};

export const updateAddressAPI = async (id: number, address: Partial<Address>): Promise<Address> => {
  const { data } = await api.patch(`/orders/addresses/${id}/`, address);
  return data;
};

export const deleteAddressAPI = async (id: number): Promise<void> => {
  await api.delete(`/orders/addresses/${id}/`);
};
