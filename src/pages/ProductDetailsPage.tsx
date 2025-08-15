import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../features/productlist/components/ProductDetails";
import HeaderLayout from "../components/layouts/HeaderLayout";
import { type Product } from "../features/productlist/types/Products";
import api from "../lib/api"; 
import Spinner from "../components/common/Spinner"


const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}/`);
        setProduct(res.data);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <HeaderLayout>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-16">
          <Spinner /> 
          <p className="text-gray-500 text-sm font-medium select-none mt-4">

          </p>
        </div>
      </HeaderLayout>
    );
  }

  if (!product) {
    return (
      <HeaderLayout>
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
          <p className="text-gray-500">Product not found</p>
        </div>
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-8">
          <ProductDetails product={product} />
        </div>
      </div>
    </HeaderLayout>
  );
};

export default ProductDetailsPage;
