import { useState, useEffect } from "react";
import api from "../../services/api";

export default function MyProducts() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await api.get("/products/vendor/my-products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="bg-white p-4 shadow rounded">
            <img
              src={p.images?.[0] || "https://via.placeholder.com/150"}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{p.title}</h3>
            <p className="text-gray-600">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
