import { Vote } from 'src/types'

export function GetUserVotes(votes: Array<Vote>, address: string): Array<Vote> {
  return votes.filter((i) => i.address === address)
}

export function GetUsedVotingPower(votes: Array<Vote>, address: string) {
  return GetUserVotes(votes, address)
    .map((i) => i.amount)
    .reduce((a, b) => a + b, 0)
}
