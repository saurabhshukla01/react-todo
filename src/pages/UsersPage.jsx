import React from "react";
import UserList from "../components/User/UserList";
import UserForm from "../components/User/UserForm";

const UsersPage = () => {
  const handleUserAdded = () => {
    console.log("User Added");
  };

  return (
    <div>
      <h1>Users Page</h1>
      <UserForm onUserAdded={handleUserAdded} />
      <UserList />
    </div>
  );
};

export default UsersPage;
