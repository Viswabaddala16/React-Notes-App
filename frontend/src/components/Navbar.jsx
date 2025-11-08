import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="backdrop-blur-xl bg-white/60 border-b border-brandBlue/30 shadow-soft sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-brandBlue via-brandMint to-brandPink bg-clip-text text-transparent"
        >
          NotesApp
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-softText hover:text-brandBlue font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/notes"
                className="text-softText hover:text-brandBlue font-medium"
              >
                Notes
              </Link>
              <button
                onClick={() => {
                  logout();
                  nav("/login");
                }}
                className="bg-brandPink/90 hover:bg-pink-400 text-white px-4 py-1.5 rounded-lg shadow-soft transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-brandBlue/90 hover:bg-brandBlue text-white px-4 py-1.5 rounded-lg shadow-soft transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-brandMint/90 hover:bg-brandMint text-white px-4 py-1.5 rounded-lg shadow-soft transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
