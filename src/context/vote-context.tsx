import React, { createContext, ReactNode, useEffect, useState } from 'react'
import snapshot from '@snapshot-labs/snapshot.js'
import { useWeb3 } from 'src/hooks/useWeb3'
import { useBacklog } from 'src/hooks/useBacklog'

interface Props {
  children: ReactNode
}

interface VoteContextType {
  votingPower: number
  vote: () => Promise<boolean>
}

export const VoteContext = createContext<VoteContextType>({
  votingPower: 0,
  vote: async () => false,
})

export function VoteContextProvider(props: Props) {
  const initialState = {
    votingPower: 0,
    vote,
  }
  const [context, setContext] = useState(initialState)
  const web3Context = useWeb3()
  const backlog = useBacklog()

  useEffect(() => {
    async function updateVotingPower() {
      let votingPower = 0
      if (web3Context.address && backlog.settings?.strategy) {
        const scores = await snapshot.utils.getScores(
          '',
          backlog.settings.strategy,
          web3Context.network.chainId.toString(),
          web3Context.provider,
          [web3Context.address]
        )

        votingPower = scores[0][web3Context.address]
      }

      setContext({ ...context, votingPower })
    }

    updateVotingPower()
  }, [web3Context.address, backlog])

  async function vote(): Promise<boolean> {
    console.log('VOTE')

    setContext({ ...initialState })
    return false
  }

  return (
    <VoteContext.Provider value={context}>
      {props.children}
    </VoteContext.Provider>
  )
}
