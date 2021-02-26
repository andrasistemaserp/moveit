import '../styles/global.css'

import { ChallengeProvider } from '../contexts/ChallengeContext'

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
