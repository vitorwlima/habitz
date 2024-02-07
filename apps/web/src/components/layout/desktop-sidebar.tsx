import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { Calendar, CircleDashed, Gift, LineChart } from 'lucide-react'

type Props = {
	className?: string
}

export const DesktopSidebar: React.FC<Props> = ({ className }) => {
	return (
		<aside
			className={cn(
				'sticky hidden border-r border-muted grow p-4 space-y-4 lg:block lg:max-w-60 xl:max-w-72',
				className,
			)}
		>
			<Link to="/tracker">
				{({ isActive }) => (
					<Button
						variant="ghost"
						className={cn('w-full gap-2 justify-start', {
							'bg-accent': isActive,
						})}
					>
						<Calendar size={18} />
						Tracker
					</Button>
				)}
			</Link>
			<Link to="/habits">
				{({ isActive }) => (
					<Button
						variant="ghost"
						className={cn('w-full gap-2 justify-start', {
							'bg-accent': isActive,
						})}
					>
						<CircleDashed size={18} />
						Habits
					</Button>
				)}
			</Link>
			<Link to="/history">
				{({ isActive }) => (
					<Button
						variant="ghost"
						className={cn('w-full gap-2 justify-start', {
							'bg-accent': isActive,
						})}
					>
						<LineChart size={18} />
						History
					</Button>
				)}
			</Link>
		</aside>
	)
}
