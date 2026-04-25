'use client';

import { useEffect, useState } from 'react';
import SectorCard from '@/components/SectorCard';
import { RefreshCw } from 'lucide-react';

export default function Home() {
  const [sectorsData, setSectorsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSectors = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sectors');
      const data = await res.json();
      setSectorsData(data);
    } catch (error) {
      console.error('Failed to fetch sectors', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.16),_transparent_30%),#09090b] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-zinc-950/40 backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">Sector Cycle Tracker</h1>
              <p className="mt-4 max-w-2xl text-zinc-300 text-base sm:text-lg">
                Monitor NSE sector strength, price moves, and market cycle phase in one dashboard.
              </p>
            </div>

            <button
              onClick={fetchSectors}
              disabled={loading}
              className="inline-flex items-center justify-center gap-3 rounded-3xl bg-slate-100 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-sm shadow-black/10 transition hover:bg-amber-400 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing NSE...' : 'Refresh All Data'}
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          {sectorsData.length > 0 ? (
            sectorsData.map((sector) => (
              <SectorCard
                key={sector.id || sector.indexSlug}
                sector={sector}
                onRefresh={fetchSectors}
              />
            ))
          ) : (
            <div className="col-span-full rounded-[1.75rem] border border-zinc-800 bg-zinc-900/80 p-16 text-center text-zinc-400 shadow-xl shadow-zinc-950/30">
              Loading sectors from NSE India...
            </div>
          )}
        </div>

        <p className="text-center text-sm text-zinc-400 md:text-base">
          Built by ShadabQ • Real-time NSE data • 100% open source on GitHub
        </p>
      </div>
    </div>
  );
}