import Image from 'next/image'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import styles from './navbar.module.css'
import { GithubIcon, LinkedinIcon } from './svg-components'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list1}>
        <li className={styles.listItem}>
          <Link href="/"><a>Home</a></Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/about"><a>About</a></Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/resume.pdf"><a>Resume</a></Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/blogs"><a>Blogs</a></Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/contact"><a>Contact</a></Link>
        </li>
      </ul>
      <ul className={styles.list2}>
        <li className={styles.social}>
          <Link href={`https://www.linkedin.com/in/asish-mandoi-4178581b4/`}><a><div className={styles.img}><LinkedinIcon /></div></a></Link>
        </li>
        <li className={styles.social}>
          <Link href={`https://www.github.com/AsishMandoi`}><a><div className={styles.img}><GithubIcon /></div></a></Link>
        </li>
      </ul>
    </nav>
  )
}