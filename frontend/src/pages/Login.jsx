import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(form);
      setSuccess(true);
      setTimeout(() => nav("/dashboard"), 1000);
    } catch (e) {
      setErr(e.response?.data?.message || "Invalid credentials");
    }
  }

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white/60 backdrop-blur-xl border border-lilac shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-lilac mb-6">
          Welcome Back 👋
        </h2>

        {err && <div className="bg-rose/40 text-red-700 p-2 mb-3 rounded">{err}</div>}
        {success && (
          <div className="bg-mint/40 text-green-700 p-2 mb-3 rounded">
            Login Successful 🎉
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-lilac rounded-lg px-4 py-2 focus:ring-2 focus:ring-lilac focus:outline-none bg-white/80"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-lilac rounded-lg px-4 py-2 focus:ring-2 focus:ring-lilac focus:outline-none bg-white/80"
          />
          <button
            type="submit"
            className="w-full bg-brandBlue/90 text-white py-2 rounded-lg font-semibold hover:bg-lilac/150 transition shadow"
          >
            Login
          </button>
        </form>

        <p className="text-center text-softText mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-brandBlue/90 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
