import './globals.css'
import styles from './page.module.css'
import { Navbar } from './components/navbar.js'

export const metadata = {
  title: "Daniel Zhang - Software Developer",
  description: "Daniel Zhang's personal portfolio website - Computer Science student at University of Waterloo",
  keywords: "Daniel Zhang, Software Developer, Computer Science, University of Waterloo, Backend Development",
  author: "Daniel Zhang",
  viewport: "width=device-width, initial-scale=1",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Background/>
        <Navbar/>
        <main className="fade-in">
          {children}
        </main>
      </body>
    </html>
  );
}
