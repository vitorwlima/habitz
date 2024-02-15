import { relations } from 'drizzle-orm'
import { integer, pgTable, text, unique, uuid } from 'drizzle-orm/pg-core'

export const habits = pgTable(
	'habits',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: text('name').notNull(),
		days: text('days').notNull(),
		userId: text('user_id').notNull(),
		order: integer('order').notNull(),
	},
	(t) => ({
		unique: unique().on(t.name, t.userId),
	}),
)

export const habitsRelations = relations(habits, ({ many }) => ({
	completions: many(habitsCompletions),
}))

export type Habit = typeof habits.$inferSelect

export const habitsCompletions = pgTable('habits_completions', {
	id: uuid('id').primaryKey().defaultRandom(),
	habitId: uuid('habit_id')
		.notNull()
		.references(() => habits.id, { onDelete: 'cascade' }),
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
