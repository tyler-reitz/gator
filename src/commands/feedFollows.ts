import { readConfig } from "src/config";
import { createFeedFollows, getFeedFollowsForUser } from "src/lib/db/queries/feedFollows";
import { getFeedByURL } from "src/lib/db/queries/feeds";
import { getUser } from "src/lib/db/queries/users";
import { printFeed } from "src/lib/db/schema";

export async function handleFollow(cmdName: string, ...args: string[]) {
  const [url] = args
  const config = readConfig()

  const user = await getUser(config.currentUserName)
  const feed = await getFeedByURL(url)

  await createFeedFollows(user, feed) 
  printFeed(feed, user)
}

export async function handleFollowing(cmdName: string, ...args: string[]) {
  const config = readConfig()

  const user = await getUser(config.currentUserName)

  const feeds = await getFeedFollowsForUser(user)

  console.log(user)
  for (const feed of feeds) {
    console.log(feed)
  }
}
