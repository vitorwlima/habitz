import { Rewards } from '@/pages/rewards'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/rewards')({
	component: () => <Rewards />,
})
