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
      const submitData = { 
        ...formData, 
        access_key: "65345a01-0426-48a0-b2e1-d5e7c98059b4",
        subject: `${formData.name} visited your website`,
        from_name: formData.name,
        referral: formData.referral || 'unknown'
      };
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })
      
      const result = await response.json();
      clearInterval(intervalId);
      
      if (response.ok && result.success) {
        setStatus('Message sent successfully!')
        setFormData({ name: '', email: '', referral: '', message: '' })
      } else {
        setStatus(`Message could not be sent. ${result.message || 'Unknown error'}`)
      }
    } catch (err) {
      console.error(err);
      clearInterval(intervalId);
      setStatus('An error occurred.')
    }
  }

  return (
    <Layout page="contact">
      <Head>
        <title>{`${siteTitle} - Contact`}</title>
      </Head>
      <h2 className={utilStyles.headingXl}>Contact</h2>
      <section /* className={utilStyles.columns} */>
        <div className={utilStyles.column1}>
          <ul className={utilStyles.list}>
              <li className={utilStyles.listItem}>
                <div className={utilStyles.textMed}><a href="mailto:asishmandoi20@gmail.com">Email</a></div>
                <p id='li'>You can reach me at <code>asishmandoi20@gmail.com</code>.</p>
              </li>
              <li className={utilStyles.listItem}>
                <div className={utilStyles.textMed}><a href={`https://www.linkedin.com/in/asishmandoi/`}>LinkedIn</a></div>
                <p id='li'>Send me a connection request if we are not connected.</p>
              </li>
          </ul>
        </div>
        {/* <hr className={utilStyles.hSeparator}/> */}
        {/* <div className={utilStyles.vSeparator}/> */} {/* Uncomment this line and className={utilStyles.columns} in the section element for vertical separator */}
        <div className={utilStyles.column2}>
          <form onSubmit={handleSubmit} id='contact' className={utilStyles.form}>
            <div className={utilStyles.headingMed}>All thoughts are welcome!</div>
            <div className={utilStyles.formField}>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
                placeholder="Name"
                autocomplete="name"
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
                autocomplete="email"
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
                autocomplete="off"
              />
            </div>
            <div className={utilStyles.formField}>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="What do you have in mind?"
                rows="5"
                autocomplete="off"
              />
              <span>*</span>
            </div>
            <button type="submit">Submit</button>
            {status && <p className={utilStyles.sendStatus}>{status}</p>}
          </form>
        </div>
      </section>
    </Layout>
  )
}