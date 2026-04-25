'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

const phaseColors: Record<string, string> = {
  'Early Expansion': 'bg-emerald-500',
  'Mid Cycle': 'bg-blue-500',
  'Late Cycle': 'bg-amber-500',
  'Down': 'bg-red-500',
};

export default function SectorCard({ sector, onRefresh }: any) {
  const [phase, setPhase] = useState(sector.cyclePhase);
  const [notes, setNotes] = useState(sector.notes || '');
  const phases = ['Early Expansion', 'Mid Cycle', 'Late Cycle', 'Down'];
  const phaseIndex = phases.indexOf(phase);

  return (
    <Card className="w-full hover:shadow-xl transition-all">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{sector.name}</CardTitle>
          <Badge className={`${phaseColors[phase]} text-white`}>{phase}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-muted-foreground">Price Change</p>
            <p className={`text-2xl font-bold ${sector.priceChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {sector.priceChange?.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Price</p>
            <p className="text-2xl font-bold">{sector.lastPrice?.toFixed(0)}</p>
          </div>
        </div>

        <div>
          <Slider value={[phaseIndex]} max={3} step={1} onValueChange={(v) => setPhase(phases[v[0]])} className="mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Early</span><span>Mid</span><span>Late</span><span>Down</span>
          </div>
        </div>

        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes, order book, risks..." className="w-full h-20 p-3 text-sm border rounded-lg resize-none" />

        <Button onClick={onRefresh} variant="outline" size="sm" className="w-full gap-2">
          <RefreshCw className="w-4 h-4" /> Refresh NSE Data
        </Button>
      </CardContent>
    </Card>
  );
}