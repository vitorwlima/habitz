import { z } from 'zod'
import { publicProcedure } from '../..'
import { db } from '../../db'
import { habits } from '../../db/schema'

export const createHabit = publicProcedure
	.input(
		z.object({
			name: z.string().min(3),
			rewardPoints: z.coerce.number().min(0),
			days: z.array(z.string()).min(1).max(7),
			userId: z.string(),
		}),
	)
	.mutation(async ({ input }) => {
		const habit = await db
			.insert(habits)
			.values({
				id: crypto.randomUUID(),
				name: input.name,
				rewardPoints: input.rewardPoints,
				days: input.days.join(','),
				userId: input.userId,
			})
			.returning({ id: habits.id })

		return habit
	})
