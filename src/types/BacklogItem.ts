import { Vote } from './Vote'

export interface BacklogItem {
  id: number
  number: number
  title: string
  description?: string
  author?: string
  state: 'OPEN' | 'CLOSED'
  type: 'ISSUE' | 'PR'
  created: number
  updated: number
  url: string
  votes: Array<Vote>
  totalVoteValue: number
  totalVoteCount: number
}
