import { APP_CONFIG } from 'src/utils/config'
import { VotingRepository } from './interfaces/voting'
import { MockRepository } from './mock'
import { MongoVotingRepository } from './voting'

export function Create(): VotingRepository {
  if (APP_CONFIG.NODE_ENV === 'development') {
    return new MockRepository()
  }

  return new MongoVotingRepository()
}
