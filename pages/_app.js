import '../styles/global.css'
import 'katex/dist/katex.min.css'
import 'remark-github-blockquote-alert/alert.css'
import { nextSans, nextMono, nextSerif } from '../styles/fonts'

export default function App({ Component, pageProps }) {
  return (
    <div id='fonts' className={`${nextSans.variable} ${nextMono.variable} ${nextSerif.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
