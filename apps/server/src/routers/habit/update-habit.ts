import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { publicProcedure } from '../..'
import { db } from '../../db'
import { habits } from '../../db/schema'

export const updateHabit = publicProcedure
	.input(
		z.object({
			id: z.string(),
			name: z.string().min(3),
			rewardPoints: z.coerce.number().min(0).max(10),
			days: z.array(z.string()).min(1).max(7),
			userId: z.string(),
		}),
	)
	.mutation(async ({ input }) => {
		const habit = await db
			.update(habits)
			.set({
				name: input.name,
				rewardPoints: input.rewardPoints,
				days: input.days.join(','),
			})
			.where(eq(habits.id, input.id))

		return habit
	})
