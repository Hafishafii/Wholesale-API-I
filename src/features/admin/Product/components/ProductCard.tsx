// ProductCard.tsx
import type { ProductFormData } from "../../Product/types";

interface Props {
  product: ProductFormData;
}

const ProductCard = ({ product }: Props) => {
  const API_BASE =
    import.meta.env.VITE_API_URL || "https://ktr-export-backend.onrender.com";

  // Find the first variant that has images
  const variantWithImages = product.variants.find(
    (v) => v.variant_images && v.variant_images.length > 0
  );

  let primaryImage = "";

  if (variantWithImages) {
    // Use the first image of that variant
    primaryImage = variantWithImages.variant_images[0]?.image?.trim() || "";
  } else if (product.category?.image) {
    // Fallback to category image
    primaryImage = product.category.image.trim();
  }

  // Construct full URL only if the image is relative
  const fullImageUrl = primaryImage
    ? /^https?:\/\//i.test(primaryImage)
      ? primaryImage
      : `${API_BASE}${primaryImage}`
    : "";

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square bg-gray-100 relative">
        {fullImageUrl ? (
          <img
            src={fullImageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.product_type}</p>

        <div className="mt-2">
          <p className="text-sm">Variants: {product.variants.length}</p>
          <p className="text-sm">
            Total Stock:{" "}
            {product.variants.reduce(
              (sum, v) => sum + (v.current_stock || 0),
              0
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
