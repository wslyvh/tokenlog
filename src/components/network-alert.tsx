import { useWeb3React } from '@web3-react/core';
import { useRepositoryContext } from 'context/RepoContext';
import React from 'react';
import { GetNetworkName } from 'utils/web3';

export const NetworkAlert = () => {
  const web3 = useWeb3React();
  const context = useRepositoryContext();
  const defaultChainId = context.settings?.chainId || 1;
  const networkName = GetNetworkName(defaultChainId);

  if (!web3.chainId || web3.chainId === defaultChainId) {
    return <></>;
  }

  return (
    <div className="alert alert-warning" role="alert">
      <span>Please check your web3 provider. The configured chain for this repository is {networkName}.</span>
    </div>
  );
};
