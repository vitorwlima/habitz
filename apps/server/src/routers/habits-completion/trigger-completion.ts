import { isFuture } from 'date-fns'
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
			date: z.string(),
			completed: z.boolean(),
		}),
	)
	.mutation(async ({ input }) => {
		if (isFuture(input.date)) {
			throw new Error('Cannot complete a future habit.')
		}

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
				habitId: input.habitId,
				userId: input.userId,
				date: input.date,
				completed: Number(input.completed),
			})
			.returning({ id: habitsCompletions.id })

		return completion
	})
