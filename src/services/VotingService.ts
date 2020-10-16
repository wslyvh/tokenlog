import axios from 'axios';
import { AppConfig } from 'config/App';
import { Token } from 'types/Token';

export default {
  GetTokenInfo,
};

async function GetTokenInfo(address: string): Promise<Token | undefined> {
  try {
    const result = await axios.get(
      `https://api.ethplorer.io/getTokenInfo/${address}?apiKey=${AppConfig.ETHPLORER_APIKEY}`
    );
    if (result.status !== 200) throw new Error("Couldn't retrieve token info");

    return toToken(result.data);
  } catch {
    console.error("Couldn't retrieve token info");
  }
}

function toToken(source: any): Token {
  return {
    address: source.address,
    name: source.name,
    symbol: source.symbol,
    totalSupply: source.totalSupply,
    decimals: source.decimals,
    holdersCount: source.holdersCount,
    image: 'https://ethplorer.io/' + source.image,
    description: source.description,
    website: source.website,
  } as Token;
}
