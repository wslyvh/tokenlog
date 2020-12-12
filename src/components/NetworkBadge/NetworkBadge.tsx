import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import { GetNetworkColor, GetNetworkName } from 'utils/web3';

interface NetworkBadgeProps {
  chainId?: number;
  networkName?: string;
}

export const NetworkBadge = (props: NetworkBadgeProps) => {
  const web3Context = useWeb3React();
  const [chainId, setChainId] = useState(1);
  const [networkName, setNetworkName] = useState('mainnet');

  useEffect(() => {
    let chainId = props.chainId || 1;
    let networkName = props.networkName || 'mainnet';

    if (web3Context.chainId) {
      chainId = web3Context.chainId;
      networkName = chainId === 1 ? 'mainnet' : GetNetworkName(chainId);
    }
    setChainId(chainId);
    setNetworkName(networkName);
  }, [props.chainId, props.networkName, web3Context.chainId]);

  if (chainId === 1) return <></>;

  return (
    <span className={`badge badge-${GetNetworkColor(networkName)} mr-2`}>
      <small>{networkName}</small>
    </span>
  );
};
