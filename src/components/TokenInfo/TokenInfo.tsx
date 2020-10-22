import { IconLink } from 'components/IconLink';
import { useRepositoryContext } from 'context/RepoContext';
import React from 'react';
import { Percentage, ShortenAddress } from 'utils/format';

export function TokenInfo() {
  const repoContext = useRepositoryContext();

  const renderSettingsLink = (
    <IconLink
      url={`/${repoContext.repository?.owner.name}/${repoContext.repository?.name}/settings`}
      icon="fas fa-cog"
      linkClass={'card-link'}
    />
  );

  if (!repoContext.settings?.token) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Configure</h5>
          <h6 className="card-subtitle my-1 text-muted">
            {repoContext.settings?.tokenAddress && (
              <a href={`https://etherscan.io/token/${repoContext.settings.tokenAddress}`}>
                {ShortenAddress(repoContext.settings.tokenAddress, 12)}
              </a>
            )}
          </h6>
          <p className="card-text text-truncate">
            <i>This repo is not configured yet..</i>
          </p>
          {renderSettingsLink}
        </div>
      </div>
    );
  }

  const renderBalance = repoContext.votingPower ? (
    repoContext.votingPower?.totalPower.toFixed(2) +
    ' VP (' +
    Percentage(repoContext.votingPower?.totalPower ?? 0, repoContext.settings.token.totalSupply) +
    '%) ' + repoContext.votingPower?.available.toFixed(2) + ' available'
  ) : (
    <i>No voting power</i>
  );

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {repoContext.settings.token.name} ({repoContext.settings.token.symbol})
        </h5>
        <h6 className="card-subtitle my-1 text-muted">
          <a href={`https://etherscan.io/token/${repoContext.settings.token.address}`}>
            {ShortenAddress(repoContext.settings.token.address, 12)}
          </a>
        </h6>
        <p className="card-text text-truncate">{renderBalance}</p>
        {renderSettingsLink}
      </div>
    </div>
  );
}
