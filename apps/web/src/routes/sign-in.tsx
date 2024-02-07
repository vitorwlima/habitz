import { UnauthedLayout } from '@/components/layout/unauthed-layout'
import { SignIn } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-in')({
	component: () => (
		<UnauthedLayout>
			<SignIn />
		</UnauthedLayout>
	),
})
