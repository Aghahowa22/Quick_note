import { useState } from "react";
import Navbar from "./component/Navbar";
import ProtectedRoute from "./component/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./routes/Dashboard";
import Landing from "./routes/Landing";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import { Routes, Route, Navigate, replace } from "react-router-dom";

function App() {


  const {loading, currentUser, toggle} = useAuth();

  if(loading) {
    return(
      <div className= "min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-indigo-600 text-xl">Loading QuickNotes...</div>
      </div>
    )
  }


  return (
    <>
      <div
        className={
          toggle ? " min-h-screen bg-zinc-900" : " min-h-screen bg-slate-50"
        }
      >
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? <Navigate to="/dashboard" replace /> : <Landing />
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? <Navigate to="/dashboard" replace /> : <Login />
            }
          />
          <Route
            path="/signup"
            element={
              currentUser ? <Navigate to="/dashboard" replace /> : <Signup />
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div className="container mx-auto px-4 py-8">
                  <Dashboard />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
