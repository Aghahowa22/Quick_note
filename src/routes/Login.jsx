import React from "react";
import { Notebook } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const { login, toggle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Please fill in all fields");
    }


    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        "Failed to create an account: " + (err.message || "Please try again")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div
        className={
          toggle
            ? "bg-zinc-800 rounded-lg shadow-md p-8"
            : "bg-white rounded-lg shadow-md p-8"
        }
      >
        <div className="flex flex-col items-center mb-6">
          <Notebook className="h-12 w-12 text-indigo-600 mb-2" />
          <h2
            className={
              toggle
                ? "text-2xl font-bold text-white"
                : "text-2xl font-bold text-gray-900"
            }
          >
            {" "}
            Welcome back!
          </h2>
          <p className={toggle ? "text-white" : "text-gray-600"}>
            Sign in to acess your note
          </p>
        </div>

        {/* sign form */}

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* email input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className={
                toggle
                  ? "block text-sm font-medium text-white mb-1"
                  : "block text-sm font-medium text-gray-700 mb-1"
              }
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              value={email}
              placeholder="you@example.com"
              required
            />
          </div>

          {/* password input and label */}
          <div>
            <label
              htmlFor="password"
              className={
                toggle
                  ? "block text-sm font-medium text-white mb-1"
                  : "block text-sm font-medium text-gray-700 mb-1"
              }
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              value={password}
              placeholder="********"
              required
            />
          </div>

          {/* submit btn */}
          <button
            className="w-full bg-indigo-600 text-white py-2
            rounded-md hover:bg-indigo-700 transition-colors focus:outline-none
            focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50
            disabled:cursor-not-allowed mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        {/* option link */}
        <div className="mt-6 text-center text-sm">
          <p className={toggle ? "text-white" : "text-gray-600"}>
            Don't have an account yet?
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-800 font-medium px-2"
            >
              sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
