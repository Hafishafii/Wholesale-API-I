import { useWishlist } from "../hooks/useWishlist";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Wishlist() {
  const { wishlist, loading, removeItem } = useWishlist();
  const navigate = useNavigate();

  // ✅ Confirmation before removing item
  const handleRemove = (id: number) => {
    Swal.fire({
      title: "Remove item?",
      text: "Are you sure you want to remove this item from your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it",
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(id);
        Swal.fire("Removed!", "The item has been removed from your wishlist.", "success");
      }
    });
  };

  if (loading) {
    return <p className="text-center mt-6 text-gray-500">Loading wishlist...</p>;
  }

  if (wishlist.length === 0) {
    return <p className="text-center mt-6 text-gray-500">Your wishlist is empty.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>

      {wishlist.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-white shadow rounded-lg p-4 mb-3"
        >
          {/* Product image & details */}
          <div className="flex items-center gap-4">
            <img
              src={item.product_details?.images?.[0] || "/placeholder.png"}
              alt={item.product_name}
              className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition"
              onClick={() => navigate(`/product/${item.product}`)}
            />
            <div>
              <h3
                className="text-lg font-medium text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate(`/product/${item.product}`)}
              >
                {item.product_name}
              </h3>
              <p className="text-sm text-gray-500">
                Category: {item.product_details?.category?.name ?? "No category"}
              </p>
              <p className="text-sm text-gray-500">
                Color: {item.product_details?.color ?? "N/A"} | Size:{" "}
                {item.product_details?.size ?? "N/A"}
              </p>
            </div>
          </div>

          {/* Remove button with confirmation */}
          <button
            onClick={() => handleRemove(item.id)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
