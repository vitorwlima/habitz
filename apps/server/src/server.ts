import cors from '@elysiajs/cors'
import { trpc } from '@elysiajs/trpc'
import { Elysia } from 'elysia'
import { env } from './env'
import { createContext } from './trpc/context'
import { appRouter } from './trpc/router'

new Elysia()
	.use(
		cors({
			credentials: true,
			origin: true,
		}),
	)
	.use(
		trpc(appRouter, {
			endpoint: '/trpc',
			createContext,
		}),
	)
	.listen(env.PORT, (server) => {
		console.info(`Listening on port ${server.port}`)
	})
