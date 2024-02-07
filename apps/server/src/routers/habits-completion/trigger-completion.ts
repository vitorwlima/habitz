import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { publicProcedure } from '../..'
import { db } from '../../db'
import { habitsCompletions, rewardPoints } from '../../db/schema'

export const triggerCompletion = publicProcedure
	.input(
		z.object({
			habitId: z.string(),
			completionId: z.string().optional(),
			userId: z.string(),
			earnedPoints: z.number().min(0),
			rewardPoints: z.number().min(0),
			date: z.string(),
			completed: z.boolean(),
		}),
	)
	.mutation(async ({ input }) => {
		const existingRewardPoints = await db
			.select()
			.from(rewardPoints)
			.where(eq(rewardPoints.userId, input.userId))
		const pointsDiff = input.completed
			? input.rewardPoints
			: input.earnedPoints * -1

		console.log({ existingRewardPoints, userId: input.userId })

		if (existingRewardPoints.length) {
			await db
				.update(rewardPoints)
				.set({
					points: existingRewardPoints[0].points + pointsDiff,
				})
				.where(eq(rewardPoints.userId, input.userId))
		} else {
			console.log('to dando novo insert')
			await db.insert(rewardPoints).values({
				id: crypto.randomUUID(),
				userId: input.userId,
				points: pointsDiff,
			})
		}

		if (input.completionId) {
			const completion = await db
				.update(habitsCompletions)
				.set({
					completed: Number(input.completed),
					earnedPoints: input.rewardPoints,
				})
				.where(eq(habitsCompletions.id, input.completionId))

			return completion
		}

		const completion = await db
			.insert(habitsCompletions)
			.values({
				id: crypto.randomUUID(),
				habitId: input.habitId,
				userId: input.userId,
				earnedPoints: input.rewardPoints,
				date: input.date,
				completed: Number(input.completed),
			})
			.returning({ id: habitsCompletions.id })

		return completion
	})
