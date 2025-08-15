import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading, setProducts } from '../store/bestSaleSlice';
import { dummyBestSaleData } from '../data/dummyProducts';
import type { AppDispatch } from '../../../store/type';

export const useBestSaleData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setLoading(true));
    const timeout = setTimeout(() => {
      dispatch(setProducts(dummyBestSaleData));
      dispatch(setLoading(false));
    }, 1000); // simulate loading delay

    return () => clearTimeout(timeout);
  }, [dispatch]);
};
