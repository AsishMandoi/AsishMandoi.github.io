import { GoogleAnalytics } from '@next/third-parties/google'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Footer from './footer'
import Navbar from './navbar'

const name = 'Asish Mandoi'
export const siteTitle = name

export default function Layout({ children, home }) {
  return (
    <div className={styles.page}>
      { <Navbar />}
      <div className={`${home ? styles.homecontainer : styles.container}`}>
        <Head>
          <link rel="icon" href="/images/favicon.ico" />
          <meta name="description" content="A website designed and built using Nextjs by Asish Mandoi" />
          <meta name="og:title" content={siteTitle} />
          <meta name="image" property="og:image" content="/images/preview-image.jpg" />
          <meta name="author" content={name} />
          <GoogleAnalytics gaId="G-6P2424X2JD" />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/profile.webp"
                quality={100}
                placeholder='blur'
                blurDataURL='eNFYDS={tR%Ms:~p-o%2%Lxtnj%LxuxZxuELoz-oRjkCn~WBR*R+Rj'
                className={utilStyles.roundedSquare}
                height={2126}
                width={2126}
                alt={name}
                style={{ width: '216px', height: '216px' }}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>
              <Link href="/">
                <Image
                  priority
                  src="/images/profile.webp"
                  className={utilStyles.roundedSquare}
                  height={108}
                  width={108}
                  alt={name}
                />
              </Link>
              {/* <Link href="/" className={utilStyles.colorInherit}>
                <h2 className={utilStyles.headingLg}>{name}</h2>
              </Link> */}
            </>
          )}
        </header>
        <main>{children}</main>
        {/* {!home && (
          <div className={styles.returnHome}>
            <Link href="/">
              « Return home
            </Link>
          </div>
        )} */}
      </div>
      <section className={styles.links}>
        <ul className={utilStyles.list}>
          <li>
            <Link href={`/about`}><h2 className={utilStyles.textMd}>About</h2></Link>
          </li>
          <li>
            <Link href="/cv.pdf"><h2 className={utilStyles.textMd}>CV</h2></Link>
          </li>
          <li>
            <Link href="/blogs"><h2 className={utilStyles.textMd}>Blogs</h2></Link>
          </li>
          <li>
            <Link href="/contact"><h2 className={utilStyles.textMd}>Contact</h2></Link>
          </li>
        </ul>
      </section>
      <Footer />
    </div>
  );
}