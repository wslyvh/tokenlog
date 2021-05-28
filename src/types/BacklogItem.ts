import { VoteSummary } from '.'
import { Vote } from './Vote'

export interface BacklogItem {
  id: number
  number: number
  title: string
  state: 'OPEN' | 'CLOSED'
  type: 'ISSUE' | 'PR'
  // created: Date
  // updated: Date
  // closed: Date
  url: string
  commentsCount: number
  voteSummary?: VoteSummary
  votes: Array<Vote>
}
