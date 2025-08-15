import React, { useState } from "react";
import { createCategory } from "../api/categoryApi";

interface Props {
  onCategoryAdded: () => void;
}

const CategoryForm: React.FC<Props> = ({ onCategoryAdded }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !image) return alert("All fields are required");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    await createCategory(formData);
    setName("");
    setImage(null);
    onCategoryAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4 space-y-3 w-full max-w-md">
      <h2 className="text-xl font-semibold">Add Category</h2>
      <input
        type="text"
        placeholder="Category Name"
        className="w-full border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="w-full"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
};

export default CategoryForm;
