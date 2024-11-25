import styles from "./page.module.css";
import {Navbar, Navitem} from "./components/navbar.js"
import {Header, Text} from "./components/header.js"

export default function Home() {
  return (
    <div className={styles.page}>
      <Header>
         Hey, it's Daniel!
      </Header>
      <Text>
        I am currently studying Computer Science at the University of Waterloo, with an expected graduation date in 2029. I aspire to become
        a professional software developer, and I'm particularly interested in backend development.
      </Text>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
