import { RepositoryCard } from 'components/RepositoryCard';
import React, { useEffect, useState } from 'react';
import IssueService from 'services/IssueService';
import { Repository } from 'types/Repository';

interface RepositoryListProps {
  organization: string;
}

export function RepositoryList(props: RepositoryListProps) {
  const [repositories, setRepositories] = useState<Array<Repository>>([]);

  useEffect(() => {
    async function asyncEffect() {
      const data = await IssueService.GetRepositories(props.organization);

      setRepositories(data);
    }

    asyncEffect();
  }, [props.organization]);

  return (
    <div className="list-group">
      {repositories.map((i: Repository) => {
        return <RepositoryCard key={i.id} repository={i} />;
      })}
    </div>
  );
}
