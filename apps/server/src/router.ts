import { z } from 'zod'
import { trpc } from './trpc'

export const appRouter = trpc.router({
	getHabits: trpc.procedure
		.input(z.object({ userId: z.string() }))
		.query(() => {
			return { habits: [] }
		}),
	createHabit: trpc.procedure
		.input(
			z.object({
				name: z.string().min(3),
				rewardPoints: z.coerce.number().min(0).max(10),
				days: z.array(z.string()).min(1).max(7),
			}),
		)
		.mutation(({ input }) => {
			console.log(input)
		}),
})

export type AppRouter = typeof appRouter
