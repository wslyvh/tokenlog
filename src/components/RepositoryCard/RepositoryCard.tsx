import { IconTag } from 'components/IconTag';
import React from 'react';
import { Link } from 'react-router-dom';
import { Repository } from 'types/Repository';
import { LanguageColor } from 'utils/format';

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard(props: RepositoryCardProps) {
  return (
    <div className="card mb-3 bordered-card" style={{ borderRightColor: LanguageColor(props.repository.language) }}>
      <div className="card-body p-4">
        <span className="card-title">
          <Link
            to={`/${props.repository.owner.name}/${props.repository.name}`}
            className="text-secondary stretched-link"
          >
            {props.repository.archived && (
              <>
                <s>{props.repository.name}</s> <small className="text-muted ml-1">archived</small>
              </>
            )}
            {!props.repository.archived && props.repository.name}
          </Link>
          {props.repository.language && (
            <small>
              <span className="badge float-right" style={{ backgroundColor: LanguageColor(props.repository.language) }}>
                {props.repository.language}
              </span>
            </small>
          )}
        </span>

        <ul className="list-inline small text-muted mt-3 mb-0">
          <li className="list-inline-item pr-2">
            <IconTag icon={'far fa-eye'} text={props.repository.watchersCount.toString()} />
          </li>
          <li className="list-inline-item pr-2">
            <IconTag icon={'far fa-star'} text={props.repository.stargazersCount.toString()} />
          </li>
          <li className="list-inline-item pr-2">
            <IconTag icon={'fas fa-code-branch'} text={props.repository.forksCount.toString()} />
          </li>
          <li className="list-inline-item">
            <IconTag icon={'fas fa-exclamation'} text={props.repository.openIssueCount + ' open issues'} />
          </li>
        </ul>
      </div>
    </div>
  );
}
