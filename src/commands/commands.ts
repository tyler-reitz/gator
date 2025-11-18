import { SelectUser } from "src/lib/db/schema";

export type CommandHandler = (
  cmdName: string,
  ...args: string[]
) => Promise<void>;

export type UserCommandHandler = (
  cmdName: string,
  user: SelectUser,
  ...args: string[]
) => Promise<void>;

export type CommandRegistry = Record<string, CommandHandler>;

export function registerCommand(
  registry: CommandRegistry,
  cmdName: string,
  handler: CommandHandler,
) {
  registry[cmdName] = handler;
}

export async function runCommand(
  registry: CommandRegistry,
  cmdName: string,
  ...args: string[]
) {
  try {
    await registry[cmdName](cmdName, ...args);
  } catch (e) {
    console.error(e as Error);
    process.exit(1);
  }
}
