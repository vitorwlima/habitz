import { DaysDisplay } from '@/components/common/days-display'
import { HabitModal } from '@/components/common/habit-modal'
import { DialogTrigger } from '@/components/ui/dialog'
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
				<TableHead>Days</TableHead>
			</TableHeader>

			<TableBody>
				{habits.map((habit) => (
					<HabitModal type="update" habit={habit} key={habit.id}>
						<DialogTrigger asChild>
							<TableRow className="cursor-pointer appearance-none">
								<TableCell className="w-96">{habit.name}</TableCell>
								<TableCell>
									<DaysDisplay days={habit.days} />
								</TableCell>
							</TableRow>
						</DialogTrigger>
					</HabitModal>
				))}
			</TableBody>
		</Table>
	)
}
