import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sectors } from '@/db/schema';
import { eq } from 'drizzle-orm';

const sectorMap = [
  { name: "Metals & Mining", nseKey: "NIFTY METAL" },
  { name: "Auto & Commercial Vehicles", nseKey: "NIFTY AUTO" },
  { name: "Capital Goods & Infra", nseKey: "NIFTY INFRA" },
  { name: "Bank", nseKey: "NIFTY BANK" },
  { name: "IT", nseKey: "NIFTY IT" },
  { name: "Pharma", nseKey: "NIFTY PHARMA" },
];

export async function GET() {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
      'Accept': 'application/json, text/plain, */*',
      'Referer': 'https://www.nseindia.com/',
      'Accept-Language': 'en-US,en;q=0.9',
    };

    // Warm-up NSE session
    await fetch('https://www.nseindia.com/', { headers, cache: 'no-store' });

    const response = await fetch('https://www.nseindia.com/api/allIndices', {
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`NSE API error: ${response.status}`);
    }

    const json = await response.json();
    const allIndices = json.data || [];

    const updated = await Promise.all(
      sectorMap.map(async (sector) => {
        const indexData = allIndices.find(
          (i: any) => i.index?.toUpperCase() === sector.nseKey || i.key?.toUpperCase() === sector.nseKey
        );

        if (!indexData) return null;

        const change = parseFloat(indexData.percentChange || indexData.variation || '0');
        const lastPrice = parseFloat(indexData.last || indexData.close || '0');

        let phase = 'Mid Cycle';
        if (change > 5) phase = 'Early Expansion';
        else if (change > 2) phase = 'Mid Cycle';
        else if (change < -3) phase = 'Down';
        else if (change < 0) phase = 'Late Cycle';

        await db
          .insert(sectors)
          .values({
            name: sector.name,
            indexSlug: sector.nseKey,
            cyclePhase: phase,
            priceChange: change,
            lastPrice: lastPrice,
            lastUpdated: new Date(),
          })
          .onConflictDoUpdate({
            target: sectors.indexSlug,
            set: {
              priceChange: change,
              lastPrice: lastPrice,
              lastUpdated: new Date(),
            },
          });

        return db.query.sectors.findFirst({
          where: eq(sectors.indexSlug, sector.nseKey),
        });
      })
    );

    return NextResponse.json(updated.filter(Boolean));
  } catch (error) {
    console.error('NSE fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch NSE data. Try again in 10 seconds.' },
      { status: 500 }
    );
  }
}