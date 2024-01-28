import { router } from '.'
import { habitRouter } from '../routers/habit'

export const appRouter = router({
	habit: habitRouter,
})

export type AppRouter = typeof appRouter
