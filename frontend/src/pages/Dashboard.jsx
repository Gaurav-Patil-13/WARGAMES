import { useEffect, useMemo, useState } from 'react';
import LevelCard from '../components/LevelCard.jsx';
import { api } from '../utils/api.js';
import { useAuth } from '../utils/auth.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    api.get('/levels').then((res) => setLevels(res.data.levels));
  }, []);

  const completed = levels.filter((level) => level.completed).length;
  const progress = useMemo(() => levels.length ? Math.round((completed / levels.length) * 100) : 0, [completed, levels.length]);

  return (
    <div>
      <section className="mb-8 rounded-lg border border-line bg-panel p-6">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-acid">Operator Dashboard</div>
            <h1 className="mt-2 text-3xl font-black text-white">Welcome, {user?.username}</h1>
            <p className="mt-2 text-slate-300">Solve levels in order. Each flag unlocks the next container lab.</p>
          </div>
          <div className="min-w-64">
            <div className="mb-2 flex justify-between text-sm">
              <span>{completed}/10 complete</span>
              <span className="text-amber">{progress}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded bg-void">
              <div className="h-full bg-acid transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {levels.map((level) => <LevelCard key={level.id} level={level} />)}
      </section>
    </div>
  );
}
