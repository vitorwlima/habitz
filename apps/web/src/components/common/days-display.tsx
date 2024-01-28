import { allDaysList } from '@/lib/days'
import { cn } from '@/lib/utils'

type Props = {
	days: string
}

export const DaysDisplay: React.FC<Props> = ({ days }) => {
	return (
		<div className="flex gap-2">
			{allDaysList.map((day) => (
				<div
					key={day.value}
					className={cn(
						'grid place-items-center w-6 h-6 rounded-full text-xs',
						{
							'bg-muted': days.includes(day.value),
							'bg-muted opacity-25': !days.includes(day.value),
						},
					)}
				>
					{day.label.charAt(0)}
				</div>
			))}
		</div>
	)
}
