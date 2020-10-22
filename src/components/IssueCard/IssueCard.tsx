import { IconTag } from 'components/IconTag';
import { LabelBadges } from 'components/LabelBadges';
import { VotingCard } from 'components/VotingCard';
import React from 'react';
import { Issue } from 'types/Issue';
import { IssueColor, TimeFromNow } from 'utils/format';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard(props: IssueCardProps) {
  return (
    <div className={'card mb-3 bordered-card'} style={{ borderRightColor: IssueColor(props.issue.type) }}>
      <div className="row no-gutters">
        <div className="col-md-2 counter">
          <VotingCard issue={props.issue} />
        </div>
        <div className="col-md-10">
          <div className="card-body p-4">
            <span className="card-title">
              {props.issue.title}
              <small className="text-muted mr-2 float-right">
                <a href={props.issue.url} target="_blank" rel="noopener noreferrer">
                  #{props.issue.number}
                </a>
              </small>
            </span>

            <LabelBadges labels={props.issue.labels} />

            <ul className="list-inline small text-muted mt-3 mb-0">
              <li className="list-inline-item pr-2">
                <IconTag icon={'fas fa-chevron-up'} text={props.issue.votes.length.toString() + ' votes'} />
              </li>
              <li className="list-inline-item pr-1">
                <IconTag icon={'far fa-comments'} text={props.issue.commentsCount.toString() + ' comments'} />
              </li>
              <li className="list-inline-item">
                <IconTag icon={'fas fa-history'} text={TimeFromNow(props.issue.updated)} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
