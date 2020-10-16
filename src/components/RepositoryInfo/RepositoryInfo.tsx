import { IconLink } from 'components/IconLink';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IssueService from 'services/IssueService';
import { OwnerType } from 'types/Owner';
import { Repository } from 'types/Repository';

interface RepositoryInfoProps {
  organization: string;
  repository: string;
}

export function RepositoryInfo(props: RepositoryInfoProps) {
  const [repository, setRepository] = useState<Repository>();

  useEffect(() => {
    async function asyncEffect() {
      const data = await IssueService.GetRepository(props.organization, props.repository);

      setRepository(data);
    }

    asyncEffect();
  }, [props]);

  if (!repository) {
    return <></>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{repository.name}</h5>
        <h6 className="card-subtitle my-1 text-muted">
          {repository.owner.type === OwnerType.ORGANIZATION && (
            <Link to={`/${repository.owner.name}`}>{repository.owner.name}</Link>
          )}

          {repository.owner.type === OwnerType.USER && repository.owner.name}
        </h6>
        <p className="card-text text-truncate">{repository.description}</p>
        <IconLink url={repository.url} icon="fab fa-github" external={true} linkClass={'card-link'} />
      </div>
    </div>
  );
}
