import React from 'react';
import { useParams } from 'react-router-dom';

export default function Repository() {
  const { org, repo } = useParams();
  console.log(org, repo);

  return (
    <>
      <div>
        <h2>
          {repo} <small>{org}</small>
        </h2>
      </div>
    </>
  );
}
