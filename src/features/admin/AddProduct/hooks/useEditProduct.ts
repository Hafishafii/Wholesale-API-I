import { useState } from 'react';
import api from '../../../../lib/api';
import type { ProductFormData } from '../types';

export const useEditProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const editProduct = async (id: number, formData: ProductFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Step 1: Prepare payload (excluding images for now)
      const productPayload = {
        category_id: formData.category_id,
        name: formData.name,
        product_type: formData.product_type,
        description: formData.description,
        fabric: formData.fabric,
        is_draft: formData.is_draft,
        variants: formData.variants?.map((v) => ({
          id: v.id, // important for updating variants
          color: v.color,
          size: v.size,
          product_code: v.product_code,
          stock_keeping_unit: v.stock_keeping_unit,
          cost_price: v.cost_price,
          wholesale_price: v.wholesale_price,
          min_order_quantity: v.min_order_quantity,
          current_stock: v.current_stock,
          allow_customization: v.allow_customization,
          variant_images: [], // you can upload separately later
        })),
      };

      // Step 2: Update product data
      const updateRes = await api.put(`/products/${id}/update/`, productPayload);
      const backendVariants = updateRes.data.variants;

      // Step 3: Upload product-level images (if new images selected)
      if (formData.images?.length) {
        const productImgFormData = new FormData();
        formData.images.forEach((img) => {
          productImgFormData.append('images', img);
          productImgFormData.append('view_types', 'front');
        });

        await api.post(`/products/${id}/upload_images/`, productImgFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // Step 4: Upload variant images (if new)
      if (formData.variants?.length) {
        for (let i = 0; i < formData.variants.length; i++) {
          const variant = formData.variants[i];
          const backendVariant = backendVariants[i];
          if (!backendVariant || !variant.images?.length) continue;

          const variantFormData = new FormData();
          variantFormData.append('variant_id', backendVariant.id.toString());

          variant.images.forEach((img) => {
            variantFormData.append('images', img);
            variantFormData.append('view_types', 'front');
          });

          await api.post('/product-images/upload/', variantFormData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        }
      }

      setSuccess(true);
      return updateRes.data;
    } catch (err: any) {
      console.error('Edit error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to edit product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    editProduct,
    isLoading,
    error,
    setError,
    success,
  };
};
