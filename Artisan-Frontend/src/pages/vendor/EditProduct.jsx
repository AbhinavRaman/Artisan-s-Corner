import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [""],
  });

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      const p = res.data;

      setForm({
        title: p.title,
        description: p.description,
        price: p.price,
        stock: p.stock,
        category: p.category,
        images: p.images || [""],
      });

      setLoading(false);
    } catch {
      alert("Failed to load product");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/products/${id}`, form);
      alert("Product updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update product");
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  if (loading) return <p className="mt-8 text-center">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>

      <form
        onSubmit={updateProduct}
        className="grid grid-cols-1 gap-4 bg-white p-6 rounded shadow"
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="images"
          placeholder="Image URL"
          value={form.images[0]}
          onChange={(e) => setForm({ ...form, images: [e.target.value] })}
          className="border p-2 rounded"
        />

        <button className="bg-green-600 text-white p-2 rounded shadow hover:opacity-90 active:scale-95 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}
