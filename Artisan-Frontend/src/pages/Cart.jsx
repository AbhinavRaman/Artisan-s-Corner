import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty.</h2>
        <Link to="/" className="text-blue-600 underline">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded shadow flex gap-4">

            <img
              src={item.images?.[0]}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600">₹{item.price}</p>

              {/* Qty Selector */}
              <div className="mt-2">
                <select
                  className="border p-1"
                  value={item.qty}
                  onChange={(e) => updateQty(item._id, Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

            </div>

            <button
              className="text-red-600 font-bold"
              onClick={() => removeFromCart(item._id)}
            >
              X
            </button>

          </div>
        ))}
      </div>

      {/* Total */}
      <div className="text-right mt-6">
        <p className="text-2xl font-bold">Total: ₹{total}</p>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
