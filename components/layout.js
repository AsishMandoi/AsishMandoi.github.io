import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'
import Link from 'next/link'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Footer from './footer'
import Navbar from './navbar'
import Navlist from './navlist'

const name = 'Asish Mandoi'
export const siteTitle = name

export default function Layout({ children, home }) {
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
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=G-6P2424X2JD`} />
        <Script id="ga-script">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6P2424X2JD', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
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
            <Link href="/">
              « Return home
            </Link>
          </div>
        )} */}
      </div>
      <Navlist />
      <Footer />
    </div>
  );
}