import { Props } from '@/components/common/reward-modal'
import { trpc } from '@/lib/trpc'
import { useZodForm } from '@/lib/useZedForm'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

const rewardSchema = z.object({
	name: z.string().min(3),
	pointsToClaim: z.coerce.number().min(0),
})

export const useRewardModal = ({ type, reward }: Omit<Props, 'children'>) => {
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()
	const createRewardMutation = trpc.reward.createReward.useMutation()
	const updateRewardMutation = trpc.reward.updateReward.useMutation()
	const deleteRewardMutation = trpc.reward.deleteReward.useMutation()
	const rewardsKey = getQueryKey(trpc.reward.getRewards)

	const { register, handleSubmit, reset } = useZodForm({
		schema: rewardSchema,
		defaultValues: {
			name: reward?.name ?? undefined,
			pointsToClaim: reward?.pointsToClaim ?? undefined,
		},
		onSubmit: (data) => {
			if (type === 'create') {
				createRewardMutation.mutate(
					{
						...data,
						userId: 'default-user-id',
					},
					{
						onSuccess: ([successData]) => {
							queryClient.setQueriesData(rewardsKey, (old) => {
								const oldRewards = (old as { rewards: [] })?.rewards as {
									id: string
									name: string
									pointsToClaim: number
									userId: string
								}[]

								const rewards = [
									...oldRewards.slice(0, oldRewards.length - 1),
									{
										...oldRewards[oldRewards.length - 1],
										id: successData.id,
									},
								]

								return { rewards }
							})
						},
					},
				)

				queryClient.setQueriesData(rewardsKey, (old) => {
					const rewards = [
						...((old as { rewards: [] })?.rewards as []),
						{
							name: data.name,
							pointsToClaim: data.pointsToClaim,
							userId: 'default-user-id',
						},
					]

					return { rewards }
				})

				toast.success('Reward successfully created.')
				reset()
				setOpen(false)
				return
			}

			updateRewardMutation.mutate({
				...data,
				id: reward?.id as string,
			})

			queryClient.setQueriesData(rewardsKey, (old) => {
				const oldRewards = (old as { rewards: [] })?.rewards as {
					id: string
					name: string
					pointsToClaim: number
					userId: string
				}[]

				const rewards = oldRewards.map((oldReward) => {
					if (oldReward.id !== reward?.id) {
						return oldReward
					}

					return {
						...reward,
						name: data.name,
						pointsToClaim: data.pointsToClaim,
					}
				})

				return { rewards }
			})

			toast.success('Reward successfully updated.')
			reset(data)
			setOpen(false)
		},
	})

	const handleDeleteReward = () => {
		deleteRewardMutation.mutate({
			id: reward?.id as string,
		})

		queryClient.setQueriesData(rewardsKey, (old) => {
			const oldRewards = (old as { rewards: [] })?.rewards as {
				id: string
				name: string
				pointsToClaim: number
				userId: string
			}[]

			const rewards = oldRewards.filter(
				(oldReward) => oldReward.id !== reward?.id,
			)

			return { rewards }
		})

		toast.success('Reward successfully deleted.')
		reset()
		setOpen(false)
	}

	return {
		open,
		setOpen,
		register,
		handleSubmit,
		handleDeleteReward,
	}
}
