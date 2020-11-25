import { Context, APIGatewayEvent } from 'aws-lambda';
import VoteRepository from 'data/VoteRepository';

const repository = new VoteRepository();

export async function handler(event: APIGatewayEvent, context: Context) {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };

  const org = event.queryStringParameters?.org ?? '';
  const repo = event.queryStringParameters?.repo ?? '';
  const address = event.queryStringParameters?.address ?? '';
  if (!org || !repo || !address) return { statusCode: 400, body: 'Bad Request' };

  context.callbackWaitsForEmptyEventLoop = false;
  const data = await repository.GetUserVotes(org, repo, address);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}
