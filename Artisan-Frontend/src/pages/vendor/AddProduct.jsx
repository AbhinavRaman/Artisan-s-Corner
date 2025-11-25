import { useState } from "react";
import api from "../../services/api";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [""]
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: form.images
    };

    try {
      await api.post("/products", payload);
      alert("Product added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-lg">

        <input
          name="title"
          placeholder="Product Title"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="stock"
          placeholder="Stock Quantity"
          type="number"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="images"
          placeholder="Image URL"
          onChange={(e) =>
            setForm({ ...form, images: [e.target.value] })
          }
          className="border p-2 rounded"
        />

        <button className="bg-blue-600 text-white p-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
