import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password }
      );

      const token = response.data.token;
      localStorage.setItem("adminToken", token);

      console.log("✅ JWT Token:", token);

      setError("");

      // ✅ Use passed-in function OR fallback to redirect
      if (typeof onLoginSuccess === "function") {
        onLoginSuccess();
      } else {
        navigate("/admin"); // fallback redirect
      }
    } catch (err) {
      console.error("❌ Login failed:", err);
      setError("Invalid credentials or server error");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        className="w-full mb-3 p-2 border rounded"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-3 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
        onClick={handleLogin}
      >
        Login
      </button>
      {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default AdminLogin;
