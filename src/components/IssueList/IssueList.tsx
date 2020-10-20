import { IssueCard } from 'components/IssueCard/IssueCard';
import { useRepositoryContext } from 'context/RepoContext';
import React, { useEffect, useState } from 'react';
import IssueService from 'services/IssueService';
import { Issue } from 'types/Issue';

export function IssueList() {
  const context = useRepositoryContext();
  const [issues, setIssues] = useState<Array<Issue>>([]);

  useEffect(() => {
    async function asyncEffect() {
      if (context.repository?.owner?.name && context.repository.name) {
        const data = await IssueService.GetRepositoryIssues(context.repository?.owner?.name, context.repository.name);

        setIssues(data);
      }
    }

    asyncEffect();
  }, [context.repository]);

  return (
    <div>
      <h4>Open issues</h4>
      <div>
        {issues.map((i: Issue) => {
          return <IssueCard key={i.id} issue={i} />;
        })}
      </div>
    </div>
  );
}
