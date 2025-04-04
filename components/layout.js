import { GoogleAnalytics } from '@next/third-parties/google'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Footer from './footer'
import Navbar from './navbar'
import Navlist from './navlist'

const name = 'Asish Mandoi'
export const siteTitle = name

const quoteMap = {
  about: {
    quote: "There is no gene for the human spirit.",
    source: "Gattaca (1997)"
  },
  blogs: {
    quote: "Bad art is more tragically beautiful than good art because it documents human failure.",
    source: "Tristan Rêveur"
  },
  contact: {
    quote: "If you want to go fast, go alone. If you want to go far, go together.",
    source: "African proverb"
  },
  default: {
    quote: "The only way to do great work is to love what you do.",
    source: "Steve Jobs"
  }
};

export default function Layout({ children, home, page }) {
  return (
    <div className={styles.page}>
      { <Navbar />}
      <div className={`${styles.container} ${home ? styles.home: ''}`}>
        <Head>
          <link rel="icon" href="/images/favicon.ico" />
          <meta name="description" content="A website powered by Nextjs, designed and built by Asish Mandoi" />
          <meta name="og:title" content={siteTitle} />
          <meta name="image" property="og:image" content="/images/preview-image.jpg" />
          <meta name="author" content={name} />
        </Head>
        <GoogleAnalytics gaId="G-6P2424X2JD" />
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
              <Link href="/" className={utilStyles.imageBg}>
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
                <h2 className={utilStyles.headingLrg}>{name}</h2>
              </Link> */}
            </>
          )}
        </header>
        <main>{children}</main>
        {/* {!home && (
          <div className={styles.returnHome}>
            <Link href="/">« Return home</Link>
          </div>
        )} */}
      </div>
      {!home && (
        <blockquote className={styles.quote}>
          <p id='quote'><i>{page ? quoteMap[page].quote : quoteMap.default.quote}</i></p>
          <span className={styles.spoiler}>
            <p id='source'> — {page ? quoteMap[page].source : quoteMap.default.source}</p>
          </span>
        </blockquote>
      )}
      <Navlist />
      <Footer />
    </div>
  );
}
