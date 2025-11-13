import { readConfig } from "src/config";
import { createFeed } from "src/lib/db/queries/feeds";
import { getUser } from "src/lib/db/queries/users";
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

export async function handleAddFeed(cmdName: string, ...args: [string, string]) {
  const config = readConfig()

  const user = await getUser(config.currentUserName)

  await createFeed(...args, user)
}
