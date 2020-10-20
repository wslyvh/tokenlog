import { Context, APIGatewayEvent } from 'aws-lambda';
import VoteRepository from 'data/VoteRepository';
import { Vote } from 'types/Vote';

export async function handler(event: APIGatewayEvent, context: Context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const org = event.queryStringParameters?.org ?? '';
  const repo = event.queryStringParameters?.repo ?? '';
  if (!org || !repo) return { statusCode: 400, body: 'Bad Request' };

  const body = event.body ? (JSON.parse(event.body) as Vote) : undefined;
  if (!body) return { statusCode: 400, body: 'Bad Request' };

  const repository = new VoteRepository();
  const data = await repository.CreateVote(body);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}
