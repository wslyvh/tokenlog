import axios from 'axios';
import { ethers } from 'ethers';
import { Token } from 'types/Token';
import { Vote } from 'types/Vote';
import { ERC20_READ } from 'utils/abi';
import { isValidAddress } from 'utils/web3';

export default {
  GetTokenInfo,
  GetTokenBalance,
  CreateVote,
  GetVotes,
};

async function GetTokenInfo(address: string): Promise<Token | undefined> {
  if (!isValidAddress(address)) return;

  try {
    const result = await axios.get(`/.netlify/functions/token?address=${address}`);
    if (result.status !== 200) throw new Error("Couldn't retrieve token info");

    return result.data;
  } catch {
    console.error("Couldn't retrieve token info");
  }
}

async function GetTokenBalance(tokenAddress: string, address: string): Promise<number | undefined> {
  if (!isValidAddress(tokenAddress)) return;
  if (!isValidAddress(address)) return;

  const provider = ethers.getDefaultProvider();
  const erc20 = new ethers.Contract(tokenAddress, ERC20_READ, provider);

  try {
    const decimals = await erc20.decimals();
    const balance = await erc20.balanceOf(address);
    const etherUnit = ethers.utils.formatUnits(balance, decimals);

    return parseFloat(etherUnit);
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
