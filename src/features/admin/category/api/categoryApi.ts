import api from "../../../../lib/api";


export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

export const createCategory = async (formData: FormData) => {
  return api.post("/categories/create/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCategory = async (id: string, name: string) => {
  return api.put(`/categories/${id}/update/`, { name });
};

export const deleteCategory = async (id: string) => {
  return api.delete(`/categories/${id}/delete/`);
};
