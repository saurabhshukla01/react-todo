import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodosPage from "../pages/TodosPage";
import UsersPage from "../pages/UsersPage";

const AppRoutes = () => {
  return (
    <Router>
      <nav>
        <Link to="/todos">Todos</Link> | <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
