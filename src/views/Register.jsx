import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordStrength, setPasswordStrength] = useState(0); // Strength level from 0 to 4
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      checkPasswordStrength();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (formData.password !== formData.confirmPassword) {
      notifyError('Passwords do not match');
      return;
    }
    if (formData.username === '' || formData.email === '' || formData.password === '' || formData.confirmPassword === '') {
      notifyError('Please fill in all the required fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      console.log(response); // Check the response
      notifySuccess('Registration successful!');
      setTimeout(() => {
        navigate('/login'); // Redirect after 3 seconds
      }, 3000);

    } catch (error) {
      if (error.response) {
        notifyError(error.response.data.message || 'Something went wrong. Please try again.');
      } else {
        notifyError('Something went wrong. Please try again later.');
      }
    }
  };

  // Check the strength of the password and set the strength level from 0 to 4 based on the following criteria:
  const checkPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  // Toast notification functions
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

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Create an Account</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm text-gray-600">Show Password</label>
            </div>
            <div className="h-2 bg-gray-300 rounded-md">
              <div className={`h-full rounded-md transition-all ease-in-out duration-300 ${getStrengthColor()}`} style={{ width: `${(passwordStrength / 5) * 100}%` }}></div>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            <a
              href="#"
              onClick={handleLogin}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Login
            </a>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
