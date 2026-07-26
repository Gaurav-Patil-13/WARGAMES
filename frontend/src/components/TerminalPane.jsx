import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { io } from 'socket.io-client';
import { API_URL } from '../utils/api.js';

export default function TerminalPane({ token, containerId }) {
  const hostRef = useRef(null);
  const terminalRef = useRef(null);
  const fitRef = useRef(null);

  useEffect(() => {
    if (!hostRef.current || !containerId) return;

    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'JetBrains Mono, Menlo, monospace',
      theme: {
        background: '#05070a',
        foreground: '#d6ffe6',
        cursor: '#7CFFB2',
        green: '#7CFFB2',
        cyan: '#6AE4FF',
        yellow: '#FFCD7A'
      }
    });
    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(hostRef.current);
    fit.fit();
    term.writeln('\x1b[32mWARGAMES boot sequence initialized...\x1b[0m');
    term.writeln('Opening isolated Linux shell...');

    const socket = io(API_URL, { auth: { token } });
    socket.emit('terminal:start', { containerId });

    term.onData((data) => socket.emit('terminal:input', data));
    socket.on('terminal:data', (data) => term.write(data));
    socket.on('terminal:error', (message) => term.writeln(`\r\n\x1b[31m${message}\x1b[0m`));
    socket.on('terminal:closed', () => term.writeln('\r\n\x1b[33mShell closed.\x1b[0m'));

    const resize = () => {
      fit.fit();
      socket.emit('terminal:resize', { cols: term.cols, rows: term.rows });
    };
    window.addEventListener('resize', resize);
    setTimeout(resize, 80);

    terminalRef.current = term;
    fitRef.current = fit;

    return () => {
      window.removeEventListener('resize', resize);
      socket.disconnect();
      term.dispose();
    };
  }, [containerId, token]);

  return (
    <div className="terminal-frame overflow-hidden rounded-lg border border-line bg-black shadow-glow">
      <div className="flex items-center gap-2 border-b border-line bg-panel px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber" />
        <span className="h-3 w-3 rounded-full bg-acid" />
        <span className="ml-3 text-xs uppercase tracking-[0.18em] text-slate-400">container shell</span>
      </div>
      <div ref={hostRef} className="h-[520px]" />
    </div>
  );
}
