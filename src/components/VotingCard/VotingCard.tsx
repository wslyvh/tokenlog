import { useWeb3React } from '@web3-react/core';
import { VoteCounter } from 'components/VoteCounter';
import { useRepositoryContext } from 'context/RepoContext';
import React, { useEffect, useState } from 'react';
import VotingService from 'services/VotingService';
import { Issue } from 'types/Issue';
import { VotingMethod } from 'types/RepositorySettings';
import { Vote } from 'types/Vote';

interface VotingCardProps {
  issue: Issue;
}

export function VotingCard(props: VotingCardProps) {
  const web3Context = useWeb3React();
  const repoContext = useRepositoryContext();
  const [signer, setSigner] = useState<any>();
  const [voteCount, setVoteCount] = useState(props.issue.voteCount);
  const [votingAmount, setVotingAmount] = useState([0, 0]);
  const [costAndVotes, setCostAndVotes] = useState([0, 0]);
  const votingMethod = repoContext.settings?.votingMethod || VotingMethod.STANDARD;

  useEffect(() => {
    async function asyncEffect() {
      const signer = web3Context.library?.getSigner();
      if (web3Context.account && signer) {
        setSigner(signer);

        const previousVotes = props.issue.votes.filter((i) => i.address === web3Context.account);
        const cost = previousVotes.reduce((a, b) => a + b.cost, 0);
        const votes = previousVotes.reduce((a, b) => a + b.amount, 0);
        setCostAndVotes([cost, votes]);
      }
    }

    asyncEffect();
  }, [web3Context.account, web3Context.library, props.issue]);

  async function castVote(votes: number[]) {
    if (signer) {
      const signingMessage = {
        org: repoContext.repository?.owner.name,
        repo: repoContext.repository?.name,
        number: props.issue.number,
        amount: votes[0],
        cost: votes[1],
        tokenAddress: repoContext.settings?.tokenAddress || repoContext.settings?.tokenAddresses?.join('|'),
        timestamp: new Date(),
      };

      const result = await signer.signMessage(JSON.stringify(signingMessage));

      if (result) {
        const vote = {
          ...signingMessage,
          address: web3Context.account,
          signature: result,
          chainId: repoContext.settings?.chainId || 1
        } as Vote;

        const voted = await VotingService.CreateVote(vote);
        if (voted) {
          setVoteCount(voteCount + votes[0]);
          if (repoContext.votingPower) {
            const vp = repoContext.votingPower;
            vp.voted = repoContext.votingPower.voted + vote.cost;
            vp.available = repoContext.votingPower.available - vote.cost;

            repoContext.setContext({
              org: repoContext.org,
              repo: repoContext.repo,
              repository: repoContext.repository,
              settings: repoContext.settings,
              votingPower: vp,
            });
          }
        }
      }
    } else {
      console.error('No signer available. Need to login first');
    }
  }

  const renderVotingInput =
    repoContext.votingPower?.available === 0 ? (
      <span className="italic">You don't have any voting power available.</span>
    ) : (
      <>
        <p>With how many tokens would you like to vote? </p>
        <p>
          You already have {costAndVotes[1]} votes on this issue and a total of{' '}
          {repoContext.votingPower?.available?.toFixed(2)} remaining.
        </p>
        <div className="text-center">
          <VoteCounter
            type={votingMethod}
            step={1}
            max={repoContext.votingPower?.available ?? 0}
            currentCost={costAndVotes[0]}
            currentVotes={costAndVotes[1]}
            onChange={setVotingAmount}
          />
        </div>
      </>
    );

  return (
    <>
      <div className="counter-card border rounded">
        <div>
          <span
            className="fas fa-angle-up stretched-link"
            role="button"
            data-toggle="modal"
            data-target={`#${props.issue.number}`}
          ></span>
        </div>
        {voteCount}
      </div>

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
              <div className="form-group">{renderVotingInput}</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => castVote(votingAmount)}
                disabled={votingAmount[0] === 0}
              >
                Vote
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
