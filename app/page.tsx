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
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Sector Cycle Tracker</h1>
          
          <button
            onClick={fetchSectors}
            disabled={loading}
            className="flex items-center gap-3 bg-white text-zinc-900 hover:bg-amber-400 px-6 py-3 rounded-2xl font-semibold transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Refreshing NSE...' : 'Refresh All Data'}
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectorsData.length > 0 ? (
            sectorsData.map((sector) => (
              <SectorCard
                key={sector.id || sector.indexSlug}
                sector={sector}
                onRefresh={fetchSectors}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-zinc-400">
              Loading sectors from NSE India...
            </div>
          )}
        </div>

        <p className="text-center text-xs text-zinc-500 mt-16">
          Built by ShadabQ • Real-time NSE data • 100% open source on GitHub
        </p>
      </div>
    </div>
  );
}