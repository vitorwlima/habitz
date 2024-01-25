import { WithLayout } from '@/components/layout/with-layout'
import { router } from '@/main'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
	component: () => (
		<WithLayout>
			<Outlet />
		</WithLayout>
	),
	loader: (ctx) => {
		if (ctx.location.pathname === '/') {
			router.navigate({
				to: '/today',
				replace: true,
			})
		}
	},
})
