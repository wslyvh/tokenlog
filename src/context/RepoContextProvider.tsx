import { useWeb3React } from '@web3-react/core';
import { Loader } from 'components/Loader';
import React, { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IssueService from 'services/IssueService';
import VotingService from 'services/VotingService';
import { DefaultRepoContext, IRepositoryContext, RepoContext } from './RepoContext';

export const RepoContextProvider = ({ children }: { children: ReactNode }) => {
  const { org, repo } = useParams();
  const [context, setContext] = useState<IRepositoryContext>(DefaultRepoContext);
  const [loading, setLoading] = useState(true);
  const web3Context = useWeb3React();

  useEffect(() => {
    async function asyncEffect() {
      const repository = await IssueService.GetRepository(org, repo);
      const settings = await IssueService.GetRepositorySettings(org, repo, web3Context.chainId);

      let userBalance = 0;
      if (web3Context.account && settings?.tokenAddress) {
        userBalance =
          (await VotingService.GetTokenBalance(settings.tokenAddress, web3Context.account, web3Context.chainId)) ?? 0;
      }

      setContext({
        org: org,
        repo: repo,
        repository: repository,
        settings: settings,
        userBalance: userBalance,
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
        userBalance: context.userBalance,
        setContext: setContext,
      }}
    >
      {children}
    </RepoContext.Provider>
  );
};
