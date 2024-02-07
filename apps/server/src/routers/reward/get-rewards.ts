import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { publicProcedure } from '../..'
import { db } from '../../db'
import { rewards } from '../../db/schema'

export const getRewards = publicProcedure
	.input(z.object({ userId: z.string() }))
	.query(async ({ input }) => {
		const result = await db
			.select()
			.from(rewards)
			.where(eq(rewards.userId, input.userId))

		return { rewards: result }
	})
