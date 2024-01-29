import { router } from '../..'
import { createHabit } from './create-habit'
import { deleteHabit } from './delete-habit'
import { getHabits } from './get-habits'
import { updateHabit } from './update-habit'

export const habitRouter = router({
	getHabits,
	createHabit,
	updateHabit,
	deleteHabit,
})
