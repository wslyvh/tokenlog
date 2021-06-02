import { useContext } from 'react'
import { Web3Context } from 'src/context/web3-context'

export function useWeb3() {
  const context = useContext(Web3Context)

  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }

  return context
}
