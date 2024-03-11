import { useDisclosure } from '@mantine/hooks'
import { UiHeader, UiHeaderLink, UiLayout } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function AppLayout({
  children,
  links,
  profile,
}: {
  children: ReactNode
  links: UiHeaderLink[]
  profile: ReactNode
}) {
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <UiLayout header={<UiHeader opened={opened} toggle={toggle} links={links} profile={profile} />}>
      {children}
    </UiLayout>
  )
}
