import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Notebook, LogOut, User, Sun,Moon} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  

  const navigate = useNavigate();

  const { currentUser, logout, toggleMode,toggle } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/logout");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <nav className={toggle ? "bg-zinc-800" : "bg-white shadow-sm"}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Notebook className="h-8 w-8 text-indigo-600" />
            <span className={toggle ? "text-white" : "text-black"}>
              QuickNotes
            </span>
          </Link>

          {/* sign up..log in and log out link */}

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <div
                  onClick={toggleMode}
                  className="text-gray-600 cursor-pointer px-8"
                >
                  {toggle ? (
                    <div className="text-white hover:opacity-80">
                      <Sun />
                    </div>
                  ) : (
                    <div className="text-gray-600 ">
                      <Moon />
                    </div>
                  )}
                </div>
                <div
                  className={
                    toggle
                      ? "flex items-center text-sm text-white"
                      : "flex items-center text-sm text-gray-600"
                  }
                >
                  <User className="h-4 w-4 mr-1" />
                  <span className="hidden md:inline">{currentUser.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className={
                    toggle
                      ? "flex items-center text-sm font-medium text-white hover:text-opacity-80 transition-colors"
                      : "flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                  }
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span>Log out</span>
                </button>
              </>
            ) : (
              <>
                <div
                  onClick={toggleMode}
                  className="px-8 cursor-pointer text-gray-600"
                >
                  {toggle ? (
                    <div className="text-white hover:opacity-80">
                      <Sun />
                    </div>
                  ) : (
                    <div>
                      <Moon />
                    </div>
                  )}
                </div>

                <div className="space-x-4">
                  <Link
                    to="/login"
                    className={
                      toggle
                        ? "text-white hover:opacity-80"
                        : "text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                    }
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="text-sm font-medium text-white px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Signup
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
