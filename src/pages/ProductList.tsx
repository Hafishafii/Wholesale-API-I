import { useState } from "react";
import ProductCard from "../features/productlist/components/ProductCard";
import HeaderLayout from "../components/layouts/HeaderLayout";
import Spinner from "../components/common/Spinner";
import { useSearchProducts } from "../features/productlist/hooks/useSearchProducts";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";

const ProductList = () => {
  const { products, loading, setPage, next, previous, setFilters } = useSearchProducts();
  const [showFilters, setShowFilters] = useState(false); 
  const [tempFilters, setTempFilters] = useState<any>({});

  const handleCheckbox = (key: string, value: any, singleValue = false) => {
    setTempFilters((prev: any) => {
      const updated = { ...prev };

      if (singleValue) {
        updated[key] = updated[key] === value ? undefined : value;
      } else {
        const currentValues = new Set(prev[key] || []);
        if (currentValues.has(value)) {
          currentValues.delete(value);
        } else {
          currentValues.add(value);
        }
        updated[key] = currentValues.size > 0 ? Array.from(currentValues) : undefined;
      }
      return updated;
    });
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setShowFilters(false); 
  };

  const clearFilters = () => {
    setTempFilters({});
    setFilters({});
  };

  return (
    <HeaderLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="p-4 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Discover Wholesale Deals
          </h2>

          <div className="flex justify-end mb-4 md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg shadow-sm"
            >
              <SlidersHorizontal size={18} />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
            <div
              className={`bg-white p-4 rounded-xl shadow-sm border transition-all duration-300 ${showFilters ? "block" : "hidden md:block"
                }`}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Filters</h3>
              {/* CATEGORY */}
              <FilterSection title="Category">
                {[
                  { id: 1, name: "Sarees" },
                  { id: 2, name: "Shirts" },
                  { id: 3, name: "Dhotis" },
                ].map((cat) => (
                  <Checkbox
                    key={cat.id}
                    label={cat.name}
                    checked={tempFilters.category?.includes(cat.id)}
                    onChange={() => handleCheckbox("category", cat.id)}
                  />
                ))}
              </FilterSection>

              {/* FABRIC TYPE */}
              <FilterSection title="Fabric Type">
                {["Cotton", "Silk", "Linen", "Blended", "Kanchipuram", "Net", "Chiffon"].map(
                  (fab, i) => (
                    <Checkbox
                      key={i}
                      label={fab}
                      checked={tempFilters.fabric_type?.includes(fab)}
                      onChange={() => handleCheckbox("fabric_type", fab)}
                    />
                  )
                )}
              </FilterSection>

              {/* PRICE */}
              <FilterSection title="Price">
                <Checkbox
                  label="Under Rs.500"
                  checked={tempFilters.min_price === 0 && tempFilters.max_price === 500}
                  onChange={() => setTempFilters((prev: any) => ({ ...prev, min_price: 0, max_price: 500 }))}
                />
                <Checkbox
                  label="Rs.1,000 - Rs.2,000"
                  checked={tempFilters.min_price === 1000 && tempFilters.max_price === 2000}
                  onChange={() => setTempFilters((prev: any) => ({ ...prev, min_price: 1000, max_price: 2000 }))}
                />
                <Checkbox
                  label="Rs.2,000 - Rs.3,000"
                  checked={tempFilters.min_price === 2000 && tempFilters.max_price === 3000}
                  onChange={() => setTempFilters((prev: any) => ({ ...prev, min_price: 2000, max_price: 3000 }))}
                />
                <Checkbox
                  label="Over Rs.3,000"
                  checked={tempFilters.min_price === 3000}
                  onChange={() => setTempFilters((prev: any) => ({ ...prev, min_price: 3000 }))}
                />
              </FilterSection>

              {/* AVAILABILITY */}
              <FilterSection title="Availability">
                <Checkbox
                  label="In Stock"
                  checked={tempFilters.availability?.includes("in_stock")}
                  onChange={() => handleCheckbox("availability", "in_stock")}
                />
                <Checkbox
                  label="Low Stock"
                  checked={tempFilters.availability?.includes("low_stock")}
                  onChange={() => handleCheckbox("availability", "low_stock")}
                />
              </FilterSection>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  onClick={applyFilters}
                >
                  Apply Filters
                </button>
                <button
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div>
              {loading ? (
                <div className="min-h-screen flex flex-col items-center justify-center">
                  <Spinner />
                  <p className="text-gray-500 text-sm font-medium mt-4"></p>
                </div>
              ) : products.length === 0 ? (
                <div className="min-h-screen flex flex-col items-center justify-center">
                  <p className="text-gray-500 text-sm font-medium">No products found.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-between mt-8">
                    <button
                      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      disabled={!previous}
                    >
                      Previous
                    </button>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                      onClick={() => setPage((prev) => prev + 1)}
                      disabled={!next}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

/* Reusable Checkbox Component */
const Checkbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked?: boolean;
  onChange: () => void;
}) => (
  <label className="flex items-center gap-2 py-1 cursor-pointer">
    <input
      type="checkbox"
      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
      checked={checked || false}
      onChange={onChange}
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

/* Collapsible Filter Section */
const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-4 border-b pb-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full font-medium text-gray-800 mb-2"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="space-y-1">{children}</div>}
    </div>
  );
};

export default ProductList;
