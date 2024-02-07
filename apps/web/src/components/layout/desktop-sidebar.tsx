import { Button } from '@/components/ui/button'
import { getFormattedDate } from '@/lib/get-formatted-date'
import { cn } from '@/lib/utils'
import { UserButton, useUser } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { Link } from '@tanstack/react-router'
import { Calendar, CircleDashed, LineChart } from 'lucide-react'
import { useTheme } from '../theme/theme-provider'

type Props = {
	className?: string
}

export const DesktopSidebar: React.FC<Props> = ({ className }) => {
	const { user } = useUser()
	const { theme } = useTheme()

	return (
		<aside
			className={cn(
				'sticky hidden flex-col justify-between h-full border-r border-muted grow p-4 lg:flex lg:max-w-60 xl:max-w-72 lg:h-auto',
				className,
			)}
		>
			<nav className="flex flex-col gap-4">
				<Link
					to="/tracker"
					search={{
						date: getFormattedDate(new Date()),
					}}
				>
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
			</nav>

			<div className="border border-border rounded-md p-2 w-full flex items-center gap-4">
				<UserButton
					appearance={{
						baseTheme: theme === 'dark' ? dark : undefined,
					}}
				/>

				<p className="text-sm">{user?.firstName}</p>
			</div>
		</aside>
	)
}
