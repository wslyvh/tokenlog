import { Loader } from 'components/Loader';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IssueService from 'services/IssueService';
import RepositoryService from 'services/RepositoryService';
import { OrgRepo, Repository } from 'types/Repository';

const maxWidth = 80;
const amountOfRepos = 5;

export function FeaturedRepositories() {
  const [repos, setItems] = useState<Array<Repository>>([]);
  const [featuredRepos, setFeaturedRepos] = useState<OrgRepo[]>([]);
  const [initLoading, setInitLoading] = useState(true);
  const [index, setIndex] = useState(amountOfRepos);
  const [hasMoreRepos, setHasMoreRepos] = useState(true);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function asyncEffect() {
      const x = await RepositoryService.GetRepositories();
      setFeaturedRepos(x);
    }
    asyncEffect();
  },[]);

  useEffect(() => {
    async function asyncEffect() {
      if(!featuredRepos.length)
        return;

      await getMoreRepos(0, amountOfRepos);
      setInitLoading(false);
    }
    asyncEffect();
  }, [featuredRepos])

  async function getMoreRepos(start: number, end: number) {
    setLoading(true);
    const slicedRepos = featuredRepos.slice(start, end);
    for (let i = 0; i < slicedRepos.length; i++) {
      repos.push(await IssueService.GetRepository(slicedRepos[i].org, slicedRepos[i].repo));
      setItems(repos);
    }
    setLoading(false);
  }

  async function handleMoreRepos() {
    await getMoreRepos(index, index + amountOfRepos);
    const newIndex = index + amountOfRepos;
    setIndex(newIndex);
    setHasMoreRepos(featuredRepos.length > newIndex);
  }

  return (
    <div>
      {initLoading ? (
          <Loader />
        ) : (
          <>
            {repos
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
              {hasMoreRepos ? (
                <button type="button"  className="btn btn-light" disabled={loading} onClick={handleMoreRepos}>Load more</button>
              ) : (
                <button type="button"  className="btn btn-light" disabled={!hasMoreRepos} >No more to load</button>
              )}
              
          </>
      )}
    </div>
  );
}