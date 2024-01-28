import { router } from '../..'
import { createHabit } from './create-habit'
import { getHabits } from './get-habits'

export const habitRouter = router({
	getHabits,
	createHabit,
})
