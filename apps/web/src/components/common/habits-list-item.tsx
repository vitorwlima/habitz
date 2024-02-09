import { DaysDisplay } from '@/components/common/days-display'
import { DeleteHabit } from '@/components/common/delete-habit'
import { HabitModal } from '@/components/common/habit-modal'
import { TableCell, TableRow } from '@/components/ui/table'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Props = {
	habit: {
		userId: string
		id: string
		name: string
		days: string
	}
}

export const HabitsListItem: React.FC<Props> = ({ habit }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: habit.id })

	const style = {
		transform: transform
			? CSS.Transform.toString({ ...transform, x: 0 })
			: undefined,
		transition,
	}

	return (
		<TableRow ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<TableCell className="w-96">{habit.name}</TableCell>
			<TableCell className="w-96">
				<DaysDisplay days={habit.days} />
			</TableCell>
			<TableCell className="w-48 flex items-center gap-2">
				<HabitModal type="update" key={`update-${habit.id}`} habit={habit} />
				<DeleteHabit key={`delete-${habit.id}`} habit={habit} />
			</TableCell>
		</TableRow>
	)
}
