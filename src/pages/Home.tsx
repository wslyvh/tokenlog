import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div>
        <h2>Token-weighted backlog(s)</h2>
      </div>
      <div>
        <strong>Examples</strong>
        <ul>
          <li>
            <Link to={'/ethereum/ethereum-org-website'}>
              ethereum/ethereum-org-website
            </Link>
          </li>
          <li>
            <Link to={'/compound-finance/compound-protocol'}>
              compound-finance/compound-protocol
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
