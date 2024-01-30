import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { publicProcedure } from '../..'
import { db } from '../../db'
import { habits, habitsCompletions } from '../../db/schema'

export const deleteHabit = publicProcedure
	.input(
		z.object({
			id: z.string(),
		}),
	)
	.mutation(async ({ input }) => {
		await db
			.delete(habitsCompletions)
			.where(eq(habitsCompletions.habitId, input.id))

		const habit = await db.delete(habits).where(eq(habits.id, input.id))

		return habit
	})
