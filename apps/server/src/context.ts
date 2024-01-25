import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export const createContext = async (opts: FetchCreateContextFnOptions) => {
	return {
		name: 'elysia',
	}
}
