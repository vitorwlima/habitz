import { DaysDisplay } from '@/components/common/days-display'
import { DeleteHabit } from '@/components/common/delete-habit'
import { HabitModal } from '@/components/common/habit-modal'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

type Props = {
	habits: {
		userId: string
		id: string
		name: string
		days: string
	}[]
}

export const HabitsList: React.FC<Props> = ({ habits }) => {
	if (!habits.length) {
		return (
			<p className="text-muted-foreground">
				You have not created any habits yet. Click the button above to start.
			</p>
		)
	}

	return (
		<Table>
			<TableCaption>A list of all your created habits.</TableCaption>
			<TableHeader>
				<TableHead className="w-96">Name</TableHead>
				<TableHead className="w-96">Days</TableHead>
				<TableHead className="w-48">Actions</TableHead>
			</TableHeader>

			<TableBody>
				{habits.map((habit) => (
					<TableRow>
						<TableCell className="w-96">{habit.name}</TableCell>
						<TableCell className="w-96">
							<DaysDisplay days={habit.days} />
						</TableCell>
						<TableCell className="w-48 flex items-center gap-2">
							<HabitModal type="update" key={habit.id} habit={habit} />
							<DeleteHabit key={habit.id} habit={habit} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
