import { UnauthedLayout } from '@/components/layout/unauthed-layout'
import { SignUp } from '@clerk/clerk-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-up')({
	component: () => (
		<UnauthedLayout>
			<SignUp />
		</UnauthedLayout>
	),
})
