import { Habits } from '@/pages/habits'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/habits')({
	component: () => <Habits />,
})
