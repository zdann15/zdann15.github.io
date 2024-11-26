import styles from "../page.module.css";
import styles1 from "./resume.module.css";
import {Navbar, Navitem} from "../components/navbar.js";
import {Header, Text} from "../components/header.js";


// header for section titles
export function Header1({children}){
  return (
    <p className={styles1.header1}>
      {children}
    </p>
  )
}
// Header for item titles
export function Header2({children}){
  return (
    <p className={styles1.header2}>
      {children}
    </p>
  )
}
export function Header3({children}){
  return (
    <p className={styles1.header3}>
      {children}
    </p>
  )
}
export function Date({children}){
  return (
    <p className={styles1.date}>
      {children}
    </p>
  )
}
export function Content({children}){
  return (
    <p className={styles1.content}>
      {children}
    </p>
  )
}
export default function Home() {
    return (
      <div className={styles1.page}>
        <div className={`${styles1.title} ${styles1.slideinleft}`}>
        <Header>Daniel Zhang </Header>
        </div>
        <div className={`${styles1.resume} ${styles1.slideinleft}`}>
        <Header1> Education</Header1>
        <hr className={styles1.line}/>
          <Header2>University of Waterloo</Header2>
          <Date>Sept 2024 - Apr 2029</Date>
          <Header3>Bachelor of Computer Science (Honours Co-op)</Header3>
          <Header1> Experience</Header1>
        <hr className={styles1.line}/>
          <Header2>Software Developer Intern</Header2>
          <Date>Apr 2024 -</Date>
          <Header3> Utility Automation Solutions</Header3>
          <Content>
          - Built app using Windows Forms, WPF and C# to process COMTRADE event files and graphically model analog/digital channel signals

          </Content>
          <Header2>Lead Code Sensei</Header2>
          <Date>July 2023 - May 2024 </Date>
          <Header3> Code Ninjas Aurora</Header3>
          <Content>
          - Initiated new robotics/chess program, directs special events and oversees digital marketing strategy
          </Content>
          <Header1> Awards</Header1>
        <hr className={styles1.line}/>
          <Header2>Schulich Leader Scholarship</Header2>
          <Content>
            One of ten $100K scholarships awarded by the University of Waterloo. 
            Canada's most prestigious STEM undergraduate scholarship.
          </Content>
          <Header2>International Economics Olympiad - Absolute Winner</Header2>
          <Content>
            Placed first overall in 2023 IEO, among competitors from 40+ countries
          </Content>
          <Header1> Skills</Header1>
        <hr className={styles1.line}/>
          <p className={styles1.content}> 
            C#, Python, Java, HTML, CSS, JavaScript, Next.js, React Native </p>
        </div>
      </div>
    );
  }