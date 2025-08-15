import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { type SweetAlertResult } from "sweetalert2";

// SweetAlert wrapper
const MySwal = withReactContent(Swal);

interface CartItemProps {
  id: number; // Cart item ID
  image?: string; // Optional product image URL
  name: string; // Product name
  size: string; // Size (variant)
  seller?: string; // Seller name (optional from backend)
  price: number; // Price per unit
  quantity: number; // Quantity in cart
  isSelected: boolean; // Checkbox selection
  onSelectToggle: () => void; // Select/deselect
  onDelete: () => void; // Remove from cart
  onSaveForLater: () => void; // Move to wishlist
  onQuantityChange: (qty: number) => void; // Update qty
}

const CartItem: React.FC<CartItemProps> = ({
  image,
  name,
  size,
  seller,
  price,
  quantity,
  isSelected,
  onSelectToggle,
  onDelete,
  onSaveForLater,
  onQuantityChange,
}) => {
  // Delete confirmation
  const handleDelete = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        onDelete();
        MySwal.fire("Deleted!", "Item has been removed.", "success");
      }
    });
  };

  // Save for later handler
  const handleSaveForLater = () => {
    onSaveForLater();
    MySwal.fire({
      icon: "success",
      title: "Saved for Later",
      text: "This item is saved to your wishlist.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Fallback image
  const safeImage =
    image && image.trim() !== "" ? image : "/placeholder.png";

  // Fallback seller
  const sellerName = seller && seller.trim() !== "" ? seller : "Default Seller";

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 border-b bg-white rounded-md relative">
      {/* Tick box */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelectToggle}
        className="absolute top-4 left-4 w-5 h-5 accent-blue-600"
        aria-label="Select item"
      />

      {/* Product Image */}
      <div className="w-full sm:w-60 h-60 flex-shrink-0 rounded overflow-hidden pl-8 sm:pl-0">
        <img
          src={safeImage}
          alt={name || "Product image"}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-base font-semibold">{name}</h2>
          <p className="text-sm text-gray-600 mt-1">Size: {size}</p>
          <p className="text-sm text-gray-600">Seller: {sellerName}</p>
          <p className="text-sm text-gray-500 mt-1">
            With 10 days return policy
          </p>
          <p className="text-xl font-bold mt-2">₹ {price}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
          <select
            className="border rounded px-3 py-2 bg-blue-800 text-white font-medium w-full sm:w-fit"
            value={quantity}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((qty) => (
              <option key={qty} value={qty}>
                QTY: {qty}
              </option>
            ))}
          </select>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-blue-800 text-sm rounded hover:bg-blue-50"
              aria-label="Delete item"
            >
              Delete
            </button>
            <button
              onClick={handleSaveForLater}
              className="px-4 py-2 border border-blue-800 text-sm rounded hover:bg-blue-50"
              aria-label="Save item for later"
            >
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
