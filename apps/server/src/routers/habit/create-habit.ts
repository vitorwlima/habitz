import { z } from 'zod'
import { publicProcedure } from '../..'
import { db } from '../../db'
import { habits } from '../../db/schema'

export const createHabit = publicProcedure
	.input(
		z.object({
			name: z.string().min(3),
			days: z.array(z.string()).min(1).max(7),
			order: z.number().min(0),
			userId: z.string(),
		}),
	)
	.mutation(async ({ input }) => {
		const habit = await db
			.insert(habits)
			.values({
				name: input.name,
				days: input.days.join(','),
				order: input.order,
				userId: input.userId,
			})
			.returning({ id: habits.id })

		return habit
	})
