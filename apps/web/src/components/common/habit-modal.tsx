import { DeleteHabitModal } from '@/components/common/delete-habit-modal'
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
import { allDaysList } from '@/lib/days'
import { useHabitModal } from '@/lib/useHabitModal'

export type Props =
	| {
			type: 'create'
			habit?: undefined
			children?: undefined
	  }
	| {
			type: 'update'
			children: React.ReactNode
			habit: {
				userId: string
				id: string
				name: string
				rewardPoints: number
				days: string
			}
	  }

export const HabitModal: React.FC<Props> = ({ type, habit, children }) => {
	const {
		open,
		setOpen,
		register,
		selectedDays,
		handleSubmit,
		handleSelectDay,
		handleDeleteHabit,
	} = useHabitModal({ type, habit })

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{type === 'create' ? (
				<Button asChild>
					<DialogTrigger>New Habit</DialogTrigger>
				</Button>
			) : (
				children
			)}
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{type === 'create' ? 'New Habit' : 'Edit habit'}
					</DialogTitle>
				</DialogHeader>
				<form className="space-y-2" onSubmit={handleSubmit}>
					<div className="space-y-1">
						<Label htmlFor="name">Name</Label>
						<Input placeholder="My habit..." id="name" {...register('name')} />
					</div>
					<div className="space-y-1 pb-4">
						<Label htmlFor="rewardPoints">Reward points</Label>
						<Input
							placeholder="0"
							type="number"
							min={0}
							max={10}
							id="rewardPoints"
							{...register('rewardPoints')}
						/>
					</div>
					<Label>Days</Label>
					{allDaysList.map((day) => (
						<div className="flex items-center space-x-2">
							<Checkbox
								id={day.value}
								onCheckedChange={(e) => handleSelectDay(e.valueOf(), day.value)}
								checked={selectedDays.includes(day.value)}
							/>
							<Label htmlFor={day.value}>{day.label}</Label>
						</div>
					))}
					<DialogFooter className="pt-4">
						{type === 'update' && (
							<DeleteHabitModal onDelete={handleDeleteHabit} />
						)}
						<Button type="submit">
							{type === 'create' ? 'Create' : 'Save'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
