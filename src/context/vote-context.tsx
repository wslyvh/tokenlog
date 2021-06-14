import React, { createContext, ReactNode, useEffect, useState } from 'react'
import snapshot from '@snapshot-labs/snapshot.js'
import { useWeb3 } from 'src/hooks/useWeb3'
import { useBacklog } from 'src/hooks/useBacklog'
import { Vote } from 'src/types'
import { useBacklogVotes } from 'src/hooks/useBacklogVotes'

interface Props {
  children: ReactNode
}

interface VoteContextType {
  backlogVotes: Array<Vote>
  votingPower: number
  vote: () => Promise<boolean>
}

export const VoteContext = createContext<VoteContextType>({
  backlogVotes: [],
  votingPower: 0,
  vote: async () => false,
})

export function VoteContextProvider(props: Props) {
  const initialState = {
    backlogVotes: [],
    votingPower: 0,
    vote,
  }
  const [context, setContext] = useState(initialState)
  const web3Context = useWeb3()
  const backlog = useBacklog()
  const backlogVotes = useBacklogVotes(backlog.id)

  useEffect(() => {
    async function updateContext() {
      let votingPower = 0
      if (web3Context.address && backlog.settings?.strategy) {
        votingPower = await getVotingPower()
      }

      setContext({
        ...context,
        backlogVotes: backlogVotes,
        votingPower,
      })
    }

    updateContext()
  }, [web3Context.address, backlog])

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
