import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import BlogDetail from "./components/BlogDetail";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="max-w-4xl mx-auto py-8">
        <nav className="flex gap-4 mb-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
          <Link to="/new" className="text-blue-500 hover:underline">
            Add Blog
          </Link>
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/new" element={<BlogForm />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
