import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({  email: '', password: '' });
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
    if (formData.email === '' || formData.password === '') {
      setError('Please fill in all the required fields');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/users/login', formData);
      console.log(response);
      notifySuccess('Login successful!');
      setTimeout(() => {
        navigate('/notes');
      }, 3000);
    } catch (error) {
      if (error.response) {
        notifyError(error.response.data.message || 'Something went wrong. Please try again.');
      } else {
        notifyError('Something went wrong. Please try again later.');
      }
    }
  };


  const notifySuccess = (message) => toast.success(
    <div className="flex items-center">
      <span>{message}</span>
    </div>
  );

  const notifyError = (message) => toast.error(
    <div className="flex items-center">
      <span>{message}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
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
            >
              Log In
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
