import cors from '@elysiajs/cors'
import { trpc } from '@elysiajs/trpc'
import { Elysia } from 'elysia'
import { createContext } from './context'
import { appRouter } from './router'

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
	.listen(Number(Bun.env.PORT), (server) => {
		console.log(`Listening on port ${server.port}`)
	})
