import { useEffect, useState } from "react";
import { fetchAllProducts } from "../services/productAPI";
import ProductCard from "../components/ProductCard";
import { themeClasses } from "../utils/theme";
import { useDarkMode } from "../context/DarkModeContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useDarkMode();

  const loadProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch {
      console.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className={`text-center mt-10 text-xl font-semibold animate-pulse ${themeClasses.textSecondary}`}>
        Loading products...
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className={` text-4xl font-bold ${themeClasses.textmuted}`}>Featured Products</h1>
        <div className="h-1 w-16 bg-indigo-600 mt-2 rounded"></div>
      </div>

      {products.length === 0 ? (
        <div className={`text-center text-xl mt-10 ${themeClasses.textSecondary}`}>No products available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
