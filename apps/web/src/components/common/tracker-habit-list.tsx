import { TrackerHabitCard } from '@/components/common/tracker-habit-card'
import { allDaysList } from '@/lib/days'
import { trpc } from '@/lib/trpc'
import { useUser } from '@clerk/clerk-react'
import { getDay } from 'date-fns'

type Props = {
	date: string
}

export const TrackerHabitList: React.FC<Props> = ({ date }) => {
	const { user } = useUser()
	const { data: habitsData } = trpc.habit.getHabits.useQuery({
		userId: user!.id,
	})
	const weekdayValue = allDaysList.find(
		(day) => day.fnsValue === getDay(date),
	)!.value
	const habits =
		habitsData?.habits.filter((habit) => habit.days.includes(weekdayValue)) ??
		[]

	const { data: completions } = trpc.completion.getCompletions.useQuery({
		date,
		userId: user!.id,
	})

	if (!habits.length) {
		return (
			<section>
				<p className="text-muted-foreground">
					You don't have any habits for this day.
				</p>
			</section>
		)
	}

	return (
		<section>
			<ul className="flex flex-col gap-4">
				{habits.map((habit) => (
					<TrackerHabitCard
						key={habit.id}
						habit={habit}
						date={date}
						completion={completions?.find(
							(c) => c.habitId === habit.id && c.date === date,
						)}
					/>
				))}
			</ul>
		</section>
	)
}
