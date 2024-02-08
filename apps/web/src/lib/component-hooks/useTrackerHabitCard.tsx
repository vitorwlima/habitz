import { Props } from '@/components/common/tracker-habit-card'
import { trpc } from '@/lib/trpc'
import { useUser } from '@clerk/clerk-react'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { isFuture } from 'date-fns'
import { toast } from 'sonner'

export const useTrackerHabitCard = ({ habit, date, completion }: Props) => {
	const { user } = useUser()
	const { mutate } = trpc.completion.triggerCompletion.useMutation()
	const queryClient = useQueryClient()
	const completionsQueryKey = getQueryKey(trpc.completion.getCompletions, {
		date,
		userId: user!.id,
	})
	const isCompleted = Boolean(completion?.completed)

	const isTriggerCompletionDisabled = isFuture(date)

	const handleTriggerCompletion = () => {
		if (isTriggerCompletionDisabled) {
			return
		}

		mutate(
			{
				date,
				habitId: habit.id,
				completionId: completion?.id,
				completed: isCompleted ? false : true,
				userId: user!.id,
			},
			{
				onSuccess: ([successData]) => {
					if (completion?.id) {
						return
					}

					queryClient.setQueriesData(completionsQueryKey, (old) => {
						const oldCompletions = old as {
							userId: string
							date: string
							id: string
							habitId: string
							completed: number
						}[]

						return oldCompletions.map((c) => {
							if (c.habitId === habit.id && c.date === date) {
								return {
									...c,
									id: successData.id,
								}
							}

							return c
						})
					})
				},
			},
		)

		queryClient.setQueriesData(completionsQueryKey, (old) => {
			const oldCompletions = old as {
				userId: string
				date: string
				id: string
				habitId: string
				completed: number
			}[]

			if (oldCompletions.find((c) => c.id === completion?.id)) {
				return oldCompletions.map((c) => {
					if (c.id === completion!.id) {
						return {
							...c,
							completed: isCompleted ? 0 : 1,
						}
					}

					return c
				})
			}

			return [
				...oldCompletions,
				{
					date,
					id: undefined,
					userId: user!.id,
					habitId: habit.id,
					completed: true,
				},
			]
		})

		if (isCompleted) {
			toast.success('Habit successfully updated.')
		} else {
			toast.success('Habit successfully completed.')
		}
	}

	return {
		isCompleted,
		handleTriggerCompletion,
		isTriggerCompletionDisabled,
	}
}
