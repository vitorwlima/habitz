import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const habits = sqliteTable('habits', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	rewardPoints: integer('reward_points').notNull(),
	days: text('days').notNull(),
	userId: text('user_id').notNull(),
})

export type Habit = typeof habits.$inferSelect
