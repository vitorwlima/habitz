import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc'
import { useUser } from '@clerk/clerk-react'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { CheckCircle, CircleSlash } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
	habit: {
		userId: string
		id: string
		name: string
		days: string
	}
	date: string
	completion?: {
		userId: string
		date: string
		id: string
		habitId: string
		completed: number
	}
}

export const TrackerHabitCard: React.FC<Props> = ({
	habit,
	date,
	completion,
}) => {
	const { user } = useUser()
	const { mutate } = trpc.completion.triggerCompletion.useMutation()
	const queryClient = useQueryClient()
	const completionsQueryKey = getQueryKey(trpc.completion.getCompletions, {
		date,
		userId: user!.id,
	})
	const isCompleted = Boolean(completion?.completed)

	const handleTriggerCompletion = () => {
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

	return (
		<Card
			key={habit.id}
			className="flex items-center justify-between p-6 cursor-pointer"
			onClick={handleTriggerCompletion}
		>
			<div>
				<CardHeader className="p-0">
					<CardTitle className="text-lg font-medium">{habit.name}</CardTitle>
				</CardHeader>
			</div>

			<div className="relative">
				{isCompleted ? (
					<CheckCircle className="w-6 h-6 text-green-500" />
				) : (
					<CircleSlash className="w-6 h-6 text-border" />
				)}
			</div>
		</Card>
	)
}
