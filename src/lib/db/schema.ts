import { pgTable, timestamp, uuid, text, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created-at").notNull().defaultNow(),
  updatedAt: timestamp("updated-at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const feeds = pgTable("feeds", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created-at").notNull().defaultNow(),
  updatedAt: timestamp("updated-at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
  url: text("url").notNull().unique(),
  user_id: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  lastFetchedAt: timestamp("last_fetched_at"),
});

export type SelectFeed = typeof feeds.$inferSelect;
export type InsertFeed = typeof feeds.$inferInsert;

export function printFeed(
  feed: SelectFeed | InsertFeed,
  user: SelectUser | InsertUser,
) {
  console.log(feed, user);
}

export const post = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  title: text("title").notNull().unique(),
  url: text("url").notNull().unique(),
  description: text("description").notNull(),
  publishedAt: timestamp("published_at").notNull(),
  feed_id: uuid("feed_id")
    .references(() => feeds.id, { onDelete: "cascade" })
    .notNull(),
});

export type SelectPost = typeof post.$inferSelect;
export type InsertPost = typeof post.$inferInsert;

export const feedFollows = pgTable(
  "feed_follows",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    createdAt: timestamp("created-at").notNull().defaultNow(),
    updatedAt: timestamp("updated-at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    users_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    feed_id: uuid("feed_id")
      .notNull()
      .references(() => feeds.id, { onDelete: "cascade" }),
  },
  (t) => [unique().on(t.users_id, t.feed_id)],
);
