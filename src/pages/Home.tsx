import { FeaturedRepositories } from 'components/FeaturedRepositories';
import React from 'react';

export default function Home() {
  return (
    <>
      <div className="jumbotron p-5">
        <h1 className="display-5">Token-weighted backlogs</h1>
        <p className="lead">
          <span role="img" aria-label="Tokenlog">
            🗳️
          </span>{' '}
          Tokenlog is a governance tool that allows token holders to help prioritise Github issues.
        </p>
        <hr className="my-4" />
        <p>
          Instead of one-off governance proposals, token holders can continously help and prioritize your backlog. It
          uses a quadratic voting mechanism, where token holders can allocate votes to express the degree of their
          preferences, rather than just the direction of their preferences.
        </p>
        <p className="mb-1">
          Access any Github repository at <code>tokenlog.xyz/&lt;org&gt;/&lt;repo&gt;</code> or read more{' '}
          <a href="https://github.com/wslyvh/tokenlog">Github</a>.
        </p>
      </div>

      <div>
        <h3>Featured Repositories</h3>
        <FeaturedRepositories />
      </div>
    </>
  );
}
