import { getDateObject } from '@/lib/get-date-object'
import { getFormattedDate } from '@/lib/get-formatted-date'
import { router } from '@/main'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
	component: () => <Outlet />,
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
