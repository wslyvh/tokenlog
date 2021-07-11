import { Button, ButtonPrimary, TextInput } from '@primer/components'
import React, { useState } from 'react'

interface Props {
  current: number
  max: number
  loading?: boolean
  onSubmit: (value: number) => void
}

export function QuadraticVote(props: Props) {
  const step = 1
  const [voteAmount, setVoteAmount] = useState(step)
  const [quadraticCost, setQuadraticCost] = useState(
    getQuadraticCost(props.current + step)
  )

  function onSubmit() {
    props.onSubmit(voteAmount)
  }

  function onChange(type: 'MIN' | 'DOWN' | 'UP' | 'MAX') {
    let amount: number
    let qc: number

    if (type === 'MIN') {
      amount = step
      qc = getQuadraticCost(props.current + step)
    }
    if (type === 'DOWN') {
      amount = voteAmount - step
      qc = getQuadraticCost(amount + props.current)
    }
    if (type === 'UP') {
      amount = voteAmount + step
      qc = getQuadraticCost(amount + props.current)
    }
    if (type === 'MAX') {
      amount = voteAmount
      qc = getQuadraticCost(amount + props.current)

      while (getQuadraticCost(amount + props.current) <= props.max) {
        qc = getQuadraticCost(amount + props.current)
        amount = amount + step
      }

      amount = amount - step
    }

    setVoteAmount(amount)
    setQuadraticCost(qc)
  }

  function getQuadraticCost(value: number): number {
    return Number(Math.pow(value, 2).toFixed(2))
  }

  function disableLower() {
    return voteAmount <= step
  }

  function disableHigher() {
    return props.max <= getQuadraticCost(voteAmount + props.current + 1)
  }

  function disableSubmit() {
    return quadraticCost > props.max || props.loading
  }

  return (
    <div>
      <p>You can spend a maximum of {props.max} voting power ('VP').</p>
      <p>
        You already have {props.current} votes (
        {getQuadraticCost(props.current)} VP) on this item.
      </p>
      {quadraticCost > props.max && (
        <p className="color-text-warning">
          <span
            className="tooltipped tooltipped-n"
            aria-label="Does not meet accessibility standards"
          >
            ⚠️
          </span>
          <span className="ml-1">Not enough voting power left.</span>
        </p>
      )}
      <p>
        <Button
          css=""
          className="mr-2"
          variant="small"
          disabled={disableLower()}
          onClick={() => onChange('MIN')}
        >
          MIN
        </Button>
        <Button
          css=""
          className="mr-2"
          variant="small"
          disabled={disableLower()}
          onClick={() => onChange('DOWN')}
        >
          &laquo;
        </Button>
        <TextInput
          css=""
          variant="small"
          width={100}
          aria-label="Amount of votes"
          name="votes"
          placeholder="Amount of votes..."
          value={voteAmount}
          readOnly
        />
        <Button
          css=""
          className="ml-2"
          variant="small"
          disabled={disableHigher()}
          onClick={() => onChange('UP')}
        >
          &raquo;
        </Button>
        <Button
          css=""
          className="ml-2"
          variant="small"
          disabled={disableHigher()}
          onClick={() => onChange('MAX')}
        >
          MAX
        </Button>
      </p>
      <p>
        <ButtonPrimary css="" disabled={disableSubmit()} onClick={onSubmit}>
          Submit
        </ButtonPrimary>
        <small className="ml-2">
          * This vote will cost you{' '}
          {quadraticCost - getQuadraticCost(props.current)} VP. Which will bring
          you to a total of {voteAmount + props.current} votes for{' '}
          {getQuadraticCost(voteAmount + props.current)} VP
        </small>
      </p>
    </div>
  )
}
