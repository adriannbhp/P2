import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${server}/user/reset-password/${token}`, {
        newPassword,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-6">Reset Password</h2>
      <form onSubmit={handleResetPassword} className="w-full max-w-md space-y-4">
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
