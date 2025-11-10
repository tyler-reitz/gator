export type CommandHandler = (cmdName: string, ...args: string[]) => void

export type CommandRegistry = Record<string, CommandHandler>

export function registerCommand(
  registry: CommandRegistry,
  cmdName: string,
  handler: CommandHandler,
) {
  registry[cmdName]=handler
}

export function runCommand(
  registry: CommandRegistry,
  cmdName: string,
  ...args: string[]
) {
  try {
    registry[cmdName](cmdName, ...args)
  } catch (e) {
    console.error((e as Error).message)
    process.exit(1)
  }
}

