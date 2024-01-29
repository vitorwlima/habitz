import { Props } from '@/components/common/habit-modal'
import { DayValue, allDaysList } from '@/lib/days'
import { trpc } from '@/lib/trpc'
import { useZodForm } from '@/lib/useZedForm'
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
	const createHabitMutation = trpc.habit.createHabit.useMutation()
	const updateHabitMutation = trpc.habit.updateHabit.useMutation()
	const deleteHabitMutation = trpc.habit.deleteHabit.useMutation()

	const { register, watch, setValue, handleSubmit } = useZodForm({
		schema: habitSchema,
		defaultValues: {
			name: habit?.name ?? undefined,
			rewardPoints: habit?.rewardPoints ?? undefined,
			days: (habit?.days.split(',') as DayValue[]) ?? [],
		},
		onSubmit: (data) => {
			if (type === 'create') {
				return createHabitMutation.mutate({
					...data,
					userId: 'default-user-id',
				})
			}

			if (type === 'update') {
				return updateHabitMutation.mutate({
					...data,
					id: habit?.id as string,
					userId: 'default-user-id',
				})
			}
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
	}

	return {
		register,
		selectedDays,
		handleSubmit,
		handleSelectDay,
		handleDeleteHabit,
	}
}
