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
        <p>Hello, this is Asish! I'm a <code id='flashy'>software engineer</code> by day and a mindspace nomad by night.</p>
      </section>
    </Layout>
  )
}
