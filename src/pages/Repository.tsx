import { IssueList } from 'components/IssueList';
import { NetworkAlert } from 'components/network-alert';
import { RepositoryInfo } from 'components/RepositoryInfo';
import { TokenInfo } from 'components/TokenInfo';
import { RepoContextProvider } from 'context/RepoContextProvider';
import React from 'react';

export default function Repository() {
  return (
    <>
      <div>
        <RepoContextProvider>
          <NetworkAlert />

          <div className="card-deck">
            <RepositoryInfo />
            <TokenInfo />
          </div>

          <IssueList />
        </RepoContextProvider>
      </div>
    </>
  );
}
