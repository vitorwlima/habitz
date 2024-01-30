import { router } from '../..'
import { getCompletions } from './get-completions'
import { triggerCompletion } from './trigger-completion'

export const habitsCompletionRouter = router({
	getCompletions,
	triggerCompletion,
})
