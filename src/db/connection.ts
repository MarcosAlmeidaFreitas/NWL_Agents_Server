import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '../env.ts'
import { schema } from './schema/index.ts'

export const sql = postgres(env.DATABASE_URL)

// const result = await sql`SELECT 'HELLO' as message`
export const db = drizzle(sql, {
  schema,
  casing: 'snake_case',
})
// console.log(result)
