import type{ FC } from 'react';

interface PricingStockFormProps {
  formData: {
    cost_price: string;
    wholesale_price: string;
    min_order_quantity: number;
    current_stock: number;
    allow_customization: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PricingStockForm: FC<PricingStockFormProps> = ({ formData, onInputChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Pricing & Stock</h2>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <input
          type="number"
          name="cost_price"
          value={formData.cost_price}
          onChange={onInputChange}
          placeholder="Cost Price"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 col-span-1"
          required
        />
        <input
          type="number"
          name="wholesale_price"
          value={formData.wholesale_price}
          onChange={onInputChange}
          placeholder="Wholesale Price"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 col-span-1"
          required
        />
        <input
          type="number"
          name="min_order_quantity"
          value={formData.min_order_quantity}
          onChange={onInputChange}
          placeholder="Min. Order Quantity"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 col-span-1"
          required
        />
        <input
          type="number"
          name="current_stock"
          value={formData.current_stock}
          onChange={onInputChange}
          placeholder="Current Stock"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 col-span-1"
          required
        />
      </div>

      <div className="flex items-center space-x-3">
        <label htmlFor="allow_customization" className="font-medium">
          Allow Customization?
        </label>
        <input
          type="checkbox"
          id="allow_customization"
          name="allow_customization"
          checked={formData.allow_customization}
          onChange={onInputChange}
          className="w-5 h-5"
        />
      </div>
    </div>
  );
};
