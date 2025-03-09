import React, { useState } from "react";
import { FaEnvelope, FaLock, FaWindowClose } from "react-icons/fa";

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 bg-black bg-opacity-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
      <div className="flex justify-center items-center w-12 h-12 bg-gray-100 rounded-full mx-auto mb-4">
          <FaLock className="text-gray-600 text-xl" />
        </div>
        <h2 className="text-lg font-semibold">Sign in with email</h2>
        <p className="text-gray-500 text-sm mb-6">
          Make a new doc to bring your words, data, and teams together. For free
        </p>
        <div className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-right text-sm text-blue-500 cursor-pointer">
            Forgot password?
          </div>

          <button className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition">
            Get Started
          </button>
        </div>
        
        <button
          className="mt-3 flex items-center justify-center w-full text-gray-500 hover:underline"
          onClick={onClose}
        >
          <FaWindowClose />
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
