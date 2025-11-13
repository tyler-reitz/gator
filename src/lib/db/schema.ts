import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created-at").notNull().defaultNow(),
  updatedAt: timestamp("updated-at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
});

export type SelectUser = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert

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
});

export type SelectFeed = typeof feeds.$inferSelect
export type InsertFeed = typeof feeds.$inferInsert

export function printFeed(feed: SelectFeed|InsertFeed, user: SelectUser|InsertUser) {
  console.log(feed, user)
}
