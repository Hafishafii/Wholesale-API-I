import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories, useAddProduct } from '../../features/admin/AddProduct';
import { ProductInfoForm, ImageUploadForm } from '../../features/admin/AddProduct';
import type { ProductFormData, ProductVariant } from '../../features/admin/AddProduct/types';
import VariantForm from "../../features/admin/AddProduct/components/VariantForm";

const SkeletonBox = ({ className = '' }: { className?: string }) => (
  <div className={`bg-gray-300 rounded-md animate-pulse ${className}`}></div>
);

const AddProductPage = () => {
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { addProduct, isLoading, error: addProductError, setError, success } = useAddProduct();

  // Minimal product details
  const [formData, setFormData] = useState<{
    category_id: number;
    name: string;
    product_type: string;
    fabric: string;
    description: string;
    is_draft: boolean;
  }>({
    category_id: 0,
    name: '',
    product_type: '',
    fabric: '',
    description: '',
    is_draft: false,
  });

  const [images, setImages] = useState<File[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Frontend validation
  const validateForm = (): string | null => {
    if (!formData.category_id) return "Please select a category.";
    if (!formData.name.trim()) return "Product name is required.";
    if (!formData.product_type) return "Please select a product type.";
    if (!formData.fabric.trim()) return "Fabric is required.";
    if (!formData.description.trim()) return "Description is required.";

    if (variants.length === 0) return "Please add at least one variant.";

    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];
      if (!v.color) return `Variant ${i + 1}: Color is required.`;
      if (!v.size) return `Variant ${i + 1}: Size is required.`;
      if (!v.product_code.trim()) return `Variant ${i + 1}: Product code is required.`;
      if (!v.stock_keeping_unit.trim()) return `Variant ${i + 1}: SKU is required.`;
      if (v.cost_price <= 0) return `Variant ${i + 1}: Cost price must be positive.`;
      if (v.wholesale_price <= 0) return `Variant ${i + 1}: Wholesale price must be positive.`;
      if (v.min_order_quantity < 0) return `Variant ${i + 1}: Min order qty cannot be negative.`;
      if (v.current_stock < 0) return `Variant ${i + 1}: Current stock cannot be negative.`;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault();

    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      const productData: ProductFormData = {
        ...formData,
        category_id: Number(formData.category_id),
        is_draft: isDraft,
        images,
        variants,
        // placeholders for type compatibility
        color: '',
        size: '',
        product_code: '',
        stock_keeping_unit: '',
        cost_price: '',
        wholesale_price: '',
        min_order_quantity: 0,
        current_stock: 0,
        allow_customization: false,
      };
      await addProduct(productData);
    } catch (err) {
      console.error('Submission error:', err);
    }
  };

  if (categoriesLoading) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">
          <SkeletonBox className="w-48 h-8" />
        </h1>
        <div className="space-y-6">
          <SkeletonBox className="w-full h-12 rounded-lg" />
          <SkeletonBox className="w-full h-48 rounded-lg" />
          <SkeletonBox className="w-full h-24 rounded-lg" />
          <SkeletonBox className="w-full h-32 rounded-lg" />
        </div>
      </div>
    );
  }

  if (categoriesError) {
    return <div>Error loading categories: {categoriesError}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center py-4 rounded">
        Add New Product
      </h1>
      {addProductError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {addProductError}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Product {formData.is_draft ? 'saved as draft' : 'added'} successfully!
          <p className="mt-2">Redirecting to product list...</p>
        </div>
      )}

      <form>
          <ProductInfoForm
            categories={categories}
            formData={formData}
            onInputChange={handleInputChange}
          />
          <ImageUploadForm onImagesChange={setImages} />
          <VariantForm variants={variants} onVariantsChange={setVariants} />
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isLoading}
            className={`px-4 py-2 rounded text-white flex items-center justify-center ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Saving Draft...
              </>
            ) : (
              'Save as Draft'
            )}
          </button>

          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            disabled={isLoading}
            className={`px-4 py-2 rounded text-white flex items-center justify-center ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Adding...
              </>
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
