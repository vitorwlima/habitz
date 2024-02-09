import { Props } from '@/components/common/habits-list'
import { trpc } from '@/lib/trpc'
import { useUser } from '@clerk/clerk-react'
import {
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { toast } from 'sonner'

export const useHabitsList = ({ habits }: Props) => {
	const { user } = useUser()
	const { mutate } = trpc.habit.changeHabitsOrder.useMutation()
	const queryClient = useQueryClient()
	const habitsKey = getQueryKey(trpc.habit.getHabits)

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		}),
	)

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (active.id !== over?.id) {
			const oldIndex = habits.findIndex((h) => h.id === active.id)
			const newIndex = habits.findIndex((h) => h.id === over?.id)

			const habitIdsInOrder = arrayMove(habits, oldIndex, newIndex).map(
				(h) => h.id,
			)

			mutate({
				habitIdsInOrder,
				userId: user!.id,
			})

			queryClient.setQueriesData(habitsKey, (old) => {
				const oldHabits = (old as { habits: [] })?.habits as {
					id: string
					name: string
					days: string
					userId: string
				}[]

				const habits = oldHabits.map((h) => ({
					...h,
					order: habitIdsInOrder.indexOf(h.id),
				}))

				return { habits }
			})

			toast.success('Habit order updated successfully.')
		}
	}

	return {
		sensors,
		handleDragEnd,
	}
}
