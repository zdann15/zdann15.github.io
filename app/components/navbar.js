import styles from "../page.module.css"
import Link from "next/link";

export function Navbar(){
    return (
    <div className={styles.navbar}>
      <Link className={styles.navitem} href="/">About Me</Link>
        <Link className={styles.navitem} href="/projects/">Projects</Link>
        <Link className={styles.navitem} href="/resume/">Resume</Link>
        <Link className={styles.navitem} href="https://github.com/zdann15">Github</Link>
      </div>
    );
  }
  