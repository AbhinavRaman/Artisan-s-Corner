import { Link } from "react-router-dom";

export default function VendorLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-6">
        <h2 className="text-xl font-bold mb-6">Vendor Dashboard</h2>

        <nav className="flex flex-col gap-4 text-gray-700">
          <Link to="/vendor/dashboard">Overview</Link>
          <Link to="/vendor/add-product">Add Product</Link>
          <Link to="/vendor/products">My Products</Link>
          <Link to="/vendor/orders">Orders</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
