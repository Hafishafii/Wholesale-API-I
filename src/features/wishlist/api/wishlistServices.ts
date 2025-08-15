import api from "../../../lib/api";

export const getWishlist = async () => {
  const res = await api.get("/wishlist/");
  return res.data;
};

export const removeWishlistItem = async (id: number) => {
  const res = await api.delete(`/wishlist/${id}/`);
  return res.data;
};