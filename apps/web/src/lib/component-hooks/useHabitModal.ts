import { Props } from '@/components/common/habit-modal'
import { DayValue, allDaysList } from '@/lib/days'
import { trpc } from '@/lib/trpc'
import { useZodForm } from '@/lib/useZedForm'
import { useUser } from '@clerk/clerk-react'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

const habitSchema = z.object({
	name: z.string().min(3),
	days: z
		.array(
			z.enum([
				allDaysList[0].value,
				...allDaysList.slice(1).map((day) => day.value),
			]),
		)
		.min(1)
		.max(7),
})

export const useHabitModal = ({ type, habit }: Omit<Props, 'children'>) => {
	const { user } = useUser()
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()
	const allHabitsQuery = trpc.habit.getHabits.useQuery({
		userId: user!.id,
	})
	const createHabitMutation = trpc.habit.createHabit.useMutation()
	const updateHabitMutation = trpc.habit.updateHabit.useMutation()
	const habitsKey = getQueryKey(trpc.habit.getHabits)

	const { register, watch, setValue, handleSubmit, reset } = useZodForm({
		schema: habitSchema,
		defaultValues: {
			name: habit?.name ?? undefined,
			days: (habit?.days?.split(',') as DayValue[]) ?? [],
		},
		onSubmit: (data) => {
			if (type === 'create') {
				const newHabitOrder = allHabitsQuery.data?.habits.length ?? 0

				createHabitMutation.mutate(
					{
						...data,
						order: newHabitOrder,
						userId: user!.id,
					},
					{
						onSuccess: ([successData]) => {
							queryClient.setQueriesData(habitsKey, (old) => {
								const oldHabits = (old as { habits: [] })?.habits as {
									id: string
									name: string
									days: string
									userId: string
								}[]

								const habits = [
									...oldHabits.slice(0, oldHabits.length - 1),
									{
										...oldHabits[oldHabits.length - 1],
										id: successData.id,
									},
								]

								return { habits }
							})
						},
					},
				)

				queryClient.setQueriesData(habitsKey, (old) => {
					const habits = [
						...((old as { habits: [] })?.habits as []),
						{
							name: data.name,
							days: data.days.join(','),
							userId: user!.id,
						},
					]

					return { habits }
				})

				toast.success('Habit successfully created.')
				reset()
				setOpen(false)
				return
			}

			updateHabitMutation.mutate({
				...data,
				id: habit?.id as string,
				userId: user!.id,
			})

			queryClient.setQueriesData(habitsKey, (old) => {
				const oldHabits = (old as { habits: [] })?.habits as {
					id: string
					name: string
					days: string
					userId: string
				}[]

				const habits = oldHabits.map((oldHabit) => {
					if (oldHabit.id !== habit?.id) {
						return oldHabit
					}

					return {
						...habit,
						name: data.name,
						days: data.days.join(','),
					}
				})

				return { habits }
			})

			toast.success('Habit successfully updated.')
			reset(data)
			setOpen(false)
		},
	})

	const selectedDays = watch('days')
	const handleSelectDay = (checked: string | boolean, day: DayValue) => {
		if (checked) {
			setValue('days', [...selectedDays, day])
			return
		}

		setValue(
			'days',
			selectedDays.filter((d) => d !== day),
		)
	}

	return {
		open,
		setOpen,
		register,
		selectedDays,
		handleSubmit,
		handleSelectDay,
	}
}
