// src/api.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE });

// set/remove default Authorization header for axios
export function setAuthToken(token) {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
}

export default {
  // auth
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  // user
  getProfile: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
  // notes
  getNotes: (params) => api.get('/notes', { params }),
  createNote: (data) => api.post('/notes', data),
  updateNote: (id, data) => api.put(`/notes/${id}`, data),
  deleteNote: (id) => api.delete(`/notes/${id}`),
  // export the axios instance if needed
  __axios: api
};
