import { z } from 'zod'
import { publicProcedure } from '../..'
import { db } from '../../db'
import { rewards } from '../../db/schema'

export const createReward = publicProcedure
	.input(
		z.object({
			name: z.string().min(3),
			pointsToClaim: z.number().min(0),
			userId: z.string(),
		}),
	)
	.mutation(async ({ input }) => {
		const reward = await db
			.insert(rewards)
			.values({
				id: crypto.randomUUID(),
				name: input.name,
				pointsToClaim: input.pointsToClaim,
				userId: input.userId,
			})
			.returning({ id: rewards.id })

		return reward
	})
