import { LogOut, Shield } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth.jsx';

export default function Shell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-void text-slate-100">
      <header className="sticky top-0 z-20 border-b border-line bg-void/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 text-left">
            <span className="grid h-10 w-10 place-items-center rounded border border-acid/50 bg-acid/10 text-acid shadow-glow">
              <Shield size={20} />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-[0.18em] text-acid">WARGAMES</span>
              <span className="block text-xs text-slate-400">Linux . Bash . Docker . CTF</span>
            </span>
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-semibold">{user?.username}</div>
              <div className="text-xs text-amber">{user?.xp || 0} XP</div>
            </div>
            <button
              onClick={logout}
              className="grid h-10 w-10 place-items-center rounded border border-line bg-panel text-slate-300 hover:border-acid hover:text-acid"
              title="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8">
        <Outlet />
      </main>
    </div>
  );
}
