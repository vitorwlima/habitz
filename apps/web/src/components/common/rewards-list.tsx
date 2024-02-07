import { RewardModal } from '@/components/common/reward-modal'
import { DialogTrigger } from '@/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

type Props = {
	rewards: {
		id: string
		name: string
		pointsToClaim: number
		userId: string
	}[]
}

export const RewardsList: React.FC<Props> = ({ rewards }) => {
	if (!rewards.length) {
		return (
			<p className="text-muted-foreground">
				You have not created any rewards yet. Click the button above to start.
			</p>
		)
	}

	return (
		<Table>
			<TableCaption>A list of all your created habits.</TableCaption>
			<TableHeader>
				<TableHead className="w-96">Name</TableHead>
				<TableHead className="w-60">Points to Claim</TableHead>
			</TableHeader>

			<TableBody>
				{rewards.map((reward) => (
					<RewardModal type="update" reward={reward} key={reward.id}>
						<DialogTrigger asChild>
							<TableRow className="cursor-pointer appearance-none">
								<TableCell className="w-96">{reward.name}</TableCell>
								<TableCell className="w-60">{reward.pointsToClaim}</TableCell>
							</TableRow>
						</DialogTrigger>
					</RewardModal>
				))}
			</TableBody>
		</Table>
	)
}
