import type { AppRouter } from '@apps/habitz-server'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>()
