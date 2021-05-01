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
  const uniques = Array.from(new Set(data.map((i) => i.address)));
  const items = Array.from(new Set(data.map((i) => i.number)));

  const amountOfVotesCast = data.length;
  const uniqueVoters = uniques.length;
  const sumOfVotes = data
    .map((i) => i.amount)
    .reduce(function (a, b) {
      return a + b;
    }, 0);
  const sumOfVotingPower = data
    .map((i) => i.cost)
    .reduce(function (a, b) {
      return a + b;
    }, 0);
  const uniqueItems = items.length;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amountOfVotesCast,
      uniqueVoters,
      sumOfVotes,
      sumOfVotingPower,
      uniqueItems,
      votes: data,
    }),
  };
}
