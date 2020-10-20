import axios from 'axios';
import { AppConfig } from 'config/App';
import { Token } from 'types/Token';
import { isValidAddress } from 'utils/web3';

class TokenRepository {
  async GetTokenInfo(address: string): Promise<Token | undefined> {
    if (!isValidAddress(address)) return;

    try {
      const result = await axios.get(
        `https://api.ethplorer.io/getTokenInfo/${address}?apiKey=${AppConfig.ETHPLORER_APIKEY}`
      );
      if (result.status !== 200) throw new Error("Couldn't retrieve token info");

      return this.toToken(result.data);
    } catch {
      console.error("Couldn't retrieve token info");
    }
  }

  private toToken(source: any): Token {
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
}

export default TokenRepository;
