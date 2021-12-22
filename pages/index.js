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
      <section className={utilStyles.headingMd}>
        <p>Hello! I'm Asish, a junior undergraduate pursuing a Bachelor's degree in Electrical Engineering at the Indian Institute of Technology Kanpur. My interests lie in Software Development and Quantum Computing.</p>
        {/* <Link href={`/about`}>
          <a>
            <h2 className={utilStyles.headingMd}>About</h2>
          </a>
        </Link>
        <Link href="/resume.pdf">
          <a>
            <h2 className={utilStyles.headingMd}>Resume</h2>
          </a>
        </Link>
        <Link href="/blogs">
          <a>
            <h2 className={utilStyles.headingMd}>Blogs</h2>
          </a>
        </Link>
        <Link href="/contact">
          <a>
            <h2 className={utilStyles.headingMd}>Contact</h2>
          </a>
        </Link> */}
      </section>
    </Layout>
  )
}