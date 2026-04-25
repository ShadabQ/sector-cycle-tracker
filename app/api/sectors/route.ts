import { NextResponse } from 'next/server';
import { NseIndia } from 'stock-nse-india';
import { db } from '@/db';
import { sectors } from '@/db/schema';
import { eq } from 'drizzle-orm';

const nse = new NseIndia();

const sectorMap = [
  { name: "Metals & Mining", slug: "cnxMetal" },
  { name: "Auto & Commercial Vehicles", slug: "cnxAuto" },
  { name: "Capital Goods & Infra", slug: "cnxInfrastructure" },
  { name: "Bank", slug: "bankNifty" },
  { name: "IT", slug: "cnxIT" },
  { name: "Pharma", slug: "cnxPharma" },
];

export async function GET() {
  try {
    const allIndices = await nse.getEquityStockIndices();

    const updated = await Promise.all(
      sectorMap.map(async (sector) => {
        const indexData = allIndices.find((i: any) => i.key === sector.slug);
        if (!indexData) return null;

        const change = parseFloat(indexData.percentChange || '0');

        let phase = 'Mid Cycle';
        if (change > 5) phase = 'Early Expansion';
        else if (change > 2) phase = 'Mid Cycle';
        else if (change < -2) phase = 'Down';

        await db.insert(sectors)
          .values({
            name: sector.name,
            indexSlug: sector.slug,
            cyclePhase: phase,
            priceChange: change,
            lastPrice: parseFloat(indexData.lastPrice || '0'),
            lastUpdated: new Date(),
          })
          .onConflictDoUpdate({
            target: sectors.indexSlug,
            set: { priceChange: change, lastPrice: parseFloat(indexData.lastPrice || '0'), lastUpdated: new Date() },
          });

        return db.query.sectors.findFirst({ where: eq(sectors.indexSlug, sector.slug) });
      })
    );

    return NextResponse.json(updated.filter(Boolean));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch NSE data' }, { status: 500 });
  }
}