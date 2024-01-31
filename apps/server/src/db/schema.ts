import { relations } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const habits = sqliteTable('habits', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	rewardPoints: integer('reward_points').notNull(),
	days: text('days').notNull(),
	userId: text('user_id').notNull(),
})

export const habitsRelations = relations(habits, ({ many }) => ({
	completions: many(habitsCompletions),
}))

export type Habit = typeof habits.$inferSelect

export const habitsCompletions = sqliteTable('habits_completions', {
	id: text('id').primaryKey(),
	habitId: text('habit_id').notNull(),
	date: text('date').notNull(),
	earned_points: integer('earned_points').notNull(),
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

export const rewards = sqliteTable('rewards', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	pointsToClaim: integer('points_to_claim').notNull(),
	userId: text('user_id').notNull(),
})

export const rewardsRelations = relations(rewards, ({ many }) => ({
	claims: many(claimedRewards),
}))

export type Reward = typeof rewards.$inferSelect

export const claimedRewards = sqliteTable('claimed_rewards', {
	id: text('id').primaryKey(),
	rewardId: text('reward_id').notNull(),
	date: text('date').notNull(),
	claimed: integer('claimed').notNull(),
	userId: text('user_id').notNull(),
})

export const claimedRewardsRelations = relations(claimedRewards, ({ one }) => ({
	reward: one(rewards, {
		fields: [claimedRewards.rewardId],
		references: [rewards.id],
	}),
}))

export type ClaimedReward = typeof claimedRewards.$inferSelect

export const rewardPoints = sqliteTable('reward_points', {
	id: text('id').primaryKey(),
	points: integer('points').notNull(),
	userId: text('user_id').notNull(),
})

export type RewardPoint = typeof rewardPoints.$inferSelect
