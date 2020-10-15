import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IssueService from 'services/IssueService';
import { Repository } from 'types/Repository';

interface RepositoryOverviewProps {
  organization: string;
}

export function RepositoryOverview(props: RepositoryOverviewProps) {
  const [repositories, setRepositories] = useState<Array<Repository>>([]);

  useEffect(() => {
    async function getRepository() {
      const data = await IssueService.GetRepositories(props.organization);

      setRepositories(data);
    }
    getRepository();
  }, [props.organization]);

  return (
    <div className="list-group">
      {repositories.map((i: Repository) => {
        return (
          <Link key={i.id} to={'/' + i.fullName} className="list-group-item list-group-item-action">
            {i.name}
          </Link>
        );
      })}
    </div>
  );
}
