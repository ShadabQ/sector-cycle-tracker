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
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:shadow-2xl transition-all">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-semibold">{sector.name}</h3>
        <span
          className={`px-4 py-1 text-xs font-medium text-white rounded-full ${phaseColors[phase]}`}
        >
          {phase}
        </span>
      </div>

      {/* Metrics */}
      <div className="flex justify-between mb-8">
        <div>
          <p className="text-zinc-400 text-sm">Price Change</p>
          <p
            className={`text-3xl font-bold ${
              sector.priceChange >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {sector.priceChange?.toFixed(2)}%
          </p>
        </div>
        <div className="text-right">
          <p className="text-zinc-400 text-sm">Last Price</p>
          <p className="text-3xl font-bold text-white">
            {sector.lastPrice?.toFixed(0)}
          </p>
        </div>
      </div>

      {/* Cycle Slider (native HTML range + Tailwind) */}
      <div className="mb-8">
        <input
          type="range"
          min="0"
          max="3"
          value={phaseIndex}
          onChange={(e) => setPhase(phases[parseInt(e.target.value)])}
          className="w-full accent-blue-500 bg-zinc-800 h-2 rounded-full cursor-pointer"
        />
        <div className="flex justify-between text-xs text-zinc-400 mt-2">
          <span>Early</span>
          <span>Mid</span>
          <span>Late</span>
          <span>Down</span>
        </div>
      </div>

      {/* Notes */}
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes, order book, risks, tailwinds..."
        className="w-full h-24 bg-zinc-950 border border-zinc-700 rounded-xl p-4 text-sm resize-none focus:outline-none focus:border-blue-500"
      />

      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        className="w-full mt-6 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition-colors text-white font-medium py-3 px-6 rounded-xl"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh NSE Data
      </button>
    </div>
  );
}