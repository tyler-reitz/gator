
import { setUser } from "src/config";
import { createUser, getUser } from "src/lib/db/queries/users";

export async function handleLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error(`usage: ${cmdName} <name>`);
  }

  const [user] = args;

  if (await getUser(user) === undefined) {
    throw new Error(`${user} is not registered`)
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
    const result = await createUser(name)
    setUser(name)
    console.log(`User: ${name} was created`) 
  } catch (e) {
    console.error((e as Error).message)
    process.exit(1)
  }
}
