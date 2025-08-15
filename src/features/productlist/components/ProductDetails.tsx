// pages/ProductDetails.tsx
import React, { useEffect, useState } from "react";
import type { Product, Variant } from "../types/Products";
import ProductImageMain from "../components/ProductImageMain";
import ProductImageThumbnails from "../components/ProductImageThumbnails";
import ProductInfo from "../components/ProductInfo";
import ProductPurchasing from "../components/ProductPurchasing";
import ProductReviews from "../components/ProductReviews";
import { SizeChartModal } from "../components/SizeChartModal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../../lib/api";

interface Props {
  product: Product;
}

const PLACEHOLDER = "https://placehold.co/450x300";

const normalizeImages = (images: any[] | undefined, categoryImage?: string) => {
  if (!images || images.length === 0) {
    return categoryImage ? [categoryImage] : [PLACEHOLDER];
  }
  return images.map((img) =>
    typeof img === "string" ? img : img?.image || String(img)
  );
};

const ProductDetails: React.FC<Props> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null
  );
  const [deliveryAddress, setDeliveryAddress] = useState<{ location: string; pincode: string } | null>(null);

  const [newReview, setNewReview] = useState({
    user: "",
    comment: "",
    rating: 0,
    lastSeenWorking: false,
  });
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [inWishlist, setInWishlist] = useState(false);
  const navigate = useNavigate();

  const availableSizes = [
    ...new Set(
      product.variants
        .filter((v) => (selectedColor ? v.color === selectedColor : true))
        .map((v) => v.size)
    ),
  ];

  const selectedVariant: Variant | undefined =
    product.variants.find(
      (v) =>
        (!selectedColor || v.color === selectedColor) &&
        (!selectedSize || v.size === selectedSize)
    ) || product.variants[0];

  const images = normalizeImages(
    selectedVariant?.images as any[] | undefined,
    product.category?.image
  );

  const totalRatings = reviews.length;
  const averageRating =
    totalRatings > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalRatings
      : 0;

  // load reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(
          `/review/product/${product.id}/reviewlist/`
        );
        if (Array.isArray(response.data)) setReviews(response.data);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
    };
    fetchReviews();
  }, [product.id]);

  useEffect(() => {
    if (product?.variants?.length > 0)
      setSelectedVariantId(product.variants[0].id);
  }, [product]);

  useEffect(() => {
   const fetchAddress = async () => {
  try {
    const res = await api.get("/orders/addresses/");
    const addresses = res.data?.results || [];
    if (Array.isArray(addresses) && addresses.length > 0) {
      const defaultAddress = addresses.find((a: any) => a.is_default) || addresses[0];
      setDeliveryAddress({
        location: `${defaultAddress.city}, ${defaultAddress.state}`,
        pincode: defaultAddress.pincode
      });
    }
  } catch (err) {
    console.error("Failed to load address", err);
  }
};

    fetchAddress();
  }, []);


  useEffect(() => {
    if (!product?.id) return;
    const fetchWishlist = async () => {
      try {
        const res = await api.get("/wishlist/");
        if (Array.isArray(res.data)) {
          const ids = res.data.map((item: any) =>
            typeof item === "string" || typeof item === "number"
              ? item
              : item.product_id ?? item.product ?? item.id ?? item._id
          );
          localStorage.setItem("wishlist", JSON.stringify(ids));
          if (ids.includes(product.id)) setInWishlist(true);
          return;
        }
      } catch {
      }
      try {
        const savedWishlist = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        if (Array.isArray(savedWishlist) && savedWishlist.includes(product.id))
          setInWishlist(true);
      } catch { }
    };
    fetchWishlist();
  }, [product?.id]);

  const handleNextImage = () =>
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  const handlePrevImage = () =>
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) setQuantity(value);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      Swal.fire("Please select a size before proceeding", "", "info");
      return;
    }

    const productArray = [
      {
        productId: product.id,
        name: product.name,
        variantId: selectedVariant?.id,
        color: selectedVariant?.color,
        size: selectedVariant?.size,
        quantity,
        price: selectedVariant?.wholesale_price,
        image: selectedVariant?.images?.[0] || product.category?.image,
      },
    ];

    navigate("/checkout", {
      state: { products: productArray },
    });
  };
  const handleAddToCart = async () => {
    if (!selectedSize) {
      Swal.fire("Please select a size before adding to cart", "", "info");
      return;
    }

    const imageUrl =
      selectedVariant?.images?.[0] ||
      product.category?.image ||
      "https://placehold.co/450x300";

    try {
      await api.post("/cart/", {
        product: product.id,
        variant: selectedVariant?.id,
        quantity,
        image: imageUrl,
      });
      Swal.fire({
        icon: "success",
        title: "Added to cart!",
        text: `${product.name} has been added to your cart.`,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        position: "top-end",
      });
    } catch (err) {
      Swal.fire("Failed to add to cart", "", "error");
    }
  };

  const handleWishlist = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    const prev = inWishlist;
    try {
      const storedWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      if (!prev) {
        const res = await api.post("/wishlist/", {
          product: Number(product.id),
          variant: Number(selectedVariantId),
        });
        const wishlistId = res.data.id;
        setInWishlist(true);
        localStorage.setItem(
          "wishlist",
          JSON.stringify([
            ...storedWishlist,
            { productId: product.id, wishlistId },
          ])
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${product.name} added to wishlist`,
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const entry = (storedWishlist as any[]).find(
          (item: any) => item.productId === product.id
        );
        if (!entry) return;
        await api.delete(`/wishlist/${entry.wishlistId}/`);
        setInWishlist(false);
        localStorage.setItem(
          "wishlist",
          JSON.stringify(
            (storedWishlist as any[]).filter(
              (it: any) => it.productId !== product.id
            )
          )
        );
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: `${product.name} removed from wishlist`,
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Failed to update wishlist",
        text: err?.response?.data
          ? JSON.stringify(err.response.data)
          : "Please try again.",
      });
      setInWishlist(prev);
    }
  };

  const submitReview = async () => {
    if (!newReview.comment || newReview.rating === 0) {
      Swal.fire("Please fill in comment and rating", "", "warning");
      return;
    }
    try {
      const response = await api.post("/review/reviewcreate/", {
        rating: newReview.rating,
        comment: newReview.comment,
        product: product.id,
      });
      Swal.fire("Review submitted!", "", "success");
      setReviews([response.data, ...reviews]);
      setNewReview({
        user: "",
        comment: "",
        rating: 0,
        lastSeenWorking: false,
      });
    } catch (error: any) {
      Swal.fire(
        "Failed to submit review",
        error?.response?.data?.detail || "",
        "error"
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <ProductInfo
        product={{
          ...product,
          rating: averageRating,
          totalRatings: totalRatings
        }}
        reviewsCount={reviews.length}
      />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <ProductImageMain
          images={images}
          selectedIndex={selectedImageIndex}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
        />
        <ProductImageThumbnails
          images={images}
          selectedIndex={selectedImageIndex}
          onSelect={setSelectedImageIndex}
        />
      </div>

      <ProductPurchasing
        productName={product.name}
        productVariants={product.variants}
        availableSizes={availableSizes}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        quantity={quantity}
        setQuantity={handleQuantityChange}
        selectedVariant={selectedVariant}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onWishlistToggle={handleWishlist}
        inWishlist={inWishlist}
        onShowSizeChart={() => setShowSizeChart(true)}
      />

      <div className="text-sm text-gray-600 space-y-1 mt-4">
        <div className="flex justify-between items-center">
          <p className="text-black font-medium">
            Deliver to:{" "}
            {deliveryAddress ? (
              <span className="text-gray-700">
                {deliveryAddress.location} • {deliveryAddress.pincode}
              </span>
            ) : (
              <span className="text-gray-500">Loading address...</span>
            )}
          </p>
        </div>
      </div>

      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-2">Specifications</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
          <li>
            <strong>Category:</strong> {product.category?.name}
          </li>
          <li>
            <strong>Size:</strong> {selectedVariant?.size}
          </li>
          <li>
            <strong>Product Code:</strong> {selectedVariant?.product_code}
          </li>
          <li>
            <strong>SKU:</strong> {selectedVariant?.stock_keeping_unit}
          </li>
        </ul>
      </div>

      <ProductReviews
        reviews={reviews}
        newReview={newReview}
        setNewReview={setNewReview}
        onSubmitReview={submitReview}
      />

      {showSizeChart && (
        <SizeChartModal
          isOpen={showSizeChart}
          onClose={() => setShowSizeChart(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;
