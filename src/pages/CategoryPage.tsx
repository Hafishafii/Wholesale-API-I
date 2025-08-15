import React, { useState } from "react";
import CategoryList from "../features/admin/category/components/CategoryList";
import CategoryForm from "../features/admin/category/components/CategoryForm";
import AdminLayout from "../components/layouts/AdminLayout";

const CategoryPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = () => setRefresh(!refresh);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
        <div className="w-full max-w-4xl flex flex-col items-center gap-6">
          <CategoryForm onCategoryAdded={handleRefresh} />
          <CategoryList key={String(refresh)} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoryPage;