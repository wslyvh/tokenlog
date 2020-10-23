import axios from 'axios';
import VotingService from './VotingService';
import { Vote } from 'types/Vote';

const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';
const INVALID_ADDRESS = '0x1nv4l1D';
const EMPTY_ADDRESS = '0x02941ca660485Ba7Dc196B510D9A6192c2648709';

describe('voting service, token info', function () {
  it('should return DAI token info', async function () {
    let result = await VotingService.GetTokenInfo(DAI_ADDRESS);

    expect(result).toBeDefined();
    expect(result?.address).toEqual(DAI_ADDRESS);
  });

  it('should return undefined for invalid address', async function () {
    let result = await VotingService.GetTokenInfo(INVALID_ADDRESS);

    expect(result).toBeUndefined();
  });

  it('should return positive voting power for DAI address', async function () {
    let result = await VotingService.GetVotingPower(DAI_ADDRESS, DAI_ADDRESS);

    expect(result).toBeDefined();
    expect(result).toBeGreaterThan(0);
  });

  it('should return undefined voting power for invalid address', async function () {
    let result = await VotingService.GetVotingPower(DAI_ADDRESS, INVALID_ADDRESS);

    expect(result).toBeUndefined();
  });

  it('should return no token balance for a random address without funds', async function () {
    let result = await VotingService.GetVotingPower(DAI_ADDRESS, EMPTY_ADDRESS);

    expect(result).toBeDefined();
    expect(result).toEqual(0);
  });
});

describe('voting service, votes', function () {

  it('should cast a new vote at wslyvh/tokenlog', async function () {
    const actual = {
      org: 'wslyvh',
      repo: 'tokenlog',
      number: 40,
      amount: 3,
      cost: 2,
      tokenAddress: DAI_ADDRESS,
      address: DAI_ADDRESS,
      signature: '0xS1gn4Tur3',
      timestamp: new Date(),
    } as Vote;

    const response = {
      status: 200,
      data: actual
    }

    jest.spyOn(axios, 'post').mockImplementationOnce(() => Promise.resolve(response));

    const result = await VotingService.CreateVote(actual);

    expect(result).toBeDefined();
    expect(actual.org).toEqual(result?.org);
    expect(actual.repo).toEqual(result?.repo);
    expect(actual.number).toEqual(result?.number);
  });

  it('should return all votes for wslyvh/tokenlog', async function () {
    const org = 'wslyvh';
    const repo = 'tokenlog';
    const actual = {
      org: org,
      repo: repo,
      number: 40,
      amount: 3,
      cost: 2,
      tokenAddress: DAI_ADDRESS,
      address: DAI_ADDRESS,
      signature: '0xS1gn4Tur3',
      timestamp: new Date(),
    } as Vote;

    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({ status: 200, data: [ actual ] }));

    let result = await VotingService.GetVotes(org, repo);

    expect(result).toBeDefined();
    expect(result.length).toBe(1);
    expect(result[0].address).toBe(actual.address);
  });
});
