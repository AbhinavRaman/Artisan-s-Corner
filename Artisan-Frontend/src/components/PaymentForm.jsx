import { useState } from "react";
import api from "../services/api";
import { themeClasses } from "../utils/theme";

// PaymentForm now uses Razorpay Checkout. It expects props:
// amount (number, rupees), items (cart), shippingAddress (object), onSuccess(callback)
export default function PaymentForm({ amount, items, shippingAddress, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpay = async () => {
    setError("");
    if (!items || items.length === 0) {
      setError("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      const amountPaise = Math.round(amount * 100);

      // Create order on backend
      const res = await api.post(`/orders/create-razorpay-order`, { amount: amountPaise });
      if (!res.data || !res.data.order) throw new Error("Failed to create razorpay order");

      const order = res.data.order;

      const key = import.meta.env.VITE_RAZORPAY_KEY_ID;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Artisan's Corner",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment and create app order
            const verifyRes = await api.post(`/orders/verify-payment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              items,
              shippingAddress,
            });

            if (verifyRes.data && verifyRes.data.success) {
              onSuccess && onSuccess(verifyRes.data.order);
            } else {
              setError(verifyRes.data?.message || "Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || "Verification error");
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error("Razorpay SDK failed to load. Check your connection.");

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <button
        onClick={handleRazorpay}
        disabled={loading}
        className={`${loading ? "opacity-50 cursor-not-allowed" : ""} ${themeClasses.buttonPrimary} w-full mt-6`}
      >
        {loading ? "Opening Checkout..." : `Pay ₹${amount.toFixed(2)}`}
      </button>

      <p className={`text-xs ${themeClasses.textTertiary} text-center mt-4`}>
        Payments powered by Razorpay. Use test mode keys for sandbox.
      </p>
    </div>
  );
}
