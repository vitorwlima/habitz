import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { publicProcedure } from '../..'
import { db } from '../../db'
import { habits } from '../../db/schema'

export const getHabits = publicProcedure
	.input(z.object({ userId: z.string() }))
	.query(async ({ input }) => {
		const result = await db
			.select()
			.from(habits)
			.where(eq(habits.userId, input.userId))

		return { habits: result }
	})
