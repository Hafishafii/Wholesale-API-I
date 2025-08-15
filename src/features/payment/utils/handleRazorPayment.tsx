import { loadRazorpayScript } from "../apis/razorpayService";

interface RazorpayOptions {
  amount: number;
  currency?: string;
  name?: string;
  description?: string;
  image?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess?: (response: any) => void;
  onFailure?: (err: any) => void;
  isTestMode?: boolean;
}

export const handleRazorpayPayment = async ({
  amount,
  currency = "INR",
  name = "Zecser Store",
  description = "Checkout Payment",
  image = "https://yourcdn.com/logo.png",
  prefill,
  onSuccess,
  onFailure,
  isTestMode = true,
}: RazorpayOptions) => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    alert("Razorpay SDK failed to load.");
    return;
  }

  const key = isTestMode ? process.env.RAZORPAY_TEST_KEY : process.env.RAZORPAY_LIVE_KEY; // 🔁 Replace with actual key

  const options = {
    key,
    amount: amount * 100, // amount in paise
    currency,
    name,
    description,
    image,
    handler: function (response: any) {
      onSuccess?.(response);
      window.location.href = "/payment-success";
    },
    prefill: {
      name: prefill?.name || "John Doe",
      email: prefill?.email || "john@example.com",
      contact: prefill?.contact || "9999999999",
    },
    theme: {
      color: "#3B82F6",
    },
    modal: {
      ondismiss: function () {
        onFailure?.("Payment cancelled.");
      },
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};
