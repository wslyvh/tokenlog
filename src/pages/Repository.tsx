import { IssueList } from 'components/IssueList';
import { RepositoryInfo } from 'components/RepositoryInfo';
import { TokenInfo } from 'components/TokenInfo';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Repository() {
  const { org, repo } = useParams();

  return (
    <>
      <div>
        <div className="card-deck">
          <RepositoryInfo organization={org} repository={repo} />
          <TokenInfo organization={org} repository={repo} />
        </div>

        <IssueList organization={org} repository={repo} />
      </div>
    </>
  );
}
