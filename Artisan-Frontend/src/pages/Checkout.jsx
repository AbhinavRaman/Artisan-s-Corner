import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

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
    try {
      const items = cart.map((item) => ({
        product: item._id,
        quantity: item.qty,
      }));

      const res = await api.post("/orders", {
        items,
        shippingAddress: address
      });

      clearCart();
      navigate("/order-success");
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

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
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
}
