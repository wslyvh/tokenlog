import { VotingCard } from 'components/VotingCard';
import React from 'react';
import { Issue } from 'types/Issue';
import { TimeFromNow } from 'utils/format';

interface IssueCardProps {
  organization: string;
  repository: string;
  issue: Issue;
}

export function IssueCard(props: IssueCardProps) {
  return (
    <div className={'card mb-3 issue-card ' + props.issue.type}>
      <div className="row no-gutters">
        <div className="col-md-2 counter">
          <VotingCard organization={props.organization} repository={props.repository} issue={props.issue} />
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <span className="card-title">
              {props.issue.title}
              <small className="text-muted mr-2 float-right">
                <a href={props.issue.url} target="_blank" rel="noopener noreferrer">
                  #{props.issue.number}
                </a>
              </small>
            </span>
            <p>
              <small className="text-muted">Last updated {TimeFromNow(props.issue.updated)}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
