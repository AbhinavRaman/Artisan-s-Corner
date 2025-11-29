import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await api.get("/admin/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    await api.delete(`/admin/products/${id}`);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="bg-white p-4 shadow rounded">
            <img
              src={p.images?.[0]}
              className="h-40 w-full object-cover rounded"
            />

            <p className="text-xl font-bold">{p.title}</p>
            <p className="text-gray-600">₹{p.price}</p>

            <button
              onClick={() => deleteProduct(p._id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete Product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
