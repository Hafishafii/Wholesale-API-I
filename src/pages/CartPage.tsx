import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../features/cart/components/CartItem";
import HeaderLayout from "../components/layouts/HeaderLayout";
import api from "../lib/api"; 
import Spinner from "../components/common/Spinner";

type CartItemType = {
  id: number;
  image: string;
  name: string;
  size: string;
  seller: string;
  price: number;
  quantity: number;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(true); // ✅ loading state
  const navigate = useNavigate();

  // ✅ Fetch cart items from API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await api.get("/cart/");
        console.log("Cart API response:", response.data);

        const items = response.data.items.map((item: any) => ({
          id: item.id,
          name: item.product_name,
          image: item.image || "",
          size: item.size || "",
          seller: item.seller || "Fashions",
          price: item.total_price / item.quantity,
          quantity: item.quantity,
        }));

        setCartItems(items);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setLoading(false); // ✅ stop loading after fetch
      }
    };

    fetchCart();
  }, []);

  // ✅ Update quantity via API
  const handleQuantityChange = async (id: number, qty: number) => {
    try {
      await api.put(`/cart/${id}/`, { quantity: qty });
      setCartItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: qty } : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  // ✅ Delete item via API
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/cart/${id}/`);
      setCartItems((items) => items.filter((item) => item.id !== id));
      setSelectedItems((selected) => selected.filter((itemId) => itemId !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  // ✅ Save for later via API
  const handleSaveForLater = async (id: number) => {
    try {
      await api.post("/cart/save-for-later/", { cart_item_id: id });
      setCartItems((items) => items.filter((item) => item.id !== id));
      setSelectedItems((selected) => selected.filter((itemId) => itemId !== id));
    } catch (err) {
      console.error("Failed to save item for later:", err);
    }
  };

  const handleSelectToggle = (id: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllToggle = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const selectedSubtotal = cartItems.reduce((total, item) => {
    return selectedItems.includes(item.id)
      ? total + item.price * item.quantity
      : total;
  }, 0);

  // ✅ Navigate to checkout with selected products
  const handleProceedToBuy = () => {
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    navigate("/checkout", { state: { products: selectedProducts } });
  };

  return (
    <HeaderLayout>
      <div className="min-h-screen bg-gray-100 pt-10">
        <div className="max-w-4xl mx-auto mt-10 bg-white rounded p-4 shadow">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={selectedItems.length === cartItems.length && cartItems.length > 0}
              onChange={handleSelectAllToggle}
              className="w-5 h-5 accent-blue-600"
              id="selectAll"
            />
            <label htmlFor="selectAll" className="ml-2 font-medium text-gray-800">
              Select All
            </label>
          </div>

          {/* ✅ Loading state */}
          {loading ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <Spinner />
            </div>
          ) : cartItems.length === 0 ? (
            // ✅ Empty state
            <div className="min-h-[200px] flex flex-col items-center justify-center">
              <p className="text-gray-500">Your cart is empty.</p>
            </div>
          ) : (
            // ✅ Cart items
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                isSelected={selectedItems.includes(item.id)}
                onSelectToggle={() => handleSelectToggle(item.id)}
                onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
                onDelete={() => handleDelete(item.id)}
                onSaveForLater={() => handleSaveForLater(item.id)}
              />
            ))
          )}

          <div className="flex justify-between items-center p-4 mt-4 bg-white border-t">
            <div className="text-lg font-semibold">Subtotal</div>
            <div className="text-xl font-bold">
              ₹ {selectedSubtotal}{" "}
              <span className="text-sm font-normal text-gray-500">
                ({selectedItems.length} item
                {selectedItems.length !== 1 && "s"} selected)
              </span>
            </div>
          </div>

          <div className="p-4">
            <button
              onClick={handleProceedToBuy}
              className={`w-full py-3 rounded font-semibold ${
                selectedItems.length > 0
                  ? "bg-blue-800 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              disabled={selectedItems.length === 0}
            >
              Proceed to Buy ({selectedItems.length} item
              {selectedItems.length !== 1 && "s"})
            </button>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default CartPage;
