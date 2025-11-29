import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);

  const loadVendors = async () => {
    const res = await api.get("/admin/vendors");
    setVendors(res.data);
  };

  const deleteVendor = async (id) => {
    await api.delete(`/admin/vendors/${id}`);
    loadVendors();
  };

  useEffect(() => {
    loadVendors();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Vendors</h1>

      <div className="space-y-4">
        {vendors.map((v) => (
          <div key={v._id} className="p-4 bg-white shadow rounded flex justify-between">
            <div>
              <p className="font-semibold">{v.name}</p>
              <p className="text-gray-600">{v.email}</p>
              <p className="text-sm">Shop: {v.shop?.name}</p>
            </div>

            <button
              onClick={() => deleteVendor(v._id)}
              className="px-3 py-1 bg-red-600 text-white rounded"
            >
              Delete Vendor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
