import React from 'react';
import { Link } from 'react-router-dom';
import { IconLink } from 'components/IconLink';
import { useRepositoryContext } from 'context/RepoContext';
import { OwnerType } from 'types/Owner';

export function RepositoryInfo() {
  const context = useRepositoryContext();

  if (!context.repository) {
    return <>Repo not found..</>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{context.repository.name}</h5>
        <h6 className="card-subtitle my-1 text-muted">
          {context.repository.owner.type === OwnerType.ORGANIZATION && (
            <Link to={`/${context.repository.owner.name}`}>{context.repository.owner.name}</Link>
          )}

          {context.repository.owner.type === OwnerType.USER && context.repository.owner.name}
        </h6>
        <p className="card-text text-truncate">{context.repository.description}</p>
        <IconLink url={context.repository.url} icon="fab fa-github" external={true} linkClass={'card-link'} />
      </div>
    </div>
  );
}
