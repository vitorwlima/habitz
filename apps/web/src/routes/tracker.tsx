import { getFormattedDate } from '@/lib/get-formatted-date'
import { Tracker } from '@/pages/tracker'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const trackerSearchSchema = z.object({
	date: z.string().default(getFormattedDate(new Date())),
})

export const Route = createFileRoute('/tracker')({
	component: () => <Tracker />,
	validateSearch: (search) => trackerSearchSchema.parse(search),
})
