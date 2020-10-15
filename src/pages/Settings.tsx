import { RepositorySettingsEditor } from 'components/RepositorySettingsEditor';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Settings() {
  const { org, repo } = useParams();

  return (
    <>
      <div>
        <h2>{repo} settings</h2>
        <h3>
          <small>
            <Link to={`/${org}/${repo}`}>back to repostiory</Link>
          </small>
        </h3>

        <RepositorySettingsEditor organization={org} repository={repo} />
      </div>
    </>
  );
}
