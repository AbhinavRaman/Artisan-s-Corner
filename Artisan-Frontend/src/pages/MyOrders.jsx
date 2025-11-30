import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useDarkMode } from "../context/DarkModeContext";
import { themeClasses } from "../utils/theme";

const API_URL = import.meta.env.VITE_API_URL;

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();
  const { isDarkMode } = useDarkMode();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/orders/my-orders`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Unable to fetch orders`);
      }

      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchOrders();
    }
  }, [user, token]);

  if (!user) {
    return (
      <div className={`container py-10 ${themeClasses.bgPrimary}`}>
        <div className={`text-center text-xl ${themeClasses.textSecondary}`}>
          Please log in to view your orders.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`container py-10 text-center ${themeClasses.bgPrimary}`}>
        <div className={`text-xl font-semibold animate-pulse ${themeClasses.textSecondary}`}>
          Loading your orders...
        </div>
      </div>
    );
  }

  return (
    <div className={`container py-10 ${themeClasses.bgPrimary}`}>
      <div className="mb-8">
        <h1 className={`text-4xl font-bold ${themeClasses.textPrimary}`}>My Orders</h1>
        <div className="h-1 w-16 bg-indigo-600 mt-2 rounded"></div>
      </div>

      {orders.length === 0 ? (
        <div className={`text-center text-xl mt-10 ${themeClasses.textSecondary}`}>
          You haven't placed any orders yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className={`${themeClasses.cardBg} p-6 rounded-lg border ${themeClasses.borderLight} shadow-md`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Order ID</p>
                  <p className={`text-lg font-semibold ${themeClasses.textPrimary}`}>{order._id}</p>
                </div>
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Date</p>
                  <p className={`text-lg font-semibold ${themeClasses.textPrimary}`}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="mb-4 pb-4 border-t border-gray-300 dark:border-gray-600">
                <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mt-4 mb-2`}>Items</h3>
                <div className="space-y-2">
                  {order.items && order.items.map((item) => (
                    <div key={item.productId} className={`flex justify-between text-sm ${themeClasses.textSecondary}`}>
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Subtotal</p>
                  <p className={`text-lg font-semibold ${themeClasses.textPrimary}`}>${order.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Payment</p>
                  <p className={`text-lg font-semibold ${
                    order.isPaid
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {order.isPaid ? "✓ Paid" : "✗ Unpaid"}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Delivery Address</p>
                  <p className={`text-sm font-semibold ${themeClasses.textPrimary}`}>
                    {order.shippingAddress?.city}, {order.shippingAddress?.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
