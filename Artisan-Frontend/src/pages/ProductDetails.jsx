import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/productAPI";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const loadProduct = async () => {
    try {
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      console.error("Product fetch error:", err);
    }
  };

  const loadReviews = async () => {
    try {
      const res = await api.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Review load error:", err);
    }
  };

  useEffect(() => {
    Promise.all([loadProduct(), loadReviews()]).finally(() => {
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Product Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Image */}
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300"}
          alt={product.title}
          className="w-full rounded shadow"
        />

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

          <p className="text-gray-600 text-lg mb-4">
            {product.description}
          </p>

          <p className="text-3xl font-bold text-blue-600 mb-4">
            ₹{product.price}
          </p>

          <p className="text-gray-700 mb-4">
            Stock: {product.stock}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>

          {/* Vendor Info */}
          <div className="p-4 bg-gray-100 rounded mt-6">
            <h3 className="font-bold mb-1">Sold by:</h3>
            <p>{product.vendor?.shop?.name || product.vendor?.name}</p>
          </div>
        </div>

      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-3">Reviews</h2>

        {reviews.length === 0 && (
          <p className="text-gray-600">No reviews yet.</p>
        )}

        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev._id} className="p-4 bg-white shadow rounded">
              <p className="font-semibold">{rev.user?.name}</p>
              <p className="text-yellow-500">⭐ {rev.rating}/5</p>
              <p className="text-gray-700">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
