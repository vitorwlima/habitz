import { useTheme } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { getDateObject } from '@/lib/get-date-object'
import { getFormattedDate } from '@/lib/get-formatted-date'
import { router } from '@/main'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
	component: () => {
		const { theme } = useTheme()

		return (
			<>
				<Toaster theme={theme} />
				<Outlet />
			</>
		)
	},
	loader: (ctx) => {
		if (ctx.location.pathname === '/') {
			router.navigate({
				to: '/tracker',
				replace: true,
				search: {
					date: getFormattedDate(getDateObject()),
				},
			})
		}
	},
})
