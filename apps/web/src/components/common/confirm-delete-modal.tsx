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
	title: string
}

export const ConfirmDeleteModal: React.FC<Props> = ({ onDelete, title }) => {
	return (
		<Dialog>
			<Button variant="destructive" asChild>
				<DialogTrigger>
					Delete <span className="contents capitalize">{title}</span>
				</DialogTrigger>
			</Button>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Delete <span className="capitalize">{title}</span>
					</DialogTitle>
				</DialogHeader>

				<p className="text-muted-foreground">
					Are you sure you want to delete this {title}? All of its completions
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
