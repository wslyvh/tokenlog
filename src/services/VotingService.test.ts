import VotingService from './VotingService';
import { Vote } from 'types/Vote';

const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';
const INVALID_ADDRESS = '0x1nv4l1D';
const EMPTY_ADDRESS = '0x02941ca660485Ba7Dc196B510D9A6192c2648709';

describe('voting service, token info', function () {
  it('should return token info from ethplorer', async function () {
    let result = await VotingService.GetTokenInfo(DAI_ADDRESS);

    expect(result).toBeDefined();
    expect(result?.address).toEqual(DAI_ADDRESS);
  });

  it('should return undefined for invalid address', async function () {
    let result = await VotingService.GetTokenInfo(INVALID_ADDRESS);

    expect(result).toBeUndefined();
  });

  it('should return positive token balance', async function () {
    let result = await VotingService.GetTokenBalance(DAI_ADDRESS, DAI_ADDRESS);

    expect(result).toBeDefined();
    expect(result).toBeGreaterThan(0);
  });

  it('should return undefined for invalid address', async function () {
    let result = await VotingService.GetTokenBalance(DAI_ADDRESS, INVALID_ADDRESS);

    expect(result).toBeUndefined();
  });

  it('should return no token balance', async function () {
    let result = await VotingService.GetTokenBalance(DAI_ADDRESS, EMPTY_ADDRESS);

    expect(result).toBeDefined();
    expect(result).toEqual(0);
  });
});

describe('voting service, votes', function () {
  it('should casst a new vote at wslyvh/tokenlog', async function () {
    const actual = {
      org: 'wslyvh',
      repo: 'tokenlog',
      number: 40,
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      amount: 10,
      signature: '0xS1gn4Tur3',
      timestamp: new Date(),
    } as Vote;

    const result = await VotingService.CreateVote(actual);

    expect(result).toBeDefined();
    expect(actual.org).toEqual(result?.org);
    expect(actual.repo).toEqual(result?.repo);
    expect(actual.number).toEqual(result?.number);
  });

  it('should return all votes for wslyvh/tokenlog', async function () {
    const org = 'wslyvh';
    const repo = 'tokenlog';
    let result = await VotingService.GetVotes(org, repo);

    expect(result).toBeDefined();
  });
});
