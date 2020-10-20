import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import VotingService from 'services/VotingService';
import { Issue } from 'types/Issue';
import { Vote } from 'types/Vote';

interface VotingCardProps {
  organization: string;
  repository: string;
  issue: Issue;
}

export function VotingCard(props: VotingCardProps) {
  const context = useWeb3React();
  const [signer, setSigner] = useState<any>();
  const [priority, setPriority] = useState(props.issue.voteCount);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    async function asyncEffect() {
      const signer = context.library?.getSigner();
      if (context.account && signer) {
        setSigner(signer);
      }
    }

    asyncEffect();
  }, [context.account, context.library]);

  async function castVote(votes: number) {
    // check if Signer is available
    // check if user has right tokens / allowed to vote

    // cost to vote = (nr of votes).pow(2)
    if (signer) {
      const signingMessage = {
        org: props.organization,
        repo: props.repository,
        number: props.issue.number,
        amount: votes,
        timestamp: new Date(),
      };

      const result = await signer.signMessage(JSON.stringify(signingMessage));

      if (result) {
        const vote = {
          ...signingMessage,
          address: context.account,
          signature: result,
        } as Vote;

        await VotingService.CreateVote(vote);
        setPriority(priority + votes);
      }
    } else {
      console.error('No signer available. Need to login first');
    }
  }

  return (
    <div className="border rounded">
      <div>
        <span
          className="fas fa-angle-up stretched-link"
          role="button"
          data-toggle="modal"
          data-target={`#${props.issue.number}`}
        ></span>

        <div
          className="modal fade"
          id={`${props.issue.number}`}
          tabIndex={-1}
          aria-labelledby={`${props.issue.number}Label`}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`${props.issue.number}Label`}>
                  <small>
                    #{props.issue.number} {props.issue.title}
                  </small>
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <p>With how many tokens would you like to vote? </p>
                  <input
                    type="range"
                    className="custom-range"
                    min="1"
                    max="10"
                    id="voteAmount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                  <small className="float-right">{amount}</small>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={() => castVote(amount)}>
                  Vote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {priority}
    </div>
  );
}
