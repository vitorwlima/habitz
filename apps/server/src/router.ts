import { z } from 'zod'
import { trpc } from './trpc'

export const appRouter = trpc.router({
	greeting: trpc.procedure
		.input(z.object({ name: z.string() }))
		.query(({ input }) => {
			return { text: input.name }
		}),
})

export type AppRouter = typeof appRouter
