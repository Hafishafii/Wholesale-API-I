import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import Swal from "sweetalert2";
import { type Product } from "../types/Products";
import api from "../../../lib/api";

interface Props {
  product: Product;
}

const placeholder = "https://via.placeholder.com/450?text=No+Image";

const ProductCard: React.FC<Props> = ({ product }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [displayImage, setDisplayImage] = useState<string>(placeholder);

  const firstVariant = product.variants?.[0];
  const productCode = firstVariant?.product_code;
  const fabric = product.fabric_type || "";
  const price = product.price || firstVariant?.wholesale_price || 0;
  const costPrice = firstVariant?.cost_price;

  // Pick first variant with images
  const variantWithImages = product.variants?.find(
    (v) => v.images && v.images.length > 0
  );

  const mainImage =
    product.thumbnail ||
    variantWithImages?.images?.[0]?.image ||
    product.category?.image ||
    placeholder;

  const hoverImage =
    variantWithImages?.images?.[1]?.image || mainImage;

  useEffect(() => {
    setDisplayImage(mainImage);
  }, [mainImage]);

 useEffect(() => {
  const fetchWishlistStatus = async () => {
    try {
      const res = await api.get("/wishlist/");
      const wishlistItems = res.data; // expect an array of wishlist items
      const exists = wishlistItems.some(
        (item: any) => item.product.id === product.id
      );
      setInWishlist(exists);

      // Optional: update localStorage for fast reloads
      const mapped = wishlistItems.map((item: any) => ({
        productId: item.product.id,
        wishlistId: item.id,
      }));
      localStorage.setItem("wishlist", JSON.stringify(mapped));
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (wishlist.some((item: any) => item.productId === product.id)) {
        setInWishlist(true);
      }
    }
  };

  fetchWishlistStatus();
}, [product.id]);


  const getStockStatus = (variants: Product["variants"]) => {
    if (!variants || variants.length === 0) return "No Stock";
    const totalStock = variants.reduce(
      (acc, v) => acc + (v.current_stock || 0),
      0
    );
    if (totalStock === 0) return "Out of Stock";
    if (totalStock < 10) return "Low Stock";
    return "In Stock";
  };

  const stockStatus = getStockStatus(product.variants);

  const stockColorClass =
    stockStatus === "Out of Stock"
      ? "bg-red-100 text-red-700"
      : stockStatus === "Low Stock"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (stockStatus === "Out of Stock") {
      Swal.fire({
        icon: "info",
        title: "Product is out of stock",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

      if (!inWishlist) {
        const res = await api.post(`/wishlist/`, {
          product: product.id,
          variant: firstVariant?.id,
        });

        const wishlistItemId = res.data.id;
        const updatedWishlist = [
          ...wishlist,
          { productId: product.id, wishlistId: wishlistItemId },
        ];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        setInWishlist(true);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${product.name} added to wishlist`,
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const existing = wishlist.find(
          (item: any) => item.productId === product.id
        );
        if (!existing) throw new Error("Wishlist item ID not found");

        await api.delete(`/wishlist/${existing.wishlistId}/`);

        const updatedWishlist = wishlist.filter(
          (item: any) => item.productId !== product.id
        );
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        setInWishlist(false);

        Swal.fire({
          position: "top-end",
          icon: "info",
          title: `${product.name} removed from wishlist`,
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Something went wrong" });
    }
  };

  const preloadHoverImage = () => {
    if (hoverImage && hoverImage !== mainImage) {
      const img = new Image();
      img.src = hoverImage;
    }
    setDisplayImage(hoverImage);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className={`bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex flex-col gap-2 group relative ${
        stockStatus !== "In Stock" ? "opacity-80" : ""
      }`}
      onMouseEnter={preloadHoverImage}
      onMouseLeave={() => setDisplayImage(mainImage)}
    >
      {/* Wishlist Icon */}
      <button
        type="button"
        disabled={stockStatus === "Out of Stock"}
        className={`absolute top-6 right-6 z-10 p-1 rounded-full bg-white shadow hover:scale-110 transition ${
          stockStatus === "Out of Stock" ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleWishlist}
      >
        <Heart
          size={18}
          className={inWishlist ? "text-red-500 fill-red-500" : "text-gray-600"}
        />
      </button>

      {/* Product Image */}
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
        <img
          src={displayImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholder;
          }}
        />
      </div>

      {/* Product Name */}
      <h2 className="text-base font-semibold text-gray-800 truncate">
        {product.name}
      </h2>

      {/* Product Code & Fabric */}
      <p className="text-sm text-gray-500 truncate">
        {productCode || "N/A"} {fabric ? ` · ${fabric}` : ""}
      </p>

      {/* Stock Status Badge */}
      {stockStatus !== "In Stock" && (
        <div
          className={`inline-block px-2 py-1 text-xs font-semibold rounded ${stockColorClass}`}
        >
          {stockStatus}
        </div>
      )}

      {/* Rating */}
      <div className="flex items-center gap-1 text-yellow-500 mt-1">
        {Array.from({ length: 4 }, (_, idx) => (
          <Star key={idx} size={16} fill="currentColor" stroke="none" />
        ))}
        <Star size={16} strokeWidth={1.5} />
      </div>

      {/* Price */}
      <div className="mt-1 flex items-center gap-2">
        <span className="font-bold text-base text-gray-900">
          ₹{Number(price).toFixed(2)}
        </span>
        {costPrice && (
          <span className="line-through text-sm text-gray-400">
            ₹{Number(costPrice).toFixed(2)}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
