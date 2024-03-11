export interface RankCardPayload {
  status?: string
  name?: string
  earnings?: string
}

export const profiles: RankCardPayload[] = [
  {
    name: 'beeman',
    status: 'Expired',
    earnings: '42 USD',
  },
  {
    name: 'derlys',
    status: 'Active',
    earnings: '1000 USD',
  },
  {
    name: 'sundeep',
    status: 'Active',
    earnings: '512 USD',
  },
  {
    name: 'deanmachine',
    status: 'Expired',
    earnings: '1024 USD',
  },
]
