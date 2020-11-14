import { Context, APIGatewayEvent } from 'aws-lambda';
import VoteRepository from 'data/VoteRepository';

export async function handler(event: APIGatewayEvent, context: Context) {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };

  const repository = new VoteRepository();
  const data = await repository.GetReposWithVotes();
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}
