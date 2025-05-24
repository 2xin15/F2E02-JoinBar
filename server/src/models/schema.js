const { pgTable, varchar, bigint, timestamp, integer, index } = require('drizzle-orm/pg-core');

const events = pgTable('events', {
  id: bigint('id', { mode: 'string' }).primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  barName: varchar('bar_name', { length: 100 }).notNull(),
  location: varchar('location', { length: 100 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  maxPeople: integer('max_people'),
  imageUrl: varchar('image_url', { length: 255 }),
  price: integer('price'),
  hostUser: bigint('host_user', { mode: 'string' }).notNull(),
  createdAt: timestamp('created_at').notNull(),
  modifyAt: timestamp('modify_at').notNull(),
}, (table) => ({
  hostUserIdx: index('idx_host_user').on(table.hostUser),
}));

module.exports = { events };