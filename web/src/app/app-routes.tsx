import { UiHeaderLink, UiNotFound, UiThemeLink, UiThemeSwitch } from '@pubkey-ui/core'
import { Link, Navigate, RouteObject, useRoutes } from 'react-router-dom'
import { AppLayout } from './app-layout'
import { BusinessVisaFeature } from './features/business-visa/business-visa-feature'
import { PubkeyProfileFeature } from './features/pubkey-profile/pubkey-profile-feature'

const links: UiHeaderLink[] = [
  { label: 'Profile', link: '/profile' },
  { label: 'Visa', link: '/visa' },
]
const routes: RouteObject[] = [
  { path: '/', element: <Navigate to="/profile" replace /> },
  { path: '/visa/*', element: <BusinessVisaFeature /> },
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
