// src/features/checkout/hooks/useCheckoutData.ts
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProduct, setAddress, setInvoice, setLoading } from '../store/checkoutSlice';
import { dummyAddress,dummyInvoice,dummyProduct } from '../data/dummyData';
import type { AppDispatch } from '../../../store/type';

export const useCheckoutData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // const [product, setProduct] = useState(null);
    // const [address, setAddress] = useState(null);
    // const [invoice, setInvoice] = useState(null);
    let isCancelled = false; // prevent state updates if unmounted

    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        // const [productRes, addressRes, invoiceRes] = await Promise.all([
          // getProductData(),
          // getAddressData(),
          // getInvoiceData(),
        // ]);
        // setProduct(productRes);
        // setAddress(addressRes);
        // setInvoice(invoiceRes);

        // if (!isCancelled) {
        //   const product = await productRes.json();
        //   const address = await addressRes.json();
        //   const invoice = await invoiceRes.json();

        //   dispatch(setProduct(product));
        //   dispatch(setAddress(address));
        //   dispatch(setInvoice(invoice));
        //}
        dispatch(setProduct(dummyProduct));
        dispatch(setAddress(dummyAddress));
        dispatch(setInvoice(dummyInvoice));
        
      } catch (error) {
        console.error('Error fetching checkout data:', error);
      } finally {
        if (!isCancelled) dispatch(setLoading(false));
      }
    };

    fetchData();

    return () => {
      isCancelled = true; // cleanup if component unmounts
    };
  }, [dispatch]);
};
