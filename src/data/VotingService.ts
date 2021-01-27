import { Issue } from 'types/Issue';
import { Owner } from 'types/Owner';
import { Repository } from 'types/Repository';
import { RepositorySettings } from 'types/RepositorySettings';
import { Vote } from 'types/Vote';
import { VotingPower } from 'types/VotingPower';

export interface BacklogServiceInterface {
  GetOwner(org: string, inclRepos?: boolean): Promise<Owner>;
  GetRepository(org: string, repo: string, inclSettings?: boolean, inclIssues?: boolean): Promise<Repository>;
  GetRepositorySettings(org: string, repo: string): Promise<RepositorySettings>;
  GetRepositoryIssues(org: string, repo: string): Promise<Array<Issue>>;
  GetRepositoryVotes(org: string, repo: string): Promise<Array<Vote>>;
  GetVotingPower(org: string, repo: string, address: string): Promise<VotingPower>;
  Vote(org: string, repo: string, amount: number, owner: string, proof: string): Promise<boolean>;

  // actions
  DailySummary(org: string, repo: string): Promise<void>;
  OnNewVote(vote: Vote): Promise<void>;
}
