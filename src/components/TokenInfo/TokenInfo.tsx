import { useWeb3React } from '@web3-react/core';
import { IconLink } from 'components/IconLink';
import { useRepositoryContext } from 'context/RepoContext';
import React, { useEffect, useState } from 'react';
import VotingService from 'services/VotingService';
import { Percentage, ShortenAddress } from 'utils/format';

export function TokenInfo() {
  const web3Context = useWeb3React();
  const repoContext = useRepositoryContext();
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    async function asyncEffect() {
      if (repoContext.settings?.token?.address && web3Context.account) {
        const balance = await VotingService.GetTokenBalance(repoContext.settings.token.address, web3Context.account);

        if (balance) {
          setBalance(balance);
        }
      }
    }

    asyncEffect();
  }, [repoContext.settings, web3Context.account]);

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
          <h6 className="card-subtitle my-1 text-muted">&nbsp;</h6>
          <p className="card-text text-truncate">This repository is not configured yet</p>
          {renderSettingsLink}
        </div>
      </div>
    );
  }

  const renderBalance = balance ? (
    balance.toFixed(2) + ' votes (' + Percentage(balance, repoContext.settings.token.totalSupply) + '%)'
  ) : (
    <small>No voting power</small>
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
