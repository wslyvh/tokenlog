import axios from 'axios';
import { ethers } from 'ethers';
import { Token } from 'types/Token';
import { Vote } from 'types/Vote';
import { VotingPower } from 'types/VotingPower';
import { ERC20_READ } from 'utils/abi';
import { GetProvider, isValidAddress } from 'utils/web3';

export default {
  GetTokenInfo,
  GetVotingPower,
  GetCombinedVotingPower,
  GetUserVotes,
  CreateVote,
  GetVotes,
};

async function GetTokenInfo(address: string, chainId?: number): Promise<Token | undefined> {
  if (!isValidAddress(address)) return;

  const provider = await GetProvider(chainId);
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

async function GetVotingPower(
  tokenAddress: string,
  org: string,
  repo: string,
  address: string,
  chainId?: number
): Promise<VotingPower | undefined> {
  if (!isValidAddress(tokenAddress)) return;
  if (!isValidAddress(address)) return;

  const provider = await GetProvider(chainId);
  const erc20 = new ethers.Contract(tokenAddress, ERC20_READ, provider);

  let delegatedVotes = 0;
  try {
    const decimals = await erc20.decimals();
    const votes = await erc20.getCurrentVotes(address);
    delegatedVotes = parseFloat(ethers.utils.formatUnits(votes, decimals));
  } catch {
    // Ignore error: Delegated votes are not applicable to all ERC20 token's
  }

  try {
    const decimals = await erc20.decimals();
    const balance = await erc20.balanceOf(address);
    const etherUnit = ethers.utils.formatUnits(balance, decimals);
    const totalSupply = await erc20.totalSupply();
    const formattedSupply = parseFloat(ethers.utils.formatUnits(totalSupply, decimals));

    const votingPower = parseFloat(etherUnit) + delegatedVotes;
    const alreadyUsedVotes = (await GetUserVotes(org, repo, address)) ?? 0;

    return {
      totalPower: votingPower,
      voted: alreadyUsedVotes,
      available: votingPower - alreadyUsedVotes,
      totalSupply: formattedSupply,
    };
  } catch {
    console.error("Couldn't retrieve token balance");
  }
}

async function GetCombinedVotingPower(
  tokens: Token[],
  org: string,
  repo: string,
  address: string,
  chainId?: number
): Promise<VotingPower | undefined> {
  if (!isValidAddress(address)) return;

  let totalVotingPower: { address: string; supply: number; balance: number }[] = [];
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    const provider = await GetProvider(chainId);
    const erc20 = new ethers.Contract(token.address, ERC20_READ, provider);

    let delegatedVotes = 0;
    try {
      const decimals = await erc20.decimals();
      const votes = await erc20.getCurrentVotes(address);
      delegatedVotes = parseFloat(ethers.utils.formatUnits(votes, decimals));
    } catch {
      // Ignore error: Delegated votes are not applicable to all ERC20 token's
    }

    try {
      const decimals = await erc20.decimals();
      const balance = await erc20.balanceOf(address);
      const etherUnit = ethers.utils.formatUnits(balance, decimals);
      const totalSupply = await erc20.totalSupply();
      const formattedSupply = parseFloat(ethers.utils.formatUnits(totalSupply, decimals));

      totalVotingPower.push({
        address: token.address,
        supply: formattedSupply,
        balance: parseFloat(etherUnit) + delegatedVotes,
      });
    } catch {
      console.error("Couldn't retrieve token balance", token.address);
    }
  }

  // calculate total combined supply
  const minSupply = Math.min(...totalVotingPower.map((o) => o.supply));
  const maxSupply = Math.max(...totalVotingPower.map((o) => o.supply));
  const multiplier = maxSupply / minSupply;
  const totalSupply = minSupply * multiplier + maxSupply;

  // calculate total combined balance
  const minBalance = totalVotingPower.find((i) => i.supply === minSupply)?.balance || 0;
  const maxBalance = totalVotingPower.find((i) => i.supply === maxSupply)?.balance || 0;
  const totalBalance = minBalance * multiplier + maxBalance;

  // console.log("MIN", minSupply, "MAX", maxSupply, "MULTIPLER", multiplier, "TOTAL", totalSupply, "MIN BALANCE", minBalance, "MAX BALANCE", maxBalance, "TOTAL BALANCE", totalBalance);

  const alreadyUsedVotes = (await GetUserVotes(org, repo, address)) ?? 0;
  return {
    totalPower: totalBalance,
    voted: alreadyUsedVotes,
    available: totalBalance - alreadyUsedVotes,
    totalSupply: totalSupply,
  };
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
