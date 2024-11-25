import "./globals.css";
import styles from "./page.module.css";
import {Navbar} from "./components/navbar"

export const metadata = {
  title: "Daniel Zhang",
  description: "Daniel Zhang's personal website",
};

function Background() {
  return (
    <div className={styles.background}>
    </div>
  )
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <Background/>
      <Navbar/>
        {children}
      </body>
    </html>
  );
}
