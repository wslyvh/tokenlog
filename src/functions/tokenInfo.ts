import { Context, APIGatewayEvent } from 'aws-lambda'
import VotingService from 'services/VotingService';

export async function handler(event: APIGatewayEvent, context: Context) {
    const queryString = event.queryStringParameters;
    const address = queryString?.address ?? '';

    const data = await VotingService.GetTokenInfo(address);
    
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}