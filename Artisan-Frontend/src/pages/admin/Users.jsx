import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  const promoteToAdmin = async (id) => {
    await api.put(`/admin/users/${id}/make-admin`);
    loadUsers();
  };

  const deleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Users</h1>

      <div className="space-y-4">
        {users.map((u) => (
          <div key={u._id} className="p-4 bg-white shadow rounded flex justify-between">
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-gray-600">{u.email}</p>
              <p className="text-sm">{u.role}</p>
            </div>

            <div className="flex gap-2">
              {u.role !== "admin" && (
                <button
                  onClick={() => promoteToAdmin(u._id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Make Admin
                </button>
              )}

              <button
                onClick={() => deleteUser(u._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
