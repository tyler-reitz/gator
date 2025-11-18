import {
  type CommandRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands.js";
import { handleAddFeed, handleAgg, handleFeeds } from "./commands/feed.js";
import { handleFollow, handleFollowing } from "./commands/feedFollows.js";
import {
  handleLogin,
  handleRegister,
  handleReset,
  handleUsers,
} from "./commands/user.js";

const registry: CommandRegistry = {};

registerCommand(registry, "login", handleLogin);
registerCommand(registry, "register", handleRegister);
registerCommand(registry, "reset", handleReset);
registerCommand(registry, "users", handleUsers);
registerCommand(registry, "agg", handleAgg);
registerCommand(registry, "addfeed", handleAddFeed);
registerCommand(registry, "feeds", handleFeeds);
registerCommand(registry, "follow", handleFollow);
registerCommand(registry, "following", handleFollowing);

async function main() {
  const [, , cmd, ...args] = process.argv;

  if (!cmd) {
    console.error("Must enter one of:");
    for (const cmd in registry) console.error(`- ${cmd}`);
    process.exit(1);
  }

  await runCommand(registry, cmd, ...args);
}

await main();
process.exit(0);
