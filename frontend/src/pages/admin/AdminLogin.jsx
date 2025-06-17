import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative">
        {/* Main login card */}
        <div className="bg-gradient-to-b from-amber-50 to-orange-50 p-8 rounded-lg shadow-2xl border-2 border-amber-200/50 backdrop-blur-sm max-w-md w-full mx-auto">
          {/* Decorative header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-amber-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2
              className="text-2xl font-bold text-amber-900 mb-2"
              style={{ fontFamily: "serif" }}
            >
              Administrative Portal
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto"></div>
          </div>

          {/* Form fields */}
          <div className="space-y-6">
            <div className="relative">
              <label
                className="block text-sm font-semibold text-amber-800 mb-2"
                style={{ fontFamily: "serif" }}
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 bg-white/80 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all duration-200 text-amber-900 placeholder-amber-400 shadow-inner"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{ fontFamily: "serif" }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="w-5 h-5 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative">
              <label
                className="block text-sm font-semibold text-amber-800 mb-2"
                style={{ fontFamily: "serif" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white/80 border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-all duration-200 text-amber-900 placeholder-amber-400 shadow-inner"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{ fontFamily: "serif" }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="w-5 h-5 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Login button */}
            <button
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white shadow-lg transform transition-all duration-200 ${
                isLoading
                  ? "bg-amber-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              }`}
              onClick={handleLogin}
              disabled={isLoading}
              style={{ fontFamily: "serif" }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Authenticating...
                </div>
              ) : (
                "Enter Portal"
              )}
            </button>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p
                      className="text-sm text-red-700 font-medium"
                      style={{ fontFamily: "serif" }}
                    >
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Decorative footer */}
          <div className="mt-8 pt-6 border-t border-amber-200/50">
            <div className="text-center">
              <p
                className="text-xs text-amber-600/70"
                style={{ fontFamily: "serif" }}
              >
                Authorized Personnel Only
              </p>
              <div className="flex justify-center mt-2">
                <div className="w-3 h-3 bg-amber-400 rounded-full mr-1 opacity-60"></div>
                <div className="w-3 h-3 bg-orange-400 rounded-full mr-1 opacity-60"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-amber-300/50 rounded-tl-lg"></div>
        <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-amber-300/50 rounded-tr-lg"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-amber-300/50 rounded-bl-lg"></div>
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-amber-300/50 rounded-br-lg"></div>
      </div>
    </div>
  );
}

export default AdminLogin;
