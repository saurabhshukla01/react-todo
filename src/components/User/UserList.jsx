import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, getUserByUUID } from "../../api/userService";
import UserForm from "./UserForm";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedUUID, setSelectedUUID] = useState(null);
  const [viewUser, setViewUser] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

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

  // VIEW USER
  const handleView = async (uuid) => {
    try {
      const res = await getUserByUUID(uuid);
      setViewUser(res.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // SHOW TODOS
  const handleShowTodos = (uuid) => {
    alert("Show all todos for user: " + uuid);
  };

  // ADD FORM
  const openAddForm = () => {
    setSelectedUUID(null);
    setShowForm(true);
  };

  // EDIT FORM
  const openEditForm = (uuid) => {
    setSelectedUUID(uuid);
    setShowForm(true);
  };

  // DELETE USER
  const handleDelete = async (uuid) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(uuid);
      fetchUsers(); // refresh after delete
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // SEARCH FILTER
  const filteredUsers = users.filter((u) =>
    `${u.username} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // PAGINATION
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div>
      <h2>User List</h2>

      <button onClick={openAddForm} style={{ marginBottom: "15px" }}>
        Add New User
      </button>

      <input
        type="text"
        placeholder="Search username or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginLeft: "20px", padding: "8px", width: "300px" }}
      />

      {/* FORM POPUP */}
      {showForm && (
        <UserForm
          selectedUUID={selectedUUID}
          onClose={() => setShowForm(false)}
          refreshList={fetchUsers}
        />
      )}

      {/* VIEW POPUP */}
      {viewUser && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "30%",
            width: "40%",
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px #555",
            zIndex: 999,
          }}
        >
          <h3>User Details</h3>
          <p><strong>UUID:</strong> {viewUser.uuid}</p>
          <p><strong>Username:</strong> {viewUser.username}</p>
          <p><strong>Email:</strong> {viewUser.email}</p>
          <p><strong>Created:</strong> {viewUser.created_at}</p>
          <p><strong>Updated:</strong> {viewUser.updated_at}</p>

          <button onClick={() => setViewUser(null)}>Close</button>
        </div>
      )}

      {/* TABLE */}
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>UUID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Created</th>
            <th>Updated</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.uuid}>
              <td>{user.uuid}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.created_at}</td>
              <td>{user.updated_at}</td>
              <td style={{ textAlign: "center" }}>
                <button onClick={() => handleView(user.uuid)}>👁</button>
                <button onClick={() => openEditForm(user.uuid)}>✏</button>
                <button onClick={() => handleDelete(user.uuid)}>❌</button>
                <button onClick={() => handleShowTodos(user.uuid)}>📋</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: "5px",
              padding: "6px 12px",
              background: currentPage === i + 1 ? "#007bff" : "#eee",
              color: currentPage === i + 1 ? "#fff" : "#000",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
