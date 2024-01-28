import { z } from 'zod'

const envSchema = z.object({
	PORT: z.coerce.number(),
})

export const env = envSchema.parse(Bun.env)
