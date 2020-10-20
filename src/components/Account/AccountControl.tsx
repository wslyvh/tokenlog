import React, { useEffect } from 'react';
import { AccountInfo } from './AccountInfo';
import { useWeb3React } from '@web3-react/core';
import { Injected } from 'utils/web3';

export const AccountControl = () => {
  const context = useWeb3React();

  useEffect(() => {
    async function asyncEffect() {
      const authorized = await Injected.isAuthorized();

      if (authorized) {
        await connectWeb3();
      }
    }

    asyncEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function connectWeb3() {
    try {
      await context.activate(Injected, undefined, true);
    } catch (error) {
      console.log(error);
    }
  }

  if (context.account) {
    return <AccountInfo address={context.account} />;
  }

  return (
    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={connectWeb3}>
      Connect
    </button>
  );
};
