import { WithLayout } from '@/components/layout/with-layout'
import { getDateObject } from '@/lib/get-date-object'
import { getFormattedDate } from '@/lib/get-formatted-date'
import { Tracker } from '@/pages/tracker'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const trackerSearchSchema = z.object({
	date: z.string().default(getFormattedDate(getDateObject())),
})

export const Route = createFileRoute('/tracker')({
	component: () => (
		<WithLayout>
			<Tracker />
		</WithLayout>
	),
	validateSearch: (search) => trackerSearchSchema.parse(search),
})
