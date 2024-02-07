import { WithLayout } from '@/components/layout/with-layout'
import { Habits } from '@/pages/habits'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/habits')({
	component: () => (
		<WithLayout>
			<Habits />
		</WithLayout>
	),
})
