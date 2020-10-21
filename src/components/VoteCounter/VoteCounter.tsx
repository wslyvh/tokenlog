import { Alert } from 'components/Alert';
import React, { useState } from 'react';
import { VotingMethod } from 'types/RepositorySettings';

interface VoteCounterProps {
  type: VotingMethod;
  step: number;
  max: number;
  onChange: (value: number) => void;
}

function getQuadraticCost(value: number): number {
  return Number(Math.pow(value, 2).toFixed(2));
}

export function VoteCounter(props: VoteCounterProps) {
  const [numberOfVotes, setNumberOfVotes] = useState(props.step);
  const [cost, setCost] = useState(getQuadraticCost(props.step));
  const [error, setError] = useState('');

  async function voteUp() {
    const votes = numberOfVotes + props.step;
    const qc = getQuadraticCost(votes);

    if (qc >= props.max) {
      setError(`Can't vote more than ${props.max}`);
      return;
    }

    setValues(votes, qc, '');
  }

  async function voteDown() {
    const votes = numberOfVotes - props.step;
    const qc = getQuadraticCost(votes);

    if (votes < props.step) {
      setError(`Can't vote less than ${props.step}`);
      return;
    }

    setValues(votes, qc, '');
  }

  async function setValues(votes: number, cost: number, error: string) {
    setNumberOfVotes(votes);
    setCost(cost);
    setError(error);

    props.onChange(votes);
  }

  if (props.type === VotingMethod.STANDARD) {
    return (
      <>
        <input
          type="range"
          className="custom-range"
          min="0"
          max={props.max}
          step={Math.round(props.max / 10)}
          value={numberOfVotes}
          onChange={(e) => setValues(Number(e.target.value), Number(e.target.value), '')}
        />

        <small className="float-right">{numberOfVotes}</small>
      </>
    );
  }

  return (
    <>
      <div>
        <Alert type="danger" message={error} />
        <div>
          <span className="fas fa-minus" role="button" onClick={voteDown}></span>
          <input type="number" className="text-center mx-2" value={cost} disabled={true} />
          <span className="fas fa-plus" role="button" onClick={voteUp}></span>
        </div>
        <div className="mt-3">
          <small className="float-right">
            {numberOfVotes} votes / costs {cost}
          </small>
        </div>
      </div>
    </>
  );
}
