import React, { useState } from "react";
import HttpClient from "../../httpClient.tsx";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await HttpClient.post("auth/login/", {
        email,
        password,
      });

      if (response) {
        setSuccessMessage("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during login");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Admin Login
        </h2>

        {errorMessage && (
          <p className="mb-4 text-center text-red-500">{errorMessage}</p>
        )}

        {successMessage && (
          <p className="mb-4 text-center text-green-500">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-2 block font-semibold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="mb-2 block font-semibold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 text-white transition duration-300 hover:bg-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
