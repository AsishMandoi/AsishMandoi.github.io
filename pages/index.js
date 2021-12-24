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
        <p>Hello! I'm Asish, a junior undergraduate pursuing a Bachelor's degree in Electrical Engineering at the Indian Institute of Technology Kanpur. My interests lie in Software Development and Quantum Computing.</p>
      </section>
    </Layout>
  )
}