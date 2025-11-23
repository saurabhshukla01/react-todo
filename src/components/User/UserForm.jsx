import React, { useEffect, useState } from "react";
import { createUser, updateUser, getUserByUUID } from "../../api/userService";

const UserForm = ({ selectedUUID, onClose, refreshList }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Load data for Edit
  useEffect(() => {
    if (selectedUUID) loadUser();
  }, [selectedUUID]);

  const loadUser = async () => {
    try {
      const res = await getUserByUUID(selectedUUID);

      setFormData({
        username: res.data.username,
        email: res.data.email,
        password: "", // never pre-fill password for security
      });
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedUUID) {
        // If password empty while editing → do NOT send it
        const payload = { username: formData.username, email: formData.email };
        if (formData.password.trim() !== "") {
          payload.password = formData.password;
        }

        await updateUser(selectedUUID, payload);
        alert("User updated successfully!");

      } else {
        // Password required when creating a new user
        if (!formData.password) {
          alert("Password is required for new user!");
          return;
        }

        await createUser(formData);
        alert("User added successfully!");
      }

      refreshList();
      onClose();

    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "15%",
        left: "30%",
        width: "40%",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px #444",
        zIndex: 999,
      }}
    >
      <h3>{selectedUUID ? "Edit User" : "Add New User"}</h3>

      <form onSubmit={handleSubmit}>
        
        {/* Username */}
        <div>
          <label>Username:</label><br />
          <input
            type="text"
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            style={{ padding: "8px", width: "100%" }}
          />
        </div>

        {/* Email */}
        <div style={{ marginTop: "10px" }}>
          <label>Email:</label><br />
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            style={{ padding: "8px", width: "100%" }}
          />
        </div>

        {/* Password */}
        <div style={{ marginTop: "10px" }}>
          <label>
            Password:{" "}
            {selectedUUID ? (
              <span style={{ color: "gray" }}>(leave blank to keep same)</span>
            ) : (
              <span style={{ color: "red" }}>*</span>
            )}
          </label>
          <br />
          <input
            type="password"
            placeholder={selectedUUID ? "Enter new password (optional)" : "Enter password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            style={{ padding: "8px", width: "100%" }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px",
            width: "100%",
            background: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {selectedUUID ? "Update User" : "Add User"}
        </button>

        {/* Cancel */}
        <button
          type="button"
          onClick={onClose}
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "100%",
            background: "#6c757d",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;
