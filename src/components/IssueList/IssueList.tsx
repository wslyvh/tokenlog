import { IssueCard } from 'components/IssueCard/IssueCard';
import React, { useEffect, useState } from 'react';
import IssueService from 'services/IssueService';
import { Issue } from 'types/Issue';

interface IssueListProps {
  organization: string;
  repository: string;
}

export function IssueList(props: IssueListProps) {
  const [issues, setIssues] = useState<Array<Issue>>([]);

  useEffect(() => {
    async function asyncEffect() {
      const data = await IssueService.GetRepositoryIssues(props.organization, props.repository);

      setIssues(data);
    }

    asyncEffect();
  }, [props]);

  return (
    <div>
      <h4>Open issues</h4>
      <div>
        {issues.map((i: Issue) => {
          return <IssueCard organization={props.organization} repository={props.repository} key={i.id} issue={i} />;
        })}
      </div>
    </div>
  );
}
