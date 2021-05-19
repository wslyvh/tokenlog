import { Token } from './Token'

export interface BacklogSettings {
  votingMethod: 'STANDARD' | 'QUADRATIC'
  tokens: Array<Token>
  labels: Array<string>
}
