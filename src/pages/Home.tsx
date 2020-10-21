import { FeaturedRepositories } from 'components/FeaturedRepositories';
import React from 'react';

export default function Home() {
  return (
    <>
      <div>
        <h2>Token-weighted backlog(s)</h2>
      </div>
      <div>
        <strong>Featured Repositories</strong>
        <FeaturedRepositories />
      </div>
    </>
  );
}
