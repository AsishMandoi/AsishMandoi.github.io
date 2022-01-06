import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Contact() {
  return (
    <Layout contact>
      <Head>
        <title>{"Contact"}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingXl}>Contact</h2>
      {/* <h2 className={utilStyles.headingMd}>You can reach me on:</h2> */}
        <ul className={utilStyles.list}>
            <li className={utilStyles.listItem}>
              <div id='contact-item'>Email</div>
              <small id='contact-text'>
                <a href="mailto:akmandoi@iitk.ac.in">akmandoi@iitk.ac.in</a><br />
                <a href="mailto:luckyasish13@gmail.com">luckyasish13@gmail.com</a><i> (if not from IIT Kanpur)</i>
              </small>
            </li>
            <li className={utilStyles.listItem}>
              <div id='contact-item'><a href={`https://www.linkedin.com/in/asish-mandoi-4178581b4/`}>LinkedIn</a></div>
              <small id='contact-text'>
                Send me a connection request if we are not connected.
              </small>
            </li>
            <li className={utilStyles.listItem}>
              <div id='contact-item'><a href={`https://www.facebook.com/asish.mandoi`}>Facebook</a></div>
              <small id='contact-text'>
                Ping me on Messenger.
              </small>
            </li>
        </ul>
      </section>
    </Layout>
  )
}