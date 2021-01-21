import axios from 'axios';
import { ethers } from 'ethers';
import { Token } from 'types/Token';
import { Vote } from 'types/Vote';
import { ERC20_READ } from 'utils/abi';
import { GetProvider, isValidAddress } from 'utils/web3';

export default {
  GetTokenInfo,
  GetVotingPower,
  GetUserVotes,
  CreateVote,
  GetVotes,
};

async function GetTokenInfo(address: string, chainId?: number): Promise<Token | undefined> {
  if (!isValidAddress(address)) return;

  const provider = await GetProvider(chainId);
  const erc20 = new ethers.Contract(address, ERC20_READ, provider);

  // Check decimals seperately as it's not in the ERC721 standard.
  let decimals = 0;
  try { 
    decimals = await erc20.decimals();
  }
  catch(e) { 
    console.log("Couldn't fetch token decimals. Potential ERC721?");
  }

  try {
    const name = await erc20.name();
    const symbol = await erc20.symbol();
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

async function GetVotingPower(tokenAddress: string, address: string, chainId?: number): Promise<number | undefined> {
  if (!isValidAddress(tokenAddress)) return;
  if (!isValidAddress(address)) return;

  const provider = await GetProvider(chainId);
  const erc20 = new ethers.Contract(tokenAddress, ERC20_READ, provider);

  let decimals = 0;
  try { 
    decimals = await erc20.decimals();
  }
  catch(e) { 
    // Ignore error: decimals are fetched seperately as it's not in the ERC721 standard.
  }

  let delegatedVotes = 0;
  try {
    const votes = await erc20.getCurrentVotes(address);
    delegatedVotes = parseFloat(ethers.utils.formatUnits(votes, decimals));
  } catch {
    // Ignore error: Delegated votes are not applicable to all ERC20 token's
  }

  try {
    const balance = await erc20.balanceOf(address);
    const etherUnit = ethers.utils.formatUnits(balance, decimals);

    return parseFloat(etherUnit) + delegatedVotes;
  } catch {
    console.error("Couldn't retrieve token balance");
  }
}

async function GetUserVotes(org: string, repo: string, address: string): Promise<number | undefined> {
  try {
    const result = await axios.get(`/.netlify/functions/uservotes?org=${org}&repo=${repo}&address=${address}`);
    if (result.status !== 200) throw new Error("Couldn't get user votes");

    return result.data;
  } catch {
    console.error("Couldn't get user votes");
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

async function GetVotes(org: string, repo: string): Promise<Array<Vote>> {
  try {
    const result = await axios.get(`/.netlify/functions/votes?org=${org}&repo=${repo}`);
    if (result.status !== 200) throw new Error("Couldn't get votes");

    return result.data;
  } catch {
    console.error("Couldn't get votes");
  }

  return [];
}
