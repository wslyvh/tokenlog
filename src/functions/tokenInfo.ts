import { Context, APIGatewayEvent } from 'aws-lambda';
import TokenRepository from 'data/TokenRepository';

export async function handler(event: APIGatewayEvent, context: Context) {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };

  const address = event.queryStringParameters?.address ?? '';
  if (!address) return { statusCode: 400, body: 'Bad Request' };

  const repository = new TokenRepository();
  const data = await repository.GetTokenInfo(address);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}
