import { eq } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds, SelectFeed, SelectUser, users } from "../schema";

export async function createFeedFollows(user: SelectUser, feed: SelectFeed) {
  return await db
    .insert(feedFollows)
    .values({ users_id: user.id, feed_id: feed.id })
    .returning();
}

export async function getFeedFollowsForUser(user: SelectUser) {
  return await db
    .select()
    .from(feedFollows)
    .leftJoin(users, eq(feedFollows.users_id, users.id))
    .leftJoin(feeds, eq(feedFollows.feed_id, feeds.id))
    .where(eq(feedFollows.users_id, user.id))
}
