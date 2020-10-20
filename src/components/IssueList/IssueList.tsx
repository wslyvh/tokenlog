import { IssueCard } from 'components/IssueCard/IssueCard';
import { Loader } from 'components/Loader';
import { useRepositoryContext } from 'context/RepoContext';
import React, { useEffect, useState } from 'react';
import IssueService from 'services/IssueService';
import { Issue } from 'types/Issue';

const issueData = {
  loading: true,
  issues: new Array<Issue>(),
};

export function IssueList() {
  const context = useRepositoryContext();
  const [data, setData] = useState(issueData);

  useEffect(() => {
    async function asyncEffect() {
      if (context.repository?.owner?.name && context.repository.name) {
        const data = await IssueService.GetRepositoryIssues(context.repository?.owner?.name, context.repository.name);

        setData({ loading: false, issues: data });
      }
    }

    asyncEffect();
  }, [context.repository]);

  return (
    <div className="mt-3">
      <h4>Open issues <a href={`https://github.com/${context.org}/${context.repo}/issues/new`} className="float-right btn btn-outline-secondary btn-sm" role="button">New issue</a></h4>
      <div>
        {data.loading ? (
          <Loader />
        ) : (
          <>
            {data.issues.map((i: Issue) => {
              return <IssueCard key={i.id} issue={i} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}
