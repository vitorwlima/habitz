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

type Props = {
	onDelete: () => void
}

export const DeleteHabitModal: React.FC<Props> = ({ onDelete }) => {
	return (
		<Dialog>
			<Button variant="destructive" asChild>
				<DialogTrigger>Delete Habit</DialogTrigger>
			</Button>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Habit</DialogTitle>
				</DialogHeader>

				<p className="text-muted-foreground">
					Are you sure you want to delete this habit? All of its completions
					will be lost.
				</p>

				<DialogFooter>
					<DialogClose asChild>
						<Button>Cancel</Button>
					</DialogClose>

					<Button variant="destructive" onClick={onDelete}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
