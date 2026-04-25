'use client';

import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function SectorCard({ sector, onRefresh }: any) {
  const [phase, setPhase] = useState(sector.cyclePhase || 'Mid Cycle');
  const [notes, setNotes] = useState(sector.notes || '');

  const phases = ['Early Expansion', 'Mid Cycle', 'Late Cycle', 'Down'];
  const phaseIndex = phases.indexOf(phase);

  const phaseColors: Record<string, string> = {
    'Early Expansion': 'bg-emerald-600',
    'Mid Cycle': 'bg-blue-600',
    'Late Cycle': 'bg-amber-600',
    'Down': 'bg-red-600',
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-zinc-950/90 p-6 shadow-2xl shadow-black/20 transition hover:-translate-y-1">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">{sector.name}</h3>
          <p className="mt-2 text-sm uppercase tracking-[0.24em] text-zinc-400">{sector.indexSlug}</p>
        </div>

        <span className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white ${phaseColors[phase]}`}>
          {phase}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 mb-8">
        <div className="rounded-3xl bg-zinc-900/80 p-5">
          <p className="text-zinc-400 text-sm">Price Change</p>
          <p className={`mt-3 text-4xl font-semibold ${sector.priceChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {sector.priceChange?.toFixed(2)}%
          </p>
        </div>
        <div className="rounded-3xl bg-zinc-900/80 p-5">
          <p className="text-zinc-400 text-sm">Last Price</p>
          <p className="mt-3 text-4xl font-semibold text-white">{sector.lastPrice?.toFixed(0)}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-zinc-300">Cycle phase slider</p>
          <span className="text-xs uppercase tracking-[0.24em] text-zinc-500">{phase}</span>
        </div>
        <input
          type="range"
          min="0"
          max="3"
          value={phaseIndex}
          onChange={(e) => setPhase(phases[parseInt(e.target.value)])}
          className="w-full accent-sky-400 h-2 rounded-full bg-zinc-800 cursor-pointer"
        />
        <div className="mt-3 flex justify-between text-[11px] uppercase tracking-[0.28em] text-zinc-500">
          <span>Early</span>
          <span>Mid</span>
          <span>Late</span>
          <span>Down</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-zinc-300">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add observations, order book cues, or risk notes..."
          className="h-28 w-full rounded-3xl border border-zinc-800 bg-zinc-950/80 p-4 text-sm text-white placeholder:text-zinc-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        />
      </div>

      <button
        onClick={onRefresh}
        className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-slate-100 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh NSE Data
      </button>
    </div>
  );
}