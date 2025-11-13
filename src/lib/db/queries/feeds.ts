import { db } from "src/lib/db";
import { feeds, SelectUser } from "src/lib/db/schema";
import { printFeed } from "../schema";

export async function createFeed(name: string, url: string, user: SelectUser) {
  const [feed] = await db
    .insert(feeds)
    .values({ name, url, user_id: user.id })
    .returning()
    .onConflictDoNothing();

  printFeed(feed, user);
}
