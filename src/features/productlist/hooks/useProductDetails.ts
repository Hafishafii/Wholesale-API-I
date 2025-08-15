import { useParams } from "react-router-dom";
import { dummyProducts } from "../../../data/product";
import { useMemo } from "react";

export const useProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  const product = useMemo(() => dummyProducts.find((p:any) => p.id === id), [id]);

  return { product };
};
