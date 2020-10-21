import { IssueCard } from 'components/IssueCard/IssueCard';
import { Loader } from 'components/Loader';
import { useRepositoryContext } from 'context/RepoContext';
import React, { useEffect, useState } from 'react';
import IssueService from 'services/IssueService';
import { Issue, IssueState } from 'types/Issue';

const issueData = {
  loading: true,
  issues: new Array<Issue>(),
};

export function IssueList() {
  const context = useRepositoryContext();
  const [data, setData] = useState(issueData);

  useEffect(() => {
    async function asyncEffect() {
      const issues = await IssueService.GetRepositoryIssues(
        context.org,
        context.repo,
        IssueState.OPEN,
        context.settings?.labels.join()
      );
      setData({ loading: false, issues: issues });
    }

    asyncEffect();
  }, [context.org, context.repo, context.settings]);

  return (
    <div className="mt-3">
      <h4>
        Open issues
        <a
          href={`https://github.com/${context.org}/${context.repo}/issues/new`}
          target="_blank"
          rel="noopener noreferrer"
          className="float-right btn btn-outline-secondary btn-sm"
          role="button"
        >
          New issue
        </a>
      </h4>
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
