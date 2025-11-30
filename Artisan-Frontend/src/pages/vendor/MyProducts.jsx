import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

export default function MyProducts() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await api.get("/products/vendor/my-products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete the product?")) return;

    await api.delete(`/products/${id}`);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">My Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white p-4 shadow-sm rounded-lg hover:shadow-lg transition"
          >
            <img
              src={p.images?.[0] || "https://via.placeholder.com/150"}
              className="h-40 w-full object-cover rounded-md"
            />

            <h3 className="text-xl font-semibold mt-2">{p.title}</h3>
            <p className="text-gray-600">₹{p.price}</p>

            <div className="flex gap-3 mt-3">
              <Link
                to={`/vendor/edit-product/${p._id}`}
                className="px-3 py-1 bg-blue-600 text-white rounded shadow hover:opacity-90 transition"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteProduct(p._id)}
                className="px-3 py-1 bg-red-600 text-white rounded shadow hover:opacity-90 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}