import { Context, APIGatewayEvent } from 'aws-lambda';
import VoteRepository from 'data/VoteRepository';
import IssueService from 'services/IssueService';
import { IssueState } from 'types/Issue';
require('encoding');

const repository = new VoteRepository();

export async function handler(event: APIGatewayEvent, context: Context) {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };
  
  context.callbackWaitsForEmptyEventLoop = false;
  const data = await repository.GetRepoIssuesWithVotes();

  data.forEach(async (i) => {
    const issue = await IssueService.GetIssue(i.org, i.repo, i.number);

    if (issue?.state === IssueState.CLOSED) {
      console.log('CLOSING VOTE', i.number);
      await repository.CloseVote(i.org, i.repo, i.number);
    }
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}
