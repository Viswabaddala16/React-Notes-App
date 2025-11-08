import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center text-center space-y-6 py-10">
      <h2 className="text-4xl font-extrabold text-brandBlue">Dashboard 🌸</h2>

      <div className="bg-white/70 backdrop-blur-md border border-brandBlue shadow-soft p-8 rounded-2xl max-w-lg w-full text-left space-y-2">
        <p>
          <b>Name:</b> {user?.name}
        </p>
        <p>
          <b>Email:</b> {user?.email}
        </p>
        <p>
          <b>Hashed Password:</b>{" "}
          <span className="text-gray-600">
            {user?.password || "Encrypted securely"}
          </span>
        </p>
      </div>

      <div className="flex gap-4">
        <Link
          to="/notes"
          className="bg-brandBlue text-white px-6 py-2 rounded-lg shadow-soft hover:bg-brandBlue/90 transition"
        >
          Go to Notes
        </Link>
      </div>
    </div>
  );
}
