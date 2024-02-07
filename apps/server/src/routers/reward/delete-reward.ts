import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { publicProcedure } from '../..'
import { db } from '../../db'
import { claimedRewards, rewards } from '../../db/schema'

export const deleteReward = publicProcedure
	.input(z.object({ id: z.string() }))
	.mutation(async ({ input }) => {
		await db.delete(claimedRewards).where(eq(claimedRewards.rewardId, input.id))
		await db.delete(rewards).where(eq(rewards.id, input.id))
	})
