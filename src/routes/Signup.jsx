import React from "react";
import { Notebook } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";


function Signup() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();


  
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  // imported values , functions and states from Authcontext
  const {signup,toggle} = useAuth();
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');


    if(!email  || !password || !passwordConfirm){
      return setError("Please fill in all fields")
    }

    if (password !== passwordConfirm) {
      return setError("Password do not match");
    }

    if (password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    try{
      setLoading(true);
      await signup(email,password)
      navigate('/dashboard')
    }catch(err){
      setError("Failed to create an account: " + (err.message || "Please try again"))

    }finally{
      setLoading(false)
    }

  }


  return (
    <div className=" max-w-md mx-auto mt-10">
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
            Create Account And
          </h2>
          <p className={toggle ? "text-white" : "text-gray-600"}>
            Start taking your note today
          </p>
        </div>

        {/* input form */}

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            {/* email input */}
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
          {/* password input 1 */}
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
            {/* password input 2 */}
            <div className="mb-6">
              <label
                htmlFor="password-confirm"
                className={
                  toggle
                    ? "block text-sm font-medium text-white mb-1"
                    : "block text-sm font-medium text-gray-700 mb-1"
                }
              >
                Comfirm password
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                id="password-confirm"
                type="password"
                value={passwordConfirm}
                placeholder="********"
                required
              />
            </div>
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
            {loading ? "Creating Account" : "Sign Up"}
          </button>
        </form>
        {/* option 2 link for sign in */}
        <div className="mt-6 text-center text-sm">
          <p className={toggle ? "text-white" : "text-gray-600"}>
            Already have an account ?
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium px-2"
            >
              sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
