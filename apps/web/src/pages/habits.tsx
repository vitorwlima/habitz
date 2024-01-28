import { AddHabit } from '@/components/common/add-habit'
import { HabitsList } from '@/components/common/habits-list'
import { trpc } from '@/lib/trpc'

export const Habits: React.FC = () => {
	const { data } = trpc.habit.getHabits.useQuery({
		userId: 'default-user-id',
	})
	const habits = data?.habits ?? []

	return (
		<div>
			<header className="flex items-center justify-between mb-8">
				<h2 className="text-xl font-semibold">My Habits</h2>
				<AddHabit />
			</header>

			<HabitsList habits={habits} />
		</div>
	)
}
