import 'src/assets/styles/globals.scss'
import { SEO } from 'src/components/elements/SEO'

export default function App({ Component, pageProps }) {
  return (
    <>
      <SEO />
      <Component {...pageProps} />
    </>
  )
}

