
import {
  type CommandRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands.js";
import { handleLogin, handleRegister, handleReset } from "./commands/user.js";

const registry: CommandRegistry = {};

registerCommand(registry, "login", handleLogin);
registerCommand(registry, "register", handleRegister);
registerCommand(registry, "reset", handleReset);

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
process.exit(0)
