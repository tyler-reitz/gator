import { desc, eq } from "drizzle-orm";
import { db } from "..";
import { RSSItem } from "src/lib/http";
import { feedFollows, feeds, post, SelectFeed, SelectUser } from "../schema";

export async function createPosts(posts: RSSItem[], feed: SelectFeed) {
  await db
    .insert(post)
    .values(
      posts.map(p => ({
        ...p,
        url: p.link,
        publishedAt: new Date(p.pubDate),
        feed_id: feed.id
      }))
    )
    .onConflictDoNothing()
    .returning()
}

export async function getPostsForUser(user: SelectUser, n=2) {
  return await db
    .select()
    .from(post)
    .innerJoin(feedFollows, eq(feedFollows.feed_id, post.feed_id))
    .where(eq(feedFollows.users_id, user.id))
    .orderBy(desc(post.publishedAt))
    .limit(n)
}
