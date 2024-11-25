import styles from "../page.module.css"

export function Header({children}){
    return (
    <h1 className={styles.header}>
      {children}
      </h1>
    );
  }

export function Text({children}){
    return (
    <p className={styles.text}>
      {children}
      </p>
    );
  }

export function Header1({children}){
  return (
    <p className={styles.header1}>
      {children}
    </p>
  )
}
export function Header2({children}){
  return (
    <p className={styles.header2}>
      {children}
    </p>
  )
}