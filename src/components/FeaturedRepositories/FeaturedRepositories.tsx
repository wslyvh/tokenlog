import React from 'react';
import { Link } from 'react-router-dom';

const maxWidth = 120;
const projects = [
  {
    title: 'Ethereum/EIPs',
    description: 'The Ethereum Improvement Proposal repository',
    imageUrl: 'https://avatars1.githubusercontent.com/u/6250754',
    link: '/ethereum/EIPs',
  },
  {
    title: 'Compound Protocol',
    description: 'The Compound On-Chain Protocol',
    imageUrl: 'https://avatars1.githubusercontent.com/u/32911405',
    link: '/compound-finance/compound-protocol',
  },
  {
    title: 'Gnosis Safe Multisig',
    description: 'The most trusted platform to store digital assets on Ethereum',
    imageUrl: 'https://avatars1.githubusercontent.com/u/24954468',
    link: '/gnosis/safe-react',
  },
  // {
  //   title: 'Tokenlog',
  //   description: 'Token-weighted Backlogs',
  //   imageUrl: 'https://tokenlog.xyz/icon.png',
  //   link: '/wslyvh/tokenlog',
  // },
];

export function FeaturedRepositories() {
  return (
    <div>
      <div className="card-deck">
        {projects.map((i) => {
          return (
            <>
              <div key={i.title} className="card text-center">
                <div className="text-center pt-3">
                  <img src={i.imageUrl} className="card-img-top" alt={i.title} style={{ maxWidth: maxWidth }} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={i.link} className="stretched-link">
                      <small className="text-muted">{i.title}</small>
                    </Link>
                  </h5>
                  <p className="card-text">{i.description}</p>
                  <p className="card-text"></p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
