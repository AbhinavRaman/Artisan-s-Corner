import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const res = await api.get("/admin/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Orders</h1>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="p-4 bg-white shadow rounded">
            <p className="font-semibold">Order ID: {o._id}</p>
            <p>Total: ₹{o.totalPrice}</p>

            <h4 className="font-semibold mt-2">Items:</h4>
            {o.items.map((i) => (
              <p key={i._id}>
                - {i.title} (x{i.quantity})
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
