import { TrackerCard } from '@/components/common/tracker-card'
import { allDaysList } from '@/lib/days'
import { trpc } from '@/lib/trpc'
import { getDay } from 'date-fns'

type Props = {
	date: string
}

export const TrackerList: React.FC<Props> = ({ date }) => {
	const { data: habitsData } = trpc.habit.getHabits.useQuery({
		userId: 'default-user-id',
	})
	const weekdayValue = allDaysList.find(
		(day) => day.fnsValue === getDay(date),
	)!.value
	const habits =
		habitsData?.habits.filter((habit) => habit.days.includes(weekdayValue)) ??
		[]

	const { data: completions } = trpc.completion.getCompletions.useQuery({
		date,
		userId: 'default-user-id',
	})

	return (
		<ul className="flex flex-col gap-4">
			{habits.map((habit) => (
				<TrackerCard
					key={habit.id}
					habit={habit}
					date={date}
					completion={completions?.find(
						(c) => c.habitId === habit.id && c.date === date,
					)}
				/>
			))}
		</ul>
	)
}
