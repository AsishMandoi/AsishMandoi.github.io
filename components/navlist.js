import Link from 'next/link'
import styles from './navlist.module.css'
import utilStyles from '../styles/utils.module.css'

export default function Navlist() {
  return (
    <section className={styles.navlist}>
      <hr className={utilStyles.hSeparator}/>
      <ul>
        <li>
          <Link href={`/about`}>About</Link>
        </li>
        <li>
          <Link href="/cv.pdf" target='_blank'>CV</Link>
        </li>
        <li>
          <Link href="/blogs">Blogs</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </section>
  );
}
