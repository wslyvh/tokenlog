import React, { createContext, ReactNode, useEffect, useState } from 'react'
import snapshot from '@snapshot-labs/snapshot.js'
import { useWeb3 } from 'src/hooks/useWeb3'
import { useBacklog } from 'src/hooks/useBacklog'
import { Vote } from 'src/types'
import { useBacklogVotes } from 'src/hooks/useBacklogVotes'
import { GetUsedVotingPower } from 'src/utils/voting'
import { useBacklogContext } from 'src/hooks/useBacklogContext'

interface Props {
  children: ReactNode
}

interface VoteContextType {
  votingPower: number
  usedVotingPower: number
  backlogVotes: Array<Vote>,
  vote: (vote: Vote) => Promise<boolean>
}

export const VoteContext = createContext<VoteContextType>({
  votingPower: 0,
  usedVotingPower: 0,
  backlogVotes: [],
  vote: async () => false,
})

export function VoteContextProvider(props: Props) {
  const backlogContext = useBacklogContext()
  const backlog = useBacklog()
  const initialVotes = backlog.items.flatMap(i => i.votes)
  const initialState = {
    votingPower: 0,
    usedVotingPower: 0,
    backlogVotes: initialVotes,
    vote,
  }
  const [context, setContext] = useState(initialState)
  const backlogVotes = useBacklogVotes(backlog.id)
  const web3Context = useWeb3()

  useEffect(() => {
    if (backlogVotes && backlogVotes.length > 0) {
      setContext({
        ...context,
        backlogVotes: backlogVotes
      })
    }
  }, [backlogVotes])

  useEffect(() => {
    async function updateContext() {
      let votingPower = 0
      let usedVotingPower = 0
      
      if (web3Context.address && backlog.settings?.strategy) {
        votingPower = await getVotingPower()
        usedVotingPower = GetUsedVotingPower(backlogVotes, web3Context.address)
      }

      setContext({
        ...context,
        votingPower,
        usedVotingPower
      })
    }

    updateContext()
  }, [web3Context.address, backlog.settings, backlogVotes])

  async function vote(vote: Vote): Promise<boolean> {
    console.log('VOTE #', vote.number)

    // TODO: POST vote to API & add to global context
    backlog.items.find(i => i.number === vote.number).votes.push(vote)
    backlogContext.setBacklog(backlog)

    return true
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
