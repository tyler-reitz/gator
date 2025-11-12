
import { eq } from 'drizzle-orm'
import { db } from 'src/lib/db'
import { users } from 'src/lib/db/schema'

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({name}).returning()
  return result
}

export async function getUser(name: string) {
  const [result] = await db.select().from(users).where(eq(users.name, name))
  return result
}

export async function getUsers() {
  return await db.select().from(users)
}

export async function deleteUsers() {
  const result = await db.delete(users)
  console.log(result)
}
