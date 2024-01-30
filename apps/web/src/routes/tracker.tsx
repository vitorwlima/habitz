import { Tracker } from '@/pages/tracker'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tracker')({
	component: () => <Tracker />,
})
