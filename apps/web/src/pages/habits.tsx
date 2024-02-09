import { HabitModal } from '@/components/common/habit-modal'
import { HabitsList } from '@/components/common/habits-list'
import { trpc } from '@/lib/trpc'
import { useUser } from '@clerk/clerk-react'

export const Habits: React.FC = () => {
	const { user } = useUser()
	const { data } = trpc.habit.getHabits.useQuery({
		userId: user!.id,
	})
	const habits = data?.habits ?? []
	const orderedHabits = habits.sort((a, b) => a.order - b.order)

	return (
		<div>
			<header className="flex items-center justify-between mb-8">
				<h2 className="text-xl font-semibold">My Habits</h2>
				<HabitModal type="create" />
			</header>

			<HabitsList habits={orderedHabits} />
		</div>
	)
}
