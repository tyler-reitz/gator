import { setUser } from "src/config"

export function handleLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error(`usage: ${cmdName} <name>`)
  }

  const [user] = args
  setUser(user)
  console.log(`User ${user} has been set`)
}

