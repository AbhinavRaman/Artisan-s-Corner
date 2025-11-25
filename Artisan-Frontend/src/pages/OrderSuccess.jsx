import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        Order Placed Successfully!
      </h1>
      <Link to="/" className="text-blue-600 underline">Back to Home</Link>
    </div>
  );
}
