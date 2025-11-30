import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";
import { themeClasses } from "../utils/theme";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const [address, setAddress] = useState({
    name: user?.name || "",
    address: "",
    city: "",
    postalCode: "",
    country: "India"
  });

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    setError("");
  };

  const handlePaymentSuccess = (order) => {
    // Called after Razorpay payment verification and order creation on backend
    clearCart();
    navigate("/order-success");
  };

  if (cart.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h2 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>Your cart is empty</h2>
        <p className={`${themeClasses.textSecondary} mt-2`}>Add items before checkout</p>
        <button
          onClick={() => navigate("/")}
          className={`${themeClasses.buttonPrimary} mt-4`}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className={`text-4xl font-bold mb-8 ${themeClasses.textPrimary}`}>Checkout</h1>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <div className={themeClasses.card}>
            <h2 className={`text-2xl font-bold mb-6 ${themeClasses.textPrimary}`}>Shipping Address</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Full Name"
                value={address.name}
                onChange={handleAddressChange}
                className={themeClasses.input}
              />
              <input
                name="country"
                placeholder="Country"
                value={address.country}
                onChange={handleAddressChange}
                className={themeClasses.input}
                disabled
              />
              <input
                name="address"
                placeholder="Street Address"
                value={address.address}
                onChange={handleAddressChange}
                className={`${themeClasses.input} md:col-span-2`}
              />
              <input
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleAddressChange}
                className={themeClasses.input}
              />
              <input
                name="postalCode"
                placeholder="Postal Code"
                value={address.postalCode}
                onChange={handleAddressChange}
                className={themeClasses.input}
              />
            </div>
          </div>

          {/* Payment Details */}
          <div className={themeClasses.card}>
            <PaymentForm
              amount={totalAmount}
              items={cart}
              shippingAddress={address}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className={`${themeClasses.card} h-fit sticky top-20`}>
          <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>Order Summary</h2>

          <div className={`space-y-3 max-h-96 overflow-y-auto mb-4 pb-4 border-b ${themeClasses.borderLight}`}>
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between">
                <div>
                  <p className={`font-semibold ${themeClasses.textPrimary}`}>{item.title}</p>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Qty: {item.qty}</p>
                </div>
                <p className={`font-semibold ${themeClasses.textPrimary}`}>₹{(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className={themeClasses.textSecondary}>Subtotal:</span>
              <span className={themeClasses.textPrimary}>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className={themeClasses.textSecondary}>Shipping:</span>
              <span className={`text-green-600 dark:text-green-400 font-semibold`}>Free</span>
            </div>
            <div className="flex justify-between">
              <span className={themeClasses.textSecondary}>Tax:</span>
              <span className={themeClasses.textPrimary}>₹0.00</span>
            </div>
          </div>

          <div className={`border-t ${themeClasses.borderLight} pt-4 flex justify-between`}>
            <span className={`text-lg font-bold ${themeClasses.textPrimary}`}>Total:</span>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
