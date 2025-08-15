import { useEffect, useState } from "react";
import type { Product, Variant } from "../types/Products";
import { fetchProducts as fetchFromApi } from "../../../services/productServices";

const mapApiProductToUI = (apiProduct: any): Product => {
  const variants: Variant[] = (apiProduct.variants || []).map(
    (variant: any): Variant => ({
      id: variant.id,
      color: variant.color,
      size: variant.size,
      product_code: variant.product_code,
      stock_keeping_unit: variant.stock_keeping_unit,
      cost_price: Number(String(variant.cost_price).replace(/[^0-9.]/g, "")) || 0,
      wholesale_price: Number(String(variant.wholesale_price).replace(/[^0-9.]/g, "")) || 0,
      min_order_quantity: variant.min_order_quantity,
      current_stock: variant.current_stock,
      allow_customization: Boolean(variant.allow_customization),
      images: variant.images || [],
    })
  );

  // pick the product price or fallback to first variant's wholesale price
  const rawPrice = apiProduct.price ?? variants[0]?.wholesale_price ?? 0;
  const cleanedPrice = Number(String(rawPrice).replace(/[^0-9.]/g, "")) || 0;

  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: cleanedPrice,
    product_type: apiProduct.product_type,
    fabric_type: apiProduct.fabric_type || apiProduct.fabric || "",
    description: apiProduct.description,
    is_draft: apiProduct.is_draft,
    category: {
      id: apiProduct.category?.id,
      name: apiProduct.category?.name,
      image: apiProduct.category?.image,
    },
    variants,
  };
};


export const useSearchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});

  useEffect(() => {
    console.log("Fetching with filters:", filters);
    console.log("Page:", page);

    const load = async () => {
      setLoading(true);
      try {
        const response = await fetchFromApi({}, page);
        let uiProducts: Product[] = response.results.map(mapApiProductToUI);

        uiProducts = uiProducts.filter((product: Product) => {
          // Category filter
          if (filters.category && filters.category.length > 0) {
            const selectedCategories = Array.isArray(filters.category)
              ? filters.category
              : [filters.category];
            if (!selectedCategories.includes(product.category?.id)) return false;
          }

          // Size filter
          if (filters.size && filters.size.length > 0) {
            const selectedSizes = Array.isArray(filters.size)
              ? filters.size
              : [filters.size];
            const hasSize = product.variants.some((variant: Variant) =>
              selectedSizes.includes(variant.size)
            );
            if (!hasSize) return false;
          }

          // Allow customization filter
          if (filters.allow_customization !== undefined) {
            const allowValue =
              typeof filters.allow_customization === "string"
                ? filters.allow_customization === "true"
                : Boolean(filters.allow_customization);

            const hasCustomization = product.variants.some(
              (variant: Variant) => variant.allow_customization === allowValue
            );
            if (!hasCustomization) return false;
          }

          // Fabric type filter
          if (filters.fabric_type && filters.fabric_type.length > 0) {
            const selectedFabrics = Array.isArray(filters.fabric_type)
              ? filters.fabric_type
              : [filters.fabric_type];
            if (!selectedFabrics.includes(product.fabric_type)) return false; // ✅ now uses fabric_type
          }

          // Availability filter
          if (filters.availability && filters.availability.length > 0) {
            const hasStockStatus = filters.availability.some((status: string) => {
              const totalStock = product.variants.reduce((acc, v) => acc + (v.current_stock || 0), 0);
              if (status === "in_stock") return totalStock > 10;
              if (status === "low_stock") return totalStock > 0 && totalStock <= 10;
              return false;
            });
            if (!hasStockStatus) return false;
          }

          // Price filter
          if (filters.min_price != null || filters.max_price != null) {
            // Always pick the lowest price available
            const allPrices = [
              product.price,
              ...product.variants.map(v => v.wholesale_price || 0)
            ].filter(p => !isNaN(Number(p)));

            const productPrice = Math.min(...allPrices);

            const min = Number(filters.min_price ?? 0);
            const max = Number(filters.max_price ?? Infinity);

            if (productPrice < min || productPrice > max) return false;
          }




          return true;
        });

        setProducts(uiProducts);
        setNext(response.next);
        setPrevious(response.previous);
      } catch (err) {
        console.error("❌ Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, filters]);

  return { products, loading, page, setPage, next, previous, filters, setFilters };
};
