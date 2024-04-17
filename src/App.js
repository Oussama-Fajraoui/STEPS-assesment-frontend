import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import BlogDetail from './components/BlogDetail';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem('token'));
  }, []);

  const handleLoginSuccess = () => {
    setIsAuth(true);
  };

  return (
    <Router>
      <div className="max-w-4xl mx-auto py-8">
        <nav className="flex gap-4 mb-4 justify-center">
          {isAuth ? (
            <>
              <Link to="/" className="text-blue-500 hover:underline">Home</Link>
              <Link to="/new" className="text-blue-500 hover:underline">Add Blog</Link>
              <Link to="/logout" className="text-blue-500 hover:underline">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
              <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={isAuth ? <BlogList /> : <Navigate to="/login" replace />} />
          <Route path="/new" element={<BlogForm />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
