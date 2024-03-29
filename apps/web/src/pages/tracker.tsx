import { DatePicker } from '@/components/common/date-picker'
import { TrackerHabitList } from '@/components/common/tracker-habit-list'
import { getDateObject } from '@/lib/get-date-object'
import { getFormattedDate } from '@/lib/get-formatted-date'
import { Route } from '@/routes/tracker'
import { useNavigate } from '@tanstack/react-router'

export const Tracker: React.FC = () => {
	const { date } = Route.useSearch()
	const navigate = useNavigate()

	return (
		<div>
			<header className="flex items-center justify-between mb-8">
				<h2 className="text-xl font-semibold">Tracker</h2>
				<DatePicker
					date={getDateObject(date)}
					onChange={(date) =>
						navigate({
							search: () => ({
								date: getFormattedDate(date ?? getDateObject()),
							}),
						})
					}
				/>
			</header>

			<TrackerHabitList date={date} />
		</div>
	)
}
