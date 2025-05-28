const { pgTable, varchar, bigint, timestamp, integer, index, smallint, serial, primaryKey,
  pgEnum, date, boolean, text, numeric } = require('drizzle-orm/pg-core');

const providerTypeEnum = pgEnum("provider_type", ["email", "google", "line"]);
const roleEnum = pgEnum("role", ["admin", "user"]);
const NotificationTypeEnum = pgEnum("notification_type", ["new_participant", "new_comment"]);

const usersTable = pgTable("users", {
  id: serial().primaryKey(),
  username: varchar({ length: 100 }).notNull().unique(),
  nickname: varchar({ length: 100 }),
  email: varchar({ length: 100 }).notNull().unique(),
  password: varchar({ length: 100 }).notNull(),
  role: roleEnum().default('user'),
  birthday: date(),
  isVerifiedEmail: boolean("is_verified_email").default(false),
  providerType: providerTypeEnum("provider_type"),
  providerId: varchar("provider_id", { length: 100 }),
  avatarUrl: varchar("avatar_url", { length: 255 }),
  avatarKey: varchar("avatar_key", { length: 255 }),
  avatarLastUpdated: timestamp("avatar_last_updated").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  status: smallint("status").default(1).notNull(),
});

const userNotificationTable = pgTable("user_notification", {
  id: serial().primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  notificationType: NotificationTypeEnum("notification_type").notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

const userBarCollectionTable = pgTable("user_bar_collection", {
  id: serial().primaryKey(),
  userId: integer("user_id").references(() => usersTable.id, { onDelete: "cascade" }),
  barId: integer("bar_id").references(() => barsTable.id, { onDelete: "cascade" }),
  folderId: integer("folder_id").references(() => userBarFolderTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  userBarUnique: unique().on(table.userId, table.barId),
}));

const userBarFolderTable = pgTable("user_bar_folder", {
  id: serial().primaryKey(),
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }),
  folderName: varchar("folder_name", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
})

const barsTable = pgTable("bars", {
  id: serial().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  address: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 20 }).notNull(),
  description: text(),
  rating: numeric("rating", { precision: 3, scale: 1 }), // 計算至小數點一位
  openHours: varchar("open_hours", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

const userEventCollectionTable = pgTable("user_event_collection", {
  id: serial().primaryKey(),
  userId: integer("user_id").references(() => usersTable.id, { onDelete: "cascade" }),
  eventId: bigint("event_id", { mode: "string" }).references(() => events.id, { onDelete: "cascade" }),
  folderId: integer("folder_id").references(() => userEventFolderTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  userEventUnique: unique().on(table.userId, table.eventId),
}));

const userEventParticipationTable = pgTable("user_event_participation", {
  id: serial().primaryKey(),
  userId: integer("user_id").references(() => usersTable.id, { onDelete: "cascade" }),
  eventId: bigint("event_id", { mode: "string" }).references(() => events.id, { onDelete: "cascade" }),
  joinedAt: timestamp("joined_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const userEventFolderTable = pgTable("user_event_folder", {
  id: serial().primaryKey(),
  userId: integer().references(() => usersTable.id, { onDelete: "cascade" }),
  folderName: varchar("folder_name", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
})

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
  hostUser: integer('host_user').notNull(),
  createdAt: timestamp('created_at').notNull(),
  modifyAt: timestamp('modify_at').notNull(),
  status: smallint('status').default(1).notNull(), //1: 正常，2: 刪除
}, (table) => ({
  hostUserIdx: index('idx_host_user').on(table.hostUser),
}));

const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
});

const eventTags  = pgTable('event_tags', {
  eventId: bigint('event_id', { mode: 'string' }).notNull().references(() => events.id, {onDelete: 'cascade'}),
  tagId: integer('tag_id').notNull().references(() => tags.id, {onDelete: 'cascade'}),
}, (table) => ({
  pk: primaryKey({ columns: [table.eventId, table.tagId] })
}));



module.exports = {
  usersTable,
  userNotificationTable,
  userBarCollectionTable,
  userBarFolderTable,
  barsTable,
  userEventCollectionTable,
  userEventParticipationTable,
  userEventFolderTable,
  events,
  tags,
  eventTags
};