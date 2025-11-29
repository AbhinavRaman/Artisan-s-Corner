import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!user) {
      alert("Please login to place order");
      return navigate("/login");
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const items = cart.map((item) => ({
        product: item._id,
        quantity: item.qty,
      }));

      await api.post("/orders", {
        items,
        shippingAddress: address,
        totalPrice: totalAmount,
      });

      clearCart();
      navigate("/order-success");

    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* Address Form */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Shipping Address</h1>

        <div className="grid gap-3">
          {["name", "address", "city", "postalCode", "country"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              value={address[field]}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          ))}
        </div>

        <button
          onClick={placeOrder}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Place Order
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-2xl font-bold mb-3">Order Summary</h2>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-gray-600 text-sm">
                  Qty: {item.qty}
                </p>
              </div>
              <p className="font-semibold">
                ₹{item.price * item.qty}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xl font-bold mt-4">
          Total: ₹{totalAmount}
        </p>
      </div>

    </div>
  );
}
