import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(form);
      setMsg("Registration Successful 🌸");
      setTimeout(() => nav("/dashboard"), 1000);
    } catch {
      setMsg("Registration Failed 😢");
    }
  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white/70 backdrop-blur-xl border border-mint shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-mint mb-6">
          Create Account 💫
        </h2>

        {msg && (
          <div className="bg-mint/30 text-green-800 p-2 mb-3 rounded text-center">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-mint rounded-lg px-4 py-2 focus:ring-2 focus:ring-mint focus:outline-none bg-white/80"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-mint rounded-lg px-4 py-2 focus:ring-2 focus:ring-mint focus:outline-none bg-white/80"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-mint rounded-lg px-4 py-2 focus:ring-2 focus:ring-mint focus:outline-none bg-white/80"
          />
          <button
            type="submit"
            className="w-full bg-brandMint/90 text-softText py-2 rounded-lg font-semibold hover:bg-brandBlue transition shadow"
          >
            Register
          </button>
        </form>

        <p className="text-center text-softText mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-brandMint/90 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
