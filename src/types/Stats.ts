import { Vote } from "./Vote";

export interface Stats {
  amountOfVotesCast: number
  uniqueVoters: number
  sumOfVotes: number
  sumOfVotingPower: number
  uniqueItems: number
  votes: Array<Vote>
}
