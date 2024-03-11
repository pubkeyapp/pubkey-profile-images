import { useMemo, useState } from 'react'
import { profiles } from './pubkey-profile-data-access'
import { PubkeyProfileUiLayout } from './pubkey-profile-ui'

export function PubkeyProfileFeature() {
  const baseUrl = '/api/pubkey-profile'
  const [params, setParams] = useState<string | undefined>()
  const url = useMemo(() => `${baseUrl}${params ? `?${params}` : ''}`, [params])

  return <PubkeyProfileUiLayout url={url} setParams={setParams} profiles={profiles} />
}
