import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "./svg-components";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li className={styles.listItemLeft}>
          <Link href='https://www.linkedin.com/in/asish-mandoi-4178581b4/'><div className={styles.img}>
            <LinkedinIcon />
          </div></Link>
        </li>
        <li className={styles.listItemRight}>
          <Link href='https://github.com/AsishMandoi'><div className={styles.img}>
            <GithubIcon />
          </div></Link>
        </li>
      </ul>
      © {new Date().getFullYear()} <Link href={'/'}>Asish Mandoi</Link>
    </footer>
  );
}
