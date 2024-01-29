import { Props } from '@/components/common/habit-modal'
import { DayValue, allDaysList } from '@/lib/days'
import { trpc } from '@/lib/trpc'
import { useZodForm } from '@/lib/useZedForm'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useState } from 'react'
import { z } from 'zod'

const habitSchema = z.object({
	name: z.string().min(3),
	rewardPoints: z.coerce.number().min(0).max(10),
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
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()
	const createHabitMutation = trpc.habit.createHabit.useMutation()
	const updateHabitMutation = trpc.habit.updateHabit.useMutation()
	const deleteHabitMutation = trpc.habit.deleteHabit.useMutation()
	const habitsKey = getQueryKey(trpc.habit.getHabits)

	const { register, watch, setValue, handleSubmit, reset } = useZodForm({
		schema: habitSchema,
		defaultValues: {
			name: habit?.name ?? undefined,
			rewardPoints: habit?.rewardPoints ?? undefined,
			days: (habit?.days?.split(',') as DayValue[]) ?? [],
		},
		onSubmit: (data) => {
			if (type === 'create') {
				createHabitMutation.mutate(
					{
						...data,
						userId: 'default-user-id',
					},
					{
						onSuccess: ([successData]) => {
							queryClient.setQueriesData(habitsKey, (old) => {
								const oldHabits = (old as { habits: [] })?.habits as {
									id: string
									name: string
									rewardPoints: number
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
							rewardPoints: data.rewardPoints,
							days: data.days.join(','),
							userId: 'default-user-id',
						},
					]

					return { habits }
				})

				reset()
				setOpen(false)
				return
			}

			updateHabitMutation.mutate({
				...data,
				id: habit?.id as string,
				userId: 'default-user-id',
			})

			queryClient.setQueriesData(habitsKey, (old) => {
				const oldHabits = (old as { habits: [] })?.habits as {
					id: string
					name: string
					rewardPoints: number
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
						rewardPoints: data.rewardPoints,
						days: data.days.join(','),
					}
				})

				return { habits }
			})

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

	const handleDeleteHabit = () => {
		deleteHabitMutation.mutate({
			id: habit?.id as string,
		})

		queryClient.setQueriesData(habitsKey, (old) => {
			const oldHabits = (old as { habits: [] })?.habits as {
				id: string
				name: string
				rewardPoints: number
				days: string
				userId: string
			}[]

			const habits = oldHabits.filter((oldHabit) => oldHabit.id !== habit?.id)

			return { habits }
		})

		setOpen(false)
	}

	return {
		open,
		setOpen,
		register,
		selectedDays,
		handleSubmit,
		handleSelectDay,
		handleDeleteHabit,
	}
}
