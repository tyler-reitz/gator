import { CommandHandler, UserCommandHandler } from "./commands/commands";
import { readConfig } from "./config";
import { getUser } from "./lib/db/queries/users";

type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export const middlewareLoggedIn: middlewareLoggedIn = (handler) => {
  return async (cmdName: string, ...args: string[]) => {
    const config = readConfig();
    const user = await getUser(config.currentUserName);

    await handler(cmdName, user, ...args);
  };
};
