import { readConfig } from "src/config";
import { createFeedFollows } from "src/lib/db/queries/feedFollows";
import { createFeed, getFeeds, getNextFeedToFetch, markFetched } from "src/lib/db/queries/feeds";
import { createPosts } from "src/lib/db/queries/posts";
import { getUser, getUserById } from "src/lib/db/queries/users";
import { printFeed, SelectFeed, SelectUser } from "src/lib/db/schema";
import { fetchFeed } from "src/lib/http";

export async function handleAgg(cmdName: string, ...args: string[]) {
  await scrapeFeed()

  const intervalId = setInterval(async () => {
    await scrapeFeed()
  }, 3000)

  await new Promise((resolve) => {
    process.on('exit', () => {
      console.log('cleaning up')
      clearInterval(intervalId)
      process.exit(0)
    })
  })
}

export async function scrapeFeed() {
  const feed = await getNextFeedToFetch()
  console.log(feed)

  const rss = await fetchFeed(feed.url)
  console.log(rss)

  await markFetched(feed)

  await createPosts(rss.channel.item, feed)
}

export async function handleAddFeed(cmdName: string, user: SelectUser, ...args: [string, string]) {
  const feed = await createFeed(...args, user)

  await createFeedFollows(user, feed)
  printFeed(feed, user)
}

export async function handleFeeds(cmdName: string, ...args: string[]) {
  const feeds = await getFeeds()

  for (const feed of feeds) {
    console.log(feed)
  }
}
