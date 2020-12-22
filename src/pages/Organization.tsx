import { IconLink } from 'components/IconLink';
import { RepositoryList } from 'components/RepositoryList';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Repository() {
  const { org } = useParams();

  return (
    <>
      <div>
        <h2 className="mb-3">
          <small>{org}</small>
          <small className="smaller float-right pt-2 pr-2">
            <IconLink url={`https://github.com/${org}`} icon="fab fa-github" external={true} linkClass={'card-link'} />
          </small>
        </h2>

        <RepositoryList organization={org} />
      </div>
    </>
  );
}
