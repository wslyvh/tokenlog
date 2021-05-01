import { Context, APIGatewayEvent } from 'aws-lambda';
import VoteRepository from 'data/VoteRepository';
import moment from 'moment';

const repository = new VoteRepository();

export async function handler(event: APIGatewayEvent, context: Context) {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };

  const org = event.queryStringParameters?.org ?? '';
  const repo = event.queryStringParameters?.repo ?? '';
  if (!org || !repo) return { statusCode: 400, body: 'Bad Request' };

  let since: number | undefined;
  if (event.queryStringParameters?.days) {
    const days = parseInt(event.queryStringParameters?.days);

    if (!isNaN(days)) {
      since = moment().subtract(days, 'days').valueOf();
    }
  }

  context.callbackWaitsForEmptyEventLoop = false;
  const data = await repository.GetVotes(org, repo, since);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}
