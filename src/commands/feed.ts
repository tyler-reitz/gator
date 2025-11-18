import { readConfig } from "src/config";
import { createFeedFollows } from "src/lib/db/queries/feedFollows";
import { createFeed, getFeeds } from "src/lib/db/queries/feeds";
import { getUser, getUserById } from "src/lib/db/queries/users";
import { printFeed, SelectUser } from "src/lib/db/schema";
import { fetchFeed } from "src/lib/http";

export async function handleAgg(cmdName: string, ...args: string[]) {
  const rss = await fetchFeed("https://www.wagslane.dev/index.xml");

  const { item = [], title, description, link } = rss.channel;

  console.log({
    title,
    description,
    link,
    item: item.reduce(
      (acc, { title, link, description }) => [
        ...acc,
        { title, link, description },
      ],
      [],
    ),
  });
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
