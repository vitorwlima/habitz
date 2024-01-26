import { AddHabit } from '@/components/common/add-habit'

export const Habits: React.FC = () => {
	return (
		<div>
			<header className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">My Habits</h2>
				<AddHabit />
			</header>
		</div>
	)
}
