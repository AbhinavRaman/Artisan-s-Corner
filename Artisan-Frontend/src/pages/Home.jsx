import { useEffect, useState } from "react";
import { fetchAllProducts } from "../services/productAPI";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Loading products...
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        No products available.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
