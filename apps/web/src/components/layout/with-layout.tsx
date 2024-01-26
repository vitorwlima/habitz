import { DesktopSidebar } from '@/components/layout/desktop-sidebar'
import { Header } from '@/components/layout/header'
import { MobileSidebar } from '@/components/layout/mobile-sidebar'
import { Sheet } from '@/components/ui/sheet'

export const WithLayout: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<Sheet>
			<div className="min-h-screen flex flex-col">
				<Header />
				<div className="flex grow">
					<DesktopSidebar />
					<MobileSidebar />
					<main className="grow p-4">{children}</main>
				</div>
			</div>
		</Sheet>
	)
}
