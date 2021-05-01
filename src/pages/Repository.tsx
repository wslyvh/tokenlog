import { IssueList } from 'components/IssueList';
import { NetworkAlert } from 'components/network-alert';
import { RepositoryInfo } from 'components/RepositoryInfo';
import { TokenInfo } from 'components/TokenInfo';
import { RepoContextProvider } from 'context/RepoContextProvider';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Repository() {
  const { org, repo } = useParams();
  
  return (
    <>
      <div>
        <RepoContextProvider>
          <NetworkAlert />

          <div className="float-right">
            <Link to={`/${org}/${repo}/stats`}>view stats &raquo;</Link>
          </div>
          <br />

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
