import { UiThemeProvider } from '@pubkey-ui/core'
import '@pubkey-ui/core/index.esm.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes, ThemeLink } from './app-routes'

const client = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={client}>
      <UiThemeProvider link={ThemeLink}>
        <AppRoutes />
      </UiThemeProvider>
    </QueryClientProvider>
  )
}
