//import React from 'react';
import { useSelector } from "react-redux";
import { AddressSection } from "./components/AddressSection";
import { ProductSection } from "./components/ProductSection";
import { InvoiceSection } from "./components/InvoiceSection";
import { useSkeletonLoader } from "../../hooks/useSkeletonLoader";
import { AddressSkeleton } from "./components/skeletons/AddressSkeleton";
import { ProductSkeleton } from "./components/skeletons/ProductSkeleton";
import { InvoiceSkeleton } from "./components/skeletons/InvoiceSkeleton";
import { useCheckoutData } from "./hooks/useCheckoutData";
import { handleRazorpayPayment } from "../payment/utils/handleRazorPayment";
import type { RootState } from "../../store/type";

const CheckoutPage = () => {
  useCheckoutData();
  const { product, address, invoice, loading } = useSelector(
    (state: RootState) => state.checkout
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-10 md:py-10">
      <div className="max-w-4xl mx-auto bg-blue-500 rounded-lg shadow-md p-4 space-y-6">
        <div className='className="max-w-md w-full mx-auto"'>
          <h1 className="text-center text-2xl font-bold mb-4">Checkout</h1>
        </div>
        <div className="mx-auto bg-white rounded-lg shadow-md p-4 space-y-6">
          {/* Product Section */}
          {useSkeletonLoader(
            loading,
            <ProductSkeleton />,
            product ? <ProductSection product={product} /> : null
          )}
        </div>
        <div className="mx-auto bg-white rounded-lg shadow-md p-4 space-y-6">
          {/* Address Section */}
          {useSkeletonLoader(
            loading,
            <AddressSkeleton />,
            address ? <AddressSection address={address} /> : null
          )}
        </div>
        <div className="mx-auto bg-white rounded-lg shadow-md p-4 space-y-6">
          {/* Invoice Section */}
          {useSkeletonLoader(
            loading,
            <InvoiceSkeleton />,
            invoice ? <InvoiceSection invoice={invoice} /> : null
          )}
        </div>

        {/* Pay Now Button */}
        {!loading && (
          <div className="text-center">
            <button
              className="w-full md:w-auto bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-md transition"
              onClick={() =>
                handleRazorpayPayment({
                  amount: product?.price || 500,
                  description: product?.name,
                  isTestMode: true,
                  onSuccess: () => alert("✅ Payment Success"),
                  onFailure: () => alert("❌ Payment Cancelled or Failed"),
                })
              }
            >
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
