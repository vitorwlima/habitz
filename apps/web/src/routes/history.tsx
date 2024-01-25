import { History } from '@/pages/history'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/history')({
	component: () => <History />,
})
