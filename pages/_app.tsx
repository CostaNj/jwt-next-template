import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

import { Layout } from '../client/containers/layout'
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ContextProvider>
    </QueryClientProvider>
  )
}

export default MyApp
