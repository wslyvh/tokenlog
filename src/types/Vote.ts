export interface Vote {
  key: string
  number: number
  state: 'OPEN' | 'CLOSED'
  address: string
  amount: number
  signature: string
  date: Date
}
