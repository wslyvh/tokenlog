import { useWeb3React } from '@web3-react/core';
import { Loader } from 'components/Loader';
import React, { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IssueService from 'services/IssueService';
import VotingService from 'services/VotingService';
import { VotingPower } from 'types/VotingPower';
import { DefaultRepoContext, IRepositoryContext, RepoContext } from './RepoContext';

export const RepoContextProvider = ({ children }: { children: ReactNode }) => {
  const { org, repo }: any = useParams();
  const [context, setContext] = useState<IRepositoryContext>(DefaultRepoContext);
  const [loading, setLoading] = useState(true);
  const web3Context = useWeb3React();

  useEffect(() => {
    async function asyncEffect() {
      const repository = await IssueService.GetRepository(org, repo);
      const settings = await IssueService.GetRepositorySettings(org, repo, web3Context.chainId);

      let votingPower: VotingPower | undefined = undefined;
      if (web3Context.account && settings?.tokenAddress) {
        const totalPower =
          (await VotingService.GetVotingPower(
            settings.tokenAddress,
            web3Context.account,
            web3Context.chainId || settings.chainId
          )) ?? 0;
        const userVotes = (await VotingService.GetUserVotes(org, repo, web3Context.account)) ?? 0;

        votingPower = {
          tokenAddress: settings.tokenAddress,
          totalPower: totalPower,
          voted: userVotes,
          available: totalPower - userVotes,
        };
      }

      setContext({
        org: org,
        repo: repo,
        repository: repository,
        settings: settings,
        votingPower: votingPower,
      });
      setLoading(false);
    }

    asyncEffect();
  }, [org, repo, web3Context.chainId, web3Context.account]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <RepoContext.Provider
      value={{
        org: org,
        repo: repo,
        repository: context.repository,
        settings: context.settings,
        votingPower: context.votingPower,
        setContext: setContext,
      }}
    >
      {children}
    </RepoContext.Provider>
  );
};
