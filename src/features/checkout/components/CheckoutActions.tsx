// src/components/checkout/CheckoutActions.tsx
import React from "react";

const CheckoutActions: React.FC = () => {
  return (
    <div className="mt-6">
      <button className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition">
        Pay Now
      </button>
    </div>
  );
};

export default CheckoutActions;
