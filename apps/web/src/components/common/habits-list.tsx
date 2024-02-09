import { HabitsListItem } from '@/components/common/habits-list-item'
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
} from '@/components/ui/table'
import { trpc } from '@/lib/trpc'
import { useUser } from '@clerk/clerk-react'
import {
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'

type Props = {
	habits: {
		userId: string
		id: string
		name: string
		days: string
	}[]
}

export const HabitsList: React.FC<Props> = ({ habits }) => {
	const { user } = useUser()
	const queryClient = useQueryClient()
	const { mutate } = trpc.habit.changeHabitsOrder.useMutation()
	const habitsKey = getQueryKey(trpc.habit.getHabits)

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 10,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	)

	if (!habits.length) {
		return (
			<p className="text-muted-foreground">
				You have not created any habits yet. Click the button above to start.
			</p>
		)
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (active.id !== over?.id) {
			const oldIndex = habits.findIndex((h) => h.id === active.id)
			const newIndex = habits.findIndex((h) => h.id === over?.id)

			const habitIdsInOrder = arrayMove(habits, oldIndex, newIndex).map(
				(h) => h.id,
			)

			mutate({
				habitIdsInOrder,
				userId: user!.id,
			})

			queryClient.setQueriesData(habitsKey, (old) => {
				const oldHabits = (old as { habits: [] })?.habits as {
					id: string
					name: string
					days: string
					userId: string
				}[]

				const habits = oldHabits.map((h) => ({
					...h,
					order: habitIdsInOrder.indexOf(h.id),
				}))

				return { habits }
			})
		}
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
