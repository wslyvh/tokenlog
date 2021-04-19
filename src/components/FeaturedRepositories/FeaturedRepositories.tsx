import { Loader } from 'components/Loader';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IssueService from 'services/IssueService';
import RepositoryService from 'services/RepositoryService';
import { OrgRepo, Repository } from 'types/Repository';

const maxWidth = 80;
const projects : Array<OrgRepo> = [
  {
    org: 'ethereum',
    repo: 'EIPs'
  },
  {
    org: 'compound-finance',
    repo: 'compound-protocol'
  },
  {
    org: 'gnosis',
    repo: 'safe-react'
  },
  {
    org: 'pokt-network',
    repo: 'pocket-core'
  },
  {
    org: 'iearn-finance',
    repo: 'yearn-protocol'
  },
  {
    org: 'keep-network',
    repo: 'tbtc'
  },
  {
    org: 'commons-stack',
    repo: 'iteration0'
  },
  {
    org: 'wslyvh',
    repo: 'tokenlog'
  },
  {
    org: 'HausDAO',
    repo: 'pokemol-web'
  },
];

const repoData = {
  loading: true,
  repos: new Array<Repository>(),
};


export function FeaturedRepositories() {
  const [data, setData] = useState(repoData);
  const repos = Array<Repository>();

  useEffect(() => {
    async function asyncEffect() {
      const featuredRepos = [...await RepositoryService.GetRepositories(), ...projects].filter(
        (repo, i, arr) => arr.findIndex(t => t.repo === repo.repo && t.org === repo.org) === i
      );
      for (let i = 0; i < featuredRepos.length; i++) {
        repos.push(await IssueService.GetRepository(featuredRepos[i].org, featuredRepos[i].repo));
        setData({ loading: false, repos: repos});
      }
    }
    asyncEffect();
  },[]);

  return (
    <div>
      {data.loading ? (
          <Loader />
        ) : (
          <>
            {data.repos
              .map((i) => {
                return (
                  <div key={i.id} className="card mb-2 featured-card">
                    <div className="row no-gutters">
                      <div className="col-md-2 counter-card">
                        <img
                          src={i.owner.avatarUrl}
                          className="card-img-top rounded-lg"
                          alt={i.owner.name}
                          style={{ maxWidth: maxWidth }}
                        />
                      </div>
                      <div className="col-md-10">
                        <div className="card-body">
                          <span className="card-title">
                            <Link to={i.fullName} className="text-secondary stretched-link">
                              {i.fullName}
                            </Link>
                          </span>
                          <p className="card-text mt-2">{i.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </>
        )}
    </div>
  );
}
