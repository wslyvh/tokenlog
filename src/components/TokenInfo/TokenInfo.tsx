import { useWeb3React } from '@web3-react/core';
import { useRepositoryContext } from 'context/RepoContext';
import React from 'react';
import { Percentage, ShortenAddress } from 'utils/format';
import { GetEtherscanLink } from 'utils/web3';

export function TokenInfo() {
  const repoContext = useRepositoryContext();
  const web3Context = useWeb3React();

  const renderModal = (
    <>
      <div
        className="modal fade"
        id="repo-config-info"
        tabIndex={-1}
        aria-labelledby="repo-config-info-label"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="repo-config-info-label">
                Repository Settings
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h3>Settings</h3>
              <p>
                Tokenlog tries to pull a configuration directly from the repository. If it's not configured yet, upload
                a <code>tokenlog.json</code> config to the root of your repository. For more details, check out{' '}
                <a href="https://github.com/wslyvh/tokenlog">Github</a>.
              </p>
              <h3>Selected network</h3>
              <p>
                If your repository is configured, but not running on mainnet then make sure to check your network
                settings. You can switch to a different network by using Metamask, or any Web3-enabled browser.
              </p>
              <p>
                <strong>Supported networks:</strong> mainnet, ropsten, rinkeby, kovan, goerli &amp; xdai
              </p>
              <h3>Voting Power</h3>
              <p>
                Holders of the configured token can use their stake to signal which items are important to them. Your
                voting power is based on your % vs. the total supply.
              </p>
              <h3>Voting</h3>
              <p>
                Voting is done either on a 1-token 1-vote principle, or through{' '}
                <a href="https://ethgasstation.info/blog/quadratic-funding-in-a-nutshell/">quadratic voting</a>. With
                quadratic voting the cost of additional votes increases as more votes are cast.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (!repoContext.settings?.token) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Configure</h5>
          <h6 className="card-subtitle my-1 text-muted">
            {repoContext.settings?.tokenAddress && (
              <a href={GetEtherscanLink(repoContext.settings.tokenAddress, web3Context.chainId || 1, "token")}>
                {ShortenAddress(repoContext.settings.tokenAddress, 12)}
              </a>
            )}
          </h6>
          <p className="card-text text-truncate">
            <i>This repo is not configured yet..</i>
          </p>
          <span role="button" className="card-link" data-toggle="modal" data-target={`#repo-config-info`}>
            <span className="fas fa-info-circle"></span>
          </span>
          {renderModal}
        </div>
      </div>
    );
  }

  const renderBalance = repoContext.votingPower ? (
    repoContext.votingPower?.totalPower.toFixed(2) +
    ' VP (' +
    Percentage(repoContext.votingPower?.totalPower ?? 0, repoContext.settings.token.totalSupply) +
    '%) ' +
    repoContext.votingPower?.available.toFixed(2) +
    ' available'
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
          <a href={GetEtherscanLink(repoContext.settings.tokenAddress, web3Context.chainId || 1, "token")}>
            {ShortenAddress(repoContext.settings.token.address, 12)}
          </a>
        </h6>
        <p className="card-text text-truncate">{renderBalance}</p>

        <span role="button" className="card-link" data-toggle="modal" data-target={`#repo-config-info`}>
          <span className="fas fa-info-circle"></span>
        </span>
        {renderModal}
      </div>
    </div>
  );
}
