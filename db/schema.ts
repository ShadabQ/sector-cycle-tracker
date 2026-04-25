import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const sectors = sqliteTable('sectors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  indexSlug: text('indexSlug').notNull(),
  cyclePhase: text('cyclePhase').notNull().default('Mid Cycle'),
  priceChange: real('priceChange').default(0),
  lastPrice: real('lastPrice').default(0),
  notes: text('notes').default(''),
  lastUpdated: integer('lastUpdated', { mode: 'timestamp' }).default(new Date()),
});