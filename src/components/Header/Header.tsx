import { AccountControl } from 'components/Account';
import { NetworkBadge } from 'components/NetworkBadge';
import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Tokenlog
        </Link>
        <div className="ml-auto mr-1 d-flex">
          <NetworkBadge />
          <AccountControl />
        </div>
      </nav>
    </header>
  );
}
