import React from 'react'
import { toUtf8Bytes } from '@ethersproject/strings'
import { hexlify } from '@ethersproject/bytes'
import { useBacklog } from 'src/hooks/useBacklog'
import { useVote } from 'src/hooks/useVote'
import { useWeb3 } from 'src/hooks/useWeb3'
import { Message, Vote } from 'src/types'
import { GetUsedVotingPower, GetUserVotes } from 'src/utils/voting'
import { QuadraticVote } from './QuadraticVote'

interface Props {
  number: number
}

export function ItemVote(props: Props) {
  const backlog = useBacklog()
  const web3Context = useWeb3()
  const voteContext = useVote()

  const userVotes = GetUserVotes(voteContext.backlogVotes, web3Context.address)
  const itemVotes = userVotes.filter((i) => i.number === props.number)
  const itemCost = itemVotes.map((i) => i.amount).reduce((a, b) => a + b, 0)
  const votingPower = voteContext.votingPower
  const usedVotingPower = GetUsedVotingPower(
    voteContext.backlogVotes,
    web3Context.address
  )

  async function submitVote(value: number) {
    const message = {
      backlog: backlog.id,
      number: props.number,
      amount: value,
      version: 1,
      timestamp: new Date(),
    }

    const signature = await signMessage(message)

    if (signature) {
      const vote = {
        ...message,
        address: web3Context.address,
        state: 'OPEN',
        signature: signature,
      } as Vote

      console.log('Creating vote..', vote)
    }
  }

  async function signMessage(message: Message) {
    let signature = ''

    const signer = web3Context.provider.getSigner()
    if (web3Context.provider.provider?.wc) {
      signature = await web3Context.provider.send('personal_sign', [
        hexlify(toUtf8Bytes(JSON.stringify(message))),
        web3Context.address,
      ])
    } else {
      signature = await signer.signMessage(JSON.stringify(message))
    }

    return signature
  }

  return (
    <div>
      <h4>Vote</h4>
      <div>
        {usedVotingPower >= votingPower && (
          <p className="color-text-warning">
            <span
              className="tooltipped tooltipped-n"
              aria-label="Not enough voting power left"
            >
              ⚠️
            </span>
            <span className="ml-1">Not enough voting power left.</span>
          </p>
        )}
        {usedVotingPower < votingPower && (
          <>
            <QuadraticVote
              current={itemCost}
              max={votingPower - usedVotingPower}
              onSubmit={submitVote}
              loading={false}
            />
          </>
        )}
      </div>
    </div>
  )
}
