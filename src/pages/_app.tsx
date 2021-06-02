import React from 'react'
import { SEO } from 'src/components/elements/SEO'
import { Default } from 'src/components/layouts/Default'
import { Web3ContextProvider } from 'src/context/web3-context'
import 'src/assets/styles/globals.scss'

export default function App({ Component, pageProps }) {
  return (
    <Web3ContextProvider>
      <Default>
        <SEO />
        <Component {...pageProps} />
      </Default>
    </Web3ContextProvider>
  )
}
