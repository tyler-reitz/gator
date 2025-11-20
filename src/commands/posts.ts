import { getPostsForUser } from "src/lib/db/queries/posts";
import { SelectUser } from "src/lib/db/schema";

export async function handleBrowse(cmdName: string, user: SelectUser, ...args: string[]) {
  const postsForUser = await getPostsForUser(user)
  console.log(postsForUser)
}
