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
  const [votingAmount, setVotingAmount] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function asyncEffect() {
      const signer = web3Context.library?.getSigner();
      if (web3Context.account && signer) {
        setSigner(signer);
      }
    }

    asyncEffect();
  }, [web3Context.account, web3Context.library]);

  useEffect(() => {
    async function asyncEffect() {
      if (repoContext.settings?.token?.address && web3Context.account) {
        const balance = await VotingService.GetTokenBalance(
          repoContext.settings.token.address,
          web3Context.account,
          web3Context.chainId
        );

        if (balance) {
          setBalance(balance);
        }
      }
    }

    asyncEffect();
  }, [repoContext.settings, web3Context.account, web3Context.chainId]);

  async function castVote(votes: number) {
    if (signer) {
      const signingMessage = {
        org: repoContext.repository?.owner.name,
        repo: repoContext.repository?.name,
        number: props.issue.number,
        amount: votes,
        timestamp: new Date(),
      };

      const result = await signer.signMessage(JSON.stringify(signingMessage));

      if (result) {
        const vote = {
          ...signingMessage,
          address: web3Context.account,
          signature: result,
        } as Vote;

        await VotingService.CreateVote(vote);
        setVoteCount(voteCount + votes);
      }
    } else {
      console.error('No signer available. Need to login first');
    }
  }

  const renderVotingInput =
    balance === 0 ? (
      <span className="italic">You don't have any voting power.</span>
    ) : (
      <>
        <p>With how many tokens would you like to vote? </p>
        <div className="text-center">
          <VoteCounter type={VotingMethod.QUADRATIC} step={1} max={balance} onChange={setVotingAmount} />
        </div>
      </>
    );

  return (
    <>
      <div className="counter-card border rounded clearfix">
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
                disabled={votingAmount === 0}
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
