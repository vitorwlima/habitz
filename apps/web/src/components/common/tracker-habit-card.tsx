import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useTrackerHabitCard } from '@/lib/component-hooks/use-tracker-habit-card'
import { cn } from '@/lib/utils'
import { CheckCircle, CircleSlash } from 'lucide-react'

export type Props = {
	habit: {
		userId: string
		id: string
		name: string
		days: string
	}
	date: string
	completion?: {
		userId: string
		date: string
		id: string
		habitId: string
		completed: number
	}
}

export const TrackerHabitCard: React.FC<Props> = ({
	habit,
	date,
	completion,
}) => {
	const { isCompleted, handleTriggerCompletion, isTriggerCompletionDisabled } =
		useTrackerHabitCard({
			habit,
			date,
			completion,
		})

	return (
		<TooltipProvider>
			<Tooltip>
				{isTriggerCompletionDisabled && (
					<TooltipContent>Cannot complete a future habit.</TooltipContent>
				)}
				<TooltipTrigger>
					<Card
						className={cn(
							'flex items-center justify-between p-6 transition-colors',
							{
								'border-green-500': isCompleted,
								'hover:border-green-500 cursor-pointer':
									!isTriggerCompletionDisabled,
								'opacity-50 cursor-not-allowed': isTriggerCompletionDisabled,
							},
						)}
						aria-disabled={isTriggerCompletionDisabled}
						onClick={handleTriggerCompletion}
					>
						<div>
							<CardHeader className="p-0">
								<CardTitle className="text-lg font-medium">
									{habit.name}
								</CardTitle>
							</CardHeader>
						</div>

						<div className="relative">
							{isCompleted ? (
								<CheckCircle className="w-6 h-6 text-green-500" />
							) : (
								<CircleSlash className="w-6 h-6 text-border" />
							)}
						</div>
					</Card>
				</TooltipTrigger>
			</Tooltip>
		</TooltipProvider>
	)
}
