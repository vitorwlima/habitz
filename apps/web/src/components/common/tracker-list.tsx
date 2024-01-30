import { allDaysList } from '@/lib/days'
import { trpc } from '@/lib/trpc'
import { getDay } from 'date-fns'

type Props = {
	date: Date
}

export const TrackerList: React.FC<Props> = ({ date }) => {
	const { data } = trpc.habit.getHabits.useQuery({ userId: 'default-user-id' })
	const weekdayValue = allDaysList.find(
		(day) => day.fnsValue === getDay(date),
	)!.value
	const habits =
		data?.habits.filter((habit) => habit.days.includes(weekdayValue)) ?? []

	return (
		<ul>
			{habits.map((habit) => (
				<li key={habit.id}>{habit.name}</li>
			))}
		</ul>
	)
}
