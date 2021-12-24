import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Footer from './footer'
import Navbar from './navbar'

const name = 'Asish Mandoi'
export const siteTitle = 'Asish\'s Homepage'

export default function Layout({ children, home }) {
  return (
    <>
      { <Navbar />}
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/images/favicon.ico" />
          <meta name="description" content="A website designed and built using Nextjs by Asish Mandoi" />
          <meta name="og:title" content={siteTitle} />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/profile.png"
                className={utilStyles.borderCircle}
                height={216}
                width={192}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>
              {/* <Link href="/">
                <a>
                  <Image
                    priority
                    src="/images/profile.png"
                    className={utilStyles.borderCircle}
                    height={108}
                    width={96}
                    alt={name}
                  />
                </a>
              </Link>
              <Link href="/">
                <a className={utilStyles.colorInherit}>
                  <h2 className={utilStyles.headingLg}>{name}</h2>
                </a>
              </Link> */}
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>« Back to home</a>
            </Link>
          </div>
        )}
      </div>
        <section className={styles.links}>
          <ul className={utilStyles.list}>
            <li>
              <Link href={`/about`}><a><h2 className={utilStyles.textMd}>About</h2></a></Link>
            </li>
            <li>
              <Link href="/resume.pdf"><a><h2 className={utilStyles.textMd}>Resume</h2></a></Link>
            </li>
            <li>
              <Link href="/blogs"><a><h2 className={utilStyles.textMd}>Blogs</h2></a></Link>
            </li>
            <li>
              <Link href="/contact"><a><h2 className={utilStyles.textMd}>Contact</h2></a></Link>
            </li>
          </ul>
        </section>
      <Footer />
    </>
  )
}