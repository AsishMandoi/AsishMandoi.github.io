import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.intro}>
        <p>Hello, this is Asish! I'm a <code>software engineer</code> by day and fast asleep by night.</p>
        {/* <blockquote>
          <p id='quote'><i>There is no gene for the human spirit.</i></p>
          <br/>
          <p> — Gattaca (1997)</p>
        </blockquote> */}
        {/* <blockquote>
          <p>
          Bad art is more tragically beautiful than good art because it documents human failure.<br />
          — Tristan Rêveur
          </p>
          </blockquote> */}
      </section>
    </Layout>
  )
}
