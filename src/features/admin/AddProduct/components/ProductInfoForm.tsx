import type { FC } from 'react';
import type { Category } from '../types';

interface ProductInfoFormProps {
  categories: Category[];
  formData: {
    category_id: number;
    name: string;
    product_type: string;
    fabric: string;
    description: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const ProductInfoForm: FC<ProductInfoFormProps> = ({
  categories,
  formData,
  onInputChange,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Product Info</h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Category */}
        <div>
          <label className="block mb-2">Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={onInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Name */}
        <div>
          <label className="block mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Product Type */}
        <div>
          <label className="block mb-2">Product Type</label>
          <div className="flex space-x-4">
            {['Sarees', 'Shirts', 'Dhothis'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="product_type"
                  value={type}
                  checked={formData.product_type === type}
                  onChange={onInputChange}
                  className="mr-2"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Fabric */}
        <div>
          <label className="block mb-2">Fabric</label>
          <input
            type="text"
            name="fabric"
            placeholder="cotton"
            value={formData.fabric}
            onChange={onInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onInputChange}
            placeholder="Write a short description about the product"
            className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-700 h-28"
            required
          />
        </div>
      </div>
    </div>
  );
};
