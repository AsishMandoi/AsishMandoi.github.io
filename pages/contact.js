import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', referral: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let dots = 0;
    const intervalId = setInterval(() => {
      dots = (dots + 1) % 4;
      setStatus("Sending" + ".".repeat(dots));
    }, 500);
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const result = await response.json();
      clearInterval(intervalId);
      if (response.ok) {
        setStatus('Message sent successfully!')
        setFormData({ name: '', email: '', referral: '', message: '' })
      } else {
        setStatus(`Message could not be sent. ${result.error}`)
      }
    } catch (err) {
      clearInterval(intervalId);
      setStatus('An error occurred.')
    }
  }

  return (
    <Layout contact>
      <Head>
        <title>{`${siteTitle} - Contact`}</title>
      </Head>
      <section className={`${utilStyles.textMed} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingXl}>Contact</h2>
        <ul className={utilStyles.list}>
            <li className={utilStyles.listItem}>
              <div id='contact-item'><a href="mailto:asishmandoi20@gmail.com">Email</a></div>
              <small id='contact-text'>
                You can reach me at <code>asishmandoi20@gmail.com</code>.
              </small>
            </li>
            <li className={utilStyles.listItem}>
              <div id='contact-item'><a href={`https://www.linkedin.com/in/asishmandoi/`}>LinkedIn</a></div>
              <small id='contact-text'>
                Send me a connection request if we are not connected.
              </small>
            </li>
        </ul>
        <div className={utilStyles.separator}>-</div>
        <form onSubmit={handleSubmit} className={utilStyles.form}>
          <div className={utilStyles.headingMed}>Get in touch!</div>
          <div className={utilStyles.formField}>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
              placeholder="Name"
            />
            <span>*</span>
          </div>
          <div className={utilStyles.formField}>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
            <span>*</span>
          </div>
          <div className={utilStyles.formField}>
            <input
              type="text"
              name="referral"
              value={formData.referral}
              onChange={handleChange}
              placeholder="How did you hear about me?"
            />
          </div>
          <div className={utilStyles.formField}>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="How can I help?"
              rows="5"
            />
            <span>*</span>
          </div>
          <button type="submit">Submit</button>
          {status && <p className={utilStyles.sendStatus}>{status}</p>}
        </form>
      </section>
    </Layout>
  )
}