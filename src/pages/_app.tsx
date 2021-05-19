import { SEO } from 'src/components/elements/SEO'
import { Default } from 'src/components/layouts/Default'
import 'src/assets/styles/globals.scss'

export default function App({ Component, pageProps }) {
  return (
    <Default>
      <SEO />
      <Component {...pageProps} />
    </Default>
  )
}
