import { router } from '.'
import { habitRouter } from '../routers/habit'
import { habitsCompletionRouter } from '../routers/habits-completion'
import { rewardRouter } from '../routers/reward'

export const appRouter = router({
	habit: habitRouter,
	completion: habitsCompletionRouter,
	reward: rewardRouter,
})

export type AppRouter = typeof appRouter
