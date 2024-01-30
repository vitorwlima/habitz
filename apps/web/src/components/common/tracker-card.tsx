import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, CircleSlash } from 'lucide-react'

type Props = {
	habit: {
		userId: string
		id: string
		name: string
		rewardPoints: number
		days: string
	}
	completed: boolean
}

export const TrackerCard: React.FC<Props> = ({ habit, completed }) => {
	return (
		<Card key={habit.id} className="flex items-center justify-between p-6">
			<div className="space-y-1">
				<CardHeader className="p-0">
					<CardTitle className="text-lg font-medium">{habit.name}</CardTitle>
				</CardHeader>

				<CardContent className="p-0">
					<p className="text-xs font-light">Not completed</p>
				</CardContent>
			</div>
			<div>
				{completed ? (
					<CheckCircle className="w-6 h-6 text-green-500" />
				) : (
					<CircleSlash className="w-6 h-6 text-gray-500" />
				)}
			</div>
		</Card>
	)
}
