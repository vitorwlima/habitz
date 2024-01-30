import { DatePicker } from '@/components/common/date-picker'
import { useState } from 'react'

export const Tracker: React.FC = () => {
	const [date, setDate] = useState<Date | undefined>(new Date())

	return (
		<div>
			<header className="flex items-center justify-between mb-8">
				<h2 className="text-xl font-semibold">Tracker</h2>
				<DatePicker date={date} onChange={(date) => setDate(date)} />
			</header>
		</div>
	)
}
