import {
  type CommandRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands.js";
import { handleLogin } from "./commands/user.js";

const registry: CommandRegistry = {};

registerCommand(registry, "login", handleLogin);

function main() {
  const [, , cmd, ...args] = process.argv;

  if (!cmd) {
    console.error("Must enter one of:");
    for (const cmd in registry) console.error(`- ${cmd}`);
    process.exit(1);
  }

  runCommand(registry, cmd, ...args);
}

main();
