import React from 'react';
import { Issue } from 'types/Issue';
import { TimeFromNow } from 'utils/format';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard(props: IssueCardProps) {

  function onVote() {
    console.log("VOTE on", props.issue.title);
  }

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-2 counter">
          <div className="counter-card border rounded">
            <div>
              <span className="fas fa-angle-up stretched-link" role="button" onClick={onVote}></span>
            </div>
            {Math.floor(Math.random() * 20) + 3}
          </div>
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
