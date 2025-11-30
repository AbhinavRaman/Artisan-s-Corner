import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/productAPI";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const { user } = useAuth();

  // Review form controls
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadProduct = async () => {
    try {
      const data = await fetchProductById(id);
      setProduct(data);
    } catch {
      console.error("Product fetch error");
    }
  };

  const loadReviews = async () => {
    try {
      const res = await api.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch {
      console.error("Review load error");
    }
  };

  const submitReview = async () => {
    if (!user) {
      return alert("Please login to leave a review.");
    }

    try {
      setSubmitting(true);
      await api.post(`/reviews/${id}`, { rating, comment });
      await loadReviews();
      setRating(5);
      setComment("");
      alert("Review submitted!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    Promise.all([loadProduct(), loadReviews()]).finally(() =>
      setLoading(false)
    );
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold animate-pulse">
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
    <div className="max-w-5xl mx-auto p-4">

      {/* Main product section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 bg-white shadow rounded-lg">
        
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300"}
          alt={product.title}
          className="w-full rounded-md shadow"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>

          <p className="text-gray-700 mb-4 text-lg">{product.description}</p>

          <p className="text-3xl font-bold text-blue-600 mb-4">
            ₹{product.price}
          </p>

          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Stock:</span> {product.stock}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="px-5 py-2 bg-blue-600 text-white rounded shadow hover:opacity-90 active:scale-95 transition"
          >
            Add to Cart
          </button>

          {/* Vendor Info */}
          <div className="mt-6 bg-gray-50 p-4 rounded border">
            <h3 className="font-bold">Sold by:</h3>
            <p>{product.vendor?.shop?.name || product.vendor?.name}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 bg-white shadow p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="border rounded p-4 shadow-sm hover:shadow transition"
              >
                <p className="font-semibold">{rev.user?.name}</p>
                <p className="text-yellow-500 font-bold">
                  ⭐ {rev.rating}/5
                </p>
                <p className="text-gray-700">{rev.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Review Form */}
        {user && user.role === "customer" && (
          <div className="mt-8 bg-gray-50 p-4 rounded border">
            <h3 className="font-bold text-xl mb-2">Write a Review</h3>

            <div className="grid gap-3">
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border p-2 rounded"
              >
                {[1,2,3,4,5].map((n) => (
                  <option key={n} value={n}>
                    {n} Star{n > 1 && "s"}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border p-2 rounded"
              />

              <button
                onClick={submitReview}
                disabled={submitting}
                className="px-4 py-2 bg-green-600 text-white rounded shadow hover:opacity-90 active:scale-95 disabled:opacity-50 transition"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
