import { useWeb3React } from '@web3-react/core';
import { Loader } from 'components/Loader';
import React, { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IssueService from 'services/IssueService';
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

      setContext({
        org: org,
        repo: repo,
        repository: repository,
        settings: settings,
      });
      setLoading(false);
    }

    asyncEffect();
  }, [org, repo, web3Context.chainId]);

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
        setContext: setContext,
      }}
    >
      {children}
    </RepoContext.Provider>
  );
};
