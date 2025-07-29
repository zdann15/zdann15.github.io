'use client'
import styles from "../page.module.css"
import Link from "next/link";
import { usePathname } from 'next/navigation';

export function Navbar(){
  const path = usePathname();
  return (
    <div className={styles.navbar}>
      <Link className={`${styles.navitem} ${path=="/" ? styles.curLink : styles.navitem}`} href="/">Home</Link>
      <Link className={`${styles.navitem} ${path=="/about" ? styles.curLink : styles.navitem}`} href="/about/">About</Link>
      <Link className={`${styles.navitem} ${path=="/projects" ? styles.curLink : styles.navitem}`} href="/projects/">Projects</Link>
      <Link className={`${styles.navitem} ${path=="/resume/" ? styles.curLink : styles.navitem}`} href="/resume/">Resume</Link>
      <Link className={`${styles.navitem}`} href="https://github.com/zdann15">Github</Link>
    </div>
  );
}
  