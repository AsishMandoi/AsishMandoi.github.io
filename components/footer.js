import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "./svg-components";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li className={styles.listItem1}>
          <Link href='https://www.linkedin.com/in/asish-mandoi-4178581b4/'><a><div className={styles.img}>
            <LinkedinIcon />
          </div></a></Link>
        </li>
        <li className={styles.listItem2}>
          <Link href='https://github.com/AsishMandoi'><a><div className={styles.img}>
            <GithubIcon />
          </div></a></Link>
        </li>
      </ul>
      © 2021 <Link href={'/'}><a>Asish Mandoi</a></Link>
    </footer>
  )
}