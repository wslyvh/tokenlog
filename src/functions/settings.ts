import { Octokit } from '@octokit/rest';
import { Context, APIGatewayEvent } from 'aws-lambda';
import { RepositorySettings } from 'types/RepositorySettings';
import RepoConfigs from 'config/repo-configs.json';
import VotingService from 'services/VotingService';
import { Token } from 'types/Token';
import { AppConfig } from 'config/App';

const repositorySettings: any = {};

export async function handler(event: APIGatewayEvent, context: Context) {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };
  context.callbackWaitsForEmptyEventLoop = false;

  const owner = event.queryStringParameters?.owner ?? '';
  const repo = event.queryStringParameters?.repo ?? '';
  if (!owner || !repo) return { statusCode: 400, body: 'Bad Request' };

  let chainId = 1;
  if (event.queryStringParameters?.chainId && !isNaN(Number(event.queryStringParameters?.chainId))) {
    chainId = Number(event.queryStringParameters?.chainId);
  }

  const cacheKey = `repoSettings::${owner}-${repo}-${chainId}`;
  console.log('GET RepositorySettings', owner, repo);

  if (repositorySettings[cacheKey]) {
    console.log('RETURN Cached settings');
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(repositorySettings[cacheKey]),
    };
  }

  let settings = RepoConfigs.find((i) => i.org === owner && i.repo === repo) as RepositorySettings;
  if (!settings) {
    try {
      const octokit = new Octokit({
        auth: AppConfig.GITHUB_ACCESS_TOKEN,
      });
      const result: any = await octokit.repos.getContent({ owner, repo, path: 'tokenlog.json' });
      if (result.status !== 200) throw new Error("Couldn't retrieve tokenlog config");

      const content = Buffer.from(result.data.content, 'base64').toString();
      settings = JSON.parse(content) as RepositorySettings;
    } catch {
      console.error("Couldn't retrieve tokenlog config. The file likely doesn't exist at the requested repository.");
    }
  }

  if (settings) {
    const chain = settings.chainId || chainId;
    if (settings.tokenAddress) {
      console.log('GET TokenInfo', settings.tokenAddress, chain);
      settings.token = await VotingService.GetTokenInfo(settings.tokenAddress, chain);
    } else if (settings.tokenAddresses) {
      const tokens = new Array<Token>();

      for (let index = 0; index < settings.tokenAddresses.length; index++) {
        const address = settings.tokenAddresses[index];
        console.log('GET TokenInfo', address, chain);
        const token = await VotingService.GetTokenInfo(address, chain);
        if (token) {
          tokens.push(token);
        }
      }

      settings.tokens = tokens;
    }
  }

  repositorySettings[cacheKey] = settings;
  console.log('CACHE RepositorySettings', cacheKey, repositorySettings[cacheKey]);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  };
}
