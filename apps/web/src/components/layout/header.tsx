import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Button } from '@/components/ui/button'
import { SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

export const Header: React.FC = () => {
	return (
		<header className="w-full p-4 border-b border-muted">
			<div className="flex items-center justify-between mx-auto">
				<h1 className="font-semibold text-2xl">Habitz</h1>
				<div className="flex items-center gap-2">
					<ThemeToggle />
					<SheetTrigger>
						<Button variant="outline" size="icon" className="flex lg:hidden">
							<Menu className="h-[1.2rem] w-[1.2rem]" />
						</Button>
					</SheetTrigger>
				</div>
			</div>
		</header>
	)
}
