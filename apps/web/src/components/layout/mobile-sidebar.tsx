import { DesktopSidebar } from '@/components/layout/desktop-sidebar'
import { SheetContent } from '@/components/ui/sheet'

export const MobileSidebar: React.FC = () => {
	return (
		<SheetContent>
			<DesktopSidebar className="flex border-none" />
		</SheetContent>
	)
}
