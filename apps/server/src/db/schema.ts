import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const habits = sqliteTable('habits', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	days: text('days').notNull(),
	userId: text('user_id').notNull(),
	order: integer('order').notNull(),
})

export const habitsRelations = relations(habits, ({ many }) => ({
	completions: many(habitsCompletions),
}))

export type Habit = typeof habits.$inferSelect

export const habitsCompletions = sqliteTable('habits_completions', {
	id: text('id').primaryKey(),
	habitId: text('habit_id').notNull(),
	date: text('date').notNull(),
	completed: integer('completed').notNull(),
	userId: text('user_id').notNull(),
})

export const habitsCompletionsRelations = relations(
	habitsCompletions,
	({ one }) => ({
		habit: one(habits, {
			fields: [habitsCompletions.habitId],
			references: [habits.id],
		}),
	}),
)

export type HabitsCompletion = typeof habitsCompletions.$inferSelect
