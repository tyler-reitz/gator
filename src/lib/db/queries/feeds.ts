import { db } from "src/lib/db";
import { feeds, SelectUser, users } from "src/lib/db/schema";
import { printFeed } from "../schema";
import { eq } from "drizzle-orm";
import { createFeedFollows } from "./feedFollows";

export async function createFeed(name: string, url: string, user: SelectUser) {
  const [feed] = await db
    .insert(feeds)
    .values({ name, url, user_id: user.id })
    .returning()
    .onConflictDoNothing();

  return feed
}

export async function getFeeds() {
  return await db.select().from(feeds).leftJoin(users, eq(feeds.user_id, users.id))
}

export async function getFeedByURL(url: string) {
  const [feed] = await db.select().from(feeds).where(eq(feeds.url, url))
  return feed
}

