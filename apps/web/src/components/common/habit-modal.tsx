import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useHabitModal } from '@/lib/component-hooks/use-habit-modal'
import { allDaysList } from '@/lib/days'
import { Pencil } from 'lucide-react'

export type Props =
	| {
			type: 'create'
			habit?: undefined
	  }
	| {
			type: 'update'
			habit: {
				userId: string
				id: string
				name: string
				days: string
			}
	  }

export const HabitModal: React.FC<Props> = ({ type, habit }) => {
	const {
		open,
		handleSwitchOpen,
		register,
		selectedDays,
		handleSubmit,
		handleSelectDay,
	} = useHabitModal({ type, habit })

	return (
		<Dialog open={open} onOpenChange={handleSwitchOpen}>
			{type === 'create' ? (
				<Button asChild>
					<DialogTrigger>New Habit</DialogTrigger>
				</Button>
			) : (
				<Button variant="ghost" className="px-3 py-1" asChild>
					<DialogTrigger>
						<Pencil size={16} />
					</DialogTrigger>
				</Button>
			)}
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{type === 'create' ? 'New Habit' : 'Edit Habit'}
					</DialogTitle>
				</DialogHeader>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div className="space-y-1">
						<Label htmlFor="name">Name</Label>
						<Input placeholder="My habit..." id="name" {...register('name')} />
					</div>
					<div className="space-y-3">
						<Label>Days</Label>
						<div className="space-y-3">
							{allDaysList.map((day) => (
								<div className="flex items-center space-x-2">
									<Checkbox
										id={day.value}
										onCheckedChange={(e) =>
											handleSelectDay(e.valueOf(), day.value)
										}
										checked={selectedDays.includes(day.value)}
									/>
									<Label htmlFor={day.value}>{day.label}</Label>
								</div>
							))}
						</div>
					</div>
					<DialogFooter className="pt-4">
						<Button type="submit">
							{type === 'create' ? 'Create' : 'Save'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
