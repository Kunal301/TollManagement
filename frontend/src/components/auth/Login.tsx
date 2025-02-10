import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AxiosError } from "axios";
import api from "../../services/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Show loading indicator

    try {
      const response = await api.post("/api/auth/login", { email, password });

      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  }, [email, password, navigate]);

  const user = JSON.parse(localStorage.getItem("user") || "{}"); // Get user data

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <button
              type="submit"
              disabled={loading} // Disable button while loading
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
              ${loading ? "bg-gray-400 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? "Logging in..." : "Sign in"}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          {user?.role === "admin" && (
            <>
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
