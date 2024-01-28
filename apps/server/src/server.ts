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
			origin: /localhost.*/,
		}),
	)
	.use(
		trpc(appRouter, {
			endpoint: '/trpc',
			createContext,
		}),
	)
	.listen(env.PORT, (server) => {
		console.log(`Listening on port ${server.port}`)
	})
