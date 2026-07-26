import { CheckCircle2, Lock, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LevelCard({ level }) {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border bg-panel p-5 ${level.unlocked ? 'border-line' : 'border-line/50 opacity-55'}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
            Level {level.id} . {level.track}
          </div>
          <h3 className="mt-2 text-lg font-bold text-white">{level.title}</h3>
        </div>
        {level.completed ? (
          <CheckCircle2 className="text-acid" size={22} />
        ) : level.unlocked ? (
          <Play className="text-amber" size={22} />
        ) : (
          <Lock className="text-slate-500" size={22} />
        )}
      </div>
      <p className="min-h-16 text-sm leading-6 text-slate-300">{level.objective}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="rounded border border-line px-3 py-1 text-xs text-amber">{level.xp} XP</span>
        <button
          disabled={!level.unlocked}
          onClick={() => navigate(`/levels/${level.id}`)}
          className="rounded bg-acid px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          {level.completed ? 'Replay' : level.unlocked ? 'Start' : 'Locked'}
        </button>
      </div>
    </motion.article>
  );
}
