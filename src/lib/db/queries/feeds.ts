import { db } from "src/lib/db";
import { feeds, SelectFeed, SelectUser, users } from "src/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function createFeed(name: string, url: string, user: SelectUser) {
  const [feed] = await db
    .insert(feeds)
    .values({ name, url, user_id: user.id })
    .returning()
    .onConflictDoNothing();

  return feed;
}

export async function getFeeds() {
  return await db
    .select()
    .from(feeds)
    .leftJoin(users, eq(feeds.user_id, users.id));
}

export async function getFeedByURL(url: string) {
  const [feed] = await db.select().from(feeds).where(eq(feeds.url, url));
  return feed;
}

export async function markFetched(feed: SelectFeed) {
  return await db
    .update(feeds)
    .set({ lastFetchedAt: new Date() })
    .where(eq(feeds.id, feed.id))
    .returning()
}

export async function getNextFeedToFetch() {
  const [feed] = await db
    .select()
    .from(feeds)
    .orderBy(sql`${feeds.lastFetchedAt} ASC NULLS FIRST`)
    .limit(1)

  return feed
}
