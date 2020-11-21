import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { GetNetworkColor, GetNetworkName } from 'utils/web3';

export const NetworkBadge = () => {
  const web3Context = useWeb3React();
  const [chainId, setChainId] = useState(1);
  const [networkName, setNetworkName] = useState('mainnet');

  useEffect(() => {
    if (web3Context.chainId) {
      const chainId = web3Context.chainId;
      const name = chainId === 1 ? 'mainnet' : GetNetworkName(chainId);

      setChainId(chainId);
      setNetworkName(name);
    }
  }, [web3Context.chainId]);

  if (chainId === 1) return <></>;

  return (
    <span className={`badge badge-${GetNetworkColor(networkName)} mr-2`}>
      <small>{networkName}</small>
    </span>
  );
};
