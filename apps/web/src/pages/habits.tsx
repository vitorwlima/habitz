import { trpc } from '@/lib/trpc'

export const Habits: React.FC = () => {
	const { data } = trpc.greeting.useQuery({
		name: 'testando legal demais',
	})

	return (
		<div>
			<h1>Habits</h1>
			{data?.text}
		</div>
	)
}
