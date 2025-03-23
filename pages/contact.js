import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Contact() {
  return (
    <Layout contact>
      <Head>
        <title>{`${siteTitle} - Contact`}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingXl}>Contact</h2>
        {/* <h2 className={utilStyles.headingMd}>You can reach me on:</h2> */}
        <ul className={utilStyles.list}>
            <li className={utilStyles.listItem}>
              <div id='contact-item'><a href="mailto:asishmandoi20@gmail.com">Email</a></div>
              <small id='contact-text'>
                You can reach me at "asishmandoi20@gmail.com".
              </small>
            </li>
            <li className={utilStyles.listItem}>
              <div id='contact-item'><a href={`https://www.linkedin.com/in/asishmandoi/`}>LinkedIn</a></div>
              <small id='contact-text'>
                Send me a connection request if we are not connected.
              </small>
            </li>
        </ul>
      </section>
    </Layout>
  )
}