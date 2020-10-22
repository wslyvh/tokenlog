import axios from 'axios';
import { ethers } from 'ethers';
import { Token } from 'types/Token';
import { Vote } from 'types/Vote';
import { ERC20_READ } from 'utils/abi';
import { GetNetworkName, isValidAddress } from 'utils/web3';

export default {
  GetTokenInfo,
  GetTokenBalance,
  CreateVote,
  GetVotes,
};

async function GetTokenInfo(address: string, chainId?: number): Promise<Token | undefined> {
  if (!isValidAddress(address)) return;

  const provider = ethers.getDefaultProvider(GetNetworkName(chainId ?? 1));
  const erc20 = new ethers.Contract(address, ERC20_READ, provider);

  try {
    const name = await erc20.name();
    const symbol = await erc20.symbol();
    const decimals = await erc20.decimals();
    const totalSupply = await erc20.totalSupply();
    const formattedSupply = parseFloat(ethers.utils.formatUnits(totalSupply, decimals));

    return {
      address: address,
      name: name,
      symbol: symbol,
      totalSupply: formattedSupply,
      decimals: decimals,
    } as Token;
  } catch {
    console.error("Couldn't retrieve token info");
  }
}

async function GetTokenBalance(tokenAddress: string, address: string, chainId?: number): Promise<number | undefined> {
  if (!isValidAddress(tokenAddress)) return;
  if (!isValidAddress(address)) return;

  const provider = ethers.getDefaultProvider(GetNetworkName(chainId ?? 1));
  const erc20 = new ethers.Contract(tokenAddress, ERC20_READ, provider);

  let delegatedVotes = 0;
  try {
    const decimals = await erc20.decimals();
    const votes = await erc20.getCurrentVotes('0xac5720d6ee2d7872b88914c9c5fa9bf38e72faf6');
    delegatedVotes = parseFloat(ethers.utils.formatUnits(votes, decimals));
  } catch (ex) {
    console.log("Couldn't retrieve delegated votes. Not applicable to all ERC20 token's");
  }

  try {
    const decimals = await erc20.decimals();
    const balance = await erc20.balanceOf(address);
    const etherUnit = ethers.utils.formatUnits(balance, decimals);

    return parseFloat(etherUnit) + delegatedVotes;
  } catch {
    console.error("Couldn't retrieve token balance");
  }
}

async function CreateVote(vote: Vote): Promise<Vote | undefined> {
  try {
    const result = await axios.post(`/.netlify/functions/vote?org=${vote.org}&repo=${vote.repo}`, vote);
    if (result.status !== 200) throw new Error("Couldn't POST vote");

    return result.data;
  } catch {
    console.error("Couldn't POST vote");
  }
}

async function GetVotes(org: string, repo: string, number?: number): Promise<Array<Vote>> {
  try {
    let filter = number ? `&issue=${number}` : '';
    const result = await axios.get(`/.netlify/functions/votes?org=${org}&repo=${repo}${filter}`);
    if (result.status !== 200) throw new Error("Couldn't get votes");

    return result.data;
  } catch {
    console.error("Couldn't get votes");
  }

  return [];
}
