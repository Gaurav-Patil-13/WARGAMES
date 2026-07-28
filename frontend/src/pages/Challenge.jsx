import { useEffect, useState } from 'react';
import { ArrowLeft, Lightbulb, RotateCcw, Send, Trash2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TerminalPane from '../components/TerminalPane.jsx';
import { api } from '../utils/api.js';
import { useAuth } from '../utils/auth.jsx';

export default function Challenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, setUser } = useAuth();
  const [level, setLevel] = useState(null);
  const [containerId, setContainerId] = useState(null);
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState('');
  const [starting, setStarting] = useState(false);


  useEffect(() => {
  return () => {
    if (containerId) {
      api.delete(`/containers/${containerId}`).catch(() => {});
    }
  };
}, [containerId]);

    useEffect(() => {
    api.get(`/levels/${id}`).then((res) => setLevel(res.data.level)).catch(() => navigate('/dashboard'));
    return () => {
      if (containerId) api.delete(`/containers/${containerId}`).catch(() => {});
    };
  }, [id]);

  async function startLevel() {
    setStarting(true);
    setMessage('');
    try {
      if (containerId) await destroy();
      const res = await api.post(`/containers/levels/${id}/start`);
      setContainerId(res.data.containerId);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Could not start container');
    } finally {
      setStarting(false);
    }
  }

  async function destroy() {
    if (!containerId) return;
    const idToDestroy = containerId;
    setContainerId(null);
    await api.delete(`/containers/${idToDestroy}`).catch(() => {});
  }

  async function submitFlag(event) {
    event.preventDefault();
    setMessage('');
    try {
      const res = await api.post(`/levels/${id}/submit`, { flag });
      setUser(res.data.user);
      setMessage(res.data.unlockedNext ? 'Flag accepted. Next level unlocked.' : 'Flag accepted. Campaign complete.');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Flag rejected');
    }
  }

  if (!level) return <div className="text-acid">Loading challenge...</div>;

  return (
    <div className="grid gap-6 xl:grid-cols-[390px_1fr]">
      <aside className="rounded-lg border border-line bg-panel p-5">
        <Link to="/dashboard" className="mb-5 inline-flex items-center gap-2 text-sm text-cyan hover:text-acid">
          <ArrowLeft size={16} /> Back to levels
        </Link>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-acid">Level {level.id} . {level.track}</div>
        <h1 className="mt-2 text-2xl font-black text-white">{level.title}</h1>
        <p className="mt-4 leading-7 text-slate-300">{level.objective}</p>
        <div className="mt-5 rounded border border-line bg-void p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-amber"><Lightbulb size={16} /> Hint</div>
          <p className="text-sm leading-6 text-slate-300">{level.hint}</p>
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={startLevel} disabled={starting} className="inline-flex flex-1 items-center justify-center gap-2 rounded bg-acid px-4 py-3 font-bold text-slate-950 hover:bg-cyan disabled:opacity-60">
            <RotateCcw size={18} /> {containerId ? 'Restart' : 'Start'}
          </button>
          <button onClick={destroy} disabled={!containerId} className="grid h-12 w-12 place-items-center rounded border border-line text-slate-300 hover:border-red-400 hover:text-red-300 disabled:opacity-40" title="Destroy container">
            <Trash2 size={18} />
          </button>
        </div>
        <form onSubmit={submitFlag} className="mt-6">
          <label className="mb-2 block text-sm text-slate-300">Submit flag</label>
          <div className="flex gap-2">
            <input value={flag} onChange={(e) => setFlag(e.target.value)} placeholder="WG{...}" className="min-w-0 flex-1 rounded border border-line bg-void px-3 py-3 outline-none focus:border-acid" />
            <button className="grid h-12 w-12 place-items-center rounded bg-amber text-slate-950 hover:bg-acid" title="Submit flag">
              <Send size={18} />
            </button>
          </div>
          {message && <div className="mt-3 rounded border border-line bg-void p-3 text-sm text-slate-200">{message}</div>}
        </form>
      </aside>
      <section>
        {containerId ? (
          <TerminalPane token={token} containerId={containerId} />
        ) : (
          <div className="grid h-[570px] place-items-center rounded-lg border border-line bg-black/70 text-center">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-acid">No active container</div>
              <p className="mt-3 text-slate-300">Start the level to open a live Linux terminal.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
