import React, { createContext, ReactNode, useEffect, useState } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import { Network, Web3Provider } from '@ethersproject/providers'
import { APP_CONFIG } from 'src/utils/config'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: APP_CONFIG.INFURA_ID,
    },
  },
}

const initialWeb3Modal = {
  network: 'mainnet',
  cacheProvider: true,
  providerOptions,
}

interface Props {
  children: ReactNode
}

interface Web3ContextType {
  loading: boolean
  network: Network | undefined
  provider: Web3Provider | undefined
  address: string | undefined
  connect: () => void
  disconnect: () => void
}

export const Web3Context = createContext<Web3ContextType>({
  loading: true,
  network: undefined,
  provider: undefined,
  address: undefined,
  connect: () => undefined,
  disconnect: () => undefined,
})

export function Web3ContextProvider(props: Props) {
  const initialState = {
    loading: true,
    network: undefined,
    provider: undefined,
    address: undefined,
    connect,
    disconnect,
  }
  const [context, setContext] = useState(initialState)

  useEffect(() => {
    const web3Modal = new Web3Modal(initialWeb3Modal)
    if (web3Modal.cachedProvider) {
      initialConnect()
    } else {
      setContext({ ...context, loading: false })
    }

    async function initialConnect() {
      await connect()
    }
  }, [])

  async function connect() {
    const web3Modal = new Web3Modal(initialWeb3Modal)
    const web3 = await web3Modal.connect()
    const provider = new Web3Provider(web3)
    const network = await provider.getNetwork()
    const signer = provider.getSigner()
    const address = await signer.getAddress()

    provider.on('accountsChanged', onAccountsChanged)
    provider.on('networkChanged', onNetworkChanged)

    setContext({
      ...context,
      loading: false,
      network: network,
      provider: provider,
      address: address,
    })
  }

  async function disconnect() {
    const web3Modal = new Web3Modal(initialWeb3Modal)
    web3Modal.clearCachedProvider()

    if (context.provider) {
      context.provider.off('accountsChanged', this.changedAccount)
      context.provider.off('networkChanged', this.networkChanged)
    }

    setContext({ ...initialState, loading: false })
  }

  async function onAccountsChanged(accounts: string[]) {
    console.log('onAccountsChanged', accounts)
  }

  async function onNetworkChanged(networkId: number) {
    console.log('onNetworkChanged', networkId)
  }

  return (
    <Web3Context.Provider value={context}>
      {props.children}
    </Web3Context.Provider>
  )
}
