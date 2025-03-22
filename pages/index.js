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
        <p>Hello, this is Asish! Nowadays, I'm a software engineer by day and in bed by night.</p>
      </section>
    </Layout>
  )
}