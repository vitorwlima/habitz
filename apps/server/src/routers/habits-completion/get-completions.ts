import { and, eq } from 'drizzle-orm'
import { z } from 'zod'
import { publicProcedure } from '../..'
import { db } from '../../db'
import { habitsCompletions } from '../../db/schema'

export const getCompletions = publicProcedure
	.input(
		z.object({
			userId: z.string(),
			date: z.string(),
		}),
	)
	.query(async ({ input }) => {
		const completions = await db
			.select()
			.from(habitsCompletions)
			.where(
				and(
					eq(habitsCompletions.userId, input.userId),
					eq(habitsCompletions.date, input.date),
				),
			)

		return completions
	})
