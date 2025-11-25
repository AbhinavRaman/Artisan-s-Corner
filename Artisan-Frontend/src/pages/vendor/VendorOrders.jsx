import { useEffect, useState } from "react";
import api from "../../services/api";

export default function VendorOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const res = await api.get("/orders/vendor-orders");
    setOrders(res.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Vendor Orders</h1>

      {orders.length === 0 && <p>No orders yet.</p>}

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="bg-white shadow p-4 rounded">
            <p className="font-semibold">Order ID: {o._id}</p>
            <p>Total: ₹{o.totalPrice}</p>

            <h4 className="font-semibold mt-2">Items:</h4>
            {o.items
              .filter((item) => item.vendor === undefined || item.vendor)
              .map((item) => (
                <p key={item._id}>
                  - {item.title} (x{item.quantity})
                </p>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
