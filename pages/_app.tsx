import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from "react-query"
import { ContextProvider } from '../client/context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: false
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </QueryClientProvider>

  )
}

export default MyApp
