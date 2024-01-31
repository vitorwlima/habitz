import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { publicProcedure } from '../..'
import { db } from '../../db'
import { habitsCompletions } from '../../db/schema'

export const triggerCompletion = publicProcedure
	.input(
		z.object({
			habitId: z.string(),
			completionId: z.string().optional(),
			userId: z.string(),
			earnedPoints: z.number().min(0).max(10),
			date: z.string(),
			completed: z.boolean(),
		}),
	)
	.mutation(async ({ input }) => {
		if (input.completionId) {
			const completion = await db
				.update(habitsCompletions)
				.set({
					completed: Number(input.completed),
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
				earned_points: input.earnedPoints,
				date: input.date,
				completed: Number(input.completed),
			})
			.returning({ id: habitsCompletions.id })

		return completion
	})
