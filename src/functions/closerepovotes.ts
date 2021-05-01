import { Context, APIGatewayEvent } from 'aws-lambda';
import VoteRepository from 'data/VoteRepository';
import IssueService from 'services/IssueService';
import { IssueState, OrgRepoIssue } from 'types/Issue';
require('encoding');

const repository = new VoteRepository();

export async function handler(event: APIGatewayEvent, context: Context) {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };

  context.callbackWaitsForEmptyEventLoop = false;
  console.log('RECURRING JOB: Close repository votes');
  const data = await repository.GetRepoIssuesWithVotes();
  console.log(data.length, '(open) items with votes');

  const closed = new Array<OrgRepoIssue>();
  for (let index = 0; index < data.length; index++) {
    const repo = data[index];
    try {
      console.log('Checking issue on Github. #' + repo.number, repo.org, repo.repo);
      const issue = await IssueService.GetIssue(repo.org, repo.repo, repo.number);

      if (issue?.state === IssueState.CLOSED) {
        console.log('ISSUE CLOSED. Updating votes');
        await repository.CloseVote(repo.org, repo.repo, repo.number);
        closed.push(repo);
      }
    } catch (e) {
      console.error(e);
      console.log('FAILED to close issue. #' + repo.number, repo.org, repo.repo);
    }
  }

  console.log('FINISHING JOB');
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      count: closed.length,
      data: closed,
    }),
  };
}
