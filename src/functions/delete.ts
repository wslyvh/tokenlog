import { Context, APIGatewayEvent } from 'aws-lambda';
import VoteRepository from 'data/VoteRepository';

const repository = new VoteRepository();

export async function handler(event: APIGatewayEvent, context: Context) {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };

  const org = event.queryStringParameters?.org ?? '';
  const repo = event.queryStringParameters?.repo ?? '';
  if (!org || !repo) return { statusCode: 400, body: 'Bad Request' };

  // Do not expose publicly. Only for testing/cleaning up.
  // await repository.DeleteVotesFromRepo(org, repo);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: 'Ok',
  };
}
