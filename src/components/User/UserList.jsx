import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../api/userService";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (uuid) => {
    alert(`Edit todo with UUID: ${uuid}`);
    // Implement your edit logic here
  };

  const handleDelete = async (uuid) => {
    try {
      await deleteUser(uuid);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>UUID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.uuid}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.created_at}</td>
              <td>{user.updated_at}</td>
              <td>
                <button onClick={() => handleEdit(user.uuid)} style={{ marginRight: '8px' }}>Edit</button>
                <button onClick={() => handleDelete(user.uuid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;