import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
export { sql } from 'drizzle-orm'

import * as schema from './schema'

const sqlite = new Database('src/db/sqlite.db')
export const db = drizzle(sqlite, { schema })

export { schema }
