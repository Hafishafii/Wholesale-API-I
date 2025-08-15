import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  // Optional: Redirect to home after delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 15000); // Redirect after 15 seconds

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <div className="flex justify-center">
          <svg
            className="w-16 h-16 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mt-4 text-blue-700">Payment Successful!</h2>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Back to Home
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-4">You’ll be redirected shortly...</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
