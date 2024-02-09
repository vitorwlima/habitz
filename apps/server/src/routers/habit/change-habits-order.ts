import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { publicProcedure } from '../..'
import { db } from '../../db'
import { habits } from '../../db/schema'

export const changeHabitsOrder = publicProcedure
	.input(
		z.object({
			habitIdsInOrder: z.array(z.string()),
			userId: z.string(),
		}),
	)
	.mutation(async ({ input }) => {
		const updatePromises = input.habitIdsInOrder.map((id, index) =>
			db
				.update(habits)
				.set({ order: index })
				.where(and(eq(habits.userId, input.userId), eq(habits.id, id))),
		)

		await Promise.all(updatePromises)
	})
