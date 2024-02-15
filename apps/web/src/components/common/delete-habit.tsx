import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { trpc } from '@/lib/trpc'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { Trash } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
	habit: {
		userId: string
		id: string
		name: string
		days: string
	}
}

export const DeleteHabit: React.FC<Props> = ({ habit }) => {
	const queryClient = useQueryClient()
	const deleteHabitMutation = trpc.habit.deleteHabit.useMutation()
	const habitsKey = getQueryKey(trpc.habit.getHabits, { userId: habit.userId })

	const handleDeleteHabit = () => {
		deleteHabitMutation.mutate({
			id: habit.id as string,
		})

		queryClient.setQueriesData(habitsKey, (old) => {
			const oldHabits = (old as { habits: [] })?.habits as {
				id: string
				name: string
				days: string
				userId: string
			}[]

			const habits = oldHabits.filter((oldHabit) => oldHabit.id !== habit.id)

			return { habits }
		})

		toast.success('Habit successfully deleted.')
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="destructive" className="px-3 py-1">
					<Trash size={16} />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete habit</DialogTitle>
				</DialogHeader>

				<p className="text-muted-foreground">
					Are you sure you want to delete habit <strong>{habit.name}</strong>?
					All of its completions will be lost.
				</p>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>

					<Button variant="destructive" onClick={handleDeleteHabit}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
