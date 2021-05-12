import { Context, APIGatewayEvent } from 'aws-lambda';
import VoteRepository from 'data/VoteRepository';
import { Vote } from 'types/Vote';
import VotingService from 'services/VotingService';
import { VotingPower } from 'types/VotingPower';

const repository = new VoteRepository();

export async function handler(event: APIGatewayEvent, context: Context) {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const org = event.queryStringParameters?.org ?? '';
  const repo = event.queryStringParameters?.repo ?? '';
  if (!org || !repo) return { statusCode: 400, body: 'Bad Request' };

  const body = event.body ? (JSON.parse(event.body) as Vote) : undefined;
  if (!body) return { statusCode: 400, body: 'Bad Request' };

  context.callbackWaitsForEmptyEventLoop = false;

  let vp: VotingPower | undefined = undefined;
  if (body.tokenAddress.includes('|')) {
    vp = await VotingService.GetCombinedVotingPower(
      body.tokenAddress.split('|').map((i) => {
        return {
          address: i,
          name: i,
          symbol: '',
          totalSupply: -1,
          decimals: -1,
        };
      }),
      body.org,
      body.repo,
      body.address,
      body.chainId
    );
  } else {
    vp = await VotingService.GetVotingPower(body.tokenAddress, body.org, body.repo, body.address, body.chainId);
  }

  if (!vp) {
    return { statusCode: 500, body: 'Unable to retrieve voting power.' };
  }

  // VotingPower will not include already casted votes, due to bad design in the services/REST calls
  console.log('Getting already cast user votes');
  const alreadyUsedVotes = await repository.GetUserVotes(body.org, body.repo, body.address);
  vp = {
    totalPower: vp.totalPower,
    voted: alreadyUsedVotes,
    available: vp.totalPower - alreadyUsedVotes,
    totalSupply: vp.totalSupply,
  };

  if (body.cost > vp.available) {
    console.log('Not enough voting power left. Unable to cast vote.');
    return { statusCode: 500, body: 'Not enough voting power left. Unable to cast vote.' };
  }

  const data = await repository.CreateVote(body);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}
