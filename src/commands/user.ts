import { readConfig, setUser } from "src/config";
import {
  createUser,
  deleteUsers,
  getUser,
  getUsers,
} from "src/lib/db/queries/users";

export async function handleLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error(`usage: ${cmdName} <name>`);
  }

  const [user] = args;

  if ((await getUser(user)) === undefined) {
    throw new Error(`${user} is not registered`);
  }

  setUser(user);
  console.log(`User ${user} has been set`);
}

export async function handleRegister(cmdName: string, ...args: string[]) {
  const [name] = args;

  if (!name) {
    throw new Error("Must provide a name");
  }

  try {
    const result = await createUser(name);
    setUser(name);
    console.log(`User: ${name} was created`);
  } catch (e) {
    console.error((e as Error).message);
    process.exit(1);
  }
}

export async function handleReset(cmdName: string, ...args: string[]) {
  try {
    await deleteUsers();
  } catch (e) {
    console.error((e as Error).message);
    process.exit(1);
  }
}

export async function handleUsers() {
  try {
    const config = readConfig();
    const users = await getUsers();
    for (const user of users) {
      console.log(
        `${user.name} ${config.currentUserName === user.name ? "(current)" : ""}`,
      );
    }
  } catch (e) {
    console.error((e as Error).message);
    process.exit(1);
  }
}
