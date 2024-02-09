import { HabitsListItem } from '@/components/common/habits-list-item'
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
} from '@/components/ui/table'
import { useHabitsList } from '@/lib/component-hooks/use-habits-list'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export type Props = {
	habits: {
		userId: string
		id: string
		name: string
		days: string
	}[]
}

export const HabitsList: React.FC<Props> = ({ habits }) => {
	const { sensors, handleDragEnd } = useHabitsList({ habits })

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
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={habits}
						strategy={verticalListSortingStrategy}
					>
						{habits.map((habit) => (
							<HabitsListItem key={`list-${habit.id}`} habit={habit} />
						))}
					</SortableContext>
				</DndContext>
			</TableBody>
		</Table>
	)
}
