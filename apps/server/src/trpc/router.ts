import { router } from '.'
import { habitRouter } from '../routers/habit'
import { habitsCompletionRouter } from '../routers/habits-completion'

export const appRouter = router({
	habit: habitRouter,
	completion: habitsCompletionRouter,
})

export type AppRouter = typeof appRouter
