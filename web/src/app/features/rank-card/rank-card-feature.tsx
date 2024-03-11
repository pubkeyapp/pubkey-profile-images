import { useMemo, useState } from 'react'
import { profiles } from './rank-card-data-access'
import { RankCardUiLayout } from './rank-card-ui'

export function RankCardFeature() {
  const baseUrl = '/api/rank-card'
  const [params, setParams] = useState<string | undefined>()
  const url = useMemo(() => `${baseUrl}${params ? `?${params}` : ''}`, [params])

  return <RankCardUiLayout url={url} setParams={setParams} profiles={profiles} />
}
