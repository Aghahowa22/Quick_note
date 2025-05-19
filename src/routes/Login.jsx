import React from "react";
import { Notebook } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {

  const [email, setEmail] = useState();

  const [password, setPassword] = useState();

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <Notebook className="h-12 w-12 text-indigo-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-900"> Welcome back!</h2>
          <p className="text-gray-600">Sign in to acess your note</p>
        </div>
        {/* sign form */}
        <form>

          {/* email input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          >
            sign in
          </button>
        </form> 
        {/* option link */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account yet?
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-800 font-medium px-2"
            >
              signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
