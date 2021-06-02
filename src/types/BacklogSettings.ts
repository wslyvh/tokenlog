import { Strategy } from './Strategy'

export interface BacklogSettings {
  method: 'STANDARD' | 'QUADRATIC'
  strategy: Array<Strategy>
  chainId: number
  labels: Array<string>
}
