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
          <Link href="/">Home</Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/cv.pdf">CV</Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/blogs">Blogs</Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      <ul className={styles.list2}>
        <li className={styles.social}>
          <Link href={`https://www.linkedin.com/in/asish-mandoi-4178581b4/`}><div className={styles.img}><LinkedinIcon /></div></Link>
        </li>
        <li className={styles.social}>
          <Link href={`https://www.github.com/AsishMandoi`}><div className={styles.img}><GithubIcon /></div></Link>
        </li>
      </ul>
    </nav>
  );
}