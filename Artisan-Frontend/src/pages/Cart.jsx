import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { themeClasses } from "../utils/theme";

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className={`text-center mt-16 py-16 ${themeClasses.bgSecondary} rounded-lg container`}>
        <h2 className={`text-3xl font-bold mb-6 ${themeClasses.textPrimary}`}>Your cart is empty.</h2>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline text-lg font-semibold">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className={`text-4xl font-bold mb-8 ${themeClasses.textmuted}`}>Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item._id} className={`${themeClasses.card} flex gap-4`}>
              <img
                src={item.images?.[0] || "https://via.placeholder.com/100"}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className={`text-xl font-semibold ${themeClasses.textPrimary}`}>{item.title}</h2>
                <p className={`${themeClasses.textSecondary} text-lg font-medium mt-1`}>₹{item.price}</p>

                <div className="flex items-center gap-3 mt-3">
                  <label className={themeClasses.textSecondary} htmlFor={`qty-${item._id}`}>
                    Qty:
                  </label>
                  <select
                    id={`qty-${item._id}`}
                    className={`${themeClasses.input} w-16`}
                    value={item.qty}
                    onChange={(e) => updateQty(item._id, Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className={`${themeClasses.buttonDanger} px-3 py-2 h-fit`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className={`${themeClasses.card} h-fit sticky top-20`}>
          <h2 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>Order Summary</h2>

          <div className={`border-t border-b ${themeClasses.borderLight} py-4 mb-4`}>
            <div className="flex justify-between mb-2">
              <span className={themeClasses.textSecondary}>Subtotal:</span>
              <span className={themeClasses.textPrimary}>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className={themeClasses.textSecondary}>Shipping:</span>
              <span className={themeClasses.textSecondary}>Free</span>
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <span className={`text-lg font-bold ${themeClasses.textPrimary}`}>Total:</span>
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className={`${themeClasses.buttonPrimary} w-full`}
          >
            Proceed to Checkout
          </button>

          <Link
            to="/"
            className={`${themeClasses.buttonSecondary} w-full block text-center mt-3`}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
