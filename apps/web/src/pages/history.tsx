import { trpc } from '@/lib/trpc'

export const History: React.FC = () => {
	const { data } = trpc.getHabits.useQuery({
		userId: 'my-user',
	})

	return (
		<div>
			<h1>History</h1>
		</div>
	)
}
