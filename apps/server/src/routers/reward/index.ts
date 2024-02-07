import { router } from '../..'
import { createReward } from './create-reward'
import { deleteReward } from './delete-reward'
import { getRewards } from './get-rewards'
import { updateReward } from './update-reward'

export const rewardRouter = router({
	createReward,
	getRewards,
	updateReward,
	deleteReward,
})
