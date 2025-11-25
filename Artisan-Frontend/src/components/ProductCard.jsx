import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white shadow rounded p-4 hover:shadow-lg transition cursor-pointer">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/300"}
          alt={product.title}
          className="w-full h-48 object-cover rounded mb-3"
        />

        <h3 className="text-lg font-semibold">{product.title}</h3>

        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description || "No description"}
        </p>

        <p className="text-xl font-bold mt-2">₹{product.price}</p>

        <p className="text-sm text-gray-500 mt-1">
          Sold by: {product.vendor?.shop?.name || product.vendor?.name}
        </p>
      </div>
    </Link>
  );
}
