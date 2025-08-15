import { useState, useEffect, useCallback } from "react";
import { useAdminProducts, ProductGrid } from "../../features/admin/Product";
import AdminLayout from "../../components/layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

const SkeletonBox = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-300 rounded animate-pulse ${className}`}></div>
);

const Spinner = () => (
  <div className="flex justify-center items-center h-64">
    <svg
      className="animate-spin h-8 w-8 text-blue-600"
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
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  </div>
);

const ProductListPage = () => {
  const [filter, setFilter] = useState<"ALL" | "LOW" | "HIGH" | "RECENT">("ALL");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { products, loading, total, loadMore, hasMore } = useAdminProducts({ filter, search });

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return; // Guard here too

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - 200;

    if (scrollPosition >= threshold) {
      loadMore();
    }
  }, [loading, hasMore, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <AdminLayout>
      <div className="p-6 bg-white min-h-screen">
        {/* Search & Filter UI */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 border rounded-md px-4 py-2"
          />
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border rounded-md px-3 py-2"
            >
              <option value="ALL">All Products</option>
              <option value="LOW">Low Stock (&lt; 50)</option>
              <option value="HIGH">High Stock (≥ 100)</option>
              <option value="RECENT">Recently Added</option>
            </select>
            <Button
              onClick={() => navigate("/admin/add-product")}
              className="whitespace-nowrap"
            >
              + Add Product
            </Button>
          </div>
        </div>

        {loading && products.length === 0 ? (
          <Spinner />
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Manage Products (
              {loading && products.length === 0 ? (
                <SkeletonBox className="inline-block w-12 h-6" />
              ) : (
                total
              )}
              )
            </h2>

            {products.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No products found</p>
                <Button onClick={() => navigate("/admin/add-product")} className="mt-4">
                  Add Your First Product
                </Button>
              </div>
            ) : (
              <>
                <ProductGrid products={products} />

                {loading && products.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border rounded p-4 space-y-4">
                        <SkeletonBox className="w-full h-40 rounded" />
                        <SkeletonBox className="w-3/4 h-6 rounded" />
                        <SkeletonBox className="w-1/2 h-6 rounded" />
                      </div>
                    ))}
                  </div>
                )}

                {!hasMore && (
                  <p className="text-center text-gray-500 mt-6">No more products</p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProductListPage;
