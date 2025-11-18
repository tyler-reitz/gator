import { readConfig } from "src/config";
import { createFeedFollows, getFeedFollowsForUser } from "src/lib/db/queries/feedFollows";
import { getFeedByURL } from "src/lib/db/queries/feeds";
import { getUser } from "src/lib/db/queries/users";
import { printFeed, SelectUser } from "src/lib/db/schema";

export async function handleFollow(cmdName: string, user: SelectUser, ...args: string[]) {
  const [url] = args
  const feed = await getFeedByURL(url)

  await createFeedFollows(user, feed) 

  printFeed(feed, user)
}

export async function handleFollowing(cmdName: string, user: SelectUser, ...args: string[]) {
  const feeds = await getFeedFollowsForUser(user)
  console.log(user)
  for (const feed of feeds) {
    console.log(feed)
  }
}
