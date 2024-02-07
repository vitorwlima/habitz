import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import '@/index.css'
import { trpc } from '@/lib/trpc'
import { routeTree } from '@/routeTree.gen'
import { ClerkProvider } from '@clerk/clerk-react'
import '@fontsource/nunito/200.css'
import '@fontsource/nunito/300.css'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/500.css'
import '@fontsource/nunito/600.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/800.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { httpBatchLink } from '@trpc/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { env } from './env'

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const queryClient = new QueryClient()
const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: 'http://localhost:8080/trpc',
		}),
	],
})

ReactDOM.createRoot(document.getElementById('root') as Element).render(
	<React.StrictMode>
		<ClerkProvider publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY}>
			<trpc.Provider client={trpcClient} queryClient={queryClient}>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider defaultTheme="light">
						<Toaster />
						<RouterProvider router={router} />
					</ThemeProvider>
				</QueryClientProvider>
			</trpc.Provider>
		</ClerkProvider>
	</React.StrictMode>,
)
