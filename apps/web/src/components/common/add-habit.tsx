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
import { DayValue, days } from '@/lib/days'
import { trpc } from '@/lib/trpc'
import { useZodForm } from '@/lib/useZedForm'
import { z } from 'zod'

const addHabitSchema = z.object({
	name: z.string().min(3),
	rewardPoints: z.coerce.number().min(0).max(10),
	days: z
		.array(z.enum([days[0].value, ...days.slice(1).map((day) => day.value)]))
		.min(1)
		.max(7),
})

export const AddHabit: React.FC = () => {
	const createHabitMutation = trpc.createHabit.useMutation()
	const { register, watch, setValue, handleSubmit } = useZodForm({
		schema: addHabitSchema,
		defaultValues: {
			days: [],
		},
		onSubmit: (data) => {
			createHabitMutation.mutate(data, {
				onSuccess: () => {
					console.log('success')
				},
			})
		},
	})

	const selectedDays = watch('days')

	const handleSelectDay = (checked: string | boolean, day: DayValue) => {
		if (checked) {
			setValue('days', [...selectedDays, day])
			return
		}

		setValue(
			'days',
			selectedDays.filter((d) => d !== day),
		)
	}

	return (
		<Dialog>
			<Button asChild>
				<DialogTrigger>New Habit</DialogTrigger>
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Habit</DialogTitle>
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
					{days.map((day) => (
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
						<Button type="submit">Create</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
