import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  // Toast notification functions
  const notifySuccess = (message) => toast.success(
    <div className="flex items-center">
      <FaCheckCircle className="text-green-500 mr-2" />
      <span>{message}</span>
    </div>
  );

  const notifyError = (message) => toast.error(
    <div className="flex items-center">
      <FaExclamationCircle className="text-red-500 mr-2" />
      <span>{message}</span>
    </div>
  );

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/users/reset-password', { email });
      console.log(response.data); // Check the response
      notifySuccess('Password reset email sent!');
      setEmail(''); // Clear the email input after successful submission
    } catch (error) {
      if (error.response) {
        notifyError(error.response.data.message || 'Something went wrong. Please try again.');
      } else {
        notifyError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Reset Password</h2>
        <form onSubmit={handleReset}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send Reset Email
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
