import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from "../server";

const ForgotPasswordShop = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/shop/forgot-password-shop`, { email });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Forgot Password for Shop</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            placeholder="Enter your shop email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md mt-4"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordShop;
