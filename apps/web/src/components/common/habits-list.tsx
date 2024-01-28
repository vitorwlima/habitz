import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../ui/table'
import { DaysDisplay } from './days-display'

type Props = {
	habits: {
		userId: string
		id: string
		name: string
		rewardPoints: number
		days: string
	}[]
}

export const HabitsList: React.FC<Props> = ({ habits }) => {
	return (
		<Table>
			<TableCaption>A list of all your created habits.</TableCaption>
			<TableHeader>
				<TableHead className="w-96">Name</TableHead>
				<TableHead className="w-60">Reward Points</TableHead>
				<TableHead>Days</TableHead>
			</TableHeader>

			<TableBody>
				{habits.map((habit) => (
					<TableRow key={habit.id} className="cursor-pointer">
						<TableCell className="w-96">{habit.name}</TableCell>
						<TableCell className="w-60">{habit.rewardPoints}</TableCell>
						<TableCell>
							<DaysDisplay days={habit.days} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
