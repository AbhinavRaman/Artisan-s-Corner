import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-white shadow-sm rounded-lg p-3 hover:shadow-lg hover:-translate-y-1 transition block"
    >
      <img
        src={product.images?.[0] || "https://via.placeholder.com/300"}
        className="h-48 w-full object-cover rounded-md mb-3"
      />

      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-gray-600 mt-1">{product.category}</p>

      <p className="text-xl font-bold text-blue-600 mt-2">
        ₹{product.price}
      </p>
    </Link>
  );
}
