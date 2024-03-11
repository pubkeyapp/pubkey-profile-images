import { useMemo, useState } from 'react'
import { profiles } from './business-visa-data-access'
import { BusinessVisaUiLayout } from './business-visa-ui'

export function BusinessVisaFeature() {
  const baseUrl = '/api/business-visa'
  const [params, setParams] = useState<string | undefined>()
  const url = useMemo(() => `${baseUrl}${params ? `?${params}` : ''}`, [params])

  return <BusinessVisaUiLayout url={url} setParams={setParams} profiles={profiles} />
}
