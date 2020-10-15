import { Octokit } from '@octokit/rest';
import { Repository } from 'types/Repository';
import { Owner } from 'types/Owner';
import { Issue } from 'types/Issue';
import { Label } from 'types/Label';

export default {
  GetRepositories,
  GetRepository,
  GetRepositoryIssues,
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

async function GetRepositoryIssues(owner: string, repo: string): Promise<Array<Issue>> {
  const octokit = new Octokit();
  const result = await octokit.issues.listForRepo({ owner, repo });
  if (result.status !== 200) throw new Error("Couldn't retrieve repository issues");

  return Array.from(result.data).map((i) => toIssue(i));
}

function toRepository(source: any): Repository {
  return {
    id: source.id,
    name: source.name,
    fullName: source.full_name,
    description: source.description,
    owner: toOwner(source.owner),
    url: source.name,
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
    url: source.url,
  } as Owner;
}

function toIssue(source: any): Issue {
  return {
    id: source.id,
    number: source.number,
    title: source.title,
    description: source.body,
    state: source.state,
    labels: Array.from(source.labels).map((i) => toLabel(i)),
    assignees: Array.from(source.assignees).map((i) => toOwner(i)),
    created: new Date(source.created_at),
    updated: new Date(source.updated_at),
    url: source.url,
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
