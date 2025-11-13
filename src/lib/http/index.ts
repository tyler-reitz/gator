import { XMLParser } from "fast-xml-parser";

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  }
}

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  const parser = new XMLParser()

  const resp = await fetch(feedURL, { headers: { "User-Agent": "gator" } });
  const text = await resp.text()

  const rss = parser.parse(text)
  return rss.rss
}
