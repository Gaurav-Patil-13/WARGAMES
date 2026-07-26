import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from './api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('wargames_token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    api.get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [token]);

  function acceptSession(payload) {
    localStorage.setItem('wargames_token', payload.token);
    setToken(payload.token);
    setUser(payload.user);
  }

  async function login(username, password) {
    const res = await api.post('/auth/login', { username, password });
    acceptSession(res.data);
  }

  async function register(username, password) {
    const res = await api.post('/auth/register', { username, password });
    acceptSession(res.data);
  }

  function logout() {
    localStorage.removeItem('wargames_token');
    setToken(null);
    setUser(null);
  }

  const value = useMemo(() => ({ token, user, setUser, loading, login, register, logout }), [token, user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
