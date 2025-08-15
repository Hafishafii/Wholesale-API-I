import { useState } from 'react';
import api from '../../../../lib/api';
import type { ProductFormData } from '../types';

export const useAddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const addProduct = async (formData: ProductFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // STEP 1: Create product WITHOUT images
      const productPayload = {
        category_id: formData.category_id,
        name: formData.name,
        product_type: formData.product_type,
        description: formData.description,
        fabric: formData.fabric,
        is_draft: formData.is_draft,
        variants:
          formData.variants?.map((v) => ({
            color: v.color,
            size: v.size,
            product_code: v.product_code,
            stock_keeping_unit: v.stock_keeping_unit,
            cost_price: v.cost_price,
            wholesale_price: v.wholesale_price,
            min_order_quantity: v.min_order_quantity,
            current_stock: v.current_stock,
            allow_customization: v.allow_customization,
            images: [],
          })) || [],
      };

      const createRes = await api.post('/products/create/', productPayload);
      const productId = createRes.data.id;
      const backendVariants = createRes.data.variants;

      // STEP 2: Upload product-level images
      if (formData.images?.length) {
        const productImgFormData = new FormData();
        formData.images.forEach((img) => {
          productImgFormData.append('images', img);
          productImgFormData.append('view_types', 'front');
        });

        await api.post(`/products/${productId}/upload_images/`, productImgFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // STEP 3: Upload variant images
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
      return createRes.data;
    } catch (err: any) {
      console.error('Error:', err.response?.data || err.message);

      let userMessage = 'Failed to add product';
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          userMessage = err.response.data;
        } else if (err.response.data.message) {
          userMessage = err.response.data.message;
        } else if (err.response.data.errors) {
          userMessage = Object.values(err.response.data.errors)
            .flat()
            .join(', ');
        }
      } else if (err.message) {
        userMessage = err.message;
      }

      setError(userMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addProduct,
    isLoading,
    error,
    setError,
    success,
  };
};
