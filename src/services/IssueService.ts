import { Octokit } from '@octokit/rest';
import { Repository } from 'types/Repository';
import { Owner } from 'types/Owner';
import { Label } from 'types/Label';
import { Vote } from 'types/Vote';
import { Issue, IssueState, IssueType } from 'types/Issue';
import { RepositorySettings } from 'types/RepositorySettings';
import VotingService from './VotingService';
import RepoConfigs from 'config/repo-configs.json';

export default {
  GetRepositories,
  GetRepository,
  GetRepositoryLabels,
  GetRepositoryIssues,
  GetIssue,
  GetRepositorySettings,
};

async function GetRepositories(owner: string): Promise<Array<Repository>> {
  const octokit = new Octokit();
  const result = await octokit.repos.listForOrg({ org: owner, type: 'public' });
  if (result.status !== 200) throw new Error("Couldn't retrieve public repositories");

  return Array.from(result.data).map((i) => toRepository(i));
}

async function GetRepository(owner: string, repo: string): Promise<Repository> {
  const octokit = new Octokit();
  const result = await octokit.repos.get({ owner, repo });
  if (result.status !== 200) throw new Error("Couldn't retrieve repository info");

  return toRepository(result.data);
}

async function GetRepositoryLabels(owner: string, repo: string): Promise<Array<Label>> {
  const octokit = new Octokit();
  const result = await octokit.issues.listLabelsForRepo({ owner, repo });
  if (result.status !== 200) throw new Error("Couldn't retrieve repository labels");

  return Array.from(result.data).map((i) => toLabel(i));
}

async function GetRepositoryIssues(
  owner: string,
  repo: string,
  state: IssueState = IssueState.OPEN,
  labels: string = '',
  limit: number = 25,
  page: number = 1,
  sort: 'updated' | 'created' | 'comments' | undefined = 'updated',
  direction: 'asc' | 'desc' | undefined = 'desc'
): Promise<Array<Issue>> {
  const octokit = new Octokit();
  const result = await octokit.issues.listForRepo({
    owner,
    repo,
    state,
    labels,
    per_page: limit,
    page,
    sort,
    direction,
  });
  if (result.status !== 200) throw new Error("Couldn't retrieve repository issues");

  const votes = await VotingService.GetVotes(owner, repo);

  return Array.from(result.data)
    .map((i) => toIssue(i, votes))
    .sort((a, b) => b.voteCount - a.voteCount);
}

async function GetIssue(owner: string, repo: string, number: number, includeVotes: boolean = false): Promise<Issue> {
  const octokit = new Octokit();
  const result = await octokit.issues.get({ owner, repo, issue_number: number });
  if (result.status !== 200) throw new Error("Couldn't retrieve issue");

  const votes = await VotingService.GetVotes(owner, repo, number);

  return toIssue(result.data, votes);
}

async function GetRepositorySettings(owner: string, repo: string): Promise<RepositorySettings | undefined> {
  let settings = RepoConfigs.find((i) => i.org === owner && i.repo === repo) as RepositorySettings;

  if (!settings) {
    try {
      const octokit = new Octokit();
      const result = await octokit.repos.getContent({ owner, repo, path: 'tokenlog.json' });
      if (result.status !== 200) throw new Error("Couldn't retrieve tokenlog config");

      const content = Buffer.from(result.data.content, 'base64').toString();
      settings = JSON.parse(content) as RepositorySettings;
    } catch {
      console.error("Couldn't retrieve tokenlog config. The file likely doesn't exist at the requested repository.");
    }
  }

  if (settings) {
    settings.token = await VotingService.GetTokenInfo(settings.tokenAddress);
  }

  return settings;
}

function toRepository(source: any): Repository {
  return {
    id: source.id,
    name: source.name,
    fullName: source.full_name,
    description: source.description,
    owner: toOwner(source.owner),
    url: source.html_url,
    homepage: source.homepage,
    stargazersCount: source.stargazers_count,
    watchersCount: source.watchers_count,
    forksCount: source.forks_count,
    openIssueCount: source.open_issues_count,
  } as Repository;
}

function toOwner(source: any): Owner {
  return {
    id: source.id,
    name: source.login,
    type: source.type,
    url: source.html_url,
    avatarUrl: source.avatar_url,
  } as Owner;
}

function toIssue(source: any, votes: Array<Vote>): Issue {
  return {
    id: source.id,
    number: source.number,
    title: source.title,
    description: source.body,
    state: source.state,
    type: source.pull_request ? IssueType.PR : IssueType.ISSUE,
    labels: Array.from(source.labels).map((i) => toLabel(i)),
    assignees: Array.from(source.assignees).map((i) => toOwner(i)),
    created: new Date(source.created_at),
    updated: new Date(source.updated_at),
    url: source.html_url,
    commentsCount: source.comments,
    votes: votes.filter((i) => i.number === source.number),
    voteCount: votes.filter((i) => i.number === source.number).reduce((a, b) => a + b.amount, 0) ?? 0,
  } as Issue;
}

function toLabel(source: any): Label {
  return {
    id: source.id,
    name: source.name,
    description: source.description,
    color: source.color,
  } as Label;
}
