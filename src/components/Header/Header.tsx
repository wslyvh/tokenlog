import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Tokenlog
        </Link>
        {/* <div className="ml-auto mr-1">
          <ul className="navbar-nav text-right">
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
        </div> */}
      </nav>
    </header>
  );
}
