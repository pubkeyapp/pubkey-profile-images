import { UiHeaderLink, UiNotFound, UiThemeLink, UiThemeSwitch } from '@pubkey-ui/core'
import { Link, Navigate, RouteObject, useRoutes } from 'react-router-dom'
import { AppLayout } from './app-layout'
import { PubkeyProfileFeature } from './features/pubkey-profile/pubkey-profile-feature'

const links: UiHeaderLink[] = [{ label: 'Profile', link: '/profile' }]
const routes: RouteObject[] = [
  { path: '/', element: <Navigate to="/profile" replace /> },
  { path: '/profile/*', element: <PubkeyProfileFeature /> },
  { path: '*', element: <UiNotFound /> },
]

export function AppRoutes() {
  const router = useRoutes(routes)

  return (
    <AppLayout links={links} profile={<UiThemeSwitch />}>
      {router}
    </AppLayout>
  )
}

export const ThemeLink: UiThemeLink = ({ children, ...props }) => <Link {...props}>{children}</Link>
