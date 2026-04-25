'use client';
import { useEffect, useState } from 'react';
import SectorCard from '@/components/SectorCard';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function Home() {
  const [sectorsData, setSectorsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSectors = async () => {
    setLoading(true);
    const res = await fetch('/api/sectors');
    const data = await res.json();
    setSectorsData(data);
    setLoading(false);
  };

  useEffect(() => { fetchSectors(); }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Sector Cycle Tracker</h1>
          <Button onClick={fetchSectors} disabled={loading} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            {loading ? 'Loading...' : 'Refresh All'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectorsData.map((sector) => (
            <SectorCard key={sector.id} sector={sector} onRefresh={fetchSectors} />
          ))}
        </div>

        <p className="text-center text-xs text-zinc-500 mt-12">
          Built by ShadabQ • Data from NSE India • 100% open source
        </p>
      </div>
    </div>
  );
}