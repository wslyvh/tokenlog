import { Context, APIGatewayEvent } from 'aws-lambda';
import VoteRepository from 'data/VoteRepository';

const repository = new VoteRepository();

export async function handler(event: APIGatewayEvent, context: Context) {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };

  context.callbackWaitsForEmptyEventLoop = false;
  const data = await repository.GetReposWithVotes();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}
