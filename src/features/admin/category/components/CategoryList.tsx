import React, { useState, useEffect } from "react";
import type { Category } from "../types/category";
import { getCategories, deleteCategory, updateCategory } from "../api/categoryApi";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure to delete this category?")) {
      await deleteCategory(id);
      fetchCategories();
    }
  };

  const handleEdit = async (id: string) => {
    await updateCategory(id, editName);
    setEditId(null);
    fetchCategories();
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-3">Category List</h2>
      {categories.map((cat) => (
        <div key={cat.id} className="flex items-center justify-between border-b py-2">
          <div className="flex items-center gap-4">
            <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover rounded" />
            {editId === cat.id ? (
              <input
                className="border p-1 rounded"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            ) : (
              <span>{cat.name}</span>
            )}
          </div>
          <div className="flex gap-2">
            {editId === cat.id ? (
              <button className="text-green-600" onClick={() => handleEdit(cat.id)}>
                Save
              </button>
            ) : (
              <button
                className="text-blue-600"
                onClick={() => {
                  setEditId(cat.id);
                  setEditName(cat.name);
                }}
              >
                Edit
              </button>
            )}
            <button className="text-red-600" onClick={() => handleDelete(cat.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
