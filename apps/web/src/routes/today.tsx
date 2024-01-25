import { Today } from '@/pages/today'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/today')({
	component: () => <Today />,
})
