export interface Vote {
  number: number
  state: 'OPEN' | 'CLOSED'
  address: string
  amount: number
  signature: string
  date: Date
}
