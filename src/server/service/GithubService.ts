import { graphqlWithAuth } from 'server/utils/graphql';
import { GET_OWNER, GET_REPOSITORY } from 'server/utils/queries';
import { ToBacklog, ToOwner } from 'server/utils/mappers';
import { Backlog, BacklogItem, Owner, Vote } from 'types/v2';
import { BacklogService } from './BacklogService';
import { VotingRepository } from 'server/repository/VotingRepository';

export class GithubService implements BacklogService {
  private repository: VotingRepository;

  constructor(repository: VotingRepository) {
    this.repository = repository;
  }

  public async GetBacklogs(): Promise<Array<Backlog>> {
    let backlogs = new Array<Backlog>();

    try {
      backlogs = await this.repository.GetBacklogs();
    } catch (e) {
      console.log('Unable to get backlogs from repository.');
      console.error(e);
    }

    return Promise.all(
      backlogs.map(async (i) => {
        return this.GetBacklog(i.ownerName, i.id, false);
      })
    );
  }

  public async GetOwner(owner: string): Promise<Owner> {
    if (!owner) throw new Error('Properties are empty or undefined.');

    try {
      const response: any = await graphqlWithAuth(GET_OWNER(), {
        owner: owner,
      });

      return ToOwner(response.repositoryOwner);
    } catch (e) {
      console.error(e);

      throw new Error(`Unable to get repository ${owner}`);
    }
  }

  public async GetBacklog(owner: string, id: string, inclFilters: boolean = true): Promise<Backlog> {
    if (!owner || !id) throw new Error('Properties are empty or undefined.');

    try {
      const response: any = await graphqlWithAuth(GET_REPOSITORY(inclFilters), {
        owner: owner,
        repo: id,
      });

      return ToBacklog(response.repository);
    } catch (e) {
      console.error(e);

      throw new Error(`Unable to get repository ${owner}/${id}`);
    }
  }

  public async GetBacklogItems(owner: string, id: string): Promise<Array<BacklogItem>> {
    if (!owner || !id) throw new Error('Properties are empty or undefined.');

    // parallel calls:
    // 1. Get Issues w/ (filter) from Github API
    // 2. Get GetBacklogVotesAggregated w/ (filter) from MongoRepository
    // Promise.all();
    // return

    throw new Error('Method not implemented.');
  }

  public async GetBacklogVotes(
    owner: string,
    id: string,
    state?: 'ALL' | 'OPEN' | 'CLOSED',
    address?: string,
    numbers?: number[]
  ): Promise<Array<Vote>> {
    if (!owner || !id) throw new Error('Properties are empty or undefined.');

    const votes = this.repository.GetBacklogVotes(owner, id, state, address, numbers);

    return votes;
  }
}
