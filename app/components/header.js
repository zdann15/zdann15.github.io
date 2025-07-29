"use client"
import styles from "../page.module.css";
import styles1 from "../resume/resume.module.css";

export function Header({ children }) {
  return (
    <h1 className={styles.header}>
      {children}
    </h1>
  );
}

export function Text({ children }) {
  return (
    <p className={styles.text}>
      {children}
    </p>
  );
}

export function Header1({ children }) {
  return (
    <h2 className={styles1.header1}>
      {children}
    </h2>
  );
}

export function Header2({ children }) {
  return (
    <h3 className={styles1.header2}>
      {children}
    </h3>
  );
}

export function Header3({ children }) {
  return (
    <h4 className={styles1.header3}>
      {children}
    </h4>
  );
}

export function Date({ children }) {
  return (
    <p className={styles1.date}>
      {children}
    </p>
  );
}

export function Content({ children }) {
  return (
    <p className={styles1.content}>
      {children}
    </p>
  );
}