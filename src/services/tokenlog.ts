import { TokenlogService as TokenlogServiceInterface } from 'src/services/interfaces/tokenlog'
import { VotingRepository } from 'src/repository/interfaces/voting'
import { GithubService } from './github/service'
import { Backlog } from 'src/types'
import { BacklogService } from './interfaces/backlog'

export class TokenlogService implements TokenlogServiceInterface {
  private repository: VotingRepository
  private githubService: BacklogService

  constructor(repository: VotingRepository) {
    this.repository = repository
    this.githubService = new GithubService(this.repository)
  }

  public async GetBacklogs(): Promise<Array<Backlog>> {
    try {
      const ids = await this.repository.GetBacklogIds()

      return Promise.all(
        ids.map(async (id) => {
          if (id.startsWith('github:')) {
            return await this.githubService.GetBacklog(id)
          }
        })
      )
    } catch (e) {
      console.log('Unable to get backlog.')
      console.error(e)
    }
  }
}
