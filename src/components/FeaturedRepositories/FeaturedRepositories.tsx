import React from 'react';
import { Link } from 'react-router-dom';

const maxWidth = 80;
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
  {
    title: 'Pocket Core',
    description: 'Official implementation of the Pocket Network Protocol',
    imageUrl: 'https://avatars0.githubusercontent.com/u/33689860',
    link: '/pokt-network/pocket-core',
  },
  {
    title: 'Commons Stack',
    description: 'We are revisiting the TEC mission, vision and values and proposing new statements using Tokenlog to pick the best ones.',
    imageUrl: 'https://avatars.githubusercontent.com/u/72481541',
    link: '/CommonsBuild/TokenLog-SoftGov',
  },
  {
    title: 'Tokenlog',
    description: 'Token-weighted backlogs',
    imageUrl: 'https://tokenlog.xyz/icon.png',
    link: '/wslyvh/tokenlog',
  },
  {
    title: 'Token Engineering Commons (TEC)',
    description: 'Coordination for all the work across the Token Engineering Commons (TEC)',
    imageUrl: 'https://avatars1.githubusercontent.com/u/72481541',
    link: '/CommonsBuild/coordination',
  },
  {
    title: 'HausDAO',
    description: 'Community governance of the DAOhaus ecosystem',
    imageUrl: 'https://avatars3.githubusercontent.com/u/69052185',
    link: '/HausDAO/pokemol-web',
  },
];

export function FeaturedRepositories() {
  return (
    <div>
      {projects
        .sort((a, b) => (a.title < b.title ? -1 : 1))
        .map((i) => {
          return (
            <div key={i.title} className="card mb-2 featured-card">
              <div className="row no-gutters">
                <div className="col-md-2 counter-card">
                  <img
                    src={i.imageUrl}
                    className="card-img-top rounded-lg"
                    alt={i.title}
                    style={{ maxWidth: maxWidth }}
                  />
                </div>
                <div className="col-md-10">
                  <div className="card-body">
                    <span className="card-title">
                      <Link to={i.link} className="text-secondary stretched-link">
                        {i.title}
                      </Link>
                    </span>
                    <p className="card-text mt-2">{i.description}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
