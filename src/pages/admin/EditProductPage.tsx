import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCategories } from '../../features/admin/AddProduct';
import { useEditProduct } from '../../features/admin/AddProduct/hooks/useEditProduct';
import { ProductInfoForm, ImageUploadForm } from '../../features/admin/AddProduct';
import type { ProductVariant } from '../../features/admin/AddProduct/types';
import api from '../../lib/api';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const { editProduct, isLoading, error, setError, success } = useEditProduct();

  const [formData, setFormData] = useState<any>({
    category_id: 0,
    name: '',
    product_type: '',
    fabric: '',
    description: '',
    is_draft: false,
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  // Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}/`);
        const product = res.data;

        setFormData({
          category_id: product.category.id,
          name: product.name,
          product_type: product.product_type,
          fabric: product.fabric,
          description: product.description,
          is_draft: product.is_draft,
        });

        setExistingImages(product.images?.map((img: any) => img.image_url) || []);

        setVariants(
          product.variants.map((v: any) => ({
            ...v,
            images: v.variant_images?.map((img: any) => img.image) || [],
          }))
        );
      } catch (err) {
        console.error('Failed to fetch product', err);
      }
    };

    fetchProduct();
  }, [id]);

  // Redirect after successful update
  useEffect(() => {
    if (success) navigate('/admin/products');
  }, [success, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editProduct(Number(id), {
      ...formData,
      category_id: Number(formData.category_id),
      images,
      variants,
    });
  };

  const handleVariantChange = (index: number, field: keyof ProductVariant, value: any) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      {error && <div className="bg-red-200 text-red-700 p-3 rounded">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Product Info */}
        <ProductInfoForm
          categories={categories}
          formData={formData}
          onInputChange={(e) => {
            const { name, value, type, checked } = e.target as HTMLInputElement;
            setFormData((prev: any) => ({
              ...prev,
              [name]: type === 'checkbox' ? checked : value,
            }));
          }}
        />

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="mb-4">
            <p className="font-medium mb-2">Existing Product Images</p>
            <div className="flex flex-wrap gap-2">
              {existingImages.map((img, i) => (
                <img key={i} src={img} alt="" className="w-20 h-20 object-cover rounded border" />
              ))}
            </div>
          </div>
        )}

        {/* New Images */}
        <ImageUploadForm onImagesChange={setImages} />

        {/* Variants */}
        {variants.length > 0 && (
          <div className="mt-6">
            <h2 className="font-bold text-lg mb-2">Variants</h2>
            {variants.map((variant, i) => (
              <div key={variant.id || i} className="border p-3 mb-3 rounded">
                <input
                  type="text"
                  value={variant.color}
                  onChange={(e) => handleVariantChange(i, 'color', e.target.value)}
                  placeholder="Color"
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  value={variant.size}
                  onChange={(e) => handleVariantChange(i, 'size', e.target.value)}
                  placeholder="Size"
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  value={variant.product_code}
                  onChange={(e) => handleVariantChange(i, 'product_code', e.target.value)}
                  placeholder="Product Code"
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  value={variant.stock_keeping_unit}
                  onChange={(e) => handleVariantChange(i, 'stock_keeping_unit', e.target.value)}
                  placeholder="SKU"
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="number"
                  value={variant.cost_price}
                  onChange={(e) => handleVariantChange(i, 'cost_price', Number(e.target.value))}
                  placeholder="Cost Price"
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="number"
                  value={variant.wholesale_price}
                  onChange={(e) => handleVariantChange(i, 'wholesale_price', Number(e.target.value))}
                  placeholder="Wholesale Price"
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="number"
                  value={variant.min_order_quantity}
                  onChange={(e) => handleVariantChange(i, 'min_order_quantity', Number(e.target.value))}
                  placeholder="Min Order Quantity"
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="number"
                  value={variant.current_stock}
                  onChange={(e) => handleVariantChange(i, 'current_stock', Number(e.target.value))}
                  placeholder="Stock"
                  className="border p-1 rounded w-full mb-2"
                />

                <label className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={variant.allow_customization}
                    onChange={(e) => handleVariantChange(i, 'allow_customization', e.target.checked)}
                  />
                  Allow Customization
                </label>

                {/* Existing Variant Images */}
                {Array.isArray(variant.images) &&
                  variant.images.length > 0 &&
                  typeof variant.images[0] === 'string' && (
                    <div className="flex gap-2 mb-2">
                      {variant.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img as string}
                          alt=""
                          className="w-16 h-16 object-cover rounded border"
                        />
                      ))}
                    </div>
                  )}

                {/* Upload New Variant Images */}
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files ? Array.from(e.target.files) : [];
                    handleVariantChange(i, 'images', files as File[]);
                  }}
                  className="block"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isLoading ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
