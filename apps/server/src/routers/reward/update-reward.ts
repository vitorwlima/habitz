import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { publicProcedure } from '../..'
import { db } from '../../db'
import { rewards } from '../../db/schema'

export const updateReward = publicProcedure
	.input(
		z.object({
			id: z.string(),
			name: z.string().min(3),
			pointsToClaim: z.number().min(0),
		}),
	)
	.mutation(async ({ input }) => {
		const reward = await db
			.update(rewards)
			.set({
				name: input.name,
				pointsToClaim: input.pointsToClaim,
			})
			.where(eq(rewards.id, input.id))

		return reward
	})
