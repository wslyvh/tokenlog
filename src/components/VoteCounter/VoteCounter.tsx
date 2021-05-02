import { Alert } from 'components/Alert';
import React, { useEffect, useState } from 'react';
import { VotingMethod } from 'types/RepositorySettings';

interface VoteCounterProps {
  type: VotingMethod;
  step: number;
  max: number;
  currentCost: number;
  currentVotes: number;
  onChange: (value: number[]) => void;
}

function getQuadraticCost(value: number): number {
  return Number(Math.pow(value, 2).toFixed(2));
}

export function VoteCounter(props: VoteCounterProps) {
  const [numberOfVotes, setNumberOfVotes] = useState(props.step);
  const [cost, setCost] = useState(getQuadraticCost(props.step));
  const [error, setError] = useState('');

  useEffect(() => {
    if (props.type === VotingMethod.QUADRATIC) {
      const qc = getQuadraticCost(props.currentVotes + props.step);
      const totalQc = qc - props.currentCost;

      setCost(totalQc);
    }
  }, [props]);

  async function voteUp() {
    const votes = numberOfVotes + props.step;
    const totalVotes = numberOfVotes + props.step + props.currentVotes;
    const qc = getQuadraticCost(totalVotes);
    const totalQc = qc - props.currentCost;

    if (totalQc >= props.max) {
      setError(`Can't vote more than ${props.max}`);
      return;
    }

    setValues(votes, totalQc, '');
  }

  async function voteDown() {
    const votes = numberOfVotes - props.step;
    const totalVotes = numberOfVotes - props.step + props.currentVotes;
    const qc = getQuadraticCost(totalVotes);
    const totalQc = qc - props.currentCost;

    if (votes < props.step) {
      setError(`Can't vote less than ${props.step}`);
      return;
    }

    setValues(votes, totalQc, '');
  }

  async function setValues(votes: number, cost: number, error: string) {
    if (isNaN(votes) || isNaN(cost)) {
      setNumberOfVotes(0);
      setCost(0);
      setError('Invalid number');
    } else {
      setNumberOfVotes(votes);
      setCost(cost);
      setError(error);
    }

    props.onChange([votes, cost]);
  }

  if (props.type === VotingMethod.STANDARD) {
    return (
      <>
        <input
          type="text"
          className="form-control"
          value={numberOfVotes}
          onChange={(e) => setValues(Number(e.target.value), Number(e.target.value), '')}
        />
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
