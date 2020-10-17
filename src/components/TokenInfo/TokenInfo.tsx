import { useWeb3React } from '@web3-react/core';
import { IconLink } from 'components/IconLink';
import React, { useEffect, useState } from 'react';
import IssueService from 'services/IssueService';
import VotingService from 'services/VotingService';
import { Token } from 'types/Token';
import { Percentage, ShortenAddress } from 'utils/format';

interface TokenInfoProps {
  organization: string;
  repository: string;
  token?: Token;
}

export function TokenInfo(props: TokenInfoProps) {
  const web3React = useWeb3React();
  const [token, setToken] = useState<Token>();
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    async function asyncEffect() {
      if (props.token) {
        setToken(props.token);
      } else if (props.organization && props.repository) {
        const repo = await IssueService.GetRepositorySettings(props.organization, props.repository);

        if (repo) {
          const token = await VotingService.GetTokenInfo(repo?.tokenAddress);

          setToken(token);
        }
      }
    }

    asyncEffect();
  }, [props]);

  useEffect(() => {
    async function asyncEffect() {
      if (token?.address && web3React.account) {
        const balance = await VotingService.GetTokenBalance(token.address, web3React.account);

        if (balance) {
          setBalance(balance);
        }
      }
    }

    asyncEffect();
  }, [token, web3React.account]);

  if (!token) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Configure</h5>
          <h6 className="card-subtitle my-1 text-muted">&nbsp;</h6>
          <p className="card-text text-truncate">This repository is not configured yet</p>
          <IconLink
            url={`/${props.organization}/${props.repository}/settings`}
            icon="fas fa-cog"
            linkClass={'card-link'}
          />
        </div>
      </div>
    );
  }

  const renderBalance = balance ? (
    balance.toFixed(2) + ' votes (' + Percentage(balance, token.totalSupply) + '%)'
  ) : (
    <small>No voting power</small>
  );

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {token.name} ({token.symbol})
        </h5>
        <h6 className="card-subtitle my-1 text-muted">
          <a href={`https://etherscan.io/token/${token.address}`}>{ShortenAddress(token.address, 12)}</a>
        </h6>
        <p className="card-text text-truncate">{renderBalance}</p>
        <IconLink
          url={`/${props.organization}/${props.repository}/settings`}
          icon="fas fa-cog"
          linkClass={'card-link'}
        />
      </div>
    </div>
  );
}
