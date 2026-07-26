import { motion } from 'framer-motion';
import { TerminalSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-void text-slate-100">
      <section className="mx-auto grid min-h-screen max-w-7xl content-center gap-10 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded border border-acid/40 bg-acid/10 px-3 py-2 text-sm text-acid">
            <TerminalSquare size={16} /> Browser terminal CTF lab
          </div>
          <h1 className="max-w-3xl text-5xl font-black leading-tight text-white md:text-7xl">
            WARGAMES
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Learn Linux, Bash, Docker, and basic cybersecurity by solving containerized flags directly from your browser.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/login" className="rounded bg-acid px-6 py-3 font-bold text-slate-950 hover:bg-cyan">Enter Platform</Link>
            <a href="#tracks" className="rounded border border-line px-6 py-3 font-bold text-slate-100 hover:border-acid">View Tracks</a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg border border-line bg-black/80 p-4 shadow-glow"
        >
          <div className="mb-3 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber" />
            <span className="h-3 w-3 rounded-full bg-acid" />
          </div>
          <pre className="overflow-hidden whitespace-pre-wrap text-sm leading-7 text-acid">
{`player@wargames:~$ ls
mission  notes  fake_flag.txt
player@wargames:~$ cat mission/final/flag.txt
WG{linux_navigation_unlocked}
player@wargames:~$ submit flag
[ACCESS GRANTED] next level unlocked`}
          </pre>
        </motion.div>
      </section>
      <section id="tracks" className="border-t border-line px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {['Linux navigation', 'Bash pipelines', 'Docker inspection', 'Networking basics'].map((item) => (
            <div key={item} className="rounded-lg border border-line bg-panel p-5 text-slate-200">{item}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
