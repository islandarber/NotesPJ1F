import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate('/reset-password');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData, setLoading, setError);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 text-white p-2 rounded mb-4">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
            <a
              href="#"
              onClick={handleForgotPassword}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </a>
            <a
              href="#"
              onClick={handleRegister}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Register
            </a>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
