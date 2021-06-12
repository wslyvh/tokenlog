import React, { createContext, ReactNode, useEffect, useState } from 'react'
import snapshot from '@snapshot-labs/snapshot.js'
import { useWeb3 } from 'src/hooks/useWeb3'
import { useBacklog } from 'src/hooks/useBacklog'
import { useUserVotes } from 'src/hooks/useUserVotes'
import { Vote } from 'src/types'

interface Props {
  children: ReactNode
}

interface VoteContextType {
  votes: Array<Vote>
  votingPower: number
  votingPowerUsed: number
  vote: () => Promise<boolean>
}

export const VoteContext = createContext<VoteContextType>({
  votes: [],
  votingPower: 0,
  votingPowerUsed: 0,
  vote: async () => false,
})

export function VoteContextProvider(props: Props) {
  const initialState = {
    votes: [],
    votingPower: 0,
    votingPowerUsed: 0,
    vote,
  }
  const [context, setContext] = useState(initialState)
  const web3Context = useWeb3()
  const backlog = useBacklog()
  const userVotes = useUserVotes(backlog.id, web3Context.address)

  useEffect(() => {
    async function updateContext() {
      let votingPower = 0
      const votingPowerUsed = userVotes
        .map((i) => i.amount)
        .reduce((a, b) => a + b, 0)

      if (web3Context.address && backlog.settings?.strategy) {
        votingPower = await getVotingPower()
      }

      setContext({ ...context, votes: userVotes, votingPower, votingPowerUsed })
    }

    updateContext()
  }, [web3Context.address, backlog, userVotes])

  async function vote(): Promise<boolean> {
    console.log('VOTE')

    setContext({ ...initialState })
    return false
  }

  async function getVotingPower(): Promise<number> {
    const scores = await snapshot.utils.getScores(
      '',
      backlog.settings.strategy,
      web3Context.network.chainId.toString(),
      web3Context.provider,
      [web3Context.address]
    )

    return scores[0][web3Context.address]
  }

  return (
    <VoteContext.Provider value={context}>
      {props.children}
    </VoteContext.Provider>
  )
}
