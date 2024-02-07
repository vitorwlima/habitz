import { ConfirmDeleteModal } from '@/components/common/confirm-delete-modal'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRewardModal } from '@/lib/component-hooks/useRewardModal'

export type Props =
	| {
			type: 'create'
			reward?: undefined
			children?: undefined
	  }
	| {
			type: 'update'
			children: React.ReactNode
			reward: {
				id: string
				name: string
				pointsToClaim: number
				userId: string
			}
	  }

export const RewardModal: React.FC<Props> = ({ type, reward, children }) => {
	const { open, setOpen, register, handleSubmit, handleDeleteReward } =
		useRewardModal({ type, reward })

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{type === 'create' ? (
				<Button asChild>
					<DialogTrigger>New Reward</DialogTrigger>
				</Button>
			) : (
				children
			)}

			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{type === 'create' ? 'New Reward' : 'Edit Reward'}
					</DialogTitle>
				</DialogHeader>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<div className="space-y-1">
						<Label htmlFor="name">Name</Label>
						<Input placeholder="My reward..." id="name" {...register('name')} />
					</div>
					<div className="space-y-1">
						<Label htmlFor="pointsToClaim">Points to claim</Label>
						<Input
							placeholder="0"
							type="number"
							min={0}
							id="pointsToClaim"
							{...register('pointsToClaim')}
						/>
					</div>
					<DialogFooter className="pt-4">
						{type === 'update' && (
							<ConfirmDeleteModal
								title="reward"
								onDelete={handleDeleteReward}
							/>
						)}
						<Button type="submit">
							{type === 'create' ? 'Create' : 'Save'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
