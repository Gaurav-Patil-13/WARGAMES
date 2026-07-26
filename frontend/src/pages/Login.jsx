import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth.jsx';

export default function Login() {
  const { token, login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (token) return <Navigate to="/dashboard" replace />;

  async function submit(event) {
    event.preventDefault();
    setError('');
    try {
      if (mode === 'login') await login(username, password);
      else await register(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-void px-5 text-slate-100">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-line bg-panel p-7 shadow-glow">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-acid">WARGAMES Access</div>
          <h1 className="mt-2 text-3xl font-black">{mode === 'login' ? 'Login' : 'Create Account'}</h1>
        </div>
        <div className="mb-5 grid grid-cols-2 rounded border border-line p-1">
          <button type="button" onClick={() => setMode('login')} className={`rounded px-4 py-2 text-sm font-bold ${mode === 'login' ? 'bg-acid text-slate-950' : 'text-slate-300'}`}>Login</button>
          <button type="button" onClick={() => setMode('register')} className={`rounded px-4 py-2 text-sm font-bold ${mode === 'register' ? 'bg-acid text-slate-950' : 'text-slate-300'}`}>Register</button>
        </div>
        <label className="mb-4 block">
          <span className="mb-2 block text-sm text-slate-300">Username</span>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded border border-line bg-void px-4 py-3 outline-none focus:border-acid" />
        </label>
        <label className="mb-5 block">
          <span className="mb-2 block text-sm text-slate-300">Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded border border-line bg-void px-4 py-3 outline-none focus:border-acid" />
        </label>
        {error && <div className="mb-4 rounded border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}
        <button className="w-full rounded bg-acid px-4 py-3 font-bold text-slate-950 hover:bg-cyan">Continue</button>
      </form>
    </div>
  );
}
