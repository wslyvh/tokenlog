import { RepositoryOverview } from 'components/RepositoryOverview';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function Repository() {
  const { org } = useParams();

  return (
    <>
      <div>
        <h2>
          <small>{org}</small>
        </h2>

        <RepositoryOverview organization={org} />
      </div>
    </>
  );
}
