import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    vendors: 0,
    products: 0,
    orders: 0,
  });

  const loadStats = async () => {
    const [users, vendors, products, orders] = await Promise.all([
      api.get("/admin/users"),
      api.get("/admin/vendors"),
      api.get("/admin/products"),
      api.get("/admin/orders"),
    ]);

    setStats({
      users: users.data.length,
      vendors: vendors.data.length,
      products: products.data.length,
      orders: orders.data.length,
    });
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard label="Users" value={stats.users} />
        <StatCard label="Vendors" value={stats.vendors} />
        <StatCard label="Products" value={stats.products} />
        <StatCard label="Orders" value={stats.orders} />
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-6 shadow rounded text-center">
      <p className="text-xl font-semibold">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
