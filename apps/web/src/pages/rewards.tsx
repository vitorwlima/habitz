import { RewardModal } from '@/components/common/reward-modal'
import { RewardsList } from '@/components/common/rewards-list'
import { trpc } from '@/lib/trpc'

export const Rewards: React.FC = () => {
	const { data } = trpc.reward.getRewards.useQuery({
		userId: 'default-user-id',
	})
	const rewards = data?.rewards ?? []

	return (
		<div>
			<header className="flex items-center justify-between mb-8">
				<h2 className="text-xl font-semibold">My Rewards</h2>
				<RewardModal type="create" />
			</header>

			<RewardsList rewards={rewards} />
		</div>
	)
}
