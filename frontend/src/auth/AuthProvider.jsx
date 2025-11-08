// src/auth/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import api, { setAuthToken } from '../api';

const AuthContext = createContext();

export function useAuth() { return useContext(AuthContext); }

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);

  // when token changes, set axios header and persist token
  useEffect(() => {
    setAuthToken(token);
    if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
  }, [token]);

  // persist user
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user');
  }, [user]);

  async function login(values) {
    setLoading(true);
    try {
      const res = await api.login(values);
      const { token: t, user: u } = res.data;
      setToken(t);
      setUser(u);
      return res;
    } finally {
      setLoading(false);
    }
  }

  async function register(values) {
    setLoading(true);
    try {
      const res = await api.register(values);
      const { token: t, user: u } = res.data;
      setToken(t);
      setUser(u);
      return res;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    // axios header removed in effect
  }

  async function refreshProfile() {
    try {
      const res = await api.getProfile();
      setUser(res.data);
      return res.data;
    } catch (err) {
      console.error('refreshProfile failed', err);
      throw err;
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
