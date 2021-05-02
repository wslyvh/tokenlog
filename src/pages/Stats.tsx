import React from 'react';
import { Link, useParams } from 'react-router-dom';
import VotingService from 'services/VotingService';
import { Stats as RepoStats } from 'types/Stats';

export default function Stats() {
  const { org, repo } = useParams();
  const [days, setDays] = React.useState('');
  const [stats, setStats] = React.useState<RepoStats>();
  const [toggleVotes, setToggleVotes] = React.useState(false);

  React.useEffect(() => {
    async function asyncEffect() {
      const stats = await VotingService.GetStats(org, repo, days);
      setStats(stats);
    }

    asyncEffect();
  }, [org, repo, days]);

  return (
    <>
      <div>
        <h2>
          {org}/{repo}
        </h2>
        <Link to={`/${org}/${repo}`}>back to repostiory</Link>
        <br />
        <br />

        <div className="float-right input-group-sm">
          <input
            className="form-control"
            type="text"
            placeholder="Last x days (e.g. 7)"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>

        <div className="float-right"></div>

        {stats && (
          <div>
            <h4>Statistics</h4>
            <ul>
              <li>Unique voters: {stats.uniqueVoters}</li>
              <li>Amount of votes cast: {stats.amountOfVotesCast}</li>
              <li>Sum of all votes: {stats.sumOfVotes}</li>
              <li>Sum of voting power used: {stats.sumOfVotingPower} (Quadratic voting cost)</li>
              <li>Voted on: {stats.uniqueItems} items</li>
            </ul>
          </div>
        )}

        {stats && (
          <div>
            <h4>Raw voting data</h4>
            <p>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setToggleVotes(!toggleVotes)}
              >
                Show/hide
              </button>
            </p>

            {toggleVotes && (
              <div>
                <p>Note that Tokenlog is still in beta. The structure and format of this data can change.</p>
                <div>
                  <pre>{JSON.stringify(stats.votes, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
